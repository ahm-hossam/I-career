const INLINE_SCRIPT = `(function() {
  try {
    function getCookie(name) {
      var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
      return match ? decodeURIComponent(match[1]) : null;
    }
    var locale = getCookie('icareer-locale') || 'en';
    var theme = getCookie('icareer-theme');
    if (theme !== 'light' && theme !== 'dark') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();`;

/**
 * Runs before hydration to set lang/dir/theme from the SAME cookies the
 * server reads in layout.tsx, so pre-hydration DOM state always agrees with
 * what was server-rendered. This must read the cookie, not localStorage —
 * localStorage is scoped per-origin (including port), so on same-host
 * multi-port setups it can silently disagree with the cookie the server
 * actually used, producing a hydration mismatch on the <html> element.
 * A plain script tag in <head> (rather than next/script) since it only
 * needs to run once, synchronously, before anything else.
 */
export function ThemeLocaleScript() {
  return <script id="theme-locale-init" dangerouslySetInnerHTML={{ __html: INLINE_SCRIPT }} />;
}
