/*
  TENANT.JS — Halaman Detail Tenant (tenants/<slug>/index.html)
  ----------------------------------------------------------------
  File ini HANYA dipakai di halaman detail tenant, bukan di homepage.
  Semua konten (foto, logo, menu, WhatsApp, promo) diambil dari
  js/data.js — jangan edit HTML tenant untuk mengganti konten,
  cukup edit object tenant terkait di js/data.js.

  Cara kerja singkat:
  - <body data-tenant-slug="..."> di setiap tenants/<slug>/index.html
    menentukan tenant mana yang ditampilkan.
  - renderTenant() dipanggil pertama kali oleh main.js (lewat hook
    window.renderTenantPage) setiap kali halaman dimuat ATAU bahasa
    diganti, supaya konten selalu ikut bahasa yang aktif.
  - Kalau slug tidak ditemukan di data.js (misalnya tenant sudah
    dihapus tapi foldernya masih ada), tampilkan state
    "Tenant tidak ditemukan" — tidak pernah halaman kosong/blank.
*/

(function () {
  "use strict";

  const qs = (sel, ctx) => (ctx || document).querySelector(sel);

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

  function findTenant(slug) {
    const list = typeof tenants !== "undefined" ? tenants : [];
    return list.find((item) => item.slug === slug) || null;
  }

  function waLink(number, message) {
    return "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
  }

  const ICON = {
    back: '<path d="M15 6l-6 6 6 6"/>',
    photo: '<rect x="3" y="6" width="18" height="14" rx="3"/><circle cx="12" cy="13" r="4"/><path d="M8 6l1.6-2h4.8L16 6"/>',
    whatsapp: '<path d="M4 4h16v12H8l-4 4V4Z"/><path d="M8 9h8M8 12.5h5"/>',
    chevron: '<path d="M9 5l7 7-7 7"/>'
  };

  function icon(key, extraClass) {
    return (
      '<svg class="icon' + (extraClass ? " " + extraClass : "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICON[key] || "") +
      "</svg>"
    );
  }

  function placeholderMedia(label) {
    return '<div class="tdPlaceholder">' + icon("photo", "tdPlaceholderIcon") + "<span>" + label + "</span></div>";
  }

  function menuChips(tenant, lang) {
    const cats = tenant.menuCategories || [];
    if (!cats.length) return '<p class="tdEmptyNote">' + t(lang, "tenantDetail.menuComingSoon") + "</p>";
    return '<div class="tdMenuChips">' + cats.map((c) => '<span class="tdMenuChip">' + resolve(c, lang) + "</span>").join("") + "</div>";
  }

  function tenantNews(tenant, lang) {
    const list = typeof news !== "undefined" ? news : [];
    const items = list.filter((n) => n.tenantSlug === tenant.slug);
    if (!items.length) return '<p class="tdEmptyNote">' + t(lang, "tenantDetail.promoEmpty") + "</p>";
    return (
      '<div class="tdNewsList">' +
      items
        .map(
          (item) =>
            '<article class="newsItem">' +
            '<div class="date">' + resolve(item.date, lang) + "</div>" +
            "<h3>" + resolve(item.title, lang) + "</h3>" +
            "<p>" + resolve(item.desc, lang) + "</p>" +
            "</article>"
        )
        .join("") +
      "</div>"
    );
  }

  function relatedTenants(tenant, lang) {
    const list = typeof tenants !== "undefined" ? tenants : [];
    const others = list.filter((item) => item.slug && item.slug !== tenant.slug);
    if (!others.length) return "";
    const picks = others.slice(0, 4);
    return (
      '<div class="tdRelatedGrid">' +
      picks
        .map(
          (item) =>
            '<a class="tdRelatedCard" href="../' + item.slug + '/">' +
            '<span class="stand-code">' + item.stand + "</span>" +
            "<h4>" + resolve(item.name, lang) + "</h4>" +
            '<span class="tdRelatedCta">' + t(lang, "tenantDetail.viewDetail") + icon("chevron", "tdRelatedIcon") + "</span>" +
            "</a>"
        )
        .join("") +
      "</div>"
    );
  }

  function orderSection(tenant, lang) {
    const name = resolve(tenant.name, lang);
    if (tenant.whatsapp) {
      const msg = t(lang, "tenantDetail.orderMessage").replace("{name}", name);
      return (
        '<a class="btn whatsapp" href="' + waLink(tenant.whatsapp, msg) + '" target="_blank" rel="noopener noreferrer">' +
        icon("whatsapp") +
        "<span>" + t(lang, "tenantDetail.orderCta") + "</span>" +
        "</a>"
      );
    }
    /* Belum ada nomor WhatsApp tenant di data.js -> jangan mengarang nomor.
       Tampilkan info yang jujur + alihkan ke Foodcourt Management. */
    const mgmtMsg = t(lang, "tenantDetail.managementMessage");
    return (
      '<div class="tdOrderUnavailable">' +
      "<p>" + t(lang, "tenantDetail.orderUnavailable") + "</p>" +
      "<p>" + t(lang, "tenantDetail.orderUnavailableHint") + "</p>" +
      '<a class="btn secondary" href="' + waLink(contact.whatsappNumber, mgmtMsg) + '" target="_blank" rel="noopener noreferrer">' +
      t(lang, "tenantDetail.managementCta") +
      "</a>" +
      "</div>"
    );
  }

  function managementSection(lang) {
    const mgmtMsg = t(lang, "tenantDetail.managementMessage");
    return (
      '<div class="tdManagementBox">' +
      "<h3>" + t(lang, "tenantDetail.managementTitle") + "</h3>" +
      "<p>" + t(lang, "tenantDetail.managementDesc") + "</p>" +
      '<a class="btn primary" href="' + waLink(contact.whatsappNumber, mgmtMsg) + '" target="_blank" rel="noopener noreferrer">' +
      icon("whatsapp") +
      "<span>" + t(lang, "tenantDetail.managementCta") + " · " + contact.whatsappDisplay + "</span>" +
      "</a>" +
      "</div>"
    );
  }

  function renderNotFound(lang) {
    const root = qs("#tenantDetail");
    if (!root) return;
    document.title = t(lang, "tenantDetail.notFoundTitle") + " | Foodcourt Lantai 8";
    root.innerHTML =
      '<div class="tdNotFound">' +
      "<h1>" + t(lang, "tenantDetail.notFoundTitle") + "</h1>" +
      "<p>" + t(lang, "tenantDetail.notFoundDesc") + "</p>" +
      '<a class="btn primary" href="../../index.html#tenants">' + t(lang, "tenantDetail.notFoundCta") + "</a>" +
      "</div>";
  }

  function renderTenant(lang) {
    const root = qs("#tenantDetail");
    if (!root) return;
    const slug = document.body.getAttribute("data-tenant-slug");
    const tenant = findTenant(slug);
    if (!tenant) {
      renderNotFound(lang);
      return;
    }

    const name = resolve(tenant.name, lang);
    const category = tenant.category ? resolve(tenant.category, lang) : t(lang, "tenantDetail.categoryFallback");
    const description = tenant.description ? resolve(tenant.description, lang) : resolve(tenant.note, lang);
    const badge = resolve(tenant.badge, lang);

    /* SEO dasar per tenant: title & meta description ikut menyesuaikan
       tanpa perlu file HTML terpisah untuk tiap bahasa. */
    document.title = name + " | Foodcourt Lantai 8";
    const metaDesc = qs('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description);

    root.innerHTML =
      '<a class="tdBack" href="../../index.html#tenants">' +
      icon("back") +
      "<span>" + t(lang, "tenantDetail.back") + "</span>" +
      "</a>" +
      '<div class="tdMedia">' +
      (tenant.standImage
        ? '<img src="' + tenant.standImage + '" alt="' + name + '" loading="eager">'
        : placeholderMedia(t(lang, "tenantDetail.photoPlaceholder"))) +
      "</div>" +
      '<div class="tdIdentity">' +
      '<div class="tdLogo">' +
      (tenant.logo ? '<img src="' + tenant.logo + '" alt="Logo ' + name + '">' : "<span>" + t(lang, "tenantDetail.logoPlaceholder") + "</span>") +
      "</div>" +
      '<div class="tdIdentityText">' +
      '<div class="tdMetaRow"><span class="stand-code">' + tenant.stand + '</span><span class="badge badge--' + tenant.status + '">' + badge + "</span></div>" +
      "<h1>" + name + "</h1>" +
      '<p class="tdCategory">' + category + "</p>" +
      "</div>" +
      "</div>" +
      '<div class="tdSection">' +
      "<h2>" + t(lang, "tenantDetail.aboutTitle") + "</h2>" +
      "<p>" + description + "</p>" +
      "</div>" +
      '<div class="tdSection">' +
      "<h2>" + t(lang, "tenantDetail.menuTitle") + "</h2>" +
      menuChips(tenant, lang) +
      '<p class="tdMenuNote">' + t(lang, "tenantDetail.menuNote") + "</p>" +
      "</div>" +
      '<div class="tdSection tdOrderSection">' +
      "<h2>" + t(lang, "tenantDetail.orderTitle") + "</h2>" +
      orderSection(tenant, lang) +
      "</div>" +
      '<div class="tdSection">' +
      "<h2>" + t(lang, "tenantDetail.promoTitle") + "</h2>" +
      tenantNews(tenant, lang) +
      "</div>" +
      '<div class="tdSection">' +
      managementSection(lang) +
      "</div>" +
      '<div class="tdSection">' +
      "<h2>" + t(lang, "tenantDetail.relatedTitle") + "</h2>" +
      relatedTenants(tenant, lang) +
      "</div>" +
      '<a class="btn secondary tdBackBottom" href="../../index.html#tenants">' + t(lang, "tenantDetail.back") + "</a>";
  }

  /* main.js memanggil hook ini setelah applyTranslations()/renderAll(),
     baik saat halaman pertama dimuat maupun saat bahasa diganti. */
  window.renderTenantPage = renderTenant;
})();
