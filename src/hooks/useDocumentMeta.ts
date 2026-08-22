import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME = "N R Industries";

// TODO: swap for the real production domain once it's connected (see config/contact.ts COMPANY_WEBSITE_DISPLAY).
const SITE_URL = "https://www.nrindustriespower.in";
const DEFAULT_OG_IMAGE = `${SITE_URL}/brand-logo.webp`;

interface DocumentMetaOptions {
  /** Absolute image URL for Open Graph / Twitter Card previews. Falls back to the brand logo when omitted. */
  image?: string;
  /** Open Graph type — "website" for most pages, "product" for product detail pages. */
  type?: "website" | "product";
}

function setMetaByName(name: string, content: string): HTMLMetaElement {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
}

function setMetaByProperty(property: string, content: string): HTMLMetaElement {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
}

function setCanonicalLink(href: string): HTMLLinkElement {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  return el;
}

/**
 * Sets the document title, meta description, canonical URL, and Open Graph / Twitter
 * Card tags for the current page. Canonical URL and OG url are derived automatically
 * from the current route, so call sites only need to pass title + description.
 */
export function useDocumentMeta(
  title: string,
  description: string,
  options: DocumentMetaOptions = {},
): void {
  const { pathname } = useLocation();
  const { image = DEFAULT_OG_IMAGE, type = "website" } = options;

  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
    const canonicalUrl = `${SITE_URL}${pathname === "/" ? "" : pathname}`;

    const previousTitle = document.title;
    document.title = fullTitle;

    const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = descriptionMeta?.content;
    if (descriptionMeta) descriptionMeta.content = description;

    setCanonicalLink(canonicalUrl);

    setMetaByProperty("og:title", fullTitle);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:url", canonicalUrl);
    setMetaByProperty("og:image", image);
    setMetaByProperty("og:type", type);
    setMetaByProperty("og:site_name", SITE_NAME);

    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", fullTitle);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", image);

    return () => {
      document.title = previousTitle;
      if (descriptionMeta && previousDescription !== undefined) {
        descriptionMeta.content = previousDescription;
      }
    };
  }, [title, description, image, type, pathname]);
}
