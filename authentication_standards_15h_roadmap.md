# Lộ trình học Authentication Standards trong 10--15 giờ

## Tài liệu học tập và chuẩn bị Technical Sharing

-   **Đối tượng:** Developer Fresher / Junior / Middle; người trình bày
    là C#/.NET Developer hoặc Tech Lead.
-   **Thời lượng:** 10 giờ (lộ trình **Core**) hoặc 15 giờ (lộ trình
    **Full**). Thời gian làm slide và tập trình bày (ước tính 3--5 giờ)
    được tính riêng, không nằm trong thời lượng học.
-   **Mục tiêu tổng thể:** Hiểu đúng các khái niệm Identity,
    Authentication, Authorization; giải thích được các chuẩn phổ biến;
    đọc được các luồng xác thực; lựa chọn giải pháp phù hợp với kiến
    trúc Web, Desktop, Mobile, API và hệ thống doanh nghiệp.
-   **Phạm vi:** Tập trung vào nền tảng và các chuẩn có giá trị thực
    tiễn cao. Không đặt mục tiêu trở thành chuyên gia triển khai mọi
    giao thức trong 15 giờ.

> **Nguyên tắc học:** Với mỗi module, hoàn thành Input trước khi học, xử
> lý các nội dung chính, sau đó tạo đủ Output/Deliverables và vượt qua
> Knowledge Check. Output là bằng chứng cho thấy đã hiểu, không chỉ là
> nội dung đã đọc.

------------------------------------------------------------------------

# 1. Tổng quan lộ trình

| Module   | Nội dung                                              | Full (15h) | Core (10h) |
|----------|-------------------------------------------------------|-----------:|-----------:|
| 01       | Identity & Authentication Fundamentals                |      1 giờ |    45 phút |
| 02       | Cryptography, Session, Token & HTTP Auth Schemes      |      2 giờ |    1.5 giờ |
| 03       | OAuth 2.0 / OAuth 2.1 & OpenID Connect                |      3 giờ |    2.5 giờ |
| **Lab**  | **Hands-on OAuth/OIDC với ASP.NET Core**              |  **2 giờ** | **1.5 giờ** |
| 04       | SAML 2.0 & Enterprise SSO                             |    1.5 giờ |    45 phút |
| 05       | Enterprise Authentication & Passwordless              |    1.5 giờ |    45 phút |
| 06       | Authorization & Authentication Security               |      2 giờ |    1.5 giờ |
| 07       | Authentication Architecture & Practical Cases         |      2 giờ |    45 phút |
| **Tổng** |                                                       | **15 giờ** | **10 giờ** |

## Nhãn ưu tiên và lộ trình Core 10 giờ

-   **[Must]:** Bắt buộc cho cả Core và Full. Phải giải thích được và
    áp dụng được.
-   **[Should]:** Học đầy đủ trong lộ trình Full; lộ trình Core chỉ đọc
    lướt để biết khái niệm.
-   **[Nice]:** Chỉ cần biết tên, use case và "không phải là gì".
-   Deliverable có ghi **(Core)** là bắt buộc cho lộ trình Core; các
    deliverable còn lại chỉ bắt buộc cho lộ trình Full.

| Module | [Must] | [Should] | [Nice] |
|--------|--------|----------|--------|
| 01 | Identity/Account/Credential; AuthN vs AuthZ; IdP/RP/SP/AS/RS; SSO vs Federation; MFA | Authentication factors và phương thức | --- |
| 02 | Hash vs encryption vs signature; password hashing; session/cookie; access/ID/refresh token; JWT validation; HTTP auth schemes và API key | PKI/CA, JWE, key rotation, session management chi tiết, introspection/revocation | HMAC chi tiết |
| 03 | Roles; Authorization Code + PKCE; Client Credentials; `state`/`nonce`/redirect URI; OIDC và ID token vs access token; định danh bằng `iss` + `sub` | OAuth 2.1; Device flow; Discovery/JWKS; logout; social login và account linking | ROPC/Implicit (chỉ cần biết vì sao không dùng); multi-tenant; On-Behalf-Of |
| Lab | Lab 1--3 | Lab 4 | Lab 5 (SAML) |
| 04 | SP-initiated flow; Response vs Assertion; checklist validation | IdP-initiated; bindings; so sánh OIDC/SAML | XML canonicalization; SLO; WS-Federation |
| 05 | LDAP vs AD; Kerberos tổng quan; WebAuthn/passkey | Kerberos TGT/TGS chi tiết; UP vs UV; passkey sync/recovery | NTLM; RADIUS/TACACS+; certificate/smart card |
| 06 | 401 vs 403; RBAC; authorization trong API; CSRF/XSS; token theft; token storage; điểm yếu của MFA và AiTM | ABAC/ACL/ReBAC; password guidance theo NIST; recovery flow | Policy engine |
| 07 | Quy trình thiết kế; kiến trúc SPA, Desktop, Service-to-Service; ví dụ WPF + API | Server-side web; mobile; provisioning/offboarding; troubleshooting | Windows domain/enterprise network |

## Kiến thức đầu vào chung

Nên có kiến thức cơ bản về: - HTTP request/response, headers, status
codes. - HTTPS/TLS ở mức khái niệm. - Client--Server architecture, REST
API. - Web application và API hoạt động như thế nào. - Khái niệm cơ bản
về database, user/account, role/permission.

Cho phần Lab: cài sẵn .NET SDK (bản LTS hiện hành), Docker Desktop và
biết tạo project ASP.NET Core Web API cơ bản.

Không cần biết trước OAuth, OIDC, SAML hay mật mã học chuyên sâu.

## Kết quả đầu ra tổng thể

Sau khi hoàn thành lộ trình, người học có thể:

1.  Phân biệt Identification, Authentication, Authorization, Accounting
    và Federation.
2.  Giải thích được vai trò của IdP, Client, Relying Party, Service
    Provider, Authorization Server và Resource Server.
3.  Giải thích được session, cookie, access token, ID token, refresh
    token, JWT, opaque token, API key và các HTTP authentication scheme
    (Basic, Bearer).
4.  Mô tả được các luồng OAuth 2.0 quan trọng, đặc biệt Authorization
    Code + PKCE và Client Credentials.
5.  Giải thích OIDC bổ sung lớp xác thực danh tính trên OAuth 2.0 như
    thế nào.
6.  Mô tả được SAML SSO ở mức đủ để đọc flow và trao đổi với đội triển
    khai.
7.  Phân biệt được LDAP, Active Directory, Kerberos, NTLM, RADIUS, FIDO2
    và WebAuthn.
8.  Phân biệt Authentication và Authorization; hiểu RBAC, ABAC, ACL.
9.  Nhận diện các rủi ro phổ biến liên quan đến mật khẩu, session,
    token, redirect và cấu hình giao thức.
10. Phác thảo được kiến trúc xác thực cơ bản cho Web, Desktop, Mobile,
    API và service-to-service.
11. Đọc log/trace và khoanh vùng một số lỗi xác thực thường gặp.
12. Trình bày lại kiến thức cho team bằng sơ đồ, ví dụ và câu hỏi kiểm
    tra.
13. Dựng được demo: ASP.NET Core Web API xác minh JWT access token từ
    một IdP thực (Keycloak/Entra ID) và client dùng Authorization Code
    + PKCE; tái hiện và giải thích được các lỗi 401/403 thường gặp.

------------------------------------------------------------------------

# Module 01 --- Identity & Authentication Fundamentals

**Thời lượng: 1 giờ** (Core: 45 phút)

## 1.1. Mục tiêu

Xây dựng ngôn ngữ chung và mô hình tư duy trước khi đi vào các giao
thức. Người học phải hiểu chính xác hệ thống đang xác minh điều gì, ai
xác minh, và quyền truy cập được quyết định ở đâu.

## 1.2. Nội dung cần học

### A. Identity, Account, Identifier, Attribute, Credential

-   **Identity:** Tập hợp thông tin/đặc tính dùng để biểu diễn một thực
    thể trong một ngữ cảnh.
-   **Account:** Bản ghi hoặc quan hệ của thực thể với một hệ thống cụ
    thể. Một người có thể có nhiều account ở nhiều hệ thống.
-   **Identifier:** Giá trị dùng để tham chiếu/nhận diện, ví dụ
    username, email, employee ID hoặc subject identifier.
-   **Attribute:** Thuộc tính mô tả thực thể, ví dụ tên, phòng ban,
    trạng thái nhân viên.
-   **Credential:** Bằng chứng được dùng trong quá trình xác thực, ví dụ
    password, private key, passkey hoặc chứng thư số.

Lưu ý: Email hoặc username thường là identifier, không tự nó chứng minh
người dùng là ai. Không nên đồng nhất identity với account hoặc
credential.

### B. Identification, Authentication, Authorization, Accounting

-   **Identification:** Người dùng khai báo mình là ai, ví dụ nhập
    username.
-   **Authentication (AuthN):** Hệ thống kiểm tra bằng chứng để xác minh
    danh tính/định danh đã khai báo.
-   **Authorization (AuthZ):** Quyết định chủ thể đã xác thực được phép
    thực hiện hành động nào trên tài nguyên nào.
-   **Accounting/Auditing:** Ghi nhận hoạt động để theo dõi, kiểm toán
    và điều tra.

Ví dụ: nhập username là identification; chứng minh quyền kiểm soát
credential là authentication; kiểm tra có quyền xem báo cáo hay không là
authorization.

### C. Các thuật ngữ và vai trò

-   **Subject:** Thực thể mà một quyết định bảo mật hoặc thao tác đang
    nói đến.
-   **Principal:** Danh tính/đại diện bảo mật được hệ thống dùng để gắn
    với quyền. Ý nghĩa cụ thể có thể thay đổi theo nền tảng.
-   **User:** Người dùng; không phải lúc nào cũng là principal duy nhất.
-   **Identity Provider (IdP):** Hệ thống quản lý danh tính và thực hiện
    hoặc hỗ trợ xác thực, phát hành thông tin xác thực/danh tính cho bên
    tin cậy.
-   **Relying Party (RP):** Ứng dụng dựa vào kết quả xác thực do một bên
    khác cung cấp; thuật ngữ thường gặp trong OIDC.
-   **Service Provider (SP):** Ứng dụng/dịch vụ tiêu thụ assertion từ
    IdP; thuật ngữ phổ biến trong SAML.
-   **Client:** Ứng dụng khởi tạo yêu cầu tới authorization server hoặc
    API.
-   **Authorization Server (AS):** Cấp token theo giao thức OAuth.
-   **Resource Server (RS):** API/server bảo vệ tài nguyên và kiểm tra
    access token.
-   **Identity Federation:** Thiết lập quan hệ tin cậy giữa các miền/hệ
    thống danh tính độc lập.

Các vai trò trên có thể do các thành phần triển khai khác nhau đảm nhiệm
hoặc được gộp trong cùng một sản phẩm. Không nên xem mọi thuật ngữ là
đồng nghĩa.

### D. SSO, Federation, MFA

-   **Single Sign-On (SSO):** Người dùng đăng nhập qua một hệ thống xác
    thực và có thể truy cập nhiều ứng dụng mà không phải nhập thông tin
    đăng nhập lại mỗi lần, trong phạm vi chính sách và phiên còn hiệu
    lực.
-   **Federation:** Các miền bảo mật thiết lập trust để chấp nhận thông
    tin danh tính/assertion/token do bên kia phát hành.
-   **MFA:** Sử dụng ít nhất hai yếu tố thuộc các nhóm độc lập:
    -   Something you know: mật khẩu, PIN.
    -   Something you have: thiết bị, security key.
    -   Something you are: đặc điểm sinh trắc học.
-   Hai mật khẩu khác nhau vẫn không tự động là MFA. Hai bước không đồng
    nghĩa hai yếu tố độc lập.
