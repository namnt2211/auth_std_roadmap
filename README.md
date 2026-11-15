# Auth Standards Roadmap

Website tĩnh tổng hợp kiến thức theo lộ trình **Authentication Standards 10–15 giờ** ([authentication_standards_15h_roadmap.md](authentication_standards_15h_roadmap.md)): Identity & AuthN/AuthZ, mật mã học, session & token, OAuth 2.0/2.1, OpenID Connect, SAML 2.0, LDAP/AD/Kerberos, FIDO2/Passkey, bảo mật và kiến trúc, kèm lab ASP.NET Core + Keycloak.

## Nội dung

Mỗi module được chia thành **trang tổng quan** (mục tiêu, input, danh sách bài) → **các bài ngắn** (~10–30 phút, vừa một lần ngồi học) → trang **Ôn tập & Quiz**:

| Module | Trang tổng quan | Bài học | Ôn tập |
|---|---|---|---|
| M01 — Identity & Authentication Fundamentals | [`m01-fundamentals.html`](site/m01-fundamentals.html) | 1.1–1.2 | [`m01-quiz.html`](site/m01-quiz.html) |
| M02 — Cryptography, Session, Token & HTTP Auth | [`m02-crypto-session-token.html`](site/m02-crypto-session-token.html) | 2.1 Crypto · 2.2 Session/Cookie · 2.3 Token & JWT · 2.4 Vòng đời token · 2.5 HTTP auth & API key | [`m02-quiz.html`](site/m02-quiz.html) |
| M03 — OAuth 2.0 / 2.1 & OpenID Connect | [`m03-oauth-oidc.html`](site/m03-oauth-oidc.html) | 3.1 Cơ bản · 3.2 Code + PKCE · 3.3 Grant khác & 2.1 · 3.4 state/nonce/redirect · 3.5 OIDC · 3.6 Discovery & Logout · 3.7 Định danh user | [`m03-quiz.html`](site/m03-quiz.html) |
| Lab — OAuth/OIDC với ASP.NET Core + Keycloak | [`lab.html`](site/lab.html) | Lab 1–5 (mỗi lab một trang) | [`lab-quiz.html`](site/lab-quiz.html) |
| M04 — SAML 2.0 & Enterprise SSO | [`m04-saml.html`](site/m04-saml.html) | 4.1 Thành phần · 4.2 Assertion · 4.3 Flow & binding · 4.4 Bảo mật | [`m04-quiz.html`](site/m04-quiz.html) |
| M05 — Enterprise Auth & Passwordless | [`m05-enterprise-passwordless.html`](site/m05-enterprise-passwordless.html) | 5.1 LDAP/AD · 5.2 Kerberos… · 5.3 WebAuthn · 5.4 Passkey | [`m05-quiz.html`](site/m05-quiz.html) |
| M06 — Authorization & Auth Security | [`m06-authz-security.html`](site/m06-authz-security.html) | 6.1 Mô hình phân quyền · 6.2 AuthZ trong API · 6.3 CSRF/XSS · 6.4 MFA fatigue/AiTM · 6.5 Mật khẩu & token storage | [`m06-quiz.html`](site/m06-quiz.html) |
| M07 — Architecture & Practical Cases | [`m07-architecture.html`](site/m07-architecture.html) | 7.1 Web/SPA/BFF · 7.2 Native/S2S · 7.3 Provisioning & WPF · 7.4 Cases · 7.5 Decision matrix | [`m07-quiz.html`](site/m07-quiz.html) |
| Phụ lục | [`appendix.html`](site/appendix.html) (.NET) | [`appendix-2-resources.html`](site/appendix-2-resources.html) · [`appendix-3-glossary.html`](site/appendix-3-glossary.html) | — |

Trang chủ [`site/index.html`](site/index.html) có bản đồ toàn bộ bài học. Mỗi trang có thanh điều hướng các bài trong module, sidebar mở rộng theo module đang học và nút Trước / Tiếp theo.

Nội dung học gồm:

- **Sau module này bạn sẽ…** (trang tổng quan) và **Tóm tắt nhanh** (trang ôn tập) để nắm ý chính;
- khối **Nói đơn giản** giải thích khái niệm bằng ví dụ đời thường;
- sơ đồ (Mermaid), bảng so sánh, ví dụ HTTP / JSON / C#;
- **Output / Deliverables** dạng checklist và **Knowledge Check** có đáp án gợi ý;
- **Quiz trắc nghiệm** chấm điểm ngay, có giải thích.

Tiến độ quiz và checklist lưu trong `localStorage` của trình duyệt.

## Cách xem

Không cần build. Mở `site/index.html` bằng trình duyệt, hoặc chạy một web server tĩnh:

```bash
cd site
npx serve .            # hoặc: python -m http.server 8000
```

Cần kết nối Internet để tải font (Google Fonts), Mermaid (jsDelivr) và highlight.js (cdnjs).

Có thể bật **GitHub Pages** (Settings → Pages → Deploy from branch → `main` / root), rồi truy cập `<pages-url>/site/`.

## Code Lab

Thư mục [`lab/`](lab/) chứa solution `AuthLab` hoàn chỉnh cho bài lab: `DemoApi` (ASP.NET Core Web API xác minh JWT), `DemoClient` (console app Authorization Code + PKCE) và biến thể `DemoClientBrowser`. Xem [lab/README.md](lab/README.md).

## Cấu trúc

```
authentication_standards_15h_roadmap.md   # đề cương gốc
lab/                                      # code mẫu Lab (.NET 10): DemoApi, DemoClient, DemoClientBrowser
site/
  index.html                      # trang chủ + bản đồ bài học
  m0x-<chủ đề>.html, lab.html     # trang tổng quan module (giữ tên cũ)
  m0x-<n>-*.html, lab-<n>-*.html  # từng bài học
  m0x-quiz.html, lab-quiz.html    # ôn tập, deliverables, quiz
  appendix*.html                  # phụ lục
  assets/pages.js    # cấu trúc module → bài (sidebar, pager, tiến độ quiz)
  assets/style.css   # giao diện dùng chung (light / dark)
  assets/app.js      # sidebar, mục lục, quiz engine, checklist, render Mermaid
```

## Lưu ý

Nội dung đã được đối chiếu với specification chính thức (RFC, OpenID, OASIS, W3C, NIST, OWASP, Microsoft Learn, Keycloak docs) tại thời điểm biên soạn (11/2026). Khi có khác biệt, hãy ưu tiên specification hiện hành và tài liệu của nhà cung cấp bạn đang dùng. Tài liệu này không thay thế security review trước khi đưa hệ thống xác thực vào production.
