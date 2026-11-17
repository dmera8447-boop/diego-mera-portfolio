/**
 * Portafolio en PDF (16:9) con el mismo sistema visual del sitio.
 *
 *   node scripts/portfolio-pdf/build.mjs          → ES y EN
 *   node scripts/portfolio-pdf/build.mjs es --shots
 *
 * Lee los textos del diccionario y de los MDX de los casos, arma un HTML
 * por idioma, lo pagina en Chrome sin interfaz y lo imprime a PDF por CDP.
 * Salida en portfolio-pdf/ (ignorada por git).
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import os from "node:os";
import matter from "gray-matter";
import sharp from "sharp";
import { getDictionary } from "../../src/i18n/dictionaries.ts";

const ROOT = path.resolve(import.meta.dirname, "../..");
const OUT = path.join(ROOT, "portfolio-pdf");
const CASES = path.join(ROOT, "content", "case-studies");
const PUBLIC = path.join(ROOT, "public");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const SITE = {
  url: "https://diego-mera-portfolio.vercel.app",
  urlDisplay: "diego-mera-portfolio.vercel.app",
  email: "diego.mera2002@hotmail.com",
  whatsapp: "593993357160",
  whatsappDisplay: "+593 99 335 7160",
  linkedin: "https://linkedin.com/in/diegomerarojas",
  linkedinDisplay: "linkedin.com/in/diegomerarojas",
};

// Textos propios del PDF (lo demás sale del diccionario del sitio)
const PDF_TEXT = {
  es: {
    title: "Diego Mera — Portafolio",
    file: "Diego-Mera-Portafolio-ES.pdf",
    website: "Sitio web",
    contactPath: "/contact#agenda",
    casesFull: "Cada caso completo, en",
    workIntro: "Cinco proyectos recientes, de dashboards multirol a sitios corporativos.",
  },
  en: {
    title: "Diego Mera — Portfolio",
    file: "Diego-Mera-Portfolio-EN.pdf",
    website: "Website",
    contactPath: "/en/contact#agenda",
    casesFull: "Every case in full at",
    workIntro: "Five recent projects, from multi-role dashboards to corporate websites.",
  },
};

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const filled = (v) => !!v && !String(v).trim().startsWith("[");
const fileUrl = (p) => "file://" + path.join(PUBLIC, p);

function inline(text) {
  return esc(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

/** Markdown mínimo de los casos → secciones { title, blocks } y figuras. */
function parseBody(md) {
  const sections = [];
  const figures = [];
  let current = null;
  for (const chunk of md.split(/\n\s*\n/)) {
    const text = chunk.trim();
    if (!text) continue;
    const fig = text.match(/^<Figure\s+src="([^"]+)"\s+alt="([^"]*)"\s*\/>$/);
    if (fig) {
      figures.push({ src: fig[1], alt: fig[2] });
      continue;
    }
    if (text.startsWith("## ")) {
      current = { title: text.slice(3).trim(), blocks: [] };
      sections.push(current);
      continue;
    }
    if (!current) continue;
    const lines = text.split("\n");
    if (lines.every((l) => /^- /.test(l))) {
      current.blocks.push(`<ul>${lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join("")}</ul>`);
    } else if (lines.every((l) => /^\d+\. /.test(l))) {
      current.blocks.push(`<ol>${lines.map((l) => `<li>${inline(l.replace(/^\d+\. /, ""))}</li>`).join("")}</ol>`);
    } else {
      current.blocks.push(`<p>${inline(lines.join(" "))}</p>`);
    }
  }
  return { sections, figures };
}

async function loadCases(lang) {
  const files = (await fs.readdir(CASES)).filter((f) => f.endsWith(".mdx"));
  const cases = [];
  for (const file of files) {
    const es = matter(await fs.readFile(path.join(CASES, file), "utf-8"));
    let data = es.data;
    let content = es.content;
    if (lang === "en") {
      try {
        const en = matter(await fs.readFile(path.join(CASES, "en", file), "utf-8"));
        data = { ...es.data };
        for (const [k, v] of Object.entries(en.data)) if (v !== "" && v != null) data[k] = v;
        if (en.content.trim()) content = en.content;
      } catch {}
    }
    if (data.hidden) continue;
    cases.push({ slug: file.replace(/\.mdx$/, ""), ...data, ...parseBody(content) });
  }
  return cases.sort((a, b) => a.order - b.order);
}

