# Auth Standards Roadmap

Website tĩnh tổng hợp kiến thức theo lộ trình **Authentication Standards 10–15 giờ** ([authentication_standards_15h_roadmap.md](authentication_standards_15h_roadmap.md)): Identity & AuthN/AuthZ, mật mã học, session & token, OAuth 2.0/2.1, OpenID Connect, SAML 2.0, LDAP/AD/Kerberos, FIDO2/Passkey, bảo mật và kiến trúc, kèm lab ASP.NET Core + Keycloak.

## Nội dung

| Trang | Nội dung |
|---|---|
| [`site/index.html`](site/index.html) | Tổng quan lộ trình, thứ tự học, nhãn ưu tiên Must / Should / Nice |
| [`site/m01-fundamentals.html`](site/m01-fundamentals.html) | M01 — Identity & Authentication Fundamentals |
| [`site/m02-crypto-session-token.html`](site/m02-crypto-session-token.html) | M02 — Cryptography, Session, Token & HTTP Auth Schemes |
| [`site/m03-oauth-oidc.html`](site/m03-oauth-oidc.html) | M03 — OAuth 2.0 / 2.1 & OpenID Connect |
| [`site/lab.html`](site/lab.html) | Lab — Hands-on OAuth/OIDC với ASP.NET Core + Keycloak |
| [`site/m04-saml.html`](site/m04-saml.html) | M04 — SAML 2.0 & Enterprise SSO |
| [`site/m05-enterprise-passwordless.html`](site/m05-enterprise-passwordless.html) | M05 — Enterprise Authentication & Passwordless |
| [`site/m06-authz-security.html`](site/m06-authz-security.html) | M06 — Authorization & Authentication Security |
| [`site/m07-architecture.html`](site/m07-architecture.html) | M07 — Authentication Architecture & Practical Cases |
| [`site/appendix.html`](site/appendix.html) | Phụ lục — ánh xạ .NET, chủ đề nâng cao, rubric tự đánh giá, tài liệu tham khảo, glossary |

Mỗi module có:

- **Sau bài này bạn sẽ…** và **Tóm tắt nhanh** để nắm ý chính;
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

## Cấu trúc

```
authentication_standards_15h_roadmap.md   # đề cương gốc
site/
  index.html, m0x-*.html, lab.html, appendix.html
  assets/style.css   # giao diện dùng chung (light / dark)
  assets/app.js      # sidebar, mục lục, quiz engine, checklist, render Mermaid
```

## Lưu ý

Nội dung đã được đối chiếu với specification chính thức (RFC, OpenID, OASIS, W3C, NIST, OWASP, Microsoft Learn, Keycloak docs) tại thời điểm biên soạn (11/2026). Khi có khác biệt, hãy ưu tiên specification hiện hành và tài liệu của nhà cung cấp bạn đang dùng. Tài liệu này không thay thế security review trước khi đưa hệ thống xác thực vào production.
