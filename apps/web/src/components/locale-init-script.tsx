import Script from 'next/script';

const INLINE_SCRIPT = `(function() {
  try {
    function getCookie(name) {
      var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
      return match ? decodeURIComponent(match[1]) : null;
    }
    var locale = getCookie('icareer-locale') || 'en';
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  } catch (e) {}
})();`;

/**
 * Runs before hydration to set lang/dir from the SAME cookie the server reads
 * in layout.tsx, so pre-hydration DOM state always agrees with what was
 * server-rendered — avoids a flash of the wrong direction on the <html> element.
 */
export function LocaleInitScript() {
  return <Script id="locale-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: INLINE_SCRIPT }} />;
}
