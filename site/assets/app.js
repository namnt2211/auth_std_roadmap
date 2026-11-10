/* ==========================================================
   Auth Standards Roadmap — shared runtime
   - Sidebar navigation, TOC, prev/next pager
   - Theme toggle (light/dark) + Mermaid diagrams
   - Quiz engine (window.QUIZ), deliverable checklists
   ========================================================== */
(function () {
  "use strict";

  var PAGES = [
    { file: "index.html", num: "⌂", title: "Tổng quan lộ trình", hours: "" },
    { file: "m01-fundamentals.html", num: "01", title: "Identity & Authentication Fundamentals", hours: "Full 1h · Core 45′" },
    { file: "m02-crypto-session-token.html", num: "02", title: "Cryptography, Session, Token & HTTP Auth", hours: "Full 2h · Core 1.5h" },
    { file: "m03-oauth-oidc.html", num: "03", title: "OAuth 2.0 / 2.1 & OpenID Connect", hours: "Full 3h · Core 2.5h" },
    { file: "lab.html", num: "LAB", title: "Hands-on OAuth/OIDC với ASP.NET Core", hours: "Full 2h · Core 1.5h" },
    { file: "m04-saml.html", num: "04", title: "SAML 2.0 & Enterprise SSO", hours: "Full 1.5h · Core 45′" },
    { file: "m05-enterprise-passwordless.html", num: "05", title: "Enterprise Auth & Passwordless", hours: "Full 1.5h · Core 45′" },
    { file: "m06-authz-security.html", num: "06", title: "Authorization & Auth Security", hours: "Full 2h · Core 1.5h" },
    { file: "m07-architecture.html", num: "07", title: "Architecture & Practical Cases", hours: "Full 2h · Core 45′" },
    { file: "appendix.html", num: "+", title: "Phụ lục: .NET, tài liệu, rubric", hours: "" }
  ];
  window.AUTH_PAGES = PAGES;

  // ---------- safe storage ----------
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  };
  window.AUTH_STORE = store;

  var current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (current === "") current = "index.html";

  // ---------- theme ----------
  var root = document.documentElement;
  var savedTheme = store.get("auth.theme", null);
  if (savedTheme) root.setAttribute("data-theme", savedTheme);
  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  // ---------- layout injection ----------
  function buildChrome() {
    var body = document.body;
    var main = document.querySelector("main.content");
    if (!main) return;

    var topbar = document.createElement("header");
    topbar.className = "topbar";
    topbar.innerHTML =
      '<button class="icon-btn" id="menuBtn" aria-label="Mở menu">☰</button>' +
      '<a class="brand" href="index.html"><span class="logo">🔐</span><span>Auth Standards Roadmap</span></a>' +
      '<span class="spacer"></span>' +
      '<span class="progress-pill" id="progressPill"></span>' +
      '<button class="icon-btn" id="themeBtn" aria-label="Đổi giao diện sáng/tối">◐</button>';

    var layout = document.createElement("div");
    layout.className = "layout";

    var side = document.createElement("nav");
    side.className = "sidebar";
    side.setAttribute("aria-label", "Danh sách module");
    var html = "<h4>Lộ trình</h4>";
    PAGES.forEach(function (p) {
      var active = p.file === current ? " active" : "";
      var done = quizDone(p.file) ? '<span class="done-mark" title="Đã đạt quiz">✓</span>' : "";
      html += '<a class="nav-item' + active + '" href="' + p.file + '"><span class="num">' + p.num + "</span><span>" +
        p.title + (p.hours ? '<span class="hours">' + p.hours + "</span>" : "") + "</span>" + done + "</a>";
    });
    side.innerHTML = html;

    var toc = document.createElement("aside");
    toc.className = "toc";
    toc.innerHTML = '<div class="toc-title">Trong trang này</div>';

    main.parentNode.insertBefore(layout, main);
    layout.appendChild(side);
    layout.appendChild(main);
    layout.appendChild(toc);
    body.insertBefore(topbar, body.firstChild);

    document.getElementById("menuBtn").addEventListener("click", function () { body.classList.toggle("nav-open"); });
    main.addEventListener("click", function () { body.classList.remove("nav-open"); });
    document.getElementById("themeBtn").addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      store.set("auth.theme", next);
      renderMermaid();
    });

    buildToc(main, toc);
    buildPager(main);
    updateProgressPill();
  }

  function slugify(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
  }

  function buildToc(main, toc) {
    var heads = main.querySelectorAll("h2, h3");
    var used = {};
    var links = [];
    heads.forEach(function (h) {
      if (h.closest(".q, .card, .widget, details")) return;
      if (!h.id) {
        var id = slugify(h.textContent) || "sec";
        while (used[id] || document.getElementById(id)) id += "-x";
        h.id = id;
      }
      used[h.id] = true;
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent.replace(/\s*(must|should|nice|core)\s*$/i, "");
      a.className = h.tagName === "H3" ? "lvl3" : "lvl2";
      toc.appendChild(a);
      links.push({ a: a, h: h });
    });
    if (!("IntersectionObserver" in window)) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.a.classList.toggle("active", l.h === e.target); });
        }
      });
    }, { rootMargin: "-70px 0px -70% 0px" });
    links.forEach(function (l) { obs.observe(l.h); });
  }

  function buildPager(main) {
    var idx = -1;
    PAGES.forEach(function (p, i) { if (p.file === current) idx = i; });
    if (idx < 0) return;
    var pager = document.createElement("div");
    pager.className = "pager";
    var prev = PAGES[idx - 1], next = PAGES[idx + 1];
    var h = "";
    if (prev) h += '<a class="prev" href="' + prev.file + '"><span class="lbl">← Trước</span>' + prev.title + "</a>";
    if (next) h += '<a class="next" href="' + next.file + '"><span class="lbl">Tiếp theo →</span>' + next.title + "</a>";
    pager.innerHTML = h;
    main.appendChild(pager);
  }

  // ---------- code blocks ----------
  function enhanceCode() {
    document.querySelectorAll("pre:not(.mermaid)").forEach(function (pre) {
      var btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      btn.addEventListener("click", function () {
        var code = pre.querySelector("code") || pre;
        var txt = code.innerText;
        var done = function () { btn.textContent = "Đã copy"; setTimeout(function () { btn.textContent = "Copy"; }, 1400); };
        if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, function () {});
      });
      pre.appendChild(btn);
    });
    if (window.hljs) {
      document.querySelectorAll("pre code[class*='language-']").forEach(function (el) {
        try { window.hljs.highlightElement(el); } catch (e) { /* ignore */ }
      });
    }
  }

  // ---------- mermaid ----------
  var mermaidCounter = 0;
  var decoder = document.createElement("textarea");
  function mermaidSource(n) {
    // keep <br/> tags (the HTML parser turns them into elements inside <pre>), decode entities
    var html = n.innerHTML.replace(/<br\s*\/?>/gi, "@@BR@@");
    decoder.innerHTML = html.replace(/<[^>]+>/g, "");
    return decoder.value.replace(/@@BR@@/g, "<br/>").replace(/^\s*\n/, "");
  }
  // Prevent wide diagrams from shrinking into unreadable text:
  // never scale below ~85% of natural size, let the container scroll horizontally instead.
  function fitDiagram(n) {
    var svg = n.querySelector("svg");
    if (!svg) return;
    var vb = svg.viewBox && svg.viewBox.baseVal;
    var natural = vb && vb.width ? vb.width : svg.getBoundingClientRect().width;
    var box = n.closest(".diagram") || n.parentNode;
    var cw = box.clientWidth - 36;
    svg.style.maxWidth = "none";
    svg.style.height = "auto";
    if (natural <= cw) { svg.style.width = natural + "px"; n.style.justifyContent = "center"; }
    else { svg.style.width = Math.max(cw, natural * 0.85) + "px"; n.style.justifyContent = "flex-start"; }
  }
  window.addEventListener("resize", function () { document.querySelectorAll(".mermaid[data-processed]").forEach(fitDiagram); });

  function renderMermaid() {
    if (!window.mermaid) return;
    var nodes = document.querySelectorAll(".mermaid");
    var dark = isDark();
    window.mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      securityLevel: "strict",
      fontFamily: "Inter, Be Vietnam Pro, system-ui, sans-serif",
      sequence: { mirrorActors: false, showSequenceNumbers: true, wrap: true, width: 180, actorMargin: 60, messageFontSize: 14, noteFontSize: 13 },
      flowchart: { htmlLabels: true, curve: "basis", padding: 12, nodeSpacing: 40, rankSpacing: 48 },
      themeVariables: dark ? {
        darkMode: true, fontSize: "14px", background: "transparent",
        primaryColor: "#1b2540", primaryTextColor: "#e6ebf3", primaryBorderColor: "#5c7cfa",
        secondaryColor: "#251d3d", secondaryBorderColor: "#9775fa", secondaryTextColor: "#e6ebf3",
        tertiaryColor: "#14202b", tertiaryBorderColor: "#3bc9db", tertiaryTextColor: "#e6ebf3",
        lineColor: "#8b97ab", textColor: "#e6ebf3", mainBkg: "#1b2540", nodeBorder: "#5c7cfa",
        clusterBkg: "#121926", clusterBorder: "#2e3d57", titleColor: "#e6ebf3", edgeLabelBackground: "#121926",
        actorBkg: "#1b2540", actorBorder: "#5c7cfa", actorTextColor: "#e6ebf3", actorLineColor: "#4b5b78",
        signalColor: "#c0cad8", signalTextColor: "#e6ebf3", labelBoxBkgColor: "#1b2540", labelBoxBorderColor: "#5c7cfa",
        labelTextColor: "#e6ebf3", loopTextColor: "#e6ebf3", noteBkgColor: "#2a220b", noteBorderColor: "#b08900", noteTextColor: "#f8e6a0",
        activationBkgColor: "#25335a", activationBorderColor: "#5c7cfa", sequenceNumberColor: "#0b0f17"
      } : {
        fontSize: "14px", background: "transparent",
        primaryColor: "#edf2ff", primaryTextColor: "#0f172a", primaryBorderColor: "#4c6ef5",
        secondaryColor: "#f3f0ff", secondaryBorderColor: "#845ef7", secondaryTextColor: "#0f172a",
        tertiaryColor: "#e3fafc", tertiaryBorderColor: "#15aabf", tertiaryTextColor: "#0f172a",
        lineColor: "#64748b", textColor: "#0f172a", mainBkg: "#edf2ff", nodeBorder: "#4c6ef5",
        clusterBkg: "#f8fafc", clusterBorder: "#cbd5e1", titleColor: "#0f172a", edgeLabelBackground: "#ffffff",
        actorBkg: "#edf2ff", actorBorder: "#4c6ef5", actorTextColor: "#0f172a", actorLineColor: "#94a3b8",
        signalColor: "#334155", signalTextColor: "#0f172a", labelBoxBkgColor: "#edf2ff", labelBoxBorderColor: "#4c6ef5",
        labelTextColor: "#0f172a", loopTextColor: "#0f172a", noteBkgColor: "#fff9db", noteBorderColor: "#fab005", noteTextColor: "#5c3c00",
        activationBkgColor: "#dbe4ff", activationBorderColor: "#4c6ef5", sequenceNumberColor: "#ffffff"
      }
    });
    nodes.forEach(function (n) {
      if (n._src === undefined) n._src = mermaidSource(n);
      var id = "mmd-" + (++mermaidCounter);
      window.mermaid.render(id, n._src).then(function (r) {
        n.innerHTML = r.svg;
        n.setAttribute("data-processed", "true");
        fitDiagram(n);
      }).catch(function (e) {
        n.setAttribute("data-processed", "true");
        n.innerHTML = '<div class="mermaid-error">Không render được sơ đồ: ' + String(e && e.message || e).replace(/</g, "&lt;").slice(0, 300) + "</div>";
        var junk = document.getElementById("d" + id); if (junk) junk.remove();
      });
    });
  }

  // ---------- quiz ----------
  function quizKey(file) { return "auth.quiz." + file; }
  function quizDone(file) { var r = store.get(quizKey(file), null); return !!(r && r.passed); }

  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    var s = a.slice().sort().join(","), t = b.slice().sort().join(",");
    return s === t;
  }

  function renderQuiz() {
    var host = document.getElementById("quiz");
    var data = window.QUIZ;
    if (!host || !data || !data.length) return;
    var saved = store.get(quizKey(current), { answers: {} });
    var state = saved.answers || {};

    var head = document.createElement("div");
    head.className = "quiz-box";
    head.innerHTML =
      '<div class="quiz-head"><span class="quiz-score" id="quizScore"></span>' +
      '<span class="btn-row" style="margin:0"><button class="btn ghost" id="quizCheckAll">Chấm tất cả</button>' +
      '<button class="btn ghost" id="quizReset">Làm lại</button></span></div>' +
      '<div class="quiz-bar"><span id="quizBar"></span></div>' +
      '<p class="small muted">Chọn đáp án rồi bấm <b>Kiểm tra</b> để xem giải thích. Câu có ô vuông ☐ là câu <b>chọn nhiều đáp án</b>. Đạt ≥ 80% để đánh dấu hoàn thành module.</p>';
    host.appendChild(head);

    var qEls = [];
    data.forEach(function (item, i) {
      var multi = Array.isArray(item.answer);
      var correct = multi ? item.answer : [item.answer];
      var el = document.createElement("div");
      el.className = "q";
      var opts = item.options.map(function (o, j) {
        return '<label class="opt"><input type="' + (multi ? "checkbox" : "radio") + '" name="q' + i + '" value="' + j + '"><span>' + o + "</span></label>";
      }).join("");
      el.innerHTML =
        '<div class="q-text"><span class="q-num">' + (i + 1) + '.</span><span>' + item.q +
        (multi ? '<span class="q-hint">(chọn nhiều đáp án)</span>' : "") + "</span></div>" + opts +
        '<div class="q-actions"><button class="btn" data-check>Kiểm tra</button></div>' +
        '<div class="explain"></div>';
      host.appendChild(el);

      function chosen() {
        return Array.prototype.slice.call(el.querySelectorAll("input:checked")).map(function (x) { return +x.value; });
      }
      function grade(sel, silent) {
        if (!sel.length) { if (!silent) el.querySelector(".explain").textContent = ""; return; }
        var ok = sameSet(sel, correct);
        el.classList.add("answered");
        el.classList.toggle("is-correct", ok);
        el.classList.toggle("is-wrong", !ok);
        el.querySelectorAll("label.opt").forEach(function (lab, j) {
          lab.classList.remove("correct", "wrong");
          if (correct.indexOf(j) >= 0) lab.classList.add("correct");
          else if (sel.indexOf(j) >= 0) lab.classList.add("wrong");
        });
        el.querySelector(".explain").innerHTML = '<b class="verdict">' + (ok ? "✅ Chính xác!" : "❌ Chưa đúng.") + "</b>" + (item.explain || "");
        state[i] = { sel: sel, ok: ok };
        persist();
      }
      el.querySelector("[data-check]").addEventListener("click", function () { grade(chosen()); });
      el._grade = function () { grade(chosen(), true); };
      // restore
      if (state[i] && state[i].sel) {
        state[i].sel.forEach(function (v) { var inp = el.querySelector('input[value="' + v + '"]'); if (inp) inp.checked = true; });
        grade(state[i].sel, true);
      }
      qEls.push(el);
    });

    function persist() {
      var answered = 0, ok = 0;
      for (var k in state) { if (state.hasOwnProperty(k)) { answered++; if (state[k].ok) ok++; } }
      var pct = Math.round(ok * 100 / data.length);
      document.getElementById("quizScore").textContent = "Điểm: " + ok + "/" + data.length + " (" + pct + "%) · đã làm " + answered + "/" + data.length;
      document.getElementById("quizBar").style.width = pct + "%";
      var prev = store.get(quizKey(current), {});
      store.set(quizKey(current), { answers: state, passed: pct >= 80 || !!prev.passed, best: Math.max(pct, prev.best || 0) });
      updateProgressPill();
    }
    document.getElementById("quizCheckAll").addEventListener("click", function () { qEls.forEach(function (e) { e._grade(); }); });
    document.getElementById("quizReset").addEventListener("click", function () {
      state = {};
      qEls.forEach(function (e) {
        e.classList.remove("answered", "is-correct", "is-wrong");
        e.querySelectorAll("input").forEach(function (x) { x.checked = false; });
        e.querySelectorAll("label.opt").forEach(function (x) { x.classList.remove("correct", "wrong"); });
      });
      var prev = store.get(quizKey(current), {});
      store.set(quizKey(current), { answers: {}, passed: !!prev.passed, best: prev.best || 0 });
      persist();
    });
    persist();
  }

  // ---------- deliverable checklists ----------
  function renderChecklists() {
    document.querySelectorAll("ul.checklist").forEach(function (ul, li_i) {
      ul.querySelectorAll("li").forEach(function (li, j) {
        var key = "auth.check." + current + "." + li_i + "." + j;
        var cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = !!store.get(key, false);
        li.classList.toggle("checked", cb.checked);
        cb.addEventListener("change", function () { store.set(key, cb.checked); li.classList.toggle("checked", cb.checked); });
        li.insertBefore(cb, li.firstChild);
      });
    });
  }

  function updateProgressPill() {
    var pill = document.getElementById("progressPill");
    if (!pill) return;
    var total = 0, done = 0;
    PAGES.forEach(function (p) {
      if (p.file === "index.html" || p.file === "appendix.html") return;
      total++; if (quizDone(p.file)) done++;
    });
    pill.textContent = "Hoàn thành quiz: " + done + "/" + total;
  }

  // ---------- index module status ----------
  function renderIndexStatus() {
    document.querySelectorAll("[data-status-for]").forEach(function (el) {
      var f = el.getAttribute("data-status-for");
      var r = store.get(quizKey(f), null);
      if (r && r.passed) { el.innerHTML = '<span style="color:var(--ok)">✓ Đã đạt quiz (cao nhất ' + (r.best || 0) + "%)</span>"; }
      else if (r && r.best) { el.innerHTML = '<span style="color:var(--warn)">Đang học · cao nhất ' + r.best + "%</span>"; }
      else { el.innerHTML = '<span class="muted">Chưa làm quiz</span>'; }
    });
  }

  function init() {
    buildChrome();
    enhanceCode();
    renderQuiz();
    renderChecklists();
    renderIndexStatus();
    // Render diagrams only after web fonts are ready, otherwise Mermaid measures labels
    // with the fallback font and clips the text.
    // capture sources and disable mermaid's auto-run before anything else touches the nodes
    document.querySelectorAll(".mermaid").forEach(function (n) { if (n._src === undefined) n._src = mermaidSource(n); });
    if (window.mermaid) window.mermaid.initialize({ startOnLoad: false });
    var fontsReady =(document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    var go = function () {
      fontsReady.then(function () {
        return document.fonts && document.fonts.load ? Promise.all([
          document.fonts.load("14px Inter"), document.fonts.load("600 14px Inter")
        ]).catch(function () {}) : null;
      }).then(function () { renderMermaid(); });
    };
    if (window.mermaid) go();
    else window.addEventListener("load", go);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
