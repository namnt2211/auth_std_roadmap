/* ==========================================================
   Auth Standards Roadmap — shared runtime
   - Sidebar navigation, TOC, prev/next pager
   - Theme toggle (light/dark) + Mermaid diagrams
   - Quiz engine (window.QUIZ), deliverable checklists
   ========================================================== */
(function () {
  "use strict";

  // Module/lesson structure comes from assets/pages.js (window.AUTH_MODULES).
  var MODULES = window.AUTH_MODULES || [];
  var PAGES = [{ file: "index.html", num: "⌂", title: "Tổng quan lộ trình", kind: "home" }];
  MODULES.forEach(function (m) {
    m.overview = m.pages[0].file;
    m.quiz = null;
    m.pages.forEach(function (p) {
      p.module = m;
      if (p.kind === "quiz") m.quiz = p.file;
      PAGES.push(p);
    });
  });
  window.AUTH_PAGES = PAGES;

  // ---------- safe storage ----------
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  };
  window.AUTH_STORE = store;

  var current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (current === "") current = "index.html";
  var currentPage = null;
  PAGES.forEach(function (p) { if (p.file === current) currentPage = p; });
  var currentModule = currentPage && currentPage.module ? currentPage.module : null;

  // Quiz progress used to be stored under the single module page (now the overview page).
  MODULES.forEach(function (m) {
    if (!m.quiz) return;
    var old = store.get("auth.quiz." + m.overview, null);
    if (old && store.get("auth.quiz." + m.quiz, null) === null) store.set("auth.quiz." + m.quiz, old);
  });

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
    var html = "<h4>Lộ trình</h4>" +
      '<a class="nav-item' + (current === "index.html" ? " active" : "") + '" href="index.html"><span class="num">⌂</span><span>Tổng quan lộ trình</span></a>';
    MODULES.forEach(function (m) {
      var open = m === currentModule;
      var done = m.quiz && quizDone(m.quiz) ? '<span class="done-mark" title="Đã đạt quiz">✓</span>' : "";
      html += '<a class="nav-item' + (open ? " active" : "") + '" href="' + m.overview + '"><span class="num">' + m.num + "</span><span>" +
        m.title + (m.hours ? '<span class="hours">' + m.hours + " · " + m.pages.filter(function (p) { return p.kind === "lesson"; }).length + " bài</span>" : "") + "</span>" + done + "</a>";
      if (open) {
        html += '<div class="nav-sub">';
        m.pages.forEach(function (p) {
          var label = p.kind === "overview" && m.key !== "app" ? "Tổng quan module" : p.title;
          html += '<a class="nav-subitem' + (p.file === current ? " active" : "") + (p.kind === "quiz" ? " quiz" : "") + '" href="' + p.file + '">' +
            '<span class="snum">' + (p.kind === "quiz" ? "✎" : p.kind === "overview" && m.key !== "app" ? "•" : p.num) + "</span><span>" + label +
            (p.mins ? '<span class="hours">~' + p.mins + " phút</span>" : "") + "</span>" +
            (quizDone(p.file) ? '<span class="done-mark" title="Đã đạt quiz">✓</span>' : "") + "</a>";
        });
        html += "</div>";
      }
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

    buildLessonStrip(main);
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

  // Step strip under the page head: where am I inside this module?
  function buildLessonStrip(main) {
    if (!currentModule || currentModule.pages.length < 2) return;
    var nav = document.createElement("nav");
    nav.className = "lesson-strip";
    nav.setAttribute("aria-label", "Các trang trong module");
    var idx = currentModule.pages.indexOf(currentPage);
    var h = "";
    currentModule.pages.forEach(function (p, i) {
      var label = p.kind === "overview" ? (currentModule.key === "app" ? p.num : "Tổng quan") : p.kind === "quiz" ? "Ôn tập & Quiz" : p.num;
      var cls = "ls-step" + (i === idx ? " current" : i < idx ? " past" : "") + (p.kind === "quiz" ? " quiz" : "");
      h += '<a class="' + cls + '" href="' + p.file + '" title="' + p.title.replace(/"/g, "&quot;") + '"' +
        (i === idx ? ' aria-current="page"' : "") + ">" + label + "</a>";
    });
    nav.innerHTML = '<span class="ls-label">' + (currentModule.key === "app" ? "Phụ lục" : currentModule.key === "lab" ? "Lab" : "Module " + currentModule.num) +
      " · " + (idx + 1) + "/" + currentModule.pages.length + "</span>" + h;
    var head = main.querySelector(".page-head");
    if (head) head.parentNode.insertBefore(nav, head.nextSibling);
    else main.insertBefore(nav, main.firstChild);
  }

  function buildPager(main) {
    var idx = -1;
    PAGES.forEach(function (p, i) { if (p.file === current) idx = i; });
    if (idx < 0) return;
    var pager = document.createElement("div");
    pager.className = "pager";
    var prev = PAGES[idx - 1], next = PAGES[idx + 1];
    function label(p) {
      var m = p.module;
      if (!m) return p.title;
      if (m.key === "app") return "Phụ lục " + p.num + " — " + p.title;
      if (p.kind === "overview") return (m.key === "lab" ? "Lab" : "Module " + m.num) + " — " + m.title;
      if (p.kind === "quiz") return (m.key === "lab" ? "Lab" : "Module " + m.num) + " — " + p.title;
      return m.key === "lab" ? p.title : "Bài " + p.num + " — " + p.title;
    }
    var h = "";
    if (prev) h += '<a class="prev" href="' + prev.file + '"><span class="lbl">← Trước</span>' + label(prev) + "</a>";
    if (next) h += '<a class="next" href="' + next.file + '"><span class="lbl">Tiếp theo →</span>' + label(next) + "</a>";
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
    // Older pages also carry id="quiz" on the <h2>, so pick the container <div>.
    var host = document.querySelector("div#quiz") || document.getElementById("quiz");
    var data = window.QUIZ;
    if (!host || !data || !data.length) return;
    var saved = store.get(quizKey(current), { answers: {} });
    var state = saved.answers || {};
    var isLesson = currentPage && currentPage.kind === "lesson";

    var head = document.createElement("div");
    head.className = "quiz-box";
    head.innerHTML =
      '<div class="quiz-head"><span class="quiz-score" id="quizScore"></span>' +
      '<span class="btn-row" style="margin:0"><button class="btn ghost" id="quizCheckAll">Chấm tất cả</button>' +
      '<button class="btn ghost" id="quizReset">Làm lại</button></span></div>' +
      '<div class="quiz-bar"><span id="quizBar"></span></div>' +
      '<p class="small muted">Chọn đáp án rồi bấm <b>Kiểm tra</b>: mỗi lựa chọn sẽ hiện lý do <b>vì sao đúng / vì sao sai</b>. Câu có ô vuông ☐ là câu <b>chọn nhiều đáp án</b>; câu gắn nhãn <span class="q-tricky">🧠 Hack não</span> có bẫy, đọc kỹ từng chữ. Đạt ≥ 80% để đánh dấu hoàn thành ' +
      (isLesson ? "bài" : "module") + ".</p>";
    host.appendChild(head);

    var qEls = [];
    data.forEach(function (item, i) {
      var multi = Array.isArray(item.answer);
      var correct = multi ? item.answer : [item.answer];
      var el = document.createElement("div");
      el.className = "q";
      // item.why (optional): one reason per option, shown after grading.
      var why = Array.isArray(item.why) ? item.why : [];
      var opts = item.options.map(function (o, j) {
        return '<label class="opt"><input type="' + (multi ? "checkbox" : "radio") + '" name="q' + i + '" value="' + j + '"><span>' + o +
          (why[j] ? '<span class="why">' + why[j] + "</span>" : "") + "</span></label>";
      }).join("");
      if (item.tricky) el.classList.add("tricky");
      el.innerHTML =
        '<div class="q-text"><span class="q-num">' + (i + 1) + '.</span><span>' +
        (item.tricky ? '<span class="q-tricky">🧠 Hack não</span> ' : "") + item.q +
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
        e.querySelector(".explain").innerHTML = "";
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
    MODULES.forEach(function (m) {
      if (!m.quiz) return;
      total++; if (quizDone(m.quiz)) done++;
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
