using System.Diagnostics;
using Duende.IdentityModel.OidcClient.Browser;

public sealed class LoopbackBrowser : IBrowser
{
    public async Task<BrowserResult> InvokeAsync(BrowserOptions options, CancellationToken ct = default)
    {
        using var cts = CancellationTokenSource.CreateLinkedTokenSource(ct);
        cts.CancelAfter(options.Timeout);                        // mặc định 5 phút

        // Dùng lại Loopback.cs: listener bắt đầu nghe NGAY, trước khi mở browser
        var wait = Loopback.WaitForCallbackAsync(new Uri(options.EndUrl).Port, cts.Token);
        Process.Start(new ProcessStartInfo(options.StartUrl) { UseShellExecute = true });

        try
        {
            var callback = await wait;                          // "/?state=...&code=..."
            return new BrowserResult { ResultType = BrowserResultType.Success, Response = callback };
        }
        catch (OperationCanceledException)
        {
            return new BrowserResult { ResultType = BrowserResultType.Timeout };
        }
    }
}
// Dùng: options.Browser = new LoopbackBrowser();  var result = await oidc.LoginAsync();
// Nhớ: LoginAsync tự sinh state/PKCE; muốn gửi nonce dùng
//   new LoginRequest { FrontChannelExtraParameters = new Parameters { { "nonce", nonce } } }.