-   Sinh trắc học thường được dùng cục bộ để mở khóa authenticator;
    không mặc định rằng dữ liệu sinh trắc học được gửi tới server.

### E. Authentication factors và phương thức

Phân biệt: - Password-based authentication. - OTP: TOTP/HOTP và mã gửi
qua SMS/email (mức độ bảo vệ khác nhau). - Certificate/public-key
authentication. - Push-based authentication. - Passkey/FIDO2. -
Biometric-assisted authentication.

Không cần đi sâu cách triển khai từng phương thức ở module này.

## 1.3. Sơ đồ tư duy

``` text
Identity / Account
       |
Identification: "Tôi là ai?"
       |
Authentication: "Chứng minh điều đó"
       |
Authenticated Subject / Principal
       |
Authorization: "Được phép làm gì?"
       |
Resource / Action
       |
Accounting & Audit: "Đã xảy ra điều gì?"
```

## 1.4. Các hiểu lầm cần tránh

-   Authentication thành công không có nghĩa là được phép truy cập mọi
    tài nguyên.
-   OAuth 2.0 không phải giao thức authentication thuần túy; nó tập
    trung vào authorization.
-   SSO không có nghĩa tất cả ứng dụng dùng chung một session.
-   Federation không đồng nghĩa SSO, dù hai khái niệm thường đi cùng
    nhau.
-   MFA không đơn giản là có hai màn hình hoặc hai lần nhập dữ liệu.
-   JWT không phải một chuẩn authentication độc lập.

## 1.5. Input trước module

Người học cần: - Hiểu sơ bộ client--server và HTTP. - Chọn một hệ thống
quen thuộc (ví dụ ứng dụng nội bộ có login và phân quyền). - Liệt kê
được user, account, role, permission và tài nguyên trong hệ thống đó.

## 1.6. Output sau module

**Deliverables bắt buộc:** 1. Một trang glossary giải thích tối thiểu 12
thuật ngữ: Identity, Account, Identifier, Credential, Subject,
Principal, Authentication, Authorization, IdP, RP, SP, Federation. 2.
Một sơ đồ phân biệt Identification → Authentication → Authorization →
Audit. 3. Một ví dụ thực tế phân tích được: ai xác thực, hệ thống nào
xác thực, ai quyết định quyền truy cập. 4. Trả lời được: -
Authentication khác Authorization thế nào? - Identity khác Account thế
nào? - SSO khác Federation thế nào? - Vì sao hai mật khẩu không phải
MFA?

**Tiêu chí hoàn thành:** Có thể giải thích các khái niệm trên trong 5
phút bằng ví dụ tự chọn, không nhầm Authentication với Authorization,
Identity với Account, SSO với Federation. (Phân biệt OAuth/OIDC được
kiểm tra ở Module 03.)

**Core 10h:** Làm cả 4 deliverable, glossary có thể rút gọn còn 1 dòng
mỗi thuật ngữ.

------------------------------------------------------------------------

# Module 02 --- Cryptography, Session & Token Fundamentals

**Thời lượng: 2 giờ** (Core: 1.5 giờ)

## 2.1. Mục tiêu

Hiểu những nền tảng mật mã học tối thiểu để đọc được token, chữ ký số,
certificate và HTTPS; hiểu cách ứng dụng duy trì trạng thái đăng nhập.

## 2.2. Nội dung cần học

### A. Cryptography essentials

-   **Plaintext / Ciphertext:** Dữ liệu gốc và dữ liệu đã mã hóa.
-   **Encryption / Decryption:** Mã hóa và giải mã; mục tiêu chính là
    confidentiality.
-   **Symmetric encryption:** Dùng cùng một secret key để mã hóa và giải
    mã; ví dụ AES.
-   **Asymmetric cryptography:** Dùng cặp public key/private key; ví dụ
    RSA, elliptic-curve cryptography.
-   **Hashing:** Hàm một chiều tạo digest; ví dụ SHA-256. Hash không
    phải encryption.
-   **Password hashing:** Dùng thuật toán chuyên cho mật khẩu như
    Argon2id, bcrypt, scrypt hoặc PBKDF2, kèm salt và cấu hình phù hợp.
    Không lưu password dạng plaintext hoặc chỉ SHA-256(password).
-   **Digital signature:** Private key ký; public key kiểm tra chữ ký.
    Chữ ký giúp xác minh tính toàn vẹn và nguồn gốc theo mô hình khóa,
    không che giấu nội dung.
-   **HMAC:** Cơ chế xác thực thông điệp dùng secret key chung; khác với
    chữ ký bất đối xứng.
-   **Salt:** Giá trị ngẫu nhiên riêng cho từng password hash, giúp
    chống việc dùng sẵn bảng hash.
-   **Certificate / X.509:** Chứng thư gắn public key với danh
    tính/thuộc tính, được CA ký.
-   **CA / PKI:** Certificate Authority và Public Key Infrastructure;
    trust chain, certificate validity, expiration, revocation ở mức khái
    niệm.
-   **TLS/HTTPS:** Bảo vệ kênh truyền, xác thực server (và có thể xác
    thực client bằng mTLS), bảo vệ tính bí mật/toàn vẹn khi truyền.

### B. Những phân biệt quan trọng

  -----------------------------------------------------------------------
  Khái niệm               Mục đích chính          Có khôi phục dữ liệu
                                                  gốc?
  ----------------------- ----------------------- -----------------------
  Encryption              Bảo mật nội dung        Có, nếu có key phù hợp

  Hash                    Tạo digest/đối chiếu    Không

  Digital Signature       Xác minh nguồn gốc và   Không phải cơ chế mã
                          toàn vẹn                hóa

  HMAC                    Xác minh thông điệp     Không
                          bằng shared secret      

  Password hashing        Lưu trữ/kiểm tra        Không
                          password an toàn hơn    
  -----------------------------------------------------------------------

### C. Session, Cookie và Stateful/Stateless

-   **Session:** Trạng thái đăng nhập/hoạt động được ứng dụng quản lý.
-   **Session ID:** Giá trị tham chiếu session; server thường lưu trạng
    thái session.
-   **Cookie:** Cơ chế browser lưu và gửi dữ liệu theo domain/path và
    chính sách cookie.
-   Cookie không đồng nghĩa session; session ID chỉ là một cách dùng
    cookie.
-   **Stateful:** Server duy trì trạng thái phiên hoặc dữ liệu liên
    quan.
-   **Stateless:** Server không cần lưu session đăng nhập truyền thống
    cho từng request; vẫn có thể cần trạng thái cho revocation, refresh
    token, risk, audit hoặc policy.
-   Thuộc tính cookie cần biết: `HttpOnly`, `Secure`, `SameSite`,
    `Domain`, `Path`, `Expires/Max-Age`.
-   Cookie tự động được browser gửi theo quy tắc phù hợp; điều này liên
    quan đến CSRF.

### C.1. Session management [Should]

-   **Session ID** phải ngẫu nhiên, đủ dài và do framework sinh ra;
    không tự chế.
-   **Session fixation:** Luôn cấp session ID mới sau khi login thành
    công và sau khi thay đổi quyền (ví dụ nâng lên admin).
-   **Idle timeout và absolute timeout:** Idle timeout là session hết hạn
    khi không hoạt động; absolute timeout là session hết hạn sau thời
    gian tối đa dù vẫn hoạt động. Nên có cả hai.
-   **Re-authentication / step-up authentication:** Yêu cầu xác thực lại
    hoặc dùng yếu tố mạnh hơn trước thao tác nhạy cảm như đổi mật khẩu,
    đổi email, chuyển tiền, xem dữ liệu bí mật.
-   **Remember me:** Dùng persistent token riêng, có thời hạn và có thể
    thu hồi; không phải chỉ kéo dài session vô thời hạn.
-   Logout phải hủy session phía server, không chỉ xóa cookie ở
    browser.

### D. Token concepts

-   **Token:** Vật mang thông tin/quyền hoặc tham chiếu tới thông
    tin/quyền.
-   **Access Token:** Dùng để truy cập Resource Server/API.
-   **ID Token:** Trong OIDC, mang thông tin về kết quả xác thực và
    subject dành cho client/RP.
-   **Refresh Token:** Dùng để xin access token mới theo chính sách
    authorization server; không dùng thay access token để gọi API.
-   **Opaque Token:** Chuỗi không mang cấu trúc có thể đọc/diễn giải
    trực tiếp; API có thể xác minh bằng introspection hoặc cơ chế
    server-side.
-   **JWT:** JSON Web Token, định dạng biểu diễn claims; JWT có thể được
    ký hoặc mã hóa.
-   **JWS:** JSON Web Signature; thường dùng để ký và bảo vệ tính toàn
    vẹn.
-   **JWE:** JSON Web Encryption; bảo vệ tính bí mật nội dung.
-   JWT ký không đồng nghĩa payload được mã hóa. Payload thường có thể
    đọc được nếu không dùng JWE.

### E. JWT anatomy và validation

JWT dạng compact thường gồm ba phần: `header.payload.signature`

Claims thường gặp: - `iss`: issuer. - `sub`: subject. - `aud`:
audience. - `exp`: expiration time. - `nbf`: not before. - `iat`: issued
at. - `jti`: token identifier. - `scope` hoặc `roles`: quyền/phạm vi,
tùy hệ thống.

Khi API nhận token, cần kiểm tra tối thiểu: - Chữ ký bằng key đáng tin
cậy và thuật toán được cho phép. - `iss` đúng issuer mong đợi. - `aud`
đúng API/resource mong đợi. - Thời hạn (`exp`, `nbf`) và clock skew hợp
lý. - Token đúng loại/ngữ cảnh; không dùng ID token thay access token. -
Các claim/scope cần thiết cho authorization.

Không tự viết JWT validation bằng cách chỉ decode Base64 hoặc tự tin vào
payload.

### F. Token lifecycle

-   Cấp token, sử dụng, hết hạn, refresh, revoke.
-   Access token thường có thời hạn ngắn hơn refresh token.
-   Refresh token rotation và phát hiện reuse.
-   Logout không mặc định làm mọi access token đã phát hành mất hiệu lực
    ngay lập tức; phụ thuộc kiến trúc và cơ chế revocation.
-   Key rotation: issuer có thể thay signing key; client/API cần xử lý
    JWKS/key rollover.
-   **Token Introspection (RFC 7662):** Resource Server hỏi
    Authorization Server xem token còn hiệu lực không và mang thông tin
    gì; thường dùng với opaque token hoặc khi cần kiểm tra revocation
    tức thời.
-   **Token Revocation (RFC 7009):** Client báo Authorization Server thu
    hồi refresh token/access token, ví dụ khi logout hoặc mất thiết bị.

### G. HTTP authentication schemes và API key [Must]

-   **Header `Authorization`:** Định dạng chung
    `Authorization: <scheme> <credentials>`.
-   **Header `WWW-Authenticate`:** Server trả kèm response 401 để báo
    scheme yêu cầu và lý do lỗi, ví dụ
    `Bearer error="invalid_token", error_description="The audience is invalid"`.
    Đây là nguồn thông tin rất hữu ích khi troubleshooting.
-   **Basic:** `base64(username:password)`. Base64 chỉ là encoding,
    không phải mã hóa; chỉ dùng qua TLS và hạn chế dùng cho API mới.
-   **Bearer (RFC 6750):** Ai cầm token là dùng được. Phải bảo vệ token
    như mật khẩu và không gửi qua query string/URL.
-   **API key:** Chuỗi bí mật định danh *ứng dụng/dự án* gọi API, không
    định danh người dùng. Thường sống lâu và không có scope/consent
    chuẩn hóa.
    -   Phù hợp: public API đơn giản, quota/metering, tích hợp
        server-to-server quy mô nhỏ.
    -   Không phù hợp: hành động thay mặt người dùng, hoặc public client
        (SPA/mobile/desktop) vì key sẽ bị lộ.
    -   Thực hành tốt: gửi qua header (không qua URL), chỉ lưu hash phía
        server, hỗ trợ rotation/revoke, có expiration, gắn quyền tối
        thiểu, theo dõi usage.
