/** @format */

const puppeteer = require("puppeteer");
const { setTimeout } = require("node:timers/promises");
const start = process.argv[2];
const end = process.argv[3];
const main = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // "/opt/google/chrome/google-chrome"
    userDataDir:
      "/Users/jmrana/Library/Application Support/Google/Chrome/Default", // "/home/username/.config/google-chrome/Default"
  });

  const page = await browser.newPage();
  await page.goto(`http://localhost:8500?start=${start}&end=${end}`, {
    waitUntil: "networkidle2",
  });
  const links = await page.$$eval("a", (links) =>
    links.map((link) => link.href)
  );

  // Process each link
  for (const link of links) {
    const page = await browser.newPage();
    await page.goto(link, { waitUntil: "networkidle2" });
    await setTimeout(10000);
    await page.keyboard.press("Enter");
    await setTimeout(500);
    await page.close(); // Close the tab
  }
};
main();
