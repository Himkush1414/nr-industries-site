export {};

declare global {
  interface Window {
    /** Google tag (gtag.js) - loaded globally via the script in index.html. */
    gtag?: (...args: unknown[]) => void;
  }
}
