/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Render dashboard screenshots at multiple theme / density combos.
 * Run with:  node scripts/screenshot.js
 */
const puppeteer = require("puppeteer-core");
const path = require("path");

const CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const BASE = process.env.PREVIEW_URL || "http://localhost:3000/dashboard";
const OUT = path.join(__dirname, "..", "screenshots");

const VIEWPORTS = {
  desktop: { width: 1440, height: 1600, label: "desktop" },
  tablet:  { width:  900, height: 1600, label: "tablet"  },
};

const COMBOS = [
  { theme: "light", density: "balanced" },
  { theme: "dark",  density: "balanced" },
  { theme: "light", density: "airy"     },
  { theme: "light", density: "dense"    },
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  for (const [vp, view] of Object.entries(VIEWPORTS)) {
    for (const { theme, density } of COMBOS) {
      const page = await browser.newPage();
      await page.setViewport({ width: view.width, height: view.height, deviceScaleFactor: 2 });

      await page.evaluateOnNewDocument((t, d) => {
        try {
          localStorage.setItem("astra.theme", t);
          localStorage.setItem("astra.density", d);
        } catch (_) {}
      }, theme, density);

      console.log(`→ ${vp} · ${theme} · ${density}`);
      await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
      // Let entrance animations settle.
      await new Promise((r) => setTimeout(r, 1400));

      const full = vp === "tablet" ? true : false;
      const out = path.join(OUT, `${vp}-${theme}-${density}.png`);
      await page.screenshot({ path: out, fullPage: full });
      console.log(`   saved ${out}`);
      await page.close();
    }
  }

  await browser.close();
  console.log("done");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
