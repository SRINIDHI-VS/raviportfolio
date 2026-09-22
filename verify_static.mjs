import { chromium } from "playwright";

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
page.on("pageerror", (err) => errors.push("pageerror: " + err.message));
page.on("requestfailed", (req) => errors.push("requestfailed: " + req.url() + " " + (req.failure()?.errorText || "")));

await page.goto("http://localhost:8811/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);

console.log("Title:", await page.title());
console.log("Nav present:", await page.locator("nav .navmark").count());
console.log("FAB present:", await page.locator(".wa-fab").count());
const bodyFont = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
console.log("Body font:", bodyFont);
await page.mouse.move(300, 300);
await page.waitForTimeout(300);
console.log("custom-cursor-on:", await page.evaluate(() => document.body.classList.contains("custom-cursor-on")));

console.log("ERRORS:", errors.length ? errors : "none");
await page.screenshot({ path: "/tmp/claude-0/-home-claude/f12d10ed-4009-58b7-818a-6bb7c73e8dbc/scratchpad/static_export_check.png" });
await browser.close();
