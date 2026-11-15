/* Module → lesson structure used by app.js (sidebar, lesson strip, pager, quiz progress). Keep in sync when adding/renaming pages. */
window.AUTH_MODULES = [
  { key: "m01", num: "01", title: "Identity & Authentication Fundamentals", hours: "Full 1h · Core 45′", pages: [
    { file: "m01-fundamentals.html", num: "", title: "Tổng quan module", kind: "overview", mins: 5 },
    { file: "m01-1-identity-roles.html", num: "1.1", title: "Identity, AuthN/AuthZ & các vai trò", kind: "lesson", mins: 25 },
    { file: "m01-2-sso-federation-mfa.html", num: "1.2", title: "SSO, Federation, MFA & authentication factors", kind: "lesson", mins: 15 },
    { file: "m01-quiz.html", num: "Ôn", title: "Ôn tập & Quiz", kind: "quiz", mins: 15 }
  ] },
  { key: "m02", num: "02", title: "Cryptography, Session, Token & HTTP Auth", hours: "Full 2h · Core 1.5h", pages: [
    { file: "m02-crypto-session-token.html", num: "", title: "Tổng quan module", kind: "overview", mins: 5 },
    { file: "m02-1-crypto.html", num: "2.1", title: "Cryptography essentials", kind: "lesson", mins: 30 },
    { file: "m02-2-session-cookie.html", num: "2.2", title: "Session, Cookie & session management", kind: "lesson", mins: 20 },
    { file: "m02-3-token-jwt.html", num: "2.3", title: "Token & JWT", kind: "lesson", mins: 20 },
    { file: "m02-4-token-lifecycle.html", num: "2.4", title: "Vòng đời token", kind: "lesson", mins: 10 },
    { file: "m02-5-http-auth.html", num: "2.5", title: "HTTP auth schemes & API key", kind: "lesson", mins: 15 },
    { file: "m02-quiz.html", num: "Ôn", title: "Ôn tập & Quiz", kind: "quiz", mins: 15 }
  ] },
  { key: "m03", num: "03", title: "OAuth 2.0 / 2.1 & OpenID Connect", hours: "Full 3h · Core 2.5h", pages: [
    { file: "m03-oauth-oidc.html", num: "", title: "Tổng quan module", kind: "overview", mins: 5 },
    { file: "m03-1-oauth-basics.html", num: "3.1", title: "OAuth: vấn đề, vai trò & thuật ngữ", kind: "lesson", mins: 25 },
    { file: "m03-2-auth-code-pkce.html", num: "3.2", title: "Authorization Code + PKCE", kind: "lesson", mins: 30 },
    { file: "m03-3-other-grants.html", num: "3.3", title: "Client Credentials, Device flow & OAuth 2.1", kind: "lesson", mins: 30 },
    { file: "m03-4-state-nonce-redirect.html", num: "3.4", title: "state, nonce & redirect URI", kind: "lesson", mins: 10 },
    { file: "m03-5-oidc.html", num: "3.5", title: "OpenID Connect & ID token", kind: "lesson", mins: 25 },
    { file: "m03-6-discovery-logout.html", num: "3.6", title: "Discovery, JWKS & Logout", kind: "lesson", mins: 15 },
    { file: "m03-7-user-identity.html", num: "3.7", title: "Định danh user, social login & nâng cao", kind: "lesson", mins: 15 },
    { file: "m03-quiz.html", num: "Ôn", title: "Ôn tập & Quiz", kind: "quiz", mins: 20 }
  ] },
  { key: "lab", num: "LAB", title: "Hands-on OAuth/OIDC với ASP.NET Core", hours: "Full 2h · Core 1.5h", pages: [
    { file: "lab.html", num: "", title: "Tổng quan & chuẩn bị", kind: "overview", mins: 5 },
    { file: "lab-1-keycloak.html", num: "L1", title: "Lab 1 — Cấu hình Keycloak", kind: "lesson", mins: 20 },
    { file: "lab-2-api-jwt.html", num: "L2", title: "Lab 2 — Web API xác minh JWT", kind: "lesson", mins: 30 },
    { file: "lab-3-pkce-client.html", num: "L3", title: "Lab 3 — Client Authorization Code + PKCE", kind: "lesson", mins: 30 },
    { file: "lab-4-client-credentials.html", num: "L4", title: "Lab 4 — Client Credentials, refresh, introspection", kind: "lesson", mins: 20 },
    { file: "lab-5-saml.html", num: "L5", title: "Lab 5 — Đọc SAML Response", kind: "lesson", mins: 20 },
    { file: "lab-quiz.html", num: "Ôn", title: "Công cụ, tổng kết & Quiz", kind: "quiz", mins: 15 }
  ] },
  { key: "m04", num: "04", title: "SAML 2.0 & Enterprise SSO", hours: "Full 1.5h · Core 45′", pages: [
    { file: "m04-saml.html", num: "", title: "Tổng quan module", kind: "overview", mins: 5 },
    { file: "m04-1-saml-components.html", num: "4.1", title: "SAML là gì & các thành phần", kind: "lesson", mins: 20 },
    { file: "m04-2-assertion.html", num: "4.2", title: "Assertion & Response", kind: "lesson", mins: 15 },
    { file: "m04-3-flows-bindings.html", num: "4.3", title: "SP/IdP-initiated SSO & bindings", kind: "lesson", mins: 20 },
    { file: "m04-4-security.html", num: "4.4", title: "Bảo mật SAML & so sánh với OIDC", kind: "lesson", mins: 15 },
    { file: "m04-quiz.html", num: "Ôn", title: "Ôn tập & Quiz", kind: "quiz", mins: 15 }
  ] },
  { key: "m05", num: "05", title: "Enterprise Auth & Passwordless", hours: "Full 1.5h · Core 45′", pages: [
    { file: "m05-enterprise-passwordless.html", num: "", title: "Tổng quan module", kind: "overview", mins: 5 },
    { file: "m05-1-ldap-ad.html", num: "5.1", title: "LDAP & Active Directory", kind: "lesson", mins: 15 },
    { file: "m05-2-kerberos-enterprise.html", num: "5.2", title: "Kerberos, NTLM, RADIUS & smart card", kind: "lesson", mins: 25 },
    { file: "m05-3-webauthn.html", num: "5.3", title: "WebAuthn: thành phần, đăng ký, đăng nhập", kind: "lesson", mins: 20 },
    { file: "m05-4-passkey.html", num: "5.4", title: "Chống phishing, UP/UV & Passkey", kind: "lesson", mins: 15 },
    { file: "m05-quiz.html", num: "Ôn", title: "Ôn tập & Quiz", kind: "quiz", mins: 15 }
  ] },
  { key: "m06", num: "06", title: "Authorization & Auth Security", hours: "Full 2h · Core 1.5h", pages: [
    { file: "m06-authz-security.html", num: "", title: "Tổng quan module", kind: "overview", mins: 5 },
    { file: "m06-1-authz-models.html", num: "6.1", title: "Mô hình phân quyền", kind: "lesson", mins: 25 },
    { file: "m06-2-api-authz.html", num: "6.2", title: "Authorization trong API", kind: "lesson", mins: 20 },
    { file: "m06-3-web-threats.html", num: "6.3", title: "CSRF, XSS & session fixation", kind: "lesson", mins: 25 },
    { file: "m06-4-identity-attacks.html", num: "6.4", title: "MFA fatigue, AiTM, JWT confusion & enumeration", kind: "lesson", mins: 15 },
    { file: "m06-5-password-token-storage.html", num: "6.5", title: "Mật khẩu (NIST), token storage & best practices", kind: "lesson", mins: 15 },
    { file: "m06-quiz.html", num: "Ôn", title: "Ôn tập & Quiz", kind: "quiz", mins: 20 }
  ] },
  { key: "m07", num: "07", title: "Architecture & Practical Cases", hours: "Full 2h · Core 45′", pages: [
    { file: "m07-architecture.html", num: "", title: "Tổng quan module", kind: "overview", mins: 5 },
    { file: "m07-1-design-web.html", num: "7.1", title: "Quy trình thiết kế, Web, SPA & BFF", kind: "lesson", mins: 25 },
    { file: "m07-2-native-s2s.html", num: "7.2", title: "Desktop, Mobile & Service-to-Service", kind: "lesson", mins: 20 },
    { file: "m07-3-provisioning-wpf.html", num: "7.3", title: "Provisioning & ví dụ WPF + API", kind: "lesson", mins: 15 },
    { file: "m07-4-cases-troubleshooting.html", num: "7.4", title: "Case studies & troubleshooting", kind: "lesson", mins: 25 },
    { file: "m07-5-decision-matrix.html", num: "7.5", title: "Decision matrix", kind: "lesson", mins: 15 },
    { file: "m07-quiz.html", num: "Ôn", title: "Ôn tập & Quiz", kind: "quiz", mins: 15 }
  ] },
  { key: "app", num: "+", title: "Phụ lục", hours: "Tra cứu", pages: [
    { file: "appendix.html", num: "A–B", title: "ASP.NET Core / .NET", kind: "overview" },
    { file: "appendix-2-resources.html", num: "C–G", title: "Nâng cao, buổi chia sẻ, rubric & tài liệu", kind: "lesson" },
    { file: "appendix-3-glossary.html", num: "H", title: "Glossary A–Z", kind: "lesson" },
    { file: "appendix-4-compare.html", num: "I", title: "Phân biệt khái niệm dễ nhầm", kind: "lesson" }
  ] },
];
