import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
    });
    await page.goto("http://localhost:8080/#/", {
        waitUntil: "networkidle0",
    });
    const result = await page.evaluate(
        () => ({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        })
    );

    await browser.close();
})();
