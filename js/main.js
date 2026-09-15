/*
  MAIN.JS — Foodcourt Lantai 8
  -----------------------------
  Semua interaksi & rendering halaman. Tidak ada dependency luar,
  murni vanilla JS supaya website tetap ringan dan cepat di HP.

  Bagian dalam file ini:
  1. Helpers & konstanta
  2. Icon set (inline SVG, bukan icon font — biar tidak ada request ekstra)
  3. Sistem terjemahan (i18n)
  4. Render konten dinamis (tenant, retail, fasilitas, news, dst)
  5. Navbar / hamburger menu
  6. Floor plan viewer (zoom + pan + fullscreen)
  7. Floating WhatsApp, scroll reveal, active nav, tower video, footer year
*/

(function () {
  "use strict";

  /* ---------- 1. Helpers ---------- */
  const qs = (sel, ctx) => (ctx || document).querySelector(sel);
  const qsa = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SUPPORTED_LANGS = ["id", "en"];
  const STORAGE_KEY = "fc8-lang";

  function resolve(field, lang) {
    if (field && typeof field === "object") return field[lang] || field.id || "";
    return field;
  }

  function t(lang, path) {
    const dict = translations[lang] || translations.id;
    const value = path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), dict);
    if (value !== undefined) return value;
    const fallback = path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), translations.id);
    return fallback !== undefined ? fallback : path;
  }

  function getInitialLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
    } catch (e) { /* localStorage unavailable, ignore */ }
    return "id";
  }

  /* ---------- 2. Icon set ---------- */
  const ICON_PATHS = {
    menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
    close: '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>',
    utensils: '<path d="M6 3v7a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3"/><path d="M8 3v18"/><path d="M17 3c-1.7 0-3 2.2-3 5s1.3 5 3 5v10"/>',
    bag: '<path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    laptop: '<rect x="4" y="5" width="16" height="10" rx="1.5"/><path d="M2 19h20"/>',
    smoke: '<path d="M9 20h9" /><path d="M9 20c0-1.7 1.8-2 1.8-3.7 0-1-.9-1.3-.9-2.3 0-.9.8-1.3.8-2.2" /><rect x="3" y="15.5" width="6" height="4.5" rx="1"/>',
    smokeSnow: '<rect x="3" y="15.5" width="6" height="4.5" rx="1"/><path d="M9 20h6"/><circle cx="18" cy="6" r="3.2"/><path d="M18 4v4M16.4 5v2M19.6 5v2"/>',
    smokeSun: '<rect x="3" y="15.5" width="6" height="4.5" rx="1"/><path d="M9 20h6"/><circle cx="18" cy="6" r="2.6"/><path d="M18 1.6v1.6M18 8.8v1.6M13.6 6h1.6M20.8 6h1.6M14.8 2.8l1.1 1.1M20.1 8.1l1.1 1.1M21.2 2.8l-1.1 1.1M15.9 8.1l-1.1 1.1"/>',
    plug: '<path d="M9 3v5M15 3v5"/><path d="M6 8h12v3a6 6 0 0 1-12 0V8Z"/><path d="M12 17v4"/>',
    toilet: '<path d="M8 3h8v6a4 4 0 0 1-8 0V3Z"/><path d="M7 21l1.5-8h7L17 21"/>',
    toiletWomen: '<circle cx="12" cy="5" r="2.2"/><path d="M9 21l1.4-6.4H9L11.4 8h1.2L15 14.6h-1.4L15 21"/>',
    toiletMen: '<circle cx="12" cy="5" r="2.2"/><path d="M8.5 21V14H7l2-6h6l2 6h-1.5v7"/>',
    users: '<circle cx="8.5" cy="8" r="3"/><path d="M2.5 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.2c2.4.5 4 2.6 4 5.8"/>',
    coffee: '<path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z"/><path d="M17 9.5h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M7 5c0-1 .8-1.3.8-2.2M11 5c0-1 .8-1.3.8-2.2"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/>',
    zoomIn: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M14.5 14.5 20 20"/><path d="M10.5 8v5M8 10.5h5"/>',
    zoomOut: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M14.5 14.5 20 20"/><path d="M8 10.5h5"/>',
    expand: '<path d="M9 3H3v6M15 3h6v6M21 15v6h-6M3 15v6h6"/>',
    reset: '<path d="M3 12a9 9 0 1 1 3 6.7"/><path d="M3 21v-6h6"/>',
    play: '<path d="M8 5.5v13l11-6.5-11-6.5Z"/>',
    pin: '<path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.4"/>',
    chat: '<path d="M4 4h16v12H8l-4 4V4Z"/><path d="M8 9h8M8 12.5h5"/>',
    camera: '<rect x="3" y="6" width="18" height="14" rx="3"/><circle cx="12" cy="13" r="4"/><path d="M8 6l1.6-2h4.8L16 6"/>',
    arrowUp: '<path d="M12 19V5"/><path d="M6 11l6-6 6 6"/>',
    check: '<path d="M4 12l5 5L20 6"/>'
  };

  function icon(key, extraClass) {
    const inner = ICON_PATHS[key] || "";
    return '<svg class="icon' + (extraClass ? " " + extraClass : "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + "</svg>";
  }

  const STATUS_ICON = {
    open: "check", available: "sparkle", "opening-soon": "sparkle",
    "coming-soon": "sparkle", outdoor: "sparkle", ending: "sparkle", interested: "sparkle"
  };

  /* ---------- 4. Render dynamic content ---------- */
  function tenantCard(item, lang) {
    const name = resolve(item.name, lang);
    const badge = resolve(item.badge, lang);
    const note = resolve(item.note, lang);
    return (
      '<article class="card reveal" data-status="' + item.status + '">' +
        '<div class="card-top"><span class="stand-code">' + item.stand + "</span>" +
          '<span class="badge badge--' + item.status + '">' + icon(STATUS_ICON[item.status] || "sparkle") + "<span>" + badge + "</span></span></div>" +
        "<h3>" + name + "</h3>" +
        "<p>" + note + "</p>" +
      "</article>"
    );
  }

  function facilityCard(item, lang) {
    return (
      '<article class="facility reveal">' +
        '<div class="facility-icon">' + icon(item.icon) + "</div>" +
        "<h3>" + resolve(item.title, lang) + "</h3>" +
        "<p>" + resolve(item.desc, lang) + "</p>" +
      "</article>"
    );
  }

  function newsItem(item, lang) {
    return (
      '<article class="newsItem reveal">' +
        '<div class="date">' + resolve(item.date, lang) + "</div>" +
        "<h3>" + resolve(item.title, lang) + "</h3>" +
        "<p>" + resolve(item.desc, lang) + "</p>" +
      "</article>"
    );
  }

  function pill(item, lang) {
    return '<span class="pill">' + icon(item.icon) + "<span>" + resolve(item.label, lang) + "</span></span>";
  }

  function perkItem(item, lang) {
    return '<li>' + icon("check", "perk-check") + "<span>" + resolve(item.label, lang) + "</span></li>";
  }

  function legendItem(item, lang) {
    return '<div class="legendItem">' + icon(item.icon) + "<span>" + resolve(item.label, lang) + "</span></div>";
  }

  function renderAll(lang) {
    qs("#tenantGrid").innerHTML = tenants.map((item) => tenantCard(item, lang)).join("");
    qs("#retailGrid").innerHTML = retail.map((item) => tenantCard(item, lang)).join("");
    qs("#facilityGrid").innerHTML = facilities.map((item) => facilityCard(item, lang)).join("");
    qs("#newsList").innerHTML = news.map((item) => newsItem(item, lang)).join("");
    qs("#heroPills").innerHTML = highlights.map((item) => pill(item, lang)).join("");
    qs("#workPerks").innerHTML = workPerks.map((item) => perkItem(item, lang)).join("");
    qs("#floorLegend").innerHTML = floorLegend.map((item) => legendItem(item, lang)).join("");
    const orderList = qs("#orderList");
    if (orderList) {
      orderList.innerHTML = t(lang, "order.items").map((line) => "<li>" + line + "</li>").join("");
    }
    observeReveal();
  }

  /* ---------- 3. Apply translations to static markup ---------- */
  function applyTranslations(lang) {
    qsa("[data-i18n]").forEach((el) => { el.textContent = t(lang, el.getAttribute("data-i18n")); });
    qsa("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(lang, el.getAttribute("data-i18n-aria"))); });
    qsa("[data-i18n-alt]").forEach((el) => { el.setAttribute("alt", t(lang, el.getAttribute("data-i18n-alt"))); });
    qsa("[data-i18n-title]").forEach((el) => { el.setAttribute("title", t(lang, el.getAttribute("data-i18n-title"))); });
    document.title = t(lang, "meta.title");
    const metaDesc = qs('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t(lang, "meta.description"));
    document.documentElement.setAttribute("lang", lang);
    qsa(".langBtn").forEach((btn) => {
      const isActive = btn.getAttribute("data-lang") === lang;
      btn.setAttribute("aria-pressed", String(isActive));
    });
  }

  function setLang(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    applyTranslations(lang);
    renderAll(lang);
    window.currentLang = lang;
  }

  /* ---------- 5. Navbar / hamburger ---------- */
  function initNav() {
    const header = qs(".site-header");
    const hamb = qs(".hamb");
    const mobileNav = qs("#mobileNav");
    const backdrop = qs("#navBackdrop");

    function openMenu() {
      document.body.classList.add("nav-open");
      hamb.setAttribute("aria-expanded", "true");
      hamb.setAttribute("aria-label", t(window.currentLang || "id", "nav.closeMenu"));
      const firstLink = qs("a", mobileNav);
      if (firstLink) firstLink.focus({ preventScroll: true });
    }
    function closeMenu() {
      document.body.classList.remove("nav-open");
      hamb.setAttribute("aria-expanded", "false");
      hamb.setAttribute("aria-label", t(window.currentLang || "id", "nav.openMenu"));
      hamb.focus({ preventScroll: true });
    }
    hamb.addEventListener("click", () => {
      document.body.classList.contains("nav-open") ? closeMenu() : openMenu();
    });
    backdrop.addEventListener("click", closeMenu);
    qsa("a", mobileNav).forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) closeMenu();
    });

    let lastY = window.scrollY;
    window.addEventListener("scroll", () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      lastY = window.scrollY;
    }, { passive: true });
  }

  function initLangSwitch() {
    qsa(".langBtn").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  function initActiveNav() {
    const links = qsa(".navLink[data-section]");
    if (!links.length) return;
    const sections = links.map((a) => qs("#" + a.getAttribute("data-section"))).filter(Boolean);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = qs('.navLink[data-section="' + entry.target.id + '"]');
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach((s) => obs.observe(s));
  }

  /* ---------- Scroll reveal ---------- */
  let revealObserver;
  function observeReveal() {
    if (prefersReducedMotion) {
      qsa(".reveal").forEach((el) => el.classList.add("is-visible"));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    }
    qsa(".reveal:not(.is-visible)").forEach((el) => revealObserver.observe(el));
  }

  /* ---------- 6. Floor plan viewer (zoom / pan / fullscreen) ---------- */
  function initFloorViewer() {
    const overlay = qs("#floorViewer");
    const stage = qs("#floorStage");
    const img = qs("#floorViewerImg");
    const openers = qsa("[data-open-floor]");
    const closeBtn = qs("#floorClose");
    const zoomInBtn = qs("#floorZoomIn");
    const zoomOutBtn = qs("#floorZoomOut");
    const resetBtn = qs("#floorReset");
    if (!overlay || !img) return;

    let scale = 1, tx = 0, ty = 0;
    let lastOpener = null;
    const MIN_SCALE = 1, MAX_SCALE = 4;

    function apply() {
      img.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + scale + ")";
      stage.classList.toggle("is-zoomed", scale > 1);
    }
    function clamp() {
      const maxPan = (scale - 1) * (stage.clientWidth / 2) + 40;
      const maxPanY = (scale - 1) * (stage.clientHeight / 2) + 40;
      tx = Math.max(-maxPan, Math.min(maxPan, tx));
      ty = Math.max(-maxPanY, Math.min(maxPanY, ty));
    }
    function setScale(next, cx, cy) {
      const prev = scale;
      scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, next));
      if (cx !== undefined) {
        const ratio = scale / prev;
        tx = cx - (cx - tx) * ratio;
        ty = cy - (cy - ty) * ratio;
      }
      if (scale === 1) { tx = 0; ty = 0; }
      clamp();
      apply();
    }
    function reset() { scale = 1; tx = 0; ty = 0; apply(); }

    function open(fromEl) {
      lastOpener = fromEl || null;
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
      reset();
      closeBtn.focus({ preventScroll: true });
    }
    function close() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");
      if (lastOpener) lastOpener.focus({ preventScroll: true });
    }

    openers.forEach((el) => el.addEventListener("click", () => open(el)));
    closeBtn.addEventListener("click", close);
    resetBtn.addEventListener("click", reset);
    zoomInBtn.addEventListener("click", () => setScale(scale + 0.6, stage.clientWidth / 2, stage.clientHeight / 2));
    zoomOutBtn.addEventListener("click", () => setScale(scale - 0.6, stage.clientWidth / 2, stage.clientHeight / 2));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
    });

    /* wheel zoom (desktop) */
    stage.addEventListener("wheel", (e) => {
      e.preventDefault();
      const rect = stage.getBoundingClientRect();
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;
      setScale(scale + (e.deltaY < 0 ? 0.35 : -0.35), cx, cy);
    }, { passive: false });

    /* double click / double tap to toggle zoom */
    let lastTap = 0;
    stage.addEventListener("pointerup", (e) => {
      const now = Date.now();
      if (now - lastTap < 320 && activePointers.size === 0) {
        const rect = stage.getBoundingClientRect();
        const cx = e.clientX - rect.left - rect.width / 2;
        const cy = e.clientY - rect.top - rect.height / 2;
        setScale(scale > 1 ? 1 : 2.2, cx, cy);
      }
      lastTap = now;
    });

    /* drag to pan + pinch to zoom via pointer events */
    const activePointers = new Map();
    let dragging = false, startX = 0, startY = 0, startTx = 0, startTy = 0, pinchStartDist = 0, pinchStartScale = 1;

    function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

    stage.addEventListener("pointerdown", (e) => {
      stage.setPointerCapture(e.pointerId);
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (activePointers.size === 1) {
        dragging = true;
        startX = e.clientX; startY = e.clientY; startTx = tx; startTy = ty;
      } else if (activePointers.size === 2) {
        dragging = false;
        const pts = Array.from(activePointers.values());
        pinchStartDist = dist(pts[0], pts[1]);
        pinchStartScale = scale;
      }
    });
    stage.addEventListener("pointermove", (e) => {
      if (!activePointers.has(e.pointerId)) return;
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (activePointers.size === 2) {
        const pts = Array.from(activePointers.values());
        const d = dist(pts[0], pts[1]);
        if (pinchStartDist > 0) setScale(pinchStartScale * (d / pinchStartDist));
      } else if (dragging && scale > 1) {
        tx = startTx + (e.clientX - startX);
        ty = startTy + (e.clientY - startY);
        clamp();
        apply();
      }
    });
    function endPointer(e) {
      activePointers.delete(e.pointerId);
      if (activePointers.size < 2) pinchStartDist = 0;
      if (activePointers.size === 0) dragging = false;
    }
    stage.addEventListener("pointerup", endPointer);
    stage.addEventListener("pointercancel", endPointer);
    stage.addEventListener("pointerleave", endPointer);
  }

  /* ---------- 7. Misc: floating WA, tower video, footer year ---------- */
  function initContactLinks() {
    qsa("[data-wa-link]").forEach((el) => { el.href = "https://wa.me/" + contact.whatsappNumber; });
    qsa("[data-wa-display]").forEach((el) => { el.textContent = contact.whatsappDisplay; });
    qsa("[data-ig-handle]").forEach((el) => { el.textContent = contact.instagramHandle; });
  }

  function initTowerVideo() {
    const card = qs("#towerCard");
    if (!card) return;
    const playBtn = qs("#towerPlay", card);
    playBtn.addEventListener("click", () => {
      const src = card.getAttribute("data-src");
      const video = document.createElement("video");
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.setAttribute("preload", "auto");
      card.innerHTML = "";
      card.appendChild(video);
      video.play().catch(() => {});
    });
  }

  function initBackToTop() {
    const btn = qs("#backToTop");
    if (!btn) return;
    window.addEventListener("scroll", () => {
      btn.classList.toggle("is-visible", window.scrollY > 700);
    }, { passive: true });
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  function initFooterYear() {
    const el = qs("#footerYear");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const lang = getInitialLang();
    window.currentLang = lang;
    applyTranslations(lang);
    renderAll(lang);
    initNav();
    initLangSwitch();
    initActiveNav();
    initFloorViewer();
    initContactLinks();
    initTowerVideo();
    initBackToTop();
    initFooterYear();
  });
})();
