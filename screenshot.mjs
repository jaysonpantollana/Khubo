import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
await page.screenshot({ path: 'public/homepage-screenshot.png', fullPage: false });
await browser.close();
console.log('Screenshot saved to public/homepage-screenshot.png');
