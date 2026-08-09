import { useEffect } from 'react';

type SeoProps = {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const SITE = 'QuickPDF Tools';
const BASE_URL = 'https://quickpdftools.app';

function setTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useSeo({
  title,
  description = 'Compress, convert, resize and merge PDF and image files in seconds. Free, private, and lightning-fast online tools. No login required.',
  canonical,
  ogImage = `${BASE_URL}/og-image.png`,
  type = 'website',
  jsonLd,
}: SeoProps) {
  // Side-effect only; render nothing.
  useEffect(() => {
    const fullTitle = title.includes(SITE) ? title : `${title} | ${SITE}`;
    document.title = fullTitle;
    setTag('name', 'description', description);
    setLink('canonical', canonical ?? BASE_URL);

    setTag('property', 'og:title', fullTitle);
    setTag('property', 'og:description', description);
    setTag('property', 'og:url', canonical ?? BASE_URL);
    setTag('property', 'og:image', ogImage);
    setTag('property', 'og:type', type);
    setTag('property', 'og:site_name', SITE);

    setTag('name', 'twitter:card', 'summary_large_image');
    setTag('name', 'twitter:title', fullTitle);
    setTag('name', 'twitter:description', description);
    setTag('name', 'twitter:image', ogImage);

    let script: HTMLScriptElement | null = document.querySelector('script[data-seo-jsonld]');
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-jsonld', 'true');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.textContent = '';
    }

    return () => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
  }, [title, description, canonical, ogImage, type, jsonLd]);

  return null;
}