-   **API key vs OAuth Client Credentials:** Client Credentials cấp
    access token ngắn hạn, có scope, audience và cơ chế xoay vòng chuẩn
    hóa. API key đơn giản hơn nhưng khó kiểm soát quyền và vòng đời.

## 2.3. Input trước module

-   Hoàn thành Module 01.
-   Có thể đọc HTTP request/response và header.
-   Biết sơ bộ HTTPS.

## 2.4. Output sau module

**Deliverables bắt buộc:**

1.  Bảng so sánh Encryption, Hash, Signature, HMAC, Password Hashing.
    **(Core)**
2.  Sơ đồ login session-based và token-based. **(Core)**
3.  Một JWT mẫu được phân tích thành header, payload, signature; xác
    định `iss`, `sub`, `aud`, `exp`; giải thích vì sao JWT ký không có
    nghĩa payload bí mật. **(Core)**
4.  Bảng so sánh Access Token, ID Token, Refresh Token. Bảng này được
    dùng tiếp và bổ sung ở Module 03, không làm lại. **(Core)**
5.  Checklist validation token. Bắt đầu với access token cho API;
    Module 03 bổ sung phần ID token. **(Core)**
6.  Bảng so sánh API key, Basic, Bearer token và OAuth Client
    Credentials.

**Knowledge Check:** - Vì sao không nên lưu password bằng SHA-256 đơn
thuần? - Khác nhau giữa cookie và session? - API có thể chỉ decode JWT
rồi tin payload không? - `aud` giúp bảo vệ điều gì? - Vì sao ID token
không nên gửi cho API thay access token? - Logout có luôn vô hiệu hóa
token ngay lập tức không? - API key khác OAuth access token thế nào? -
Vì sao phải cấp session ID mới sau khi login? - Header
`WWW-Authenticate` cho biết điều gì khi API trả 401?

**Tiêu chí hoàn thành:** Có thể đọc một JWT mẫu, giải thích cách API xác
minh token và mô tả vòng đời cơ bản của session/token.

------------------------------------------------------------------------

# Module 03 --- OAuth 2.0, OAuth 2.1 Concepts & OpenID Connect

**Thời lượng: 3 giờ** (Core: 2.5 giờ, đọc lướt các mục [Should] và
[Nice])

## 3.1. Mục tiêu

Đây là module trọng tâm. Người học cần phân biệt authorization và
authentication, hiểu vai trò các thành phần, các flow quan trọng, cách
OIDC bổ sung lớp danh tính, và các biện pháp bảo vệ luồng.

## 3.2. OAuth 2.0 fundamentals

### A. OAuth giải quyết vấn đề gì?

OAuth cho phép một client được cấp quyền truy cập tài nguyên được bảo vệ
thông qua access token, thay vì phải biết/lưu mật khẩu của người dùng
tại client.

OAuth 2.0 là **authorization framework**, không tự định nghĩa đầy đủ
cách client xác minh danh tính người dùng.

### B. Các role

-   **Resource Owner:** Thực thể có quyền cấp quyền truy cập tài nguyên;
    thường là người dùng.
-   **Client:** Ứng dụng yêu cầu quyền truy cập.
-   **Authorization Server:** Xác thực/consent theo cấu hình và phát
    hành token.
-   **Resource Server:** API bảo vệ tài nguyên, kiểm tra access token.

### C. Thuật ngữ

-   `client_id`: định danh client.
-   `client_secret`: bí mật của confidential client; không thể bảo vệ an
    toàn trong public client như native app/browser SPA.
-   `redirect_uri`: địa chỉ nhận authorization response.
-   `scope`: quyền/phạm vi client yêu cầu.
-   `state`: giá trị gắn request và response, giúp chống
    CSRF/correlation trong authorization flow.
-   `nonce`: giá trị gắn với OIDC authentication request để chống replay
    và liên kết ID token với request.
-   `response_type`, `response_mode`, `grant_type`.
-   Authorization Code, access token, refresh token.

### D. Các flow/grant quan trọng

1.  **Authorization Code Flow**
    -   Client chuyển user agent tới authorization endpoint.
    -   Người dùng đăng nhập/consent tại authorization server.
    -   Authorization server trả authorization code về redirect URI.
    -   Client đổi code lấy token qua token endpoint.
    -   Phù hợp với ứng dụng có backend và public client khi kết hợp
        PKCE theo hướng dẫn hiện đại.
2.  **Authorization Code + PKCE**
    -   Client tạo `code_verifier`, từ đó tạo `code_challenge`.
    -   Gửi challenge trong authorization request.
    -   Khi đổi code, gửi verifier.
    -   Authorization server xác minh liên kết giữa hai giá trị.
    -   PKCE bảo vệ authorization code khỏi bị kẻ khác sử dụng nếu code
        bị chặn/đánh cắp.
    -   Dùng cho native apps, SPA và cả web clients theo khuyến nghị
        hiện đại.
3.  **Client Credentials**
    -   Machine-to-machine, không có user tương tác trực tiếp.
    -   Client xác thực với authorization server và nhận access token.
    -   Không dùng để đăng nhập người dùng cuối.
4.  **Device Authorization Grant**
    -   Thiết bị có input hạn chế (TV, CLI, thiết bị) hiển thị user
        code/verification URI.
    -   Người dùng hoàn tất xác thực trên thiết bị khác.
    -   Thiết bị polling theo quy định để nhận kết quả.
    -   Cần hiểu use case, không cần triển khai trong khóa học cơ bản.
5.  **Resource Owner Password Credentials (ROPC)**
    -   Là grant cũ, không nên dùng trong thiết kế mới; không khuyến
        nghị vì client trực tiếp xử lý mật khẩu người dùng.
    -   Không coi đây là lựa chọn tương đương Authorization Code + PKCE.

Implicit Flow cũng là flow cũ, không nên dùng cho ứng dụng mới.

### D.1. OAuth 2.1 thay đổi gì so với OAuth 2.0? [Should]

OAuth 2.1 (`draft-ietf-oauth-v2-1`) hợp nhất OAuth 2.0 với các RFC và
Security BCP (RFC 9700) đã ban hành sau đó. Tại thời điểm soạn tài
liệu, OAuth 2.1 vẫn là Internet-Draft; cần kiểm tra trạng thái hiện
hành trước khi trích dẫn như một chuẩn chính thức.

Các thay đổi chính:

-   **PKCE bắt buộc** cho mọi client dùng Authorization Code, kể cả
    confidential client.
-   **Loại bỏ Implicit grant và ROPC.**
-   **Redirect URI phải so khớp chính xác** (exact string matching);
    ngoại lệ duy nhất là port động với loopback redirect của native
    app.
-   **Không gửi bearer token qua query string.**
-   **Refresh token của public client** phải sender-constrained (ví dụ
    DPoP) hoặc dùng rotation một lần.

Trên thực tế, hầu hết IdP hiện đại đã áp dụng các khuyến nghị này. Thiết
kế mới nên tuân theo OAuth 2.1 ngay từ đầu.

### E. PKCE, state, nonce và redirect URI

-   **PKCE:** Ràng buộc authorization code với client instance đã khởi
    tạo request.
-   **state:** Correlation và chống CSRF trong authorization response.
-   **nonce:** Liên kết ID token với authentication request trong OIDC.
-   **redirect URI validation:** Phải khớp chính xác với URI đã đăng ký
    theo yêu cầu của authorization server; tránh wildcard/redirect mở.
-   Không nhầm vai trò của `state`, `nonce` và PKCE; chúng giải quyết
    các vấn đề liên quan nhưng không thay thế nhau.

## 3.3. OpenID Connect (OIDC)

### A. OIDC là gì?

OIDC là lớp identity/authentication xây dựng trên OAuth 2.0. Nó chuẩn
hóa cách client yêu cầu xác thực người dùng và nhận thông tin về kết quả
xác thực.

### B. Thành phần/thuật ngữ

-   **OpenID Provider (OP):** Hệ thống cung cấp dịch vụ OIDC; thường
    đóng vai trò IdP.
-   **Relying Party (RP):** Ứng dụng tin cậy kết quả xác thực từ OP.
-   **ID Token:** JWT mang claims về authentication và subject.
-   **UserInfo Endpoint:** Endpoint cung cấp claims người dùng theo
    access token.
-   **Discovery:** Metadata endpoint giúp client tìm endpoint và
    capability của OP.
-   **JWKS:** Bộ public keys dùng để xác minh chữ ký token.
-   **Claims:** Thông tin về subject, ví dụ `sub`, `name`, `email`; cần
    kiểm soát scope và quyền riêng tư.

### C. ID Token và Access Token

  Tiêu chí          ID Token                     Access Token
  ----------------- ---------------------------- ----------------------------------
  Dành cho          Client/RP                    Resource Server/API
  Mục đích          Thông tin kết quả xác thực   Truy cập tài nguyên
  Nội dung          Authentication claims        Quyền/scope và thông tin theo AS
  Nơi validation    Client/RP                    API/Resource Server
  Dùng thay nhau?   Không                        Không

### D. OIDC flow ở mức khái niệm

-   Client khởi tạo Authorization Code + PKCE.
-   OP xác thực người dùng.
-   OP trả code.
-   Client đổi code lấy token.
-   Client xác minh ID token: chữ ký, issuer, audience, thời hạn, nonce
    và các điều kiện phù hợp.
-   Client có thể gọi UserInfo bằng access token.
-   Client tạo session ứng dụng của riêng mình theo kiến trúc.

### E. OIDC Discovery và JWKS

Biết các khái niệm: - Discovery document (thường là
`/.well-known/openid-configuration`). - Authorization endpoint, token
endpoint, UserInfo endpoint, JWKS URI. - Key ID (`kid`) trong JWT header
và cách chọn key phù hợp từ JWKS. - Cache metadata/JWKS và xử lý key
rotation. - Không hardcode public key vĩnh viễn nếu hệ thống hỗ trợ
rollover.

### F. Logout và session

-   RP-initiated logout / end-session endpoint tùy provider.
-   Local application session, OP session và access/refresh token là các
    trạng thái khác nhau.
-   Single Logout không phải lúc nào cũng đồng nhất hoặc tức thời trên
    mọi ứng dụng.
-   Cần phân biệt logout khỏi ứng dụng, logout khỏi IdP và revoke token.

### G. Định danh người dùng, social login và account linking [Must]

-   Khóa định danh duy nhất và ổn định của người dùng nhận từ OIDC là
    cặp **`iss` + `sub`**. `sub` chỉ duy nhất trong phạm vi một issuer.
-   **Không dùng `email` làm khóa chính.** Email có thể thay đổi, được
    tái sử dụng, hoặc chưa được xác minh (`email_verified` = false). Ở
    một số provider, người dùng có thể tự đặt giá trị email.
-   **Social/external login** (Google, Microsoft, GitHub...): lưu bảng
    external login gồm (`iss`/provider, `sub`, `user_id` nội bộ). Một
    user nội bộ có thể liên kết nhiều external login.
-   **Account linking:** Chỉ tự động liên kết theo email khi email đã
    được provider xác minh và provider đáng tin cho domain đó. Cách an
    toàn nhất là để người dùng đang đăng nhập chủ động liên kết thêm
    provider. Tự động liên kết theo email chưa xác minh có thể dẫn tới
    chiếm tài khoản (account takeover).
-   **Multi-tenant [Nice]:** Với IdP đa tenant (ví dụ Microsoft Entra
    ID), kiểm tra `iss`/`tid` thuộc danh sách tenant được phép; không
    mặc định chấp nhận mọi tenant.
