import puppeteer from 'puppeteer';
import { PageTimeRecord } from './type';

const timeout = 200000;

export async function runPuppeteer(): Promise<PageTimeRecord> {
  const browser = await puppeteer.launch({
    devtools: true,
    headless: false,
    ignoreHTTPSErrors: true,
    // 如果不使用参数，https 证书会校验会失败
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout,
  });
  const page = await browser.newPage();

  const FMPBeginTime = Date.now();
  await page.goto('http://localhost:3002', {
    timeout,
  });


  // 拿到的只是首屏时间，并非有效内容的时间
  const res = await page.evaluate(() => (JSON.stringify(performance.getEntriesByType('navigation')[0])), {
    timeout,
  });
  const timing: PerformanceNavigationTiming = JSON.parse(res);
  await page.waitForSelector('.t-menu', {
    timeout,
  });
  const FMPTime = Date.now() - FMPBeginTime;
  await browser.close();
  return {
    domContentLoadedEventStart: timing.domContentLoadedEventStart,
    domContentLoadedEventEnd: timing.domContentLoadedEventEnd,
    loadEventStart: timing.loadEventStart,
    loadEventEnd: timing.loadEventEnd,
    FMPTime,
  };
}
