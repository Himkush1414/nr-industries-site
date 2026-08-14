import { useEffect } from "react";

const SITE_NAME = "N R Industries";

/** Sets the document title and meta description for the current page. */
export function useDocumentMeta(title: string, description: string): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = meta?.content;
    if (meta) meta.content = description;

    return () => {
      document.title = previousTitle;
      if (meta && previousDescription !== undefined) meta.content = previousDescription;
    };
  }, [title, description]);
}
