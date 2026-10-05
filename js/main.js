/* ==========================================================================
   IVANAYAO — interactions
   Shared chrome (header / menu / footer), page transitions, reveal
   animations, custom cursor, parallax, and per-page renderers.
   ========================================================================== */
(() => {
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const params = new URLSearchParams(location.search);
  const pageName = document.body.dataset.page;
  const page = $("#page");
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };

  /* ---------------- Theme ---------------- */
  function applyTheme(pref) {
    if (pref === "light" || pref === "dark") document.documentElement.dataset.theme = pref;
    else document.documentElement.removeAttribute("data-theme");
    $$(".theme-switch button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.theme === pref)));
  }

  /* ---------------- Text helpers ---------------- */
  // Rolling letters: each char is stacked twice and slides up on hover.
  function rollify(el) {
    const text = el.dataset.roll || el.textContent.trim();
    const chars = [...text].map((c, i) => {
      const ch = c === " " ? "&nbsp;" : esc(c);
      return `<span class="r" style="--i:${i}"><span>${ch}</span><span>${ch}</span></span>`;
    }).join("");
    el.innerHTML = `<span class="roll-text" aria-hidden="true">${chars}</span><span class="sr-only" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">${esc(text)}</span>`;
  }

  // Split into per-character spans for staggered reveals.
  function charify(el) {
    const text = el.textContent;
    el.setAttribute("aria-label", text.trim());
    el.innerHTML = text.split(/(\s+)/).map((word) => {
      if (/^\s+$/.test(word)) return " ";
      return `<span class="chars" aria-hidden="true">${[...word].map((c) => `<span class="ch">${esc(c)}</span>`).join("")}</span>`;
    }).join("");
    $$(".ch", el).forEach((c, i) => c.style.setProperty("--i", i));
  }

  function splitLines(el) {
    el.innerHTML = el.innerHTML.split(/<br\s*\/?>/i).map((l, i) => `<span class="split-line"><span style="--d:${i * 0.08}s">${l}</span></span>`).join("");
  }

  /* ---------------- Shared chrome ---------------- */
  const navItems = [
    { href: "index.html", label: "Work", key: "home" },
    { href: "studio.html", label: "Studio", key: "studio" },
    { href: "insights.html", label: "Insights", key: "insights" },
    { href: "contact.html", label: "Contact", key: "contact" },
  ];
  const isCurrent = (key) => key === pageName || (key === "home" && pageName === "project") || (key === "insights" && pageName === "article");

  function contactInfoHTML() {
    return `
      <div class="contact-info">
        <p class="addr">${S.address.map(esc).join("<br>")}</p>
        <div class="copy-row">
          <a class="link-u" href="mailto:${esc(S.email)}">${esc(S.email)}</a>
          <button class="copy-btn" type="button" data-copy="${esc(S.email)}" aria-label="Copy email address"><span class="copy-tip">Copied!</span></button>
        </div>
        <a class="link-u" style="width:fit-content" href="tel:${esc(S.phone.replace(/[^+\d]/g, ""))}">${esc(S.phone)}</a>
        <div class="socials-inline">${S.socials.map((s) => `<a href="${esc(s.href)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join("")}</div>
      </div>`;
  }

  function buildChrome() {
    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
      <a class="logo" href="index.html" aria-label="${esc(S.name)} home"><img src="${S.logo}" alt=""><span class="logo-word">${esc(S.brand)}</span></a>
      <button class="menu-btn roll" type="button" aria-expanded="false" aria-controls="menu" data-roll="MENU">MENU</button>`;
    page.prepend(header);

    const menu = document.createElement("nav");
    menu.className = "menu";
    menu.id = "menu";
    menu.setAttribute("aria-label", "Main");
    menu.innerHTML = `
      <button class="menu-close roll" type="button" data-roll="CLOSE">CLOSE</button>
      <div class="menu-links">${navItems.map((n) => `<a href="${n.href}" class="${isCurrent(n.key) ? "is-current" : ""}"><span>${n.label.toUpperCase()}</span></a>`).join("")}</div>
      <div class="theme-switch menu-fade" role="group" aria-label="Colour theme">
        <button type="button" data-theme="light">LIGHT</button>
        <button type="button" data-theme="dark">DARK</button>
        <button type="button" data-theme="system">SYSTEM</button>
      </div>
      <div class="menu-legal menu-fade"><a href="privacy.html">PRIVACY POLICY</a><a href="terms.html">TERMS OF SERVICE</a></div>
      <p class="menu-copy menu-fade">©${new Date().getFullYear()} ${esc(S.name)}. ALL RIGHTS RESERVED.</p>`;
    document.body.append(menu);

    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="f-top">
        ${contactInfoHTML()}
        <nav class="f-nav" aria-label="Footer">${navItems.map((n) => `<a href="${n.href}">${n.label.toUpperCase()}</a>`).join("")}</nav>
        <div class="f-small">
          <a class="link-u" href="privacy.html">PRIVACY POLICY</a>
          <a class="link-u" href="terms.html">TERMS OF SERVICE</a>
          <a class="link-u" href="404.html">404</a>
        </div>
      </div>
      <div class="f-cta">
        <p class="display">GOT A PROJECT<br>IN MIND?</p>
        <a class="btn roll" href="contact.html"><span data-roll="Start a project">Start a project</span><span class="arrow">→</span></a>
      </div>
      <div class="f-word" aria-hidden="true"><img src="${S.logo}" alt=""><span class="w">${esc(S.brand)}</span></div>
      <div class="f-bottom">
        <span>©${new Date().getFullYear()} ${esc(S.name)}. ALL RIGHTS RESERVED.</span>
        <a href="#" data-top class="roll" data-roll="BACK TO TOP ↑">BACK TO TOP ↑</a>
      </div>`;
    page.append(footer);

    const cursor = document.createElement("div");
    cursor.className = "cursor";
    cursor.innerHTML = "<span></span>";
    document.body.append(cursor);
  }

  /* ---------------- Menu (page tilts away to reveal it) ---------------- */
  function initMenu() {
    const btn = $(".menu-btn");
    const body = document.body;
    let closeTimer;
    const open = () => {
      clearTimeout(closeTimer);
      body.classList.remove("menu-closing");
      body.classList.add("menu-open");
      btn.setAttribute("aria-expanded", "true");
      setTimeout(() => $(".menu-close").focus({ preventScroll: true }), 400);
    };
    const close = () => {
      if (!body.classList.contains("menu-open")) return;
      body.classList.remove("menu-open");
      body.classList.add("menu-closing");
      btn.setAttribute("aria-expanded", "false");
      closeTimer = setTimeout(() => body.classList.remove("menu-closing"), 1000);
    };
    btn.addEventListener("click", open);
    $(".menu-close").addEventListener("click", close);
    page.addEventListener("click", (e) => {
      if (body.classList.contains("menu-open")) { e.preventDefault(); e.stopPropagation(); close(); }
    }, true);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

    $$(".theme-switch button").forEach((b) => b.addEventListener("click", () => {
      store.set("theme", b.dataset.theme);
      applyTheme(b.dataset.theme);
    }));
    applyTheme(store.get("theme") || "system");
  }

  /* ---------------- Page transitions ---------------- */
  function initTransitions() {
    let curtain = $(".curtain");
    if (!curtain) {
      curtain = document.createElement("div");
      curtain.className = "curtain";
      curtain.innerHTML = `<img src="${S.logo}" alt="">`;
      document.body.append(curtain);
    }
    const reveal = () => requestAnimationFrame(() => {
      curtain.className = "curtain is-out";
      document.body.classList.add("loaded");
    });
    setTimeout(reveal, 450);

    window.addEventListener("pageshow", (e) => { if (e.persisted) { curtain.className = "curtain is-out"; document.body.classList.remove("menu-open"); } });

    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.protocol !== location.protocol || url.host !== location.host) return;
      if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
      if (a.getAttribute("href").startsWith("#")) {
        if (a.getAttribute("href") === "#") e.preventDefault(); // placeholder links do nothing
        return;
      }
      e.preventDefault();
      curtain.className = "curtain is-in";
      void curtain.offsetWidth;
      curtain.classList.add("go");
      setTimeout(() => { location.href = url.href; }, 720);
    });
  }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveals() {
    $$("[data-roll]").forEach((el) => { if (!el.querySelector(".roll-text")) rollify(el); });
    $$("[data-split='chars']").forEach(charify);
    $$("[data-split='lines']").forEach(splitLines);

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        // Hold above-the-fold reveals until the curtain has lifted.
        const go = () => {
          el.classList.add("in");
          if (el.dataset.count !== undefined) countUp(el);
        };
        document.body.classList.contains("loaded") ? go() : setTimeout(go, 600);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    $$("[data-reveal], [data-split], [data-count], .f-word").forEach((el) => io.observe(el));
  }

  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const dur = 1600;
    const t0 = performance.now();
    const fmt = (n) => Math.round(n).toLocaleString("en-US");
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = fmt(target * (1 - Math.pow(1 - p, 4))) + (el.dataset.suffix || "");
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------------- Parallax ---------------- */
  function initParallax() {
    let items = $$(".parallax img");
    let ticking = false;
    const update = () => {
      const vh = innerHeight;
      items.forEach((img) => {
        const r = img.parentElement.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const off = (r.top + r.height / 2 - vh / 2) / vh;
        img.style.translate = `0 ${(-off * r.height * 0.08).toFixed(1)}px`;
      });
      ticking = false;
    };
    page.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener("resize", update);
    update();
    return () => { items = $$(".parallax img"); update(); };
  }

  /* ---------------- Cursor ---------------- */
  function initCursor() {
    const c = $(".cursor");
    if (matchMedia("(hover: none)").matches) return;
    const label = $("span", c);
    let x = -100, y = -100, cx = x, cy = y, running = false;
    const loop = () => {
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18;
      c.style.transform = `translate(${cx}px, ${cy}px)`;
      // Only keep animating while the dot is still catching up with the mouse.
      if (Math.abs(x - cx) + Math.abs(y - cy) > 0.3) requestAnimationFrame(loop); else running = false;
    };
    addEventListener("mousemove", (e) => {
      x = e.clientX; y = e.clientY;
      if (!running) { running = true; requestAnimationFrame(loop); }
      c.classList.add("is-visible");
      const t = e.target.closest("[data-cursor]");
      const link = e.target.closest("a, button, label, select, input, textarea");
      if (t) { label.textContent = t.dataset.cursor; c.classList.add("has-label"); c.classList.remove("is-link"); }
      else { c.classList.remove("has-label"); c.classList.toggle("is-link", !!link); }
    });
    document.addEventListener("mouseleave", () => c.classList.remove("is-visible"));
  }

  /* ---------------- Small shared widgets ---------------- */
  function initCopy() {
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-copy]");
      if (!b) return;
      const done = () => { b.classList.add("copied"); setTimeout(() => b.classList.remove("copied"), 1500); };
      if (navigator.clipboard) navigator.clipboard.writeText(b.dataset.copy).then(done, done); else done();
    });
    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-top]")) { e.preventDefault(); page.scrollTo({ top: 0, behavior: "smooth" }); }
    });
  }

  function renderFaq() {
    $$("[data-faq]").forEach((host) => {
      host.innerHTML = window.FAQS.map((f, i) => `
        <div class="faq-item" data-reveal style="--d:${i * 0.05}s">
          <button class="faq-q" type="button" aria-expanded="false"><span>${esc(f.q)}</span><span class="ico" aria-hidden="true"></span></button>
          <div class="faq-a" role="region"><div><p>${esc(f.a)}</p></div></div>
        </div>`).join("");
    });
    document.addEventListener("click", (e) => {
      const q = e.target.closest(".faq-q");
      if (!q) return;
      const item = q.parentElement;
      const open = !item.classList.contains("open");
      $$(".faq-item.open", item.parentElement).forEach((o) => { o.classList.remove("open"); $(".faq-q", o).setAttribute("aria-expanded", "false"); });
      item.classList.toggle("open", open);
      q.setAttribute("aria-expanded", String(open));
    });
  }

  function contactSlots() {
    $$("[data-contact-info]").forEach((h) => (h.innerHTML = contactInfoHTML()));
    $$("[data-tagline]").forEach((h) => (h.innerHTML = S.tagline.map((p) => p.b ? `<b>${esc(p.t)}</b>` : esc(p.t)).join("")));
  }

  /* ---------------- Page renderers ---------------- */
  const workCard = (p, i) => `
    <a class="work-card hover-zoom" href="project.html?slug=${p.slug}" data-cursor="VIEW">
      <div class="media parallax" data-reveal="clip"><img src="${p.cover}" alt="${esc(p.title)} — ${esc(p.category)}" ${i > 0 ? 'loading="lazy"' : ""}></div>
      <div class="meta"><span>${esc(p.category.toUpperCase())}</span><span>${esc(p.tag.toUpperCase())}</span></div>
      <h2 class="title" data-split="chars">${esc(p.title)}</h2>
    </a>`;

  const renderers = {
    home() {
      const projects = window.PROJECTS;
      $("#work-list").innerHTML = projects.map(workCard).join("");

      // List view: each preview is a 6×8 grid of tiles that pop in at random delays.
      const COLS = 6, ROWS = 8;
      const tiles = () => Array.from({ length: COLS * ROWS }, (_, i) => {
        const x = (i % COLS) / (COLS - 1) * 100, y = Math.floor(i / COLS) / (ROWS - 1) * 100;
        return `<span class="tile" style="background-position:${x}% ${y}%;--d:${(Math.random() * 0.35).toFixed(3)}s"></span>`;
      }).join("");
      $("#work-rows").innerHTML = projects.map((p, i) => `
        <a class="wrow" href="project.html?slug=${p.slug}" data-reveal style="--d:${(i * 0.06).toFixed(2)}s">
          <span class="cat">${esc(p.category.toUpperCase())}</span>
          <span class="t">${esc(p.title)}</span>
          <span class="yr">${esc(p.tag.toUpperCase())}</span>
          <span class="preview" aria-hidden="true" style="--img:url('${new URL(p.cover, location.href).href}')">${tiles()}</span>
        </a>`).join("");
      // Preload so the first hover shows the image instantly.
      addEventListener("load", () => projects.forEach((p) => { new Image().src = p.cover; }));

      const home = $("#home");
      const setView = (v) => {
        home.dataset.view = v;
        $$(".view-switch button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.view === v)));
        page.scrollTo({ top: 0 });
        // Reveal anything already on screen in the newly shown view.
        requestAnimationFrame(() => $$("[data-reveal], [data-split]", home).forEach((el) => {
          if (el.getBoundingClientRect().top < innerHeight) el.classList.add("in");
        }));
      };
      $$(".view-switch button").forEach((b) => b.addEventListener("click", () => {
        store.set("homeView", b.dataset.view);
        setView(b.dataset.view);
      }));
      if (store.get("homeView") === "gallery") setView("gallery");
    },

    project() {
      const list = window.PROJECTS;
      let idx = Math.max(0, list.findIndex((p) => p.slug === params.get("slug")));
      const p = list[idx];
      const next = list[(idx + 1) % list.length];
      // Case-study copy: the project's own fields win, placeholders fill the gaps.
      const c = { ...window.PROJECT_PLACEHOLDER, ...p };
      document.title = `${p.title} — ${S.name}`;
      $("#app").innerHTML = `
        <section class="p-hero">
          <div class="side"></div>
          <div class="main">
            <div data-reveal="fade">${esc(p.category.toUpperCase())}<br>${esc(p.tag.toUpperCase())}</div>
            <h1 class="display" data-split="chars">${esc(p.title)}</h1>
          </div>
        </section>
        <section class="p-body">
          <div><div class="p-sticky"><p data-reveal>${esc(p.excerpt.toUpperCase())}</p></div></div>
          <div>
            ${p.full
              // Website projects: full-page screenshot that scrolls inside a browser frame on hover.
              ? `<div class="browser" data-reveal="clip" data-cursor="SCROLL">
                   <div class="browser-bar"><i></i><i></i><i></i><span>${esc(p.title.toLowerCase())}</span></div>
                   <div class="browser-view"><img src="${p.full}" alt="${esc(p.title)} — full page design"></div>
                 </div>`
              : `<div class="media parallax p-hero-img" data-reveal="clip"><img src="${p.cover}" alt="${esc(p.title)}"></div>`}
            <p class="p-lead" data-reveal>${esc(p.about)}</p>
            ${[["Overview", c.overview], ["Challenge", c.challenge], ["Our Approach", c.approach], ["Outcome", c.outcome],
               ["Role in the project", p.role], ["Tools", p.tools]].map(([h, t]) => `
              <div class="p-block" data-reveal><h3>${h}</h3><p>${esc(t.toUpperCase())}</p></div>`).join("")}
            ${p.gallery ? `<div class="p-shots">${p.gallery.map((g) => `<div class="media" data-reveal="clip"><img src="${g}" alt="${esc(p.title)} artwork" loading="lazy"></div>`).join("")}</div>` : ""}
            <div class="p-credits" data-reveal>${c.credits.map((n) => `<span>${esc(n)}</span>`).join("")}</div>
            <a class="btn roll" href="${esc(p.url || "#")}" ${p.url ? 'target="_blank" rel="noopener"' : ""} data-reveal><span data-roll="Live project">Live project</span><span class="arrow up">↗</span></a>
            <blockquote class="p-quote" data-reveal>“${esc(c.quote)}”</blockquote>
            <p data-reveal>${esc(c.quoteBy)}</p>
          </div>
        </section>
        <a class="next-project" href="project.html?slug=${next.slug}" data-cursor="NEXT">
          <hr class="hr" style="margin-bottom:40px">
          <p class="label">NEXT PROJECT</p>
          <h2 class="display big" data-split="chars">${esc(next.title)}</h2>
          <div class="np-row">
            <div><p style="max-width:300px">${esc(next.excerpt.toUpperCase())}</p><span class="btn roll"><span data-roll="View Project">View Project</span><span class="arrow">→</span></span></div>
            <div class="media hover-zoom" data-reveal="clip"><img src="${next.cover}" alt="" loading="lazy" style="object-position:top"></div>
          </div>
        </a>`;
      $(".next-project").classList.add("hover-zoom");

      // Scroll distance and speed depend on how tall the screenshot is.
      const view = $(".browser-view");
      if (view) {
        const shot = $("img", view);
        const measure = () => {
          const shift = Math.max(0, shot.offsetHeight - view.clientHeight);
          view.style.setProperty("--shift", `${-shift}px`);
          view.style.setProperty("--dur", `${Math.max(1.5, shift / 450).toFixed(1)}s`);
        };
        shot.complete ? measure() : shot.addEventListener("load", measure);
        addEventListener("resize", measure);
      }
    },

    insights() {
      const grid = $("#posts");
      grid.innerHTML = window.ARTICLES.map((a, i) => `
        <a class="post hover-zoom" href="article.html?slug=${a.slug}" data-type="${a.type}" data-reveal style="--d:${(i % 2) * 0.1}s" data-cursor="READ">
          <div class="media"><img src="${a.img}" alt="" loading="lazy"></div>
          <div class="row"><span class="tag">${a.type.toUpperCase()}</span><span>${a.date.toUpperCase()}</span></div>
          <h3>${esc(a.title)}</h3>
          <p>${esc(a.excerpt.toUpperCase())}</p>
          <span class="roll"><span data-roll="Read more">Read more</span><span class="arrow">→</span></span>
        </a>`).join("");
      $$(".filters button").forEach((b) => b.addEventListener("click", () => {
        $$(".filters button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        const f = b.dataset.filter;
        const posts = $$(".post", grid);
        posts.forEach((p) => p.classList.add("is-leaving"));
        setTimeout(() => {
          posts.forEach((p) => {
            p.classList.toggle("is-hidden", f !== "all" && p.dataset.type !== f);
            p.classList.add("in");
          });
          requestAnimationFrame(() => requestAnimationFrame(() => posts.forEach((p) => p.classList.remove("is-leaving"))));
        }, 300);
      }));
    },

    article() {
      const list = window.ARTICLES;
      const idx = Math.max(0, list.findIndex((a) => a.slug === params.get("slug")));
      const a = list[idx];
      const body = a.body || window.ARTICLE_BODY;
      const more = [list[(idx + 1) % list.length], list[(idx + 2) % list.length]];
      document.title = `${a.title} — ${S.name}`;
      $("#app").innerHTML = `
        <section class="a-hero">
          <div class="row" data-reveal="fade"><span class="tag" style="background:var(--fg);color:var(--bg);padding:3px 6px">${a.type.toUpperCase()}</span><span>${a.date.toUpperCase()}</span></div>
          <h1 class="display" data-split="chars">${esc(a.title)}</h1>
        </section>
        <div class="media parallax a-img" data-reveal="clip"><img src="${a.img}" alt=""></div>
        <section class="a-body">
          <div class="share" data-reveal>
            <span class="muted">SHARE</span>
            <a class="link-u" style="width:fit-content" href="https://x.com/intent/tweet?url=${encodeURIComponent(location.href)}" target="_blank" rel="noopener">X</a>
            <a class="link-u" style="width:fit-content" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(location.href)}" target="_blank" rel="noopener">LINKEDIN</a>
            <button class="link-u" style="width:fit-content;position:relative" data-copy="${esc(location.href)}">COPY LINK<span class="copy-tip" style="left:100%;margin-left:8px">Copied!</span></button>
          </div>
          <div class="content">${body.map((t) => t.startsWith("## ") ? `<h2 data-reveal>${esc(t.slice(3))}</h2>` : `<p data-reveal>${esc(t)}</p>`).join("")}</div>
        </section>
        <section class="section" style="padding-top:0">
          <hr class="hr" style="margin-bottom:40px">
          <h2 class="section-title" data-split="chars">KEEP READING</h2>
          <div class="i-grid">${more.map((m) => `
            <a class="post hover-zoom" href="article.html?slug=${m.slug}" data-reveal data-cursor="READ">
              <div class="media"><img src="${m.img}" alt="" loading="lazy"></div>
              <div class="row"><span class="tag">${m.type.toUpperCase()}</span><span>${m.date.toUpperCase()}</span></div>
              <h3>${esc(m.title)}</h3><p>${esc(m.excerpt.toUpperCase())}</p>
            </a>`).join("")}</div>
        </section>`;
      // copy-link button reuses the shared copy handler; give it the tooltip behaviour
      const cb = $(".share [data-copy]");
      cb.classList.add("copy-btn");
      cb.style.cssText += ";border:0;width:auto;height:auto";
    },

    studio() {
      const fp = window.PROJECTS[0];
      $("#featured").innerHTML = `
        <div data-reveal>
          <p class="label">FEATURED PROJECT</p>
          <h3>${esc(fp.title)}</h3>
          <p>${esc(fp.excerpt.toUpperCase())}</p>
          <a class="btn roll" href="project.html?slug=${fp.slug}"><span data-roll="View Project">View Project</span><span class="arrow">→</span></a>
        </div>
        <a class="media parallax hover-zoom" style="display:block" href="project.html?slug=${fp.slug}" data-reveal="clip" data-cursor="VIEW"><img src="${fp.cover}" alt="${esc(fp.title)}" loading="lazy"></a>`;

      // Pricing toggle with animated pill + counting prices
      const tog = $(".toggle");
      const pill = $(".pill", tog);
      const movePill = (b) => { pill.style.width = b.offsetWidth + "px"; pill.style.transform = `translateX(${b.offsetLeft}px)`; };
      const setPeriod = (b) => {
        $$("button", tog).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        movePill(b);
        const yearly = b.dataset.period === "yearly";
        $$("[data-price]").forEach((el) => {
          const base = +el.dataset.price;
          el.dataset.count = yearly ? Math.round(base * 0.8) : base;
          countUp(el);
        });
      };
      $$("button", tog).forEach((b) => b.addEventListener("click", () => setPeriod(b)));
      requestAnimationFrame(() => movePill($("button[aria-pressed='true']", tog)));
      addEventListener("resize", () => movePill($("button[aria-pressed='true']", tog)));
    },

    contact() {
      const a = window.ARTICLES[0];
      $("#teaser").innerHTML = `
        <div data-reveal>
          <p class="label">OUR INSIGHTS</p>
          <h3>${esc(a.title.toUpperCase())}</h3>
          <p style="max-width:320px;margin:0 0 20px">${esc(a.excerpt.toUpperCase())}</p>
          <a class="btn roll" href="article.html?slug=${a.slug}"><span data-roll="Read More">Read More</span><span class="arrow">→</span></a>
        </div>
        <a class="media parallax hover-zoom" style="display:block" href="article.html?slug=${a.slug}" data-reveal="clip" data-cursor="READ"><img src="${a.img}" alt="" loading="lazy"></a>`;

      const form = $("#contact-form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        let ok = true;
        $$("[required]", form).forEach((inp) => {
          const valid = inp.value.trim() && (inp.type !== "email" || /.+@.+\..+/.test(inp.value));
          inp.closest(".field").classList.toggle("error", !valid);
          if (!valid) ok = false;
        });
        if (!ok) return;
        // No backend yet — hook this up to Formspree, Netlify Forms, or your own endpoint.
        form.classList.add("sent");
        page.scrollTo({ top: form.offsetTop - 120, behavior: "smooth" });
      });
      $$("[required]", form).forEach((inp) => inp.addEventListener("input", () => inp.closest(".field").classList.remove("error")));
    },
  };

  /* ---------------- Boot ---------------- */
  buildChrome();
  contactSlots();
  renderFaq();
  renderers[pageName]?.();
  initMenu();
  initReveals();
  initParallax();
  initCursor();
  initCopy();
  initTransitions();
})();