-   **On-Behalf-Of / Token Exchange [Nice]:** Khi API cần gọi API
    downstream thay mặt người dùng; chỉ cần biết tên (xem phần nâng
    cao).

## 3.4. So sánh cần nắm vững

-   OAuth 2.0 vs OIDC.
-   Authentication vs delegated authorization.
-   Authorization Code vs Client Credentials.
-   Public client vs Confidential client.
-   Access Token vs ID Token vs Refresh Token.
-   JWT vs opaque token.
-   PKCE vs client secret.
-   `state` vs `nonce`.
-   Local logout vs federated logout.
-   OAuth 2.0 vs OAuth 2.1.
-   `iss` + `sub` vs `email` làm định danh người dùng.

## 3.5. Input trước module

-   Hoàn thành Module 01 và 02.
-   Hiểu HTTP redirect, query string, POST body, header.
-   Biết JWT và cách kiểm tra chữ ký/claims ở mức khái niệm.

## 3.6. Output sau module

**Deliverables bắt buộc:**

1.  Sơ đồ sequence Authorization Code + PKCE có đủ Client, Browser,
    Authorization Server và Resource Server. **(Core)**
2.  Sơ đồ Client Credentials cho service-to-service. **(Core)**
3.  Bảng so sánh OAuth 2.0 và OIDC, kèm một đoạn ngắn: OAuth 2.1 bắt
    buộc/loại bỏ gì và vì sao không dùng ROPC/Implicit cho thiết kế
    mới. **(Core)**
4.  Bổ sung bảng token và checklist validation từ Module 02 với phần ID
    token: `nonce`, `aud` = `client_id`, `azp`, issuer, thời hạn.
    **(Core)**
5.  Bảng giải thích `state`, `nonce`, PKCE và redirect URI validation:
    mỗi cơ chế chống lại tấn công nào. **(Core)**
6.  Thiết kế bảng lưu user/external login dựa trên `iss` + `sub`, kèm
    quy tắc account linking.

**Knowledge Check:** - OAuth có xác thực người dùng không? - OIDC thêm
những gì vào OAuth? - Vì sao SPA/native app cần PKCE? - `client_secret`
có thể giữ bí mật trong desktop app không? - API cần nhận ID token hay
access token? - `aud` của ID token và access token có thể khác nhau
không? - Client Credentials có đại diện cho user đang đăng nhập không? -
Nếu chữ ký JWT hợp lệ nhưng `aud` sai, API có nên chấp nhận không? - Vì
sao không dùng email làm khóa định danh người dùng? - OAuth 2.1 bắt buộc
và loại bỏ những gì?

**Tiêu chí hoàn thành:** Có thể vẽ và giải thích Authorization Code +
PKCE, Client Credentials, và mô tả cách client/API xác minh token mà
không nhầm vai trò của từng token.

------------------------------------------------------------------------

# Lab --- Hands-on OAuth/OIDC với ASP.NET Core

**Thời lượng: 2 giờ** (Core: 1.5 giờ, làm Lab 1--3)

## L.1. Mục tiêu

Biến các flow đã vẽ ở Module 03 thành hệ thống chạy được. Tập đọc
request, response và token thật thay vì chỉ học qua sơ đồ. Kết quả lab
cũng là demo cho buổi chia sẻ và là nguồn dữ liệu cho troubleshooting
guide ở Module 07.

## L.2. Input / Chuẩn bị

-   Hoàn thành Module 01--03.
-   .NET SDK (bản LTS hiện hành), Docker Desktop, IDE (Visual Studio /
    Rider / VS Code).
-   Một IdP để thực hành, chọn một trong hai:
    -   **Keycloak** chạy bằng Docker (chế độ dev):
        `docker run -p 8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak start-dev`
        (phiên bản cũ dùng `KEYCLOAK_ADMIN`/`KEYCLOAK_ADMIN_PASSWORD`).
    -   **Microsoft Entra ID**: tenant developer/test của tổ chức.
-   Công cụ: browser DevTools (tab Network, bật *Preserve log*),
    jwt.ms hoặc jwt.io, Postman/curl, Fiddler (tùy chọn), extension
    SAML-tracer (cho Lab 5).

> **Lưu ý bảo mật:** Không dán token của môi trường production vào công
> cụ decode online. Lab dùng HTTP và `RequireHttpsMetadata = false` chỉ
> cho localhost; production bắt buộc HTTPS.

## L.3. Các bài lab

### Lab 1 --- Cấu hình IdP (20 phút) [Must]

-   Tạo realm `demo`, một user test.
-   Tạo client public `demo-client`: Standard flow (Authorization
    Code), bật PKCE `S256`, redirect URI loopback (ví dụ
    `http://127.0.0.1:7890/`).
-   Tạo client scope `orders.read` và audience `demo-api` (trong
    Keycloak cần thêm *Audience mapper* để `aud` chứa `demo-api`).
-   Tạo client confidential `worker` bật *Service accounts* (Client
    Credentials).
-   Mở `/.well-known/openid-configuration` và JWKS URI; xác định
    issuer, các endpoint và `kid`.

### Lab 2 --- ASP.NET Core Web API xác minh JWT (30 phút) [Must]

``` csharp
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.Authority = "http://localhost:8080/realms/demo";
        o.Audience = "demo-api";
        o.RequireHttpsMetadata = false; // CHỈ dùng cho lab localhost
        o.MapInboundClaims = false;     // giữ nguyên tên claim: sub, scope...
    });

builder.Services.AddAuthorization(o =>
    o.AddPolicy("orders.read", p => p.RequireAssertion(ctx =>
        ctx.User.FindFirst("scope")?.Value
            .Split(' ').Contains("orders.read") == true)));

// ...
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/public", () => "ok");
app.MapGet("/me", (ClaimsPrincipal u) =>
        u.Claims.Select(c => new { c.Type, c.Value }))
   .RequireAuthorization();
app.MapGet("/orders", () => new[] { "order-1" })
   .RequireAuthorization("orders.read");
```

Tái hiện và ghi lại status code, header `WWW-Authenticate` và log cho
từng kịch bản:

1.  Không gửi token → 401.
2.  Token sai `aud` → 401.
3.  Token hết hạn → 401.
4.  Token hợp lệ nhưng thiếu scope `orders.read` → 403.
5.  Gửi ID token thay access token → bị từ chối (quan sát lý do).
6.  Bỏ `MapInboundClaims = false` → quan sát claim `sub` bị đổi tên.

### Lab 3 --- Client dùng Authorization Code + PKCE (30 phút) [Must]

-   Console app hoặc WPF dùng `Duende.IdentityModel.OidcClient` (trước
    đây là `IdentityModel.OidcClient`) với system browser và loopback
    redirect; hoặc **MSAL.NET** nếu dùng Entra ID.
-   Dùng DevTools/Fiddler ghi lại: authorization request
    (`code_challenge`, `state`, `nonce`), callback (`code`, `state`),
    token response.
-   Decode ID token và access token; so sánh `aud`, `azp`, `nonce`,
    `scope`.
-   Gọi `/me` và `/orders` bằng access token.

### Lab 4 --- Client Credentials, refresh, introspection (20 phút) [Should]

-   Dùng curl/Postman gọi token endpoint với
    `grant_type=client_credentials` cho client `worker`; gọi API; quan
    sát token không có người dùng thật.
-   Bật refresh token rotation trên IdP; dùng lại refresh token cũ để
    quan sát reuse detection.
-   Gọi introspection endpoint và revocation endpoint.

### Lab 5 --- Đọc SAML Response (20 phút) [Nice]

-   Cấu hình Keycloak làm SAML IdP cho một SAML test SP, hoặc dùng một
    SAML test IdP/SP công khai.
-   Dùng SAML-tracer bắt AuthnRequest và Response; chú giải Issuer,
    NameID, Audience, Conditions, `InResponseTo`, Destination.

## L.4. Output sau Lab

**Deliverables bắt buộc:**

1.  Repo demo chạy được (API + client) kèm README hướng dẫn chạy.
    **(Core)**
2.  Bảng "kịch bản lỗi → status code → `WWW-Authenticate`/log → nguyên
    nhân" cho tối thiểu 5 kịch bản ở Lab 2. **(Core)**
3.  Ghi chú/ảnh chụp request--response của Authorization Code + PKCE.
    **(Core)**
4.  Kết quả Lab 4 và Lab 5 (lộ trình Full).

**Knowledge Check:** - Vì sao `MapInboundClaims = false` giúp tránh lỗi
policy? - API trả 401 hay 403 khi token hợp lệ nhưng thiếu scope? - API
lấy public key để xác minh chữ ký ở đâu, khi nào làm mới? - Vì sao ID
token bị API từ chối dù chữ ký hợp lệ?

**Tiêu chí hoàn thành:** Demo được login → gọi API thành công, tái hiện
được ít nhất 3 lỗi khác nhau và giải thích nguyên nhân từ log/header.

------------------------------------------------------------------------

# Module 04 --- SAML 2.0 & Enterprise SSO

**Thời lượng: 1.5 giờ** (Core: 45 phút, tập trung SP-initiated flow
và checklist validation)

## 4.1. Mục tiêu

Hiểu SAML 2.0 ở mức kiến trúc và luồng SSO doanh nghiệp; biết đọc các
thành phần trong SAML Response/Assertion và phân biệt với OIDC.

## 4.2. Nội dung cần học

### A. SAML là gì?

SAML 2.0 là chuẩn dựa trên XML để trao đổi authentication/attribute
assertions giữa các security domain. Thường được dùng trong Enterprise
SSO, đặc biệt với ứng dụng SaaS và hệ thống doanh nghiệp.

Ghi chú [Nice]: Hệ thống .NET cũ có thể dùng **WS-Federation** (thường đi
cùng ADFS), một giao thức federation dựa trên XML của Microsoft. Chỉ cần
nhận biết tên khi gặp trong hệ thống legacy.

### B. Thành phần

-   **Identity Provider (IdP):** Xác thực người dùng và phát hành SAML
    assertion/response.
-   **Service Provider (SP):** Ứng dụng nhận và xác minh SAML response.
-   **Metadata:** Mô tả entity ID, endpoint, certificate và binding.
-   **Assertion:** Tuyên bố về subject, authentication và/hoặc
    attributes.
-   **NameID:** Định danh subject theo format/chính sách.
-   **Issuer:** Bên phát hành assertion/response.
-   **Audience:** Đối tượng được phép nhận assertion.
-   **Destination / Recipient / ACS URL:** Các trường liên quan đến
    endpoint nhận response.
-   **Conditions:** Điều kiện hiệu lực, thời gian và audience
    restriction.

### C. Thành phần của SAML Assertion

Nắm các nhóm statement: - Authentication Statement. - Attribute
Statement. - Authorization Decision Statement (ít gặp trong triển khai
SSO phổ biến).

Phân biệt: - SAML Response là message bao ngoài. - Assertion là nội dung
tuyên bố bên trong; không nên coi hai khái niệm là một.

### D. SSO flow

**SP-initiated SSO:** 1. User truy cập ứng dụng SP. 2. SP tạo
AuthnRequest và chuyển browser tới IdP. 3. IdP xác thực user. 4. IdP gửi
SAML Response về Assertion Consumer Service (ACS) của SP qua browser. 5.
SP xác minh response/assertion và tạo local session.

**IdP-initiated SSO:** 1. User bắt đầu từ portal/IdP. 2. IdP gửi
unsolicited SAML response tới SP. 3. SP xác minh và tạo session theo
chính sách.

Biết rằng IdP-initiated flow có các rủi ro/cân nhắc bảo mật riêng; không
mặc định an toàn như SP-initiated.

### E. Binding và protocol

