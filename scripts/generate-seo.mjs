import { readFile, writeFile, mkdir } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
const seo = JSON.parse(await readFile(new URL('../site-meta.json', import.meta.url), 'utf8'));
const shell = await readFile(new URL('./index.html', dist), 'utf8');
// Read the same production URL that Vite uses, without an extra dependency.
for (const file of ['.env.production', '.env']) {
  try {
    const lines = (await readFile(new URL(`../${file}`, import.meta.url), 'utf8')).split(/\r?\n/);
    for (const line of lines) {
      const m = line.match(/^\s*(VITE_SITE_URL|SITE_URL)\s*=\s*[\"']?([^\"'#\s]+)[\"']?/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch { /* Optional config file not present. */ }
}
const envOrigin = (process.env.VITE_SITE_URL || process.env.SITE_URL || '').trim().replace(/\/+$/, '');
const origin = /^https?:\/\/[^/]+$/.test(envOrigin) ? envOrigin : '';
const esc = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const meta = (key, value, kind = 'name') => `<meta ${kind}="${esc(key)}" content="${esc(value)}" />`;
const pageHtml = (path, data) => {
  const canonical = origin ? `${origin}${path === '/' ? '/' : path}` : '';
  const image = `${origin}/assets/og-portfolio.png`;
  const extras = [
    meta('robots', data.robots), meta('og:locale', 'pt_BR', 'property'),
    meta('og:site_name', 'Pedro Albuquerque', 'property'),
    meta('og:type', data.ogType, 'property'),
    meta('og:title', data.title, 'property'),
    meta('og:description', data.description, 'property'),
    meta('og:image', image, 'property'),
    meta('og:image:width', '1200', 'property'),
    meta('og:image:height', '630', 'property'),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', data.title),
    meta('twitter:description', data.description),
    meta('twitter:image', image),
    ...(canonical ? [meta('og:url', canonical, 'property'), `<link rel="canonical" href="${esc(canonical)}" />`] : []),
  ].join('\n    ');
  const schema = path === '/'
    ? { '@context': 'https://schema.org', '@type': 'Person', name: 'Pedro Albuquerque',
        description: data.description, ...(origin ? {url: origin} : {}) }
    : { '@context': 'https://schema.org', '@type': 'WebPage', name: data.title,
        description: data.description, ...(canonical ? {url: canonical} : {}) };
  return shell
    .replace(/<title>.*?<\/title>/s, `<title>${esc(data.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/s, meta('description', data.description))
    .replace('</head>', `    ${extras}\n    <script type="application/ld+json" id="portfolio-schema">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>\n  </head>`);
};

for (const [path, data] of Object.entries(seo)) {
  const output = path === '/' ? new URL('./index.html', dist) : new URL(`.${path}/index.html`, dist);
  await mkdir(new URL('./', output), {recursive: true});
  await writeFile(output, pageHtml(path, data), 'utf8');
  console.log(`SEO: ${path} [${data.robots}]`);
}

if (origin) {
  const publicRoutes = Object.entries(seo).filter(([,data]) => data.robots.startsWith('index')).map(([path]) => `${origin}${path === '/' ? '/' : path}`);
  const xml = `<?xml version="1.0" encoding="utf-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicRoutes.map(loc => `  <url><loc>${esc(loc)}</loc></url>`).join('\n')}\n</urlset>\n`;
  await writeFile(new URL('./sitemap.xml', dist), xml);
  await writeFile(new URL('./robots.txt', dist), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  console.log(`SEO: sitemap generated for ${origin}`);
} else {
  console.log('SEO: no SITE_URL configured; absolute canonical and sitemap will be generated when publishing.');
}
