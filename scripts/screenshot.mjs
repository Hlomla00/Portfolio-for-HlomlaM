import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/projects");

const targets = [
  { url: "https://saferide-system.vercel.app", file: "saferide.jpg" },
  { url: "https://que-up1.vercel.app", file: "queup.jpg" },
  { url: "https://voucher-bay.vercel.app", file: "voucherbridge.jpg" },
  { url: "https://pulse-beryl-pi.vercel.app", file: "pulse.jpg" },
  { url: "https://bookmzi-your-story-stream.vercel.app", file: "bookmzi.jpg" },
  { url: "https://cput-clinic-booking.vercel.app", file: "clinic.jpg" },
];

const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  headless: true,
});

for (const { url, file } of targets) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  console.log(`Screenshotting ${url} ...`);
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 3000));
    await page.screenshot({
      path: path.join(outDir, file),
      type: "jpeg",
      quality: 90,
      clip: { x: 0, y: 0, width: 1280, height: 800 },
    });
    console.log(`  ✓ saved ${file}`);
  } catch (err) {
    console.error(`  ✗ failed ${url}: ${err.message}`);
  }
  await page.close();
}

await browser.close();
console.log("Done.");