-   HTTP Redirect Binding.
-   HTTP POST Binding.
-   Single Logout (SLO) ở mức khái niệm.
-   AuthnRequest, Response, Assertion.
-   XML Signature và canonicalization ở mức nhận biết.

### F. Kiểm tra bảo mật SAML

Khi xác minh SAML response/assertion, cần quan tâm: - Chữ ký hợp lệ và
certificate đúng trust configuration. - Issuer đúng IdP đã tin cậy. -
Audience restriction đúng SP. - Destination/Recipient/ACS đúng
endpoint. - `InResponseTo` phù hợp request nếu là SP-initiated. -
Conditions và thời gian hiệu lực hợp lệ. - Chống replay và xử lý
assertion đã dùng. - XML parser an toàn; phòng tránh XML External Entity
(XXE). - Tránh lỗi signature wrapping; dùng thư viện SAML trưởng thành,
không tự parse/validate XML security bằng code tùy tiện.

## 4.3. So sánh OIDC và SAML

  -----------------------------------------------------------------------
  Tiêu chí                OIDC                    SAML 2.0
  ----------------------- ----------------------- -----------------------
  Định dạng chính         JSON/JWT                XML

  Mô hình                 OAuth 2.0-based         Assertion-based
                          identity layer          federation

  Phổ biến                Web, mobile, API,       Enterprise SSO, SaaS,
                          modern apps             legacy enterprise

  Token/assertion         ID Token, access token  SAML Assertion/Response

  Tích hợp                Thường thuận tiện cho   Thường gặp ở enterprise
                          API/mobile              federation

  Bảo mật                 TLS, token signature,   XML signature, trust
                          PKCE và validation      metadata, assertion
                                                  validation
  -----------------------------------------------------------------------

Không kết luận một chuẩn luôn an toàn hơn chuẩn kia; lựa chọn dựa trên
hệ sinh thái, khả năng tương thích và yêu cầu tổ chức.

## 4.4. Input trước module

-   Hoàn thành Module 01--03.
-   Hiểu public-key signature, certificate và trust.
-   Có khái niệm về redirect và browser-based login.

## 4.5. Output sau module

**Deliverables bắt buộc:**

1.  Sơ đồ sequence SP-initiated SAML SSO, kèm ghi chú điểm khác biệt và
    rủi ro của IdP-initiated. **(Core)**
2.  Bản chú giải SAML Response/Assertion: Issuer, Subject/NameID,
    Audience, Conditions, ACS, `InResponseTo`. **(Core)**
3.  Checklist validation SAML response/assertion. **(Core)**

So sánh OIDC và SAML không làm thành deliverable riêng; nội dung này
được đưa vào decision matrix ở Module 07.

**Knowledge Check:** - IdP và SP khác nhau thế nào? - Response khác
Assertion thế nào? - ACS URL có vai trò gì? - Audience restriction bảo
vệ điều gì? - Vì sao phải kiểm tra `InResponseTo`? - Vì sao không nên tự
viết XML signature validation?

**Tiêu chí hoàn thành:** Có thể giải thích SAML SSO bằng sơ đồ và chỉ ra
các kiểm tra quan trọng trước khi SP tạo session.

------------------------------------------------------------------------

# Module 05 --- Enterprise Authentication & Passwordless

**Thời lượng: 1.5 giờ** (Core: 45 phút, chỉ học mục [Must]: LDAP vs AD,
Kerberos tổng quan, WebAuthn/passkey)

## 5.1. Mục tiêu

Nhận diện các công nghệ xác thực thường gặp trong hạ tầng doanh nghiệp
và hiểu cơ chế passwordless hiện đại. Trọng tâm là biết công nghệ giải
quyết vấn đề nào và chúng liên quan với nhau ra sao.

## 5.2. Enterprise identity và directory

### A. LDAP [Must]

-   Lightweight Directory Access Protocol.
-   Giao thức truy vấn và thao tác với directory service.
-   Dữ liệu thường tổ chức theo cây directory information tree.
-   Các khái niệm: DN, RDN, entry, attribute, object class, bind,
    search.
-   LDAP là giao thức truy cập directory; không đồng nghĩa với Active
    Directory và không phải tự thân là một SSO protocol.
-   Phân biệt LDAP thường và LDAP qua TLS/StartTLS; không gửi credential
    qua kết nối không được bảo vệ.

### B. Active Directory (AD) [Must]

-   Dịch vụ directory của Microsoft trong môi trường Windows domain.
-   Lưu trữ users, computers, groups, policies và các đối tượng domain.
-   Có thể hỗ trợ LDAP, Kerberos và các cơ chế khác.
-   AD không đồng nghĩa với LDAP; LDAP là một trong các giao thức có thể
    dùng để truy cập AD.

### C. Kerberos [Must: tổng quan / Should: chi tiết]

-   Network authentication protocol dựa trên tickets và trusted Key
    Distribution Center (KDC).
-   Thành phần khái niệm: Client, Authentication Server (AS), Ticket
    Granting Server (TGS), Service Server.
-   **Lưu ý thuật ngữ:** AS trong Kerberos là *Authentication Server*,
    khác hoàn toàn với *Authorization Server* (cũng viết tắt AS) trong
    OAuth.
-   Ticket Granting Ticket (TGT), service ticket.
-   Hỗ trợ mutual authentication theo cơ chế giao thức.
-   Thường gặp trong Windows domain và môi trường enterprise.
-   Quan tâm time synchronization, SPN, DNS, ticket lifetime và
    delegation ở mức nhận biết.

### D. NTLM [Nice]

-   Họ cơ chế challenge-response authentication cũ trong hệ sinh thái
    Windows.
-   Có thể xuất hiện vì tương thích ngược.
-   Kém ưu tiên hơn Kerberos trong môi trường domain hiện đại; cần hạn
    chế và quản trị theo chính sách.
-   Không nhầm NTLM với LDAP hoặc Kerberos.

### E. RADIUS và TACACS+ [Nice]

-   Dùng trong quản trị truy cập mạng/thiết bị, ví dụ Wi-Fi enterprise,
    VPN, network access.
-   RADIUS thường kết hợp authentication và authorization, accounting;
    hay gặp trong Network Access Server.
-   TACACS+ thường gặp trong quản trị thiết bị mạng và tách biệt rõ hơn
    các chức năng AAA.
-   Không phải lựa chọn thay thế trực tiếp cho OIDC trong đăng nhập ứng
    dụng Web thông thường.

### F. AAA

-   Authentication: xác minh danh tính.
-   Authorization: quyết định quyền.
-   Accounting: ghi nhận hoạt động.
-   AAA là mô hình chức năng, không phải một giao thức đơn lẻ.

### G. Certificate-based / Smart card authentication [Nice]

-   Người dùng hoặc thiết bị xác thực bằng chứng thư X.509 và private
    key, ví dụ smart card, client certificate qua mTLS, hoặc
    certificate-based authentication trên Entra ID.
-   Thường gặp trong môi trường chính phủ, ngân hàng và thiết bị được
    quản lý. Cần PKI, quy trình cấp phát và thu hồi chứng thư.

## 5.3. Passwordless: FIDO2, WebAuthn, CTAP, Passkeys

### A. Các thành phần

-   **FIDO2:** Bộ tiêu chuẩn xác thực không mật khẩu gồm WebAuthn và
    CTAP.
-   **WebAuthn:** API/chuẩn Web cho website tương tác với authenticator.
-   **CTAP:** Giao thức giữa client platform và roaming authenticator
    (ví dụ security key).
-   **Authenticator:** Thiết bị/phần mềm tạo và giữ credential key pair.
-   **Relying Party (RP):** Website/app đăng ký và xác minh credential.
-   **Passkey:** Credential FIDO có thể đồng bộ giữa các thiết bị hoặc
    gắn với thiết bị, tùy hệ sinh thái.
-   **Platform authenticator:** Authenticator tích hợp trong thiết bị.
-   **Roaming authenticator:** Authenticator rời như security key.

### B. Cơ chế cơ bản

**Registration:** 1. RP tạo challenge. 2. Browser/platform gọi WebAuthn.
3. Authenticator tạo key pair cho RP. 4. Private key được giữ trong
authenticator; RP lưu public key và credential metadata cần thiết. 5. RP
xác minh attestation/registration response theo policy.

**Authentication:** 1. RP tạo challenge mới. 2. Authenticator yêu cầu
user verification hoặc user presence theo policy. 3. Authenticator ký dữ
liệu liên quan bằng private key. 4. RP kiểm tra challenge, origin, RP ID
hash, chữ ký và các flags liên quan. 5. RP xác định credential/subject
đã đăng ký.

### C. Các thuộc tính bảo mật cần hiểu

-   Challenge phải mới, ngẫu nhiên và chỉ dùng một lần.
-   Kiểm tra origin và RP ID.
-   Chữ ký được xác minh bằng public key đã lưu.
-   User Presence và User Verification là hai khái niệm khác nhau.
-   Sinh trắc học thường được xử lý cục bộ trên thiết bị; server nhận
    bằng chứng mật mã, không cần nhận ảnh/vân tay.
-   Phishing resistance: credential được ràng buộc với RP/origin, giúp
    chống phishing tốt hơn mật khẩu/OTP truyền thống.
-   Đồng bộ passkey có mô hình trust và recovery riêng; cần hiểu chính
    sách thiết bị, backup và account recovery.

### D. So sánh

-   FIDO2/WebAuthn vs OIDC: WebAuthn là cơ chế xác thực public-key tại
    RP; OIDC là giao thức federation/identity layer. Chúng có thể kết
    hợp.
-   Passkey vs OTP: passkey dựa trên public-key credential; OTP dựa trên
    mã dùng một lần.
-   Windows Hello có thể làm platform authenticator, nhưng không phải
    mọi tình huống Windows Hello đều đồng nghĩa cùng một mô hình triển
    khai WebAuthn.

## 5.4. Input trước module

-   Hoàn thành Module 01--04.
-   Hiểu public/private key, signature, certificate và
    challenge-response.
-   Có kiến thức cơ bản về Windows domain hoặc directory service là lợi
    thế.

## 5.5. Output sau module

**Deliverables bắt buộc:**

1.  Bảng phân biệt LDAP, AD, Kerberos, NTLM, RADIUS, TACACS+. Mỗi công
    nghệ một dòng: là gì, dùng khi nào, *không phải* là gì (bao gồm vì
    sao LDAP không tương đương OIDC). **(Core)**
2.  Sơ đồ Kerberos ở mức AS → TGT → TGS → Service Ticket.
3.  Sơ đồ WebAuthn registration và authentication. **(Core)**
4.  Bảng so sánh password, OTP và passkey. **(Core)**

Use case "khi nào doanh nghiệp dùng Kerberos, RADIUS, SAML/OIDC hoặc
FIDO2" được đưa vào decision matrix ở Module 07.

**Knowledge Check:** - LDAP khác Active Directory thế nào? - Kerberos sử
dụng ticket để làm gì? - TGT khác service ticket thế nào? - RADIUS
thường được dùng trong trường hợp nào? - WebAuthn lưu private key ở
đâu? - Vì sao WebAuthn có khả năng chống phishing tốt hơn
password/OTP? - User Presence khác User Verification thế nào?

**Tiêu chí hoàn thành:** Có thể phân loại các công nghệ theo use case và
giải thích luồng Kerberos/WebAuthn ở mức tổng quan.

------------------------------------------------------------------------

# Module 06 --- Authorization & Authentication Security

**Thời lượng: 2 giờ** (Core: 1.5 giờ, đọc lướt ABAC/ACL/ReBAC)

## 6.1. Mục tiêu

Hiểu authorization là lớp quyết định quyền độc lập với authentication;
nhận diện các lỗi thiết kế và cấu hình bảo mật phổ biến trong hệ thống
xác thực.

## 6.2. Authorization models

