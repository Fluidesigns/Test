/**
 * Inlined before hydration to avoid a light → dark / density flash.
 * Reads localStorage + prefers-color-scheme and writes data-theme / data-density
 * on <html> synchronously.
 */
export function ThemeScript() {
  const code = `(() => {
    try {
      const root = document.documentElement;
      const t = localStorage.getItem('astra.theme');
      const d = localStorage.getItem('astra.density');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = (t === 'light' || t === 'dark') ? t : (prefersDark ? 'dark' : 'light');
      const density = (d === 'airy' || d === 'dense' || d === 'balanced') ? d : 'balanced';
      root.setAttribute('data-theme', theme);
      root.setAttribute('data-density', density);
      root.style.colorScheme = theme;
    } catch (_) {}
  })();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
