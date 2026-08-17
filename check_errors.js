const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

    console.log('Navigating to Vercel deployment...');
    await page.goto('https://shrikishan-frontend.vercel.app/home', { waitUntil: 'networkidle0' });

    console.log('Done.');
    await browser.close();
})();
