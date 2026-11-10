# Auth Lab — ASP.NET Core + Keycloak

Code mẫu hoàn chỉnh cho trang [Lab](../site/lab.html): Web API xác minh JWT access token và client console đăng nhập bằng Authorization Code + PKCE.

| Project | Vai trò | Dùng ở |
|---|---|---|
| `DemoApi` | ASP.NET Core Web API (Resource Server), xác minh JWT từ Keycloak, endpoint `/public`, `/me`, `/orders`, `/profile` | Lab 2 |
| `DemoClient` | Console app (public client) dùng `Duende.IdentityModel.OidcClient`, loopback redirect `http://127.0.0.1:7890/`, in và so sánh claim ID token / access token, gọi API | Lab 3 |
| `DemoClientBrowser` | Biến thể tùy chọn của Lab 3: `LoginAsync` + `IBrowser` (`LoopbackBrowser`) | Lab 3 (tùy chọn) |

## Yêu cầu

- .NET SDK 10 (LTS)
- Docker Desktop
- Keycloak đã cấu hình theo **Lab 1**: realm `demo`, user test, client public `demo-client` (Standard flow, Require PKCE = S256, redirect URI `http://127.0.0.1:7890/`), client `demo-api`, client scope `orders.read` có Audience mapper → `demo-api`, client confidential `worker` (Service account roles).

## Chạy

```bash
# 1. Keycloak (chế độ dev — chỉ dùng cho lab)
docker run -p 8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak start-dev

# 2. API — lắng nghe http://localhost:5005
dotnet run --project DemoApi

# 3. Client — mở trình duyệt hệ thống để đăng nhập, rồi gọi /me và /orders
dotnet run --project DemoClient
```

Gọi thử API không có token (mong đợi `401` + `WWW-Authenticate: Bearer`):

```bash
curl -i http://localhost:5005/me
```

Các kịch bản lỗi 401/403 cần tái hiện và bảng ghi kết quả: xem [Lab 2](../site/lab.html#lab2) và [bảng lỗi](../site/lab.html#error-table).

## Lưu ý

- Gói `Microsoft.AspNetCore.Authentication.JwtBearer` được ghim `10.0.*` cho khớp `net10.0`. Nếu bạn dùng .NET 11, đổi `TargetFramework` và phiên bản gói sang `11.0.*`.
- `RequireHttpsMetadata = false`, `ShowPII` và `DisablePushedAuthorization = true` **chỉ dùng cho lab trên localhost**. Production bắt buộc HTTPS và cấu hình mặc định an toàn.
- Không dán token môi trường production vào công cụ decode online.
- Code đã được build kiểm tra (0 lỗi, 0 cảnh báo) với .NET SDK 10.0.400; chưa chạy end-to-end tự động với Keycloak.
