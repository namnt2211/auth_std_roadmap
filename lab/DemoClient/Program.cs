using System.Diagnostics;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Duende.IdentityModel.Client;      // Parameters
using Duende.IdentityModel.OidcClient;  // OidcClient, OidcClientOptions

const string Authority   = "http://localhost:8080/realms/demo";
const string RedirectUri = "http://127.0.0.1:7890/";   // PHẢI khớp tuyệt đối với Keycloak
const string ApiBase     = "http://localhost:5005";

var options = new OidcClientOptions
{
    Authority   = Authority,
    ClientId    = "demo-client",                       // public client: KHÔNG có secret
    RedirectUri = RedirectUri,
    Scope       = "openid profile email orders.read",  // orders.read -> aud demo-api
    DisablePushedAuthorization = true,                  // [LAB] để thấy tham số trên URL
    LoadProfile = false                                 // không gọi userinfo, giữ output gọn
};
// Ghi chú: mặc định OidcClient KHÔNG kiểm tra chữ ký ID token (Policy.RequireIdentityTokenSignature = false)
// vì ID token nhận trực tiếp từ token endpoint. Production nên dùng HTTPS và cân nhắc gắn IdentityTokenValidator.
var oidc = new OidcClient(options);

// 1) nonce do ta tự sinh và gửi kèm
var nonce = Base64Url(RandomNumberGenerator.GetBytes(16));
var extra = new Parameters();
extra.Add("nonce", nonce);

// 2) Chuẩn bị: OidcClient sinh state + code_verifier + code_challenge và dựng URL
var state = await oidc.PrepareLoginAsync(extra);
if (state.IsError) { Console.WriteLine($"Lỗi chuẩn bị: {state.Error} {state.ErrorDescription}"); return; }

Console.WriteLine("=== AUTHORIZATION REQUEST ===");
Console.WriteLine(state.StartUrl);
Console.WriteLine($"state         = {state.State}");
Console.WriteLine($"code_verifier = {state.CodeVerifier}  (bí mật - KHÔNG nằm trong URL)");
Console.WriteLine($"nonce         = {nonce}");

// 3) Mở listener loopback TRƯỚC khi mở browser (lớp Loopback ở file Loopback.cs bên dưới).
//    Gọi hàm là listener chạy ngay; ta giữ Task lại và await SAU khi đã mở browser.
var waitForCallback = Loopback.WaitForCallbackAsync(new Uri(RedirectUri).Port);

Process.Start(new ProcessStartInfo(state.StartUrl) { UseShellExecute = true });
Console.WriteLine("\nĐã mở trình duyệt, đang chờ callback...");

// 4) Nhận callback từ browser: phần "/?state=...&code=..." của URL
var callback = await waitForCallback;
Console.WriteLine("\n=== CALLBACK ===");
Console.WriteLine("http://127.0.0.1:7890" + callback);

// 5) Kiểm tra state + đổi code lấy token (gửi code_verifier)
var result = await oidc.ProcessResponseAsync(callback, state);
if (result.IsError) { Console.WriteLine($"Lỗi: {result.Error} {result.ErrorDescription}"); return; }

Console.WriteLine("\n=== TOKEN RESPONSE (raw) ===");
Console.WriteLine(result.TokenResponse.Raw);

// 6) Kiểm tra nonce bằng tay + so sánh claim
var idPayload = DecodePayload(result.IdentityToken);
var atPayload = DecodePayload(result.AccessToken);
var nonceInToken = idPayload.TryGetProperty("nonce", out var n) ? n.GetString() : null;
Console.WriteLine($"\nnonce khớp? {nonceInToken == nonce}");

Console.WriteLine("\n=== SO SÁNH ===");
foreach (var claim in new[] { "aud", "azp", "nonce", "scope", "typ", "sub", "iss" })
    Console.WriteLine($"{claim,-6} | ID token: {Show(idPayload, claim),-40} | Access token: {Show(atPayload, claim)}");

// Lưu token ra file để dùng ở Lab 2 (kịch bản 5) và Lab 4 (refresh). CHỈ LAB.
Directory.CreateDirectory("tokens");
File.WriteAllText("tokens/id_token.txt", result.IdentityToken);
File.WriteAllText("tokens/access_token.txt", result.AccessToken);
File.WriteAllText("tokens/refresh_token.txt", result.RefreshToken ?? "");

// 7) Gọi API
using var api = new HttpClient { BaseAddress = new Uri(ApiBase) };
api.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", result.AccessToken);
foreach (var path in new[] { "/me", "/orders" })
{
    var resp = await api.GetAsync(path);
    Console.WriteLine($"\nGET {path} -> {(int)resp.StatusCode} {resp.StatusCode}");
    Console.WriteLine($"WWW-Authenticate: {resp.Headers.WwwAuthenticate}");
    Console.WriteLine(await resp.Content.ReadAsStringAsync());
}

// ---------- helpers ----------
static string Base64Url(byte[] bytes) =>
    Convert.ToBase64String(bytes).TrimEnd('=').Replace('+', '-').Replace('/', '_');

static JsonElement DecodePayload(string jwt)
{
    var p = jwt.Split('.')[1].Replace('-', '+').Replace('_', '/');
    p = p.PadRight(p.Length + (4 - p.Length % 4) % 4, '=');
    return JsonDocument.Parse(Convert.FromBase64String(p)).RootElement.Clone();
}

static string Show(JsonElement e, string name) =>
    e.TryGetProperty(name, out var v) ? v.ToString() : "(không có)";
