(function () {
  const lang = document.documentElement.lang === "en" ? "en" : "no";

  const STRINGS = {
    no: {
      all: "Alle",
      latest: "Nyeste",
      read: "Les notatet",
      pages: "sider",
      searchPlaceholder: "Søk i perspektivnotatene …",
      empty: "Fant ingen notater som matcher søket eller filteret.",
      statNotes: "Perspektivnotater",
      statPages: "Sider totalt",
      statTopics: "Temaer",
    },
    en: {
      all: "All",
      latest: "Latest",
      read: "Read the note",
      pages: "pages",
      searchPlaceholder: "Search the perspective notes …",
      empty: "No notes match your search or filter.",
      statNotes: "Perspective notes",
      statPages: "Pages in total",
      statTopics: "Topics",
    },
  };

  const t = STRINGS[lang];

  function formatSize(bytes) {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  }

  function encodeHref(filename) {
    const base = window.PDF_BASE || "";
    return (
      base +
      filename
        .split("/")
        .map(encodeURIComponent)
        .join("/")
    );
  }

  function buildStats(container) {
    if (!container) return;
    const topics = new Set();
    let totalPages = 0;
    NOTES.forEach((n) => {
      n[lang].tags.forEach((tag) => topics.add(tag));
      totalPages += n.pages;
    });
    const stats = [
      { num: NOTES.length, label: t.statNotes },
      { num: totalPages, label: t.statPages },
      { num: topics.size, label: t.statTopics },
    ];
    container.innerHTML = stats
      .map(
        (s) => `
      <div class="stat">
        <div class="num" data-count="${s.num}">0</div>
        <div class="label">${s.label}</div>
      </div>`
      )
      .join("");
    animateCounts(container);
  }

  function animateCounts(container) {
    const els = container.querySelectorAll("[data-count]");
    els.forEach((el) => {
      const target = parseInt(el.getAttribute("data-count"), 10);
      const duration = 700;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  function buildChips(container, onChange) {
    const tagSet = new Set();
    NOTES.forEach((n) => n[lang].tags.forEach((tag) => tagSet.add(tag)));
    const tags = [t.all, ...Array.from(tagSet)];
    container.innerHTML = tags
      .map(
        (tag, i) =>
          `<button type="button" class="chip${i === 0 ? " active" : ""}" data-tag="${tag}">${tag}</button>`
      )
      .join("");
    container.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      container.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      onChange(btn.dataset.tag);
    });
  }

  function cardHtml(note, isLatest) {
    const l = note[lang];
    const href = encodeHref(note.file);
    return `
      <article class="card" data-title="${l.title.toLowerCase()}" data-desc="${l.desc.toLowerCase()}" data-tags="${l.tags.join(",").toLowerCase()}">
        ${isLatest ? `<span class="badge-latest">${t.latest}</span>` : ""}
        <span class="stamp">No.${note.issue}</span>
        <h3>${l.title}</h3>
        <p class="desc">${l.desc}</p>
        <div class="tagrow">${l.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        <div class="meta">
          <span class="filemeta">${note.pages} ${t.pages} · ${formatSize(note.bytes)}</span>
          <a class="read" href="${href}" target="_blank" rel="noopener">
            ${t.read}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </article>`;
  }

  function renderGrid(grid, emptyEl) {
    grid.innerHTML = NOTES.map((n, i) => cardHtml(n, i === 0)).join("");
    const cards = grid.querySelectorAll(".card");
    revealStaggered(cards);
    return cards;
  }

  function revealStaggered(cards) {
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.add("in-view"), 40 * i);
    });
  }

  function applyFilters(cards, emptyEl, query, tag) {
    const q = query.trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const matchesQuery =
        !q ||
        card.dataset.title.includes(q) ||
        card.dataset.desc.includes(q) ||
        card.dataset.tags.includes(q);
      const matchesTag = tag === t.all || card.dataset.tags.includes(tag.toLowerCase());
      const show = matchesQuery && matchesTag;
      card.hidden = !show;
      if (show) visible++;
    });
    emptyEl.classList.toggle("show", visible === 0);
  }

  function init() {
    const grid = document.getElementById("notes-grid");
    const emptyEl = document.getElementById("notes-empty");
    const statsEl = document.getElementById("stats");
    const chipsEl = document.getElementById("chips");
    const searchEl = document.getElementById("search");

    if (searchEl) searchEl.placeholder = t.searchPlaceholder;
    if (emptyEl) emptyEl.textContent = t.empty;

    buildStats(statsEl);
    const cards = renderGrid(grid, emptyEl);

    let currentTag = t.all;
    let currentQuery = "";

    if (chipsEl) {
      buildChips(chipsEl, (tag) => {
        currentTag = tag;
        applyFilters(cards, emptyEl, currentQuery, currentTag);
      });
    }

    if (searchEl) {
      searchEl.addEventListener("input", (e) => {
        currentQuery = e.target.value;
        applyFilters(cards, emptyEl, currentQuery, currentTag);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