/** Color de la esquina de una imagen: fondo de su página a sangre. */
async function cornerColor(src) {
  const { data } = await sharp(path.join(PUBLIC, src))
    .extract({ left: 6, top: 6, width: 1, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  return `rgb(${data[0]},${data[1]},${data[2]})`;
}

const logo = `<svg class="logo" viewBox="-140 -288 887 887" aria-hidden="true"><rect x="-140" y="-288" width="887" height="887" fill="var(--ink)"/><path fill="#fff" fill-rule="evenodd" d="M225.242 55.3533C319.64 161.244 250.88 306.792 125.289 310.304C123.169 310.364 3.89899 310.379 3.13479 310.351C-0.10416 310.236 1.10981 307.897 0.800468 113.579C0.651902 19.8083 -1.06475 19.6597 1.04062 11.7938C1.53007 9.96319 124.328 7.81815 150.627 13.3171C194.01 22.3899 220.266 50.7233 225.242 55.3533Z"/><path fill="#fff" fill-rule="evenodd" d="M269.579 110.736C262.381 102.926 262.248 103.105 261.805 102.301C261.157 101.125 261.415 3.40387 261.835 2.76585C264.675 -1.55174 394.573 116.272 426.806 142.699C432.222 147.139 432.675 143.85 438.029 139.434C485.468 100.304 484.64 99.7013 531.885 60.1583C601.493 1.89887 603.652 -4.07432 606.166 1.77777C606.467 2.47888 606.318 305.237 606.286 305.877C606.084 309.8 603.619 307.861 511.964 308.293C465.151 308.512 463.363 310.987 454.04 301.754C448.567 296.334 270.928 112.168 269.579 110.736Z"/></svg>`;

async function buildHtml(lang) {
  const t = getDictionary(lang);
  const p = PDF_TEXT[lang];
  const cases = await loadCases(lang);
  const pages = [];
  const footer = (label) =>
    `<footer class="foot"><span>${esc(label)}</span><span class="num"></span></footer>`;

  // 1. Portada: la firma en grande
  pages.push(`<section class="page cover">
    <header class="bar">${logo}<span class="who">Diego Mera</span><span class="soft">${esc(t.common.availability)}</span></header>
    <p class="lead statement">${esc(t.home.statement)}</p>
    <div class="name-fit"><span class="name">Diego Mera</span></div>
  </section>`);

  // 2. Sobre mí
  pages.push(`<section class="page about">
    <div class="grid">
      <img class="portrait" src="${fileUrl("/about/retrato.jpg")}" alt="${esc(t.home.about.portrait)}">
      <div class="about-text">
        <h2 class="h2">${esc(t.about.h1)}</h2>
        <p class="lead">${esc(t.about.statement)}</p>
        ${t.about.story.map((s) => `<p>${esc(s)}</p>`).join("")}
        <p class="skills">${esc(t.home.about.skills)}</p>
      </div>
    </div>
    ${footer(t.home.about.title)}
  </section>`);

  // 3. Cifras y proceso
  const colors = ["s-ink", "s-ink2", "s-signal", "s-tone2", "s-tone"];
  pages.push(`<section class="page numbers">
    <h2 class="h2">${esc(t.home.numbers.title)}</h2>
    <ul class="stats">${t.home.numbers.items
      .map((n) => `<li><span class="stat">${esc(n.value)}</span><span>${esc(n.label)}</span></li>`)
      .join("")}</ul>
    <h2 class="h2 process-title">${esc(t.home.process.title)}</h2>
    <ol class="process">${t.home.process.stages
      .map(
        (s, i) =>
          `<li style="flex-grow:${s.weight}"><div class="stage ${colors[i]}"><span class="title">${esc(s.name)}</span></div><p>${esc(s.desc)}</p></li>`,
      )
      .join("")}</ol>
    ${footer(t.nav.process)}
  </section>`);

  // 4. Índice de trabajo
  pages.push(`<section class="page index">
    <h2 class="h2">${esc(t.home.work.title)}</h2>
    <p class="lead index-intro">${esc(p.workIntro)}</p>
    <ol class="rows">${cases
      .map(
        (c) =>
          `<li><a href="#${c.slug}"><span class="row-name">${esc(c.shortTitle)}</span><span class="soft">${esc(c.kind)}</span><span class="soft">${esc(c.year)}</span><span class="row-page" data-page-of="${c.slug}"></span></a></li>`,
      )
      .join("")}</ol>
    ${footer(t.nav.work)}
  </section>`);

  // 5. Casos: portada, texto paginado y mockups a sangre
  for (const c of cases) {
    const meta = [
      [t.caseStudy.labels.client, c.company],
      [t.caseStudy.labels.role, c.role],
      [t.caseStudy.labels.team, c.team],
      [t.caseStudy.labels.duration, c.duration],
      [t.caseStudy.labels.platform, c.platform],
      [t.caseStudy.labels.year, c.year],
    ].filter(([, v]) => filled(v));
    const live = filled(c.liveUrl)
      ? `<a class="link" href="${esc(c.liveUrl)}">${esc(t.caseStudy.live)} ↗</a>`
      : "";
    pages.push(`<section class="page case-cover" id="${c.slug}">
      <div class="grid">
        <div class="case-head">
          <h1 class="h1">${esc(c.shortTitle)}</h1>
          <p class="lead">${esc(c.description)}</p>
          <dl>${meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
          ${live}
        </div>
        <div class="case-hero"><img src="${fileUrl(c.hero)}" alt="${esc(c.shortTitle)}"></div>
      </div>
      ${footer(c.shortTitle)}
    </section>`);

    // Las secciones se reparten en páginas en el navegador (ver paginate())
    pages.push(`<div class="flow" data-label="${esc(c.shortTitle)}">${c.sections
      .map(
        (s) =>
          `<article class="sec"><h2 class="h3">${esc(s.title)}</h2><div class="sec-body">${s.blocks.join("")}</div></article>`,
      )
      .join("")}</div>`);

    // 16:9 y 16:10 van a sangre, una por página; las demás, en pares sobre papel
    const wide = [];
    const other = [];
    for (const f of c.figures) {
      const { width, height } = await sharp(path.join(PUBLIC, f.src)).metadata();
      (width / height >= 1.55 ? wide : other).push(f);
    }
    for (const f of wide) {
      const bg = await cornerColor(f.src);
      pages.push(`<section class="page figure" style="background:${bg}"><img src="${fileUrl(f.src)}" alt="${esc(f.alt)}"></section>`);
    }
    for (let i = 0; i < other.length; i += 2) {
      pages.push(`<section class="page pair">${other
        .slice(i, i + 2)
        .map((f) => `<div class="pair-img"><img src="${fileUrl(f.src)}" alt="${esc(f.alt)}"></div>`)
        .join("")}${footer(c.shortTitle)}</section>`);
    }
  }

  // 6. Experiencia y certificaciones
  const cert = t.about.certs;
  pages.push(`<section class="page cv">
    <div class="grid">
      <div class="xp">
        <h2 class="h2">${esc(t.about.experience.title)}</h2>
        <ul>${t.about.experience.items
          .map(
            (x) =>
              `<li><span class="soft">${esc(x.years)}</span><div><span class="title">${esc(x.role)}</span><span class="soft">${esc(x.place)}</span></div></li>`,
          )
          .join("")}</ul>
      </div>
      <div class="certs">
        <h2 class="h2">${esc(cert.title)}</h2>
        <a class="cert-card" href="${esc(cert.featured.url)}">
          <span class="on-ink-soft">${esc(cert.featured.meta)}</span>
          <span class="cert-name">${esc(cert.featured.name)}</span>
          <span class="on-ink-soft">${esc(cert.featured.desc)}</span>
          <span class="cert-cta">${esc(cert.featured.cta)} ↗</span>
        </a>
        <ul class="courses">${cert.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
      </div>
    </div>
    ${footer(t.about.experience.title)}
  </section>`);

  // 7. Cierre: contacto y la firma sobre tinta
  pages.push(`<section class="page close">
    <div class="close-top">
      <h2 class="h1">${esc(t.home.contact.title)}</h2>
      <a class="btn" href="${SITE.url}${p.contactPath}">${esc(t.common.bookCall)}</a>
    </div>
    <dl class="channels">
      <div><dt>${esc(t.contact.channels.whatsapp)}</dt><dd><a href="https://wa.me/${SITE.whatsapp}">${SITE.whatsappDisplay}</a></dd></div>
      <div><dt>${esc(t.contact.channels.email)}</dt><dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd></div>
      <div><dt>${esc(t.contact.channels.linkedin)}</dt><dd><a href="${SITE.linkedin}">${SITE.linkedinDisplay}</a></dd></div>
      <div><dt>${esc(p.website)}</dt><dd><a href="${SITE.url}${lang === "en" ? "/en" : ""}">${SITE.urlDisplay}</a></dd></div>
    </dl>
    <div class="name-fit"><span class="name">Diego Mera</span></div>
  </section>`);

  const css = await fs.readFile(path.join(import.meta.dirname, "print.css"), "utf-8");
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8">
<title>${esc(p.title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;500&display=block" rel="stylesheet">
<style>${css}</style></head><body>${pages.join("\n")}
<script>${paginate.toString()}; paginate();</script></body></html>`;
}

/** Corre en el navegador: reparte las secciones de cada caso en páginas 16:9. */
function paginate() {
  const make = (label) => {
    const page = document.createElement("section");
    page.className = "page text";
    page.innerHTML =
      '<div class="cols"><div class="col"></div><div class="col"></div></div><footer class="foot"><span></span><span class="num"></span></footer>';
    page.querySelector(".foot span").textContent = label;
    return page;
  };
  document.fonts.ready.then(() => {
    for (const flow of document.querySelectorAll(".flow")) {
      const label = flow.dataset.label;
      let page, cols, ci, col;
      const newPage = () => {
        page = make(label);
        flow.before(page);
        cols = page.querySelectorAll(".col");
        ci = 0;
        col = cols[0];
      };
      // Siguiente columna; si era la segunda, página nueva
      const advance = () => (ci === 0 ? ((ci = 1), (col = cols[1])) : newPage());
      const fits = () => col.scrollHeight <= col.clientHeight;
      newPage();
      for (const sec of [...flow.children]) {
        col.append(sec);
        if (fits()) continue;
        // Sin espacio: la sección pasa entera a la siguiente columna; si ni así
        // cabe, se parte por bloques y el título queda con su primer bloque.
        sec.remove();
        if (col.children.length) advance();
        col.append(sec);
        if (fits()) continue;
        const rest = [...sec.querySelector(".sec-body").children];
        sec.querySelector(".sec-body").replaceChildren();
        let target = sec;
        for (const block of rest) {
          const body = target.querySelector(".sec-body");
          body.append(block);
          if (fits() || body.children.length === 1) continue;
          block.remove();
          advance();
          target = document.createElement("article");
          target.className = "sec cont";
          target.innerHTML = '<div class="sec-body"></div>';
          col.append(target);
          target.querySelector(".sec-body").append(block);
        }
      }
      flow.remove();
    }
    const pages = [...document.querySelectorAll(".page")];
    pages.forEach((pg, i) => {
      const n = pg.querySelector(".num");
      if (n) n.textContent = String(i + 1);
    });
    for (const el of document.querySelectorAll("[data-page-of]")) {
      const target = document.getElementById(el.dataset.pageOf);
      el.textContent = String(pages.indexOf(target) + 1);
    }
    document.body.dataset.ready = String(pages.length);
  });
}

// --- Chrome por CDP -------------------------------------------------------

async function withChrome(fn) {
  const profile = await fs.mkdtemp(path.join(os.tmpdir(), "pdf-chrome-"));
  const port = 9300 + Math.floor(Math.random() * 500);
  const proc = spawn(CHROME, [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "--allow-file-access-from-files",
    "--hide-scrollbars",
    "about:blank",
  ], { stdio: "ignore" });
  try {
    let version;
    for (let i = 0; i < 50 && !version; i++) {
      await new Promise((r) => setTimeout(r, 200));
      version = await fetch(`http://127.0.0.1:${port}/json/version`).then((r) => r.json()).catch(() => null);
    }
    if (!version) throw new Error("Chrome no respondió");
    const target = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" }).then((r) => r.json());
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((r) => ws.addEventListener("open", r, { once: true }));
    let id = 0;
    const pending = new Map();
    ws.addEventListener("message", (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
      }
    });
    const send = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const mid = ++id;
        const timer = setTimeout(() => reject(new Error(`CDP sin respuesta: ${method}`)), 60000);
        pending.set(mid, {
          resolve: (v) => (clearTimeout(timer), resolve(v)),
          reject: (e) => (clearTimeout(timer), reject(e)),
        });
        ws.send(JSON.stringify({ id: mid, method, params }));
      });
    await fn(send);
    ws.close();
  } finally {
    proc.kill();
    await new Promise((r) => proc.once("exit", r));
    await fs.rm(profile, { recursive: true, force: true }).catch(() => {});
  }
}