### A. Permission, Role, Policy

-   **Permission:** Quyền thực hiện hành động trên tài nguyên.
-   **Role:** Tập hợp permission gán cho người dùng hoặc nhóm.
-   **Policy:** Quy tắc quyết định cho phép/từ chối dựa trên subject,
    action, resource và context.
-   **Scope:** Phạm vi quyền mà client được cấp trong OAuth; không tự
    động thay thế authorization nghiệp vụ bên trong API.
-   **Claim:** Thông tin được mang trong token/assertion; không phải
    claim nào cũng là quyền.

### B. RBAC --- Role-Based Access Control

-   Quyền gắn với role; user được gán role.
-   Ví dụ: Admin, Manager, Employee.
-   Ưu điểm: dễ quản lý trong hệ thống có cơ cấu vai trò rõ.
-   Nhược điểm: role explosion, khó biểu diễn điều kiện theo context
    hoặc từng tài nguyên.

### C. ABAC --- Attribute-Based Access Control

-   Quyết định dựa trên thuộc tính subject, resource, action và
    environment.
-   Ví dụ: nhân viên chỉ xem hồ sơ thuộc phòng ban mình, trong giờ làm
    việc.
-   Linh hoạt nhưng policy phức tạp hơn.

### D. ACL --- Access Control List

-   Danh sách quyền gắn trực tiếp với tài nguyên/chủ thể.
-   Ví dụ: user A được đọc file X; nhóm B được sửa folder Y.
-   Phù hợp khi quyền theo từng resource cụ thể.

### E. ReBAC và policy-based access

-   **ReBAC:** Quyền dựa trên quan hệ giữa các thực thể, ví dụ owner,
    member, manager.
-   **Policy-based:** Quyết định theo policy tập trung, có thể phối hợp
    RBAC/ABAC/ReBAC.
-   Chỉ cần nhận diện use case, không cần đào sâu engine trong lộ trình
    15 giờ.

### F. Authorization trong API

-   Authentication middleware xác minh token.
-   Authorization policy kiểm tra role, claim, scope, resource ownership
    và business rule.
-   Không chỉ ẩn nút trên UI; API phải tự kiểm tra quyền.
-   Áp dụng least privilege và deny by default.
-   Phân biệt coarse-grained authorization (role/scope) và fine-grained
    authorization (resource/business policy).

## 6.3. Threats và rủi ro phổ biến

Hiểu mục tiêu, dấu hiệu và biện pháp phòng vệ:

-   **Brute force:** Thử nhiều credential; phòng vệ bằng rate limit,
    lockout/risk controls phù hợp, MFA.
-   **Credential stuffing:** Dùng credential bị lộ từ dịch vụ khác;
    phòng vệ bằng MFA/passkey, phát hiện bất thường, chống mật khẩu tái
    sử dụng.
-   **Phishing:** Lừa người dùng cung cấp credential/OTP; ưu tiên
    phishing-resistant authentication như FIDO2.
-   **Replay attack:** Phát lại thông điệp/credential đã bắt được; dùng
    nonce/challenge, timestamp, token lifetime và cơ chế chống replay
    phù hợp.
-   **Session hijacking:** Chiếm quyền session; bảo vệ cookie, TLS, hạn
    chế XSS, rotate session ID sau login/privilege change.
-   **CSRF:** Lợi dụng browser tự gửi cookie; SameSite, anti-CSRF token,
    Origin/Referer checks phù hợp.
-   **XSS:** Chạy script độc hại trong origin; output encoding, CSP,
    sanitization phù hợp, tránh lưu token nhạy cảm trong nơi JavaScript
    dễ đọc.
-   **Token theft/leakage:** Lộ token qua log, URL, storage, telemetry;
    không log token, hạn chế lifetime, secure storage, TLS.
-   **MITM:** Can thiệp đường truyền; TLS đúng cấu hình và kiểm tra
    certificate.
-   **Open redirect / redirect URI abuse:** Chuyển authorization
    response tới endpoint không tin cậy; allowlist redirect URI chính
    xác.
-   **JWT algorithm/key confusion và validation flaws:** Chỉ cho phép
    thuật toán phù hợp, xác minh chữ ký và claims bằng thư viện chuẩn.
-   **Account enumeration:** Lộ việc account tồn tại; thông báo lỗi và
    rate limit hợp lý.
-   **Recovery flow weakness:** Quy trình reset/recovery yếu có thể phá
    vỡ toàn bộ bảo vệ login.
-   **Session fixation:** Kẻ tấn công cài sẵn session ID cho nạn nhân
    trước khi đăng nhập; phòng vệ bằng cấp session ID mới sau login.
-   **SIM swap / chặn SMS:** Chiếm số điện thoại để nhận OTP; SMS OTP là
    yếu tố yếu, chỉ nên dùng khi không có lựa chọn tốt hơn.
-   **MFA fatigue (push bombing):** Gửi liên tục yêu cầu push đến khi
    người dùng bấm chấp nhận; phòng vệ bằng number matching, hiển thị
    ngữ cảnh đăng nhập, giới hạn số lần push.
-   **AiTM phishing (Adversary-in-the-Middle):** Trang phishing hoạt
    động như reverse proxy, chuyển tiếp đăng nhập tới trang thật và
    đánh cắp session cookie *sau khi* người dùng đã hoàn tất MFA. OTP
    và push **không** chống được kiểu tấn công này. FIDO2/passkey chống
    được vì chữ ký gắn với origin thật. Biện pháp bổ sung: conditional
    access, ràng buộc session/token với thiết bị, phát hiện đăng nhập
    bất thường.

### 6.3.1. Mật khẩu theo NIST SP 800-63B [Should]

-   Ưu tiên **độ dài** hơn quy tắc phức tạp: tối thiểu 15 ký tự khi mật
    khẩu là yếu tố duy nhất (tối thiểu 8 khi là một phần của MFA); cho
    phép tối thiểu 64 ký tự, khoảng trắng và ký tự Unicode.
-   Không bắt buộc quy tắc kiểu "phải có chữ hoa, số, ký tự đặc biệt".
-   Không bắt đổi mật khẩu định kỳ; chỉ bắt đổi khi có dấu hiệu bị lộ.
-   Kiểm tra mật khẩu mới với danh sách mật khẩu phổ biến/đã bị lộ.
-   Không dùng câu hỏi bảo mật hoặc gợi ý mật khẩu.
-   Cho phép paste và password manager.
-   Giới hạn số lần thử sai (rate limiting).

### 6.3.2. Token storage trong browser [Must]

| Nơi lưu | Rủi ro XSS | Rủi ro CSRF | Ghi chú |
|---------|------------|-------------|---------|
| `localStorage` / `sessionStorage` | Cao: script đọc và gửi token ra ngoài được | Thấp | Đơn giản nhưng mất token nếu có XSS |
| Memory (biến JavaScript) | Trung bình: XSS vẫn gọi API được khi trang đang mở, nhưng khó lấy token dùng lâu dài | Thấp | Mất khi reload, cần cơ chế làm mới token |
| Cookie `HttpOnly` + `Secure` + `SameSite` | Thấp hơn: JS không đọc được, nhưng XSS vẫn gửi request được | Cần chống CSRF | Phù hợp khi frontend và API cùng site |
| BFF (token giữ ở server, browser chỉ có session cookie) | Thấp nhất | Cần chống CSRF | Khuyến nghị cho SPA xử lý dữ liệu nhạy cảm |

Không có nơi lưu nào miễn nhiễm hoàn toàn với XSS. XSS phải được ngăn
chặn từ gốc; cách lưu token chỉ giới hạn mức thiệt hại.

Không cần thực hành tấn công. Tập trung nhận diện rủi ro và thiết kế
phòng vệ.

## 6.4. Security best practices

-   Bật MFA; ưu tiên phishing-resistant MFA/passkey khi khả thi.
-   Dùng Authorization Code + PKCE cho public clients.
-   Không nhúng client secret trong desktop/mobile/SPA.
-   Bảo vệ redirect URI, `state`, `nonce`.
-   Xác minh issuer, audience, signature, expiration và token type.
-   Access token lifetime phù hợp; quản lý refresh token và
    rotation/reuse detection.
-   Không đưa token vào URL, log, source control hoặc error message.
-   Dùng HTTPS/TLS; cookie cần `Secure`, `HttpOnly`, `SameSite` phù hợp.
-   Chống CSRF/XSS; hiểu token storage trade-off (xem 6.3.2).
-   Chính sách mật khẩu theo NIST SP 800-63B (xem 6.3.1); SMS OTP chỉ là
    lựa chọn dự phòng.
-   Least privilege, deny by default, kiểm tra quyền ở server.
-   Có audit log nhưng không ghi credential, access token, refresh token
    hoặc dữ liệu nhạy cảm.
-   Có quy trình account recovery, revoke session/token, xử lý mất thiết
    bị và offboarding.
-   Quản lý signing keys/certificates, rotation, expiration và secret
    storage.

## 6.5. Input trước module

-   Hoàn thành Module 01--05.
-   Hiểu token, session, claims, scope và flow OAuth/OIDC.
-   Có khái niệm về API middleware và role/permission.

## 6.6. Output sau module

**Deliverables bắt buộc:**

1.  Bảng so sánh RBAC, ABAC, ACL, ReBAC.
2.  Một ví dụ authorization policy cho API; có thể mở rộng từ code ở
    Lab 2. **(Core)**
3.  Threat model đơn giản cho chức năng login và gọi API, có phishing/
    AiTM, token theft và CSRF/XSS. **(Core)**
4.  Security checklist **master** cho authentication/token/session/
    password, gộp các checklist từ Module 02--03 thay vì làm riêng lẻ.
    **(Core)**
5.  Phân tích ít nhất 5 tình huống: token hết hạn, sai audience, CSRF,
    refresh token reuse, user đã login nhưng thiếu quyền. Nhiều tình
    huống đã được tái hiện ở Lab. **(Core)**

**Knowledge Check:** - Authentication thành công nhưng API trả 403 là có
thể hợp lý không? - Scope khác role thế nào? - Vì sao ẩn nút trên UI
không đủ để bảo vệ API? - Vì sao public client không thể giữ client
secret? - Cookie `HttpOnly` giúp gì và không giúp gì? - CSRF và XSS khác
nhau thế nào? - Vì sao access token cần có audience phù hợp? - Vì sao
OTP/push không chống được AiTM phishing nhưng passkey thì có? - Lưu
access token trong `localStorage` có rủi ro gì? - Vì sao NIST không
khuyến nghị bắt đổi mật khẩu định kỳ?

**Tiêu chí hoàn thành:** Có thể phân tích một request từ lúc xác minh
token đến lúc quyết định authorization, đồng thời đưa ra biện pháp giảm
thiểu các rủi ro phổ biến.

------------------------------------------------------------------------

# Module 07 --- Authentication Architecture & Practical Cases

**Thời lượng: 2 giờ** (Core: 45 phút, gồm 7.2, 7.3 B/C/E, 7.4 và
deliverable 1--2)

## 7.1. Mục tiêu

Kết nối kiến thức giao thức với kiến trúc thực tế; biết chọn giải pháp
theo loại client, resource, trust boundary và yêu cầu doanh nghiệp. Đây
là module tổng hợp để chuẩn bị chia sẻ cho team.

## 7.2. Quy trình thiết kế

Khi thiết kế authentication, trả lời lần lượt:

1.  Ai là subject cần xác thực: user, administrator, service, device hay
    workload?
2.  Client là gì: server-side web, SPA, desktop, mobile, CLI hay
    service?
3.  Resource nào cần bảo vệ: web app, REST API, database, network hay
    thiết bị?
