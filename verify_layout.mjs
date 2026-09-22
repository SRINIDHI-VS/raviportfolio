import { chromium } from "playwright";

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push("pageerror: " + err.message));

await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(500);

// 1. Nav present
const navText = await page.locator("nav .navmark").textContent();
const enrollHref = await page.locator("nav .btn-ghost").getAttribute("href");
console.log("Nav monogram:", navText, "| Enroll href:", enrollHref);

// 2. WhatsApp FAB present, positioned bottom-right, not stretched
const fabBox = await page.locator(".wa-fab").boundingBox();
const wrapBox = await page.locator(".wa-fab-wrap").boundingBox();
console.log("FAB box:", fabBox);
console.log("Wrap box:", wrapBox);

// 3. Ambient decor elements present
const ringCount = await page.locator("#ambientRing").count();
const railCount = await page.locator("#progressRail").count();
console.log("ambientRing count:", ringCount, "progressRail count:", railCount);

// 4. Cursor dot/ring present, and custom-cursor-on applied (desktop + fine pointer, default chromium mouse is fine pointer)
await page.mouse.move(300, 300);
await page.waitForTimeout(300);
const bodyHasCursorClass = await page.evaluate(() => document.body.classList.contains("custom-cursor-on"));
const dotOpacity = await page.locator("#cursorDot").evaluate((el) => getComputedStyle(el).opacity);
console.log("body.custom-cursor-on:", bodyHasCursorClass, "| cursorDot opacity:", dotOpacity);

// 5. Progress rail scrub - scroll down gradually and check scaleX increases
async function railScaleX() {
  return await page.locator("#progressRail").evaluate((el) => getComputedStyle(el).transform);
}
const railBefore = await railScaleX();
for (let y = 0; y <= 1200; y += 200) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(150);
}
await page.waitForTimeout(300);
const railAfter = await railScaleX();
console.log("progressRail transform before:", railBefore, "| after scroll:", railAfter);

// 6. WhatsApp greeting bubble timing - wait for it to show (3.2s)
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(3600);
const bubbleShown = await page.locator(".wa-bubble").evaluate((el) => el.classList.contains("show"));
console.log("wa-bubble shown after 3.6s:", bubbleShown);

// close it
await page.locator(".wa-bubble-close").click();
await page.waitForTimeout(200);
const bubbleAfterClose = await page.locator(".wa-bubble").evaluate((el) => el.classList.contains("show"));
console.log("wa-bubble shown after close click:", bubbleAfterClose);
const dismissedFlag = await page.evaluate(() => sessionStorage.getItem("raviWaBubbleDismissed"));
console.log("sessionStorage dismissed flag:", dismissedFlag);

console.log("CONSOLE ERRORS:", consoleErrors.length ? consoleErrors : "none");

await page.screenshot({ path: "/tmp/claude-0/-home-claude/f12d10ed-4009-58b7-818a-6bb7c73e8dbc/scratchpad/layout_shell.png" });

await browser.close();