async function render(lang, shots) {
  await fs.mkdir(OUT, { recursive: true });
  const htmlPath = path.join(OUT, `portfolio-${lang}.html`);
  await fs.writeFile(htmlPath, await buildHtml(lang));
  let pagedPath;
  await withChrome(async (send) => {
    await send("Page.enable");
    await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 720, deviceScaleFactor: 1, mobile: false });
    await send("Page.navigate", { url: "file://" + htmlPath });
    let count = 0;
    for (let i = 0; i < 100 && !count; i++) {
      await new Promise((r) => setTimeout(r, 200));
      const { result } = await send("Runtime.evaluate", {
        expression: "document.body && document.body.dataset.ready && [...document.images].every(i => i.complete) ? document.body.dataset.ready : ''",
        returnByValue: true,
      });
      count = Number(result.value || 0);
    }
    if (!count) throw new Error("La paginación no terminó");
    const { result: overflow } = await send("Runtime.evaluate", {
      expression: `[...document.querySelectorAll('.page')].map((p, i) => [...p.querySelectorAll('*')].some(el => { const r = el.getBoundingClientRect(), q = p.getBoundingClientRect(); return r.width && (r.bottom > q.bottom + 1 || r.right > q.right + 1); }) ? i + 1 : 0).filter(Boolean)`,
      returnByValue: true,
    });
    // La página ya paginada se guarda estática y se imprime con el --print-to-pdf de Chrome
    const { result: dom } = await send("Runtime.evaluate", {
      expression: "document.querySelectorAll('script').forEach(s => s.remove()); '<!doctype html>' + document.documentElement.outerHTML",
      returnByValue: true,
    });
    pagedPath = path.join(OUT, `portfolio-${lang}.paged.html`);
    await fs.writeFile(pagedPath, dom.value);
    console.log(`${lang}: ${count} páginas${overflow.value.length ? `  ⚠ desborde en ${overflow.value.join(", ")}` : ""}`);
    if (shots) {
      const dir = path.join(OUT, `shots-${lang}`);
      await fs.rm(dir, { recursive: true, force: true });
      await fs.mkdir(dir, { recursive: true });
      await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 720 * count, deviceScaleFactor: 1, mobile: false });
      for (let i = 0; i < count; i++) {
        const shot = await send("Page.captureScreenshot", {
          format: "jpeg",
          quality: 80,
          clip: { x: 0, y: i * 720, width: 1280, height: 720, scale: 1 },
        });
        await fs.writeFile(path.join(dir, `${String(i + 1).padStart(2, "0")}.jpg`), Buffer.from(shot.data, "base64"));
      }
    }
  });
  const file = path.join(OUT, PDF_TEXT[lang].file);
  await printPdf(pagedPath, file);
  const { size } = await fs.stat(file);
  console.log(`${lang}: ${file} (${(size / 1048576).toFixed(1)} MB)`);
}

async function printPdf(htmlPath, file) {
  const profile = await fs.mkdtemp(path.join(os.tmpdir(), "pdf-chrome-"));
  const proc = spawn(CHROME, [
    "--headless=new",
    `--user-data-dir=${profile}`,
    "--allow-file-access-from-files",
    "--no-pdf-header-footer",
    "--virtual-time-budget=15000",
    `--print-to-pdf=${file}`,
    "file://" + htmlPath,
  ], { stdio: "ignore" });
  const code = await new Promise((r) => proc.once("exit", r));
  await fs.rm(profile, { recursive: true, force: true }).catch(() => {});
  if (code !== 0) throw new Error(`Chrome terminó con código ${code}`);
}

const args = process.argv.slice(2);
const shots = args.includes("--shots");
const langs = args.filter((a) => a === "es" || a === "en");
for (const lang of langs.length ? langs : ["es", "en"]) await render(lang, shots);