4.  Có cần SSO/federation với tổ chức khác không?
5.  Có yêu cầu MFA, passwordless, phishing resistance không?
6.  Có cần delegated access tới API thay mặt user không?
7.  Token/session được lưu ở đâu và vòng đời ra sao?
8.  Authorization được quyết định ở đâu?
9.  Cần audit, provisioning, deprovisioning và account recovery thế nào?
10. Cách xử lý logout, revoke, key rotation và incident ra sao?

## 7.3. Kiến trúc theo loại ứng dụng

### A. Server-side Web Application

-   OIDC Authorization Code Flow.
-   Backend xử lý code exchange và giữ client secret ở server nếu là
    confidential client.
-   Backend có thể tạo application session và dùng cookie bảo vệ.
-   Cần CSRF protection, cookie settings và session lifecycle.
-   API downstream có thể dùng access token riêng.

### B. SPA

-   Authorization Code + PKCE.
-   Không có client secret có thể giữ bí mật.
-   Cân nhắc BFF (Backend for Frontend) để giảm token exposure trong
    browser và dùng cookie/session phía server.
-   Nếu SPA gọi API trực tiếp, cần thiết kế token storage, CORS, XSS và
    refresh-token policy cẩn thận.
-   CORS không phải cơ chế authentication hoặc authorization.

### C. Desktop / Native Application

-   Dùng external/system browser cho authorization flow khi có thể.
-   Authorization Code + PKCE.
-   Không nhúng client secret như thể nó là bí mật.
-   Dùng redirect URI phù hợp (loopback/custom URI theo platform và
    hướng dẫn nhà cung cấp).
-   Lưu token bằng secure OS storage; hạn chế token lifetime và quyền.
-   API xác minh access token; authorization vẫn thực hiện ở API.

### D. Mobile Application

-   Authorization Code + PKCE.
-   Dùng system browser hoặc secure browser session theo
    platform/provider guidance.
-   Secure storage cho token; không hardcode secret.
-   Có quy trình revoke và mất thiết bị.

### E. Service-to-Service / Microservices

-   Client Credentials hoặc workload identity phù hợp.
-   Mỗi service có identity riêng; least privilege.
-   Quản lý secret/certificate bằng secret manager hoặc workload
    identity.
-   Xác minh audience và scope ở resource server.
-   mTLS có thể bổ sung xác thực ở tầng kết nối; không tự động thay thế
    authorization nghiệp vụ.
-   Tránh dùng chung một client credential cho toàn bộ hệ thống.

### F. Windows Domain / Enterprise Network

-   AD + Kerberos cho Windows domain authentication trong các tình huống
    phù hợp.
-   LDAP/LDAPS để truy vấn directory.
-   RADIUS/TACACS+ cho network access/device administration.
-   SAML/OIDC cho federation tới ứng dụng.
-   FIDO2/passkey/MFA để tăng cường đăng nhập người dùng.

### G. Provisioning, deprovisioning và offboarding [Should]

-   **JIT (Just-in-Time) provisioning:** Ứng dụng tạo account khi người
    dùng đăng nhập SSO lần đầu, dựa trên claims/attributes. Đơn giản,
    nhưng ứng dụng không biết khi nào người dùng nghỉ việc.
-   **SCIM 2.0 (RFC 7643/7644):** IdP chủ động đẩy thao tác tạo, cập
    nhật, vô hiệu hóa user/group sang ứng dụng, nên offboarding gần như
    tức thời.
-   **Offboarding:** Vô hiệu hóa tài khoản ở IdP chỉ chặn được đăng nhập
    mới; session và refresh token hiện có vẫn còn hiệu lực. Cần thêm:
    revoke session/refresh token, access token ngắn hạn, và cơ chế
    đánh giá liên tục nếu IdP hỗ trợ (ví dụ Continuous Access
    Evaluation).

## 7.4. Ví dụ tổng hợp: WPF + ASP.NET Core Web API

Một kiến trúc tham khảo:

``` text
                 +----------------------+
                 | Identity Provider    |
                 | OIDC / Authorization |
                 | Server               |
                 +----------+-----------+
                            ^
                            | Authorization Code + PKCE
                            | qua system browser
                            |
+----------------+          |
| WPF Desktop    +----------+
| Public Client  |
+-------+--------+
        |
        | Access Token
        v
+----------------------+
| ASP.NET Core Web API |
| JWT Bearer validation|
+----------+-----------+
           |
           | Authorization policy
           v
+----------------------+
| Business Resources   |
| Services / Database  |
+----------------------+
```

Điểm cần giải thích: - WPF là public client; không thể bảo vệ client
secret nhúng trong ứng dụng. - Dùng Authorization Code + PKCE. - ID
token phục vụ client xác nhận kết quả đăng nhập; access token dùng để
gọi API. - API xác minh chữ ký, issuer, audience, expiration và các điều
kiện cần thiết. - API thực hiện authorization dựa trên scope/role/policy
và business rules. - Không tin role/permission do UI tự gửi lên. - Token
storage cần dùng cơ chế bảo vệ phù hợp với OS. - Cần có logout,
refresh/revoke, xử lý token hết hạn và audit.

## 7.5. Các case study nên phân tích

  ------------------------------------------------------------------------
  Tình huống              Giải pháp thường cân     Lý do
                          nhắc                     
  ----------------------- ------------------------ -----------------------
  Nhân viên đăng nhập     SAML hoặc OIDC           SSO giữa IdP và các ứng
  nhiều SaaS bằng tài     federation               dụng
  khoản công ty                                    

  SPA/native app gọi API  OIDC + Authorization     Authentication và
  thay mặt user           Code + PKCE              delegated API access

  Service gọi service     OAuth Client Credentials Machine identity
  không có user           hoặc workload identity   

  Windows domain          Kerberos (AD)            Domain authentication
  integrated                                       
  authentication                                   

  Website muốn            WebAuthn/FIDO2/Passkey   Public-key credential
  passwordless chống                               gắn với RP
  phishing                                         

  Wi-Fi/VPN enterprise    RADIUS/EAP tùy kiến trúc Network access control
  authentication                                   

  API cần phân quyền theo RBAC kết hợp ABAC/ReBAC  Role và
  ownership và department                          context/resource
                                                   relationship
  ------------------------------------------------------------------------

Case study bổ sung:

| Tình huống | Giải pháp thường cân nhắc | Lý do |
|------------|---------------------------|-------|
| Website B2C cho đăng nhập bằng Google/Microsoft | OIDC social login + bảng external login theo `iss` + `sub` | Không phải tự quản lý mật khẩu; cần quy tắc account linking an toàn |
| Đối tác gọi public API lấy dữ liệu, có quota | API key; hoặc Client Credentials nếu cần scope và token ngắn hạn | Định danh ứng dụng, metering đơn giản |
| Nhân viên nghỉ việc phải mất quyền ngay | SCIM + revoke session/refresh token + access token ngắn hạn | Offboarding không chỉ là chặn đăng nhập mới |

Các lựa chọn trong bảng là hướng tham khảo; quyết định thực tế còn phụ
thuộc IdP, hệ sinh thái, compliance và khả năng tương thích.

## 7.6. Troubleshooting checklist

### OIDC/OAuth

-   Redirect URI có khớp tuyệt đối không?
-   `state` có được giữ và kiểm tra không?
-   PKCE verifier có khớp challenge không?
-   Client có dùng đúng issuer/tenant không?
-   Token có hết hạn chưa?
-   `aud` có đúng API không?
-   Signing key/JWKS có được cập nhật không?
-   Scope có được cấp và API có yêu cầu đúng scope không?
-   Clock giữa các hệ thống có lệch đáng kể không?
-   CORS có bị nhầm với authentication không?
-   Có gửi nhầm ID token thay vì access token tới API không?
-   Header `WWW-Authenticate` của response 401 báo lỗi gì?
-   (.NET) Claim có bị đổi tên do inbound claim mapping (`sub` →
    `.../nameidentifier`) khiến policy không khớp không?

### SAML

-   Entity ID/metadata có khớp không?
-   ACS URL có đúng không?
-   Certificate ký còn hiệu lực và đúng trust configuration không?
-   Issuer, audience, recipient, destination có đúng không?
-   Conditions/time window có hợp lệ không?
-   `InResponseTo` có khớp request không?
-   Đồng hồ hệ thống có lệch không?

### API authorization

-   Authentication middleware đã chạy chưa?
-   Token hợp lệ nhưng thiếu scope/role?
-   Policy có đúng scheme/claim type không?
-   Resource ownership/business rule có được kiểm tra?
-   Có nhầm 401 (chưa xác thực/credential không hợp lệ) với 403 (đã xác
    thực nhưng không đủ quyền) không?

## 7.7. Input trước module

-   Hoàn thành Module 01--06.
-   Chọn một kiến trúc thực tế của team hoặc một case study giả định.
-   Có thể vẽ sequence diagram hoặc component diagram cơ bản.

## 7.8. Output sau module

**Deliverables bắt buộc:**

1.  Decision matrix lựa chọn OIDC, SAML, Kerberos, FIDO2, RADIUS, API
    key theo use case. Gộp luôn so sánh OIDC vs SAML (Module 04) và use
    case enterprise (Module 05). **(Core)**
2.  Một architecture diagram cho ứng dụng Web hoặc Desktop + API (nên
    dựa trên repo Lab), kèm sequence diagram login và gọi API.
    **(Core)**
3.  Troubleshooting guide gồm ít nhất 10 lỗi thường gặp, xây dựng từ
    bảng lỗi ở Lab.
4.  Bổ sung vào security checklist master (Module 06) các mục riêng của
    kiến trúc: BFF, CORS, mTLS, key rotation, secret management.

Slide/bài trình bày không thuộc deliverable của module này; xem mục 9
(thời gian chuẩn bị tính riêng).

**Knowledge Check:** - Chọn flow nào cho WPF desktop app? Vì sao? - Có
nên nhúng client secret vào WPF không? - Vì sao API không nên nhận ID
token làm access token? - Khi nào dùng SAML thay vì OIDC? - Khi nào
Kerberos phù hợp hơn OIDC? - mTLS có thay thế authorization không? - Nếu
token hợp lệ nhưng user không có quyền xem resource thì API trả gì? -
Làm thế nào để thu hồi quyền khi nhân viên nghỉ việc?

**Tiêu chí hoàn thành:** Có thể trình bày kiến trúc, bảo vệ lựa chọn
giao thức, giải thích trust boundary và trả lời các câu hỏi thiết kế phổ
biến.

------------------------------------------------------------------------

# 8. Ánh xạ khái niệm sang ASP.NET Core / .NET [Should]

