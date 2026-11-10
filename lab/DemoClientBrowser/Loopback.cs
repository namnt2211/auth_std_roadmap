using System.Net;
using System.Net.Sockets;
using System.Text;

// Vì sao TcpListener mà không phải HttpListener? Trên Windows, HttpListener chạy qua http.sys;
// prefix http://127.0.0.1:port/ có thể bị "Access is denied" nếu chưa đăng ký URL ACL (netsh, cần admin).
// TcpListener chỉ mở socket trên 127.0.0.1 -> không cần quyền đặc biệt.
public static class Loopback
{
    public static async Task<string> WaitForCallbackAsync(int port, CancellationToken ct = default)
    {
        var listener = new TcpListener(IPAddress.Loopback, port);
        listener.Start();   // chạy ngay khi hàm được gọi (trước await đầu tiên)
        try
        {
            while (true)
            {
                using var client = await listener.AcceptTcpClientAsync(ct);
                try
                {
                    using var stream = client.GetStream();
                    var reader = new StreamReader(stream, Encoding.ASCII);
                    // Dòng đầu của HTTP request, ví dụ: "GET /?state=...&code=... HTTP/1.1"
                    var requestLine = await reader.ReadLineAsync(ct);
                    while (!string.IsNullOrEmpty(await reader.ReadLineAsync(ct))) { } // bỏ qua các header

                    var parts = requestLine?.Split(' ');
                    var target = parts is { Length: >= 2 } ? parts[1] : "";
                    var isCallback = target.StartsWith("/?");

                    var body = Encoding.UTF8.GetBytes(isCallback
                        ? "<html><body><h3>Đăng nhập xong. Bạn có thể đóng tab này.</h3></body></html>" : "");
                    var head = Encoding.ASCII.GetBytes(
                        $"HTTP/1.1 {(isCallback ? "200 OK" : "404 Not Found")}\r\n" +
                        $"Content-Type: text/html; charset=utf-8\r\nContent-Length: {body.Length}\r\nConnection: close\r\n\r\n");
                    await stream.WriteAsync(head, ct);
                    await stream.WriteAsync(body, ct);

                    if (isCallback) return target;   // request khác (favicon...) -> 404, chờ tiếp
                }
                catch (IOException) { /* browser đóng kết nối sớm -> bỏ qua, chờ request tiếp */ }
            }
        }
        finally
        {
            listener.Stop();
        }
    }
}
