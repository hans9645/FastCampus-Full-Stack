const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
      headless:false
  });
  const page = await browser.newPage();
  await page.goto('https://brunch.co.kr/search');
  await page.click('input.txt_search');
  await page.screenshot({ path: 'brunch.png' });

  await browser.close();
})();