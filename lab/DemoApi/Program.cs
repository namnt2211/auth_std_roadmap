using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Logging;

var builder = WebApplication.CreateBuilder(args);

// [LAB] Công tắc cho kịch bản 6:  dotnet run -- --Lab:MapInboundClaims=true
var mapInboundClaims = builder.Configuration.GetValue("Lab:MapInboundClaims", false);

// [LAB] Hiện giá trị thật (aud, iss...) trong thông báo IDX thay vì "[PII ... is hidden]".
// CHỈ dùng khi dev. Production: KHÔNG bật (log sẽ chứa dữ liệu nhạy cảm).
if (builder.Environment.IsDevelopment())
{
    IdentityModelEventSource.ShowPII = true;
}

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.Authority = "http://localhost:8080/realms/demo"; // -> tải discovery + JWKS, kiểm tra iss
        o.Audience = "demo-api";                           // -> token phải có aud chứa demo-api
        o.RequireHttpsMetadata = false;   // CHỈ dùng cho lab localhost
        o.MapInboundClaims = mapInboundClaims; // lab mặc định false: giữ nguyên tên claim sub, scope...
        o.IncludeErrorDetails = true;     // mặc định đã là true: đưa error_description vào WWW-Authenticate
        // Mặc định ClockSkew = 5 phút (token hết hạn vẫn được chấp nhận thêm 5 phút).
        // Lab giảm xuống 30 giây để kịch bản "token hết hạn" không phải chờ lâu.
        o.TokenValidationParameters.ClockSkew = TimeSpan.FromSeconds(30);

        o.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = ctx =>
            {
                LabLog(ctx.HttpContext).LogWarning("[LAB] Token bị từ chối: {Message}", ctx.Exception.Message);
                return Task.CompletedTask;
            },
            OnChallenge = ctx =>
            {
                LabLog(ctx.HttpContext).LogWarning("[LAB] 401 challenge. error={Error} description={Description}",
                    ctx.Error ?? "(none)", ctx.ErrorDescription ?? "(none)");
                return Task.CompletedTask;
            },
            OnForbidden = ctx =>
            {
                LabLog(ctx.HttpContext).LogWarning("[LAB] 403 forbidden. Claims: {Claims}",
                    string.Join(", ", ctx.HttpContext.User.Claims.Select(c => c.Type)));
                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddAuthorization(o =>
{
    // Keycloak đặt scope trong MỘT claim "scope", các giá trị cách nhau bởi dấu cách.
    o.AddPolicy("orders.read", p => p.RequireAssertion(ctx =>
        ctx.User.FindFirst("scope")?.Value
            .Split(' ').Contains("orders.read") == true));

    // [LAB] Policy cho kịch bản 6: phụ thuộc vào TÊN claim "sub".
    o.AddPolicy("has-sub", p => p.RequireClaim("sub"));
});

var app = builder.Build();

app.UseAuthentication();   // 1. đọc token -> HttpContext.User
app.UseAuthorization();    // 2. kiểm tra policy

app.MapGet("/public", () => "ok");

app.MapGet("/me", (ClaimsPrincipal u) =>
        u.Claims.Select(c => new { c.Type, c.Value }))
   .RequireAuthorization();

app.MapGet("/orders", () => new[] { "order-1" })
   .RequireAuthorization("orders.read");

app.MapGet("/profile", (ClaimsPrincipal u) => new { sub = u.FindFirst("sub")?.Value })
   .RequireAuthorization("has-sub");

app.Run("http://localhost:5005");

static ILogger LabLog(HttpContext http) =>
    http.RequestServices.GetRequiredService<ILoggerFactory>().CreateLogger("Lab.Auth");