Phụ lục này giúp người trình bày (C#/.NET) nối kiến thức giao thức với
API cụ thể của nền tảng. Không cần học thuộc; dùng làm tra cứu khi làm
Lab và trả lời câu hỏi của team.

| Khái niệm | ASP.NET Core / .NET |
|-----------|---------------------|
| Authentication scheme/handler | `AddAuthentication()`, `AddCookie()`, `AddOpenIdConnect()`, `AddJwtBearer()`; default scheme, challenge scheme |
| Session đăng nhập web | Cookie authentication handler; authentication ticket được bảo vệ bằng Data Protection |
| OIDC client cho server-side web | `AddOpenIdConnect()` + `AddCookie()`; hoặc `Microsoft.Identity.Web` khi dùng Entra ID |
| API xác minh access token | `AddJwtBearer()` với `Authority`, `Audience`, `TokenValidationParameters` |
| Desktop/mobile public client | MSAL.NET (Entra ID) hoặc `Duende.IdentityModel.OidcClient` (IdP chuẩn OIDC) |
| Principal và claims | `ClaimsPrincipal`, `ClaimsIdentity`, `HttpContext.User` |
| Inbound claim mapping | Mặc định map `sub` → `ClaimTypes.NameIdentifier`...; tắt bằng `MapInboundClaims = false` |
| Claims transformation | `IClaimsTransformation` |
| Authorization | `[Authorize]`, `[AllowAnonymous]`, policy-based (`RequireClaim`, `RequireRole`, `RequireAssertion`), `IAuthorizationHandler` + requirement, resource-based qua `IAuthorizationService.AuthorizeAsync` |
| Quản lý user/password cục bộ | ASP.NET Core Identity: password hashing (PBKDF2), lockout, 2FA TOTP; passkey được hỗ trợ từ .NET 10 |
| CSRF | Antiforgery (`AddAntiforgery`, `[ValidateAntiForgeryToken]`) |
| CORS | `AddCors()`; không phải cơ chế authentication/authorization |
| Data Protection | Bảo vệ cookie/ticket; cần key ring dùng chung khi chạy nhiều instance |
| Tự dựng Authorization Server/IdP | Duende IdentityServer (license thương mại), OpenIddict; hoặc dùng sản phẩm: Keycloak, Entra ID / Entra External ID |
| BFF | Duende BFF, hoặc YARP + cookie authentication |

**Lỗi .NET hay gặp:**

-   Gọi `UseAuthorization()` trước `UseAuthentication()`, hoặc thiếu
    `UseAuthentication()`.
-   Policy kiểm tra claim `sub`/`scope` nhưng claim đã bị đổi tên do
    inbound mapping.
-   Có nhiều scheme nhưng không chỉ định default/challenge scheme, dẫn
    tới redirect login thay vì trả 401 cho API.
-   Data Protection key không được chia sẻ giữa các instance, khiến
    cookie bị invalid sau load balancing hoặc deploy.
-   `RequireHttpsMetadata = false` hoặc tắt validate `aud`/`iss` trong
    lúc dev rồi lọt lên production.

## 8.1. Nội dung nâng cao chưa đào sâu trong 15 giờ

Để giữ đúng giới hạn thời lượng, các chủ đề sau chỉ nên biết tên hoặc để
ở phần nâng cao:

-   OAuth 2.0 Token Exchange (RFC 8693) và On-Behalf-Of flow (Entra ID).
-   DPoP (Demonstrating Proof of Possession) và mTLS-bound tokens
    (sender-constrained tokens).
-   PAR (Pushed Authorization Requests), JAR (JWT-Secured Authorization
    Request), JARM.
-   Rich Authorization Requests (RAR).
-   OpenID Connect Federation.
-   Multi-tenant application design (Entra ID).
-   Chi tiết triển khai SCIM (khái niệm đã có ở Module 07).
-   Identity Governance and Administration (IGA).
-   Risk-based/adaptive authentication, Conditional Access, Continuous
    Access Evaluation.
-   Decentralized Identity / Verifiable Credentials.
-   Workload identity federation trên cloud.
-   Kerberos delegation, constrained delegation và protocol internals.
-   SAML artifact binding, các profile nâng cao; WS-Federation chi tiết.
-   Certificate-based authentication/smart card chi tiết.
-   Các profile bảo mật chuyên biệt (ví dụ FAPI cho tài chính).

Đây không phải các chủ đề không quan trọng; chúng được tách ra vì cần
thời gian riêng để học đúng chiều sâu.

------------------------------------------------------------------------

# 9. Bộ tài liệu đầu ra cuối khóa

Khi hoàn tất 15 giờ, nên có một bộ tài liệu cá nhân gồm:

  ------------------------------------------------------------------------
                            \# Tài liệu              Nội dung
  ---------------------------- --------------------- ---------------------
                             1 Authentication        Thuật ngữ và định
                               Glossary              nghĩa

                             2 Protocol Comparison   OAuth, OIDC, SAML,
                               Matrix                Kerberos, FIDO2,
                                                     LDAP, RADIUS

                             3 Token & Session Notes JWT, cookie, session,
                                                     token lifecycle

                             4 Flow Diagrams         OAuth/OIDC, SAML,
                                                     Kerberos, WebAuthn

                             5 Security Checklist    Token, session,
                                                     redirect, MFA, API
                                                     authorization

                             6 Architecture Diagram  Một hệ thống thực tế
                                                     của team

                             7 Troubleshooting Guide Lỗi phổ biến và hướng
                                                     điều tra

                             8 Sharing Slides /      Nội dung chia sẻ 2 ×
                               Notes                 90 phút

                             9 Q&A Bank              Câu hỏi và câu trả
                                                     lời ngắn gọn
  ------------------------------------------------------------------------

Bổ sung tài liệu số **10 --- Demo repo** từ Lab (API + client) để demo
trực tiếp trong buổi chia sẻ.

## 9.1. Đề xuất cấu trúc buổi chia sẻ

> Thời gian chuẩn bị slide, kịch bản demo và tập trình bày ước tính 3--5
> giờ, **không** nằm trong 10--15 giờ học. Tái sử dụng tối đa sơ đồ và
> bảng đã làm trong các deliverable.

### Buổi 1 --- Authentication Fundamentals & Federation (90 phút)

  Nội dung                                      Thời lượng
  ------------------------------------------- ------------
  Identity, Authentication, Authorization          15 phút
  Cryptography, Session, Cookie, Token, JWT        20 phút
  OAuth 2.0 và OIDC                                25 phút
  SAML 2.0 và Enterprise SSO                       15 phút
  Quiz & Q&A                                       15 phút

### Buổi 2 --- Enterprise, Security & Architecture (90 phút)

  Nội dung                              Thời lượng
  ----------------------------------- ------------
  LDAP, AD, Kerberos (NTLM/RADIUS chỉ nêu tên)           10 phút
  FIDO2, WebAuthn, Passkey (gắn với AiTM phishing)       15 phút
  Authorization models                                   10 phút
  Security threats & best practices                      15 phút
  Architecture + demo Lab (client + ASP.NET Core API)    30 phút
  Quiz & Q&A                                             10 phút

## 9.2. Rubric tự đánh giá trước khi đứng lớp

Chấm mỗi tiêu chí từ 0 đến 2: - **0:** Chưa giải thích được. - **1:**
Giải thích được khái niệm nhưng chưa vẽ/diễn giải flow hoặc chưa trả lời
được tình huống. - **2:** Giải thích được, vẽ được flow và trả lời được
câu hỏi áp dụng.

  Năng lực                         Điểm tối đa
  ------------------------------ -------------
  Fundamentals và terminology                2
  Cryptography, session, token               2
  OAuth/OIDC                                 2
  SAML                                       2
  Enterprise/passwordless                    2
  Authorization/security                     2
  Architecture/troubleshooting               2
  Hands-on Lab (demo chạy được)              2
  **Tổng**                              **16**

**Mốc khuyến nghị:** Từ 12/16 trở lên, không có điểm 0 ở OAuth/OIDC,
token validation, security và Hands-on Lab, là mức phù hợp để chia sẻ
overview/technical sharing. Với câu hỏi chuyên sâu về giao thức, cần sẵn
sàng tra cứu specification hoặc tài liệu nhà cung cấp thay vì suy đoán.

------------------------------------------------------------------------

# 10. Tài liệu tham khảo chính thống

Ưu tiên specification và tài liệu của tổ chức tiêu chuẩn/nhà cung cấp
nền tảng:

-   OAuth 2.0 Framework --- RFC 6749:
    https://www.rfc-editor.org/rfc/rfc6749
-   OAuth 2.0 Security Best Current Practice --- RFC 9700:
    https://www.rfc-editor.org/rfc/rfc9700
-   Proof Key for Code Exchange (PKCE) --- RFC 7636:
    https://www.rfc-editor.org/rfc/rfc7636
-   OAuth 2.0 Bearer Token Usage --- RFC 6750:
    https://www.rfc-editor.org/rfc/rfc6750
-   JSON Web Token (JWT) --- RFC 7519:
    https://www.rfc-editor.org/rfc/rfc7519
-   JSON Web Signature (JWS) --- RFC 7515:
    https://www.rfc-editor.org/rfc/rfc7515
-   JWT Profile for OAuth 2.0 Access Tokens --- RFC 9068:
    https://www.rfc-editor.org/rfc/rfc9068
-   OAuth 2.0 Token Introspection --- RFC 7662:
    https://www.rfc-editor.org/rfc/rfc7662
-   OAuth 2.0 Token Revocation --- RFC 7009:
    https://www.rfc-editor.org/rfc/rfc7009
-   OAuth 2.0 for Native Apps --- RFC 8252:
    https://www.rfc-editor.org/rfc/rfc8252
-   OAuth 2.0 Device Authorization Grant --- RFC 8628:
    https://www.rfc-editor.org/rfc/rfc8628
-   OAuth 2.1 (Internet-Draft):
    https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/
-   OAuth 2.0 for Browser-Based Applications (Internet-Draft):
    https://datatracker.ietf.org/doc/draft-ietf-oauth-browser-based-apps/
-   SCIM 2.0 Protocol --- RFC 7644:
    https://www.rfc-editor.org/rfc/rfc7644
-   OpenID Connect Core:
    https://openid.net/specs/openid-connect-core-1_0.html
-   OpenID Connect Discovery:
    https://openid.net/specs/openid-connect-discovery-1_0.html
-   SAML 2.0 specifications --- OASIS:
    https://www.oasis-open.org/standards/
-   Web Authentication Level 2 --- W3C Recommendation:
    https://www.w3.org/TR/webauthn-2/
-   Web Authentication Level 3 --- W3C (bản mới, kiểm tra trạng thái):
    https://www.w3.org/TR/webauthn-3/
-   FIDO specifications: https://fidoalliance.org/specifications/
-   NIST Digital Identity Guidelines --- SP 800-63-4 (bản hiện hành,
    thay thế 800-63-3): https://pages.nist.gov/800-63-4/
-   OWASP Authentication Cheat Sheet:
    https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
-   OWASP Session Management Cheat Sheet:
    https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
-   OWASP Authorization Cheat Sheet:
    https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
-   Microsoft identity platform documentation:
    https://learn.microsoft.com/en-us/entra/identity-platform/
-   ASP.NET Core security (authentication & authorization):
    https://learn.microsoft.com/en-us/aspnet/core/security/
-   OWASP Cross-Site Request Forgery Prevention Cheat Sheet:
    https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
-   Keycloak documentation (cho Lab): https://www.keycloak.org/documentation

> Khi có khác biệt giữa bài viết tổng quan và specification, ưu tiên
> specification hiện hành và tài liệu chính thức của nhà cung cấp đang
> triển khai. Một số RFC/phiên bản tiêu chuẩn có thể được cập nhật; kiểm
> tra trạng thái hiện hành trước khi dùng làm tiêu chuẩn triển khai
> production.

------------------------------------------------------------------------

# 11. Cách sử dụng tài liệu

**Chọn lộ trình:** Lộ trình Core 10 giờ chỉ học các mục [Must] và làm
các deliverable có ghi (Core). Lộ trình Full 15 giờ học toàn bộ [Must]
và [Should]; mục [Nice] chỉ cần đọc để biết tên.

Với mỗi module: 1. Đọc mục tiêu và Input. 2. Học lần lượt các nội dung.
3. Vẽ lại flow bằng lời của mình, không chỉ sao chép sơ đồ. 4. Hoàn
thành tất cả Output/Deliverables. 5. Tự trả lời Knowledge Check mà không
nhìn tài liệu. 6. Ghi lại câu hỏi chưa chắc chắn và tra
specification/tài liệu chính thức. 7. Chỉ chuyển module khi đạt tiêu chí
hoàn thành.

**Lưu ý về độ sâu:** Hoàn thành lộ trình này giúp người học nắm được nền
tảng và các giao thức quan trọng ở mức có thể giải thích, so sánh và
thiết kế sơ bộ. Nó không thay thế đào tạo chuyên sâu, security review
hoặc kiểm thử độc lập trước khi đưa hệ thống xác thực vào production.
