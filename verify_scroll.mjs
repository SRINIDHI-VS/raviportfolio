import { chromium } from "playwright";

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("console", (msg) => console.log("[console]", msg.type(), msg.text()));
page.on("pageerror", (err) => console.log("[pageerror]", err.message));

await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(500);

const docInfo = await page.evaluate(() => ({
  bodyScrollHeight: document.body.scrollHeight,
  innerHeight: window.innerHeight,
  maxScroll: document.body.scrollHeight - window.innerHeight,
}));
console.log("doc info:", docInfo);

for (let y = 0; y <= docInfo.maxScroll; y += 100) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(100);
}
await page.waitForTimeout(300);

const after = await page.evaluate(() => ({
  scrollY: window.scrollY,
  railTransform: getComputedStyle(document.getElementById("progressRail")).transform,
  ringTransform: getComputedStyle(document.getElementById("ambientRing")).transform,
}));
console.log("after scroll:", after);

await browser.close();
