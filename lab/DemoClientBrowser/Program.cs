// Biến thể tùy chọn của Lab 3: dùng LoginAsync + IBrowser (LoopbackBrowser)
// thay cho PrepareLoginAsync/ProcessResponseAsync thủ công trong DemoClient.
using System.Security.Cryptography;
using Duende.IdentityModel.Client;
using Duende.IdentityModel.OidcClient;

var options = new OidcClientOptions
{
    Authority = "http://localhost:8080/realms/demo",
    ClientId = "demo-client",
    RedirectUri = "http://127.0.0.1:7890/",
    Scope = "openid profile email orders.read",
    // Chỉ để quan sát tham số trên URL khi học; production nên để mặc định (dùng PAR nếu IdP hỗ trợ).
    DisablePushedAuthorization = true,
    Browser = new LoopbackBrowser()
};

var oidc = new OidcClient(options);

// OidcClient 7.x không tự gửi nonce, nên tự sinh và gửi qua front-channel.
var nonce = Convert.ToBase64String(RandomNumberGenerator.GetBytes(16))
    .TrimEnd('=').Replace('+', '-').Replace('/', '_');
var result = await oidc.LoginAsync(new LoginRequest
{
    FrontChannelExtraParameters = new Parameters { { "nonce", nonce } }
});

if (result.IsError)
{
    Console.WriteLine($"Lỗi đăng nhập: {result.Error}");
    return;
}

// Kiểm tra nonce trong ID token (OidcClient lọc bỏ claim giao thức khỏi result.User,
// nên đọc trực tiếp payload ID token).
var payload = DecodeJwtPayload(result.IdentityToken);
var idTokenNonce = payload.TryGetProperty("nonce", out var n) ? n.GetString() : null;
Console.WriteLine(idTokenNonce == nonce ? "nonce khớp ✔" : "nonce KHÔNG khớp ✘");
Console.WriteLine($"Access token:\n{result.AccessToken}");

static System.Text.Json.JsonElement DecodeJwtPayload(string jwt)
{
    var p = jwt.Split('.')[1].Replace('-', '+').Replace('_', '/');
    p = p.PadRight(p.Length + (4 - p.Length % 4) % 4, '=');
    return System.Text.Json.JsonDocument.Parse(Convert.FromBase64String(p)).RootElement.Clone();
}
