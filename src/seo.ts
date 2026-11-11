import siteMeta from '../site-meta.json';

type PageKey = keyof typeof siteMeta;

function upsertMeta(key: string, content: string, attribute: 'name' | 'property' = 'name') {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export function updatePageMetadata(path: string) {
  const meta = siteMeta[(path in siteMeta ? path : '/') as PageKey];
  const origin = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/+$/, '');
  const url = `${origin}${path === '/' ? '/' : path}`;
  const shareImage = `${origin}/assets/og-portfolio.png`;

  document.title = meta.title;
  document.documentElement.lang = 'pt-BR';
  upsertMeta('description', meta.description);
  upsertMeta('robots', meta.robots);
  upsertMeta('og:locale', 'pt_BR', 'property');
  upsertMeta('og:site_name', 'Pedro Albuquerque', 'property');
  upsertMeta('og:type', meta.ogType, 'property');
  upsertMeta('og:title', meta.title, 'property');
  upsertMeta('og:description', meta.description, 'property');
  upsertMeta('og:url', url, 'property');
  upsertMeta('og:image', shareImage, 'property');
  upsertMeta('og:image:width', '1200', 'property');
  upsertMeta('og:image:height', '630', 'property');
  upsertMeta('og:image:alt', 'Pedro Albuquerque - pensar, criar, experimentar.', 'property');
  upsertMeta('twitter:card', 'summary_large_image');
  upsertMeta('twitter:title', meta.title);
  upsertMeta('twitter:description', meta.description);
  upsertMeta('twitter:image', shareImage);

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;

  // Use a single data source for client metadata and generated route entry pages.
  // Do not include unverified social profiles in structured data.
  const entity = path === '/'
    ? { '@context': 'https://schema.org', '@type': 'Person', name: 'Pedro Albuquerque',
        description: 'Professor de Computacao com interesse em tecnologia, design e desenvolvimento.', url: origin }
    : { '@context': 'https://schema.org', '@type': 'WebPage', name: meta.title, description: meta.description, url };
  let schema = document.getElementById('portfolio-schema') as HTMLScriptElement | null;
  if (!schema) {
    schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.id = 'portfolio-schema';
    document.head.appendChild(schema);
  }
  schema.textContent = JSON.stringify(entity).replace(/</g, '\\u003c');
}
