import puppeteer from 'puppeteer';
import { StrategyOptions } from '../type';

const timeout = 200000;

export async function fetchWithPuppeteer(options: StrategyOptions) {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    // 如果不使用参数，https 证书会校验会失败
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 100000,
  });
  try {
    const page = await browser.newPage();
    await page.setUserAgent('Puppeteer For Vite Prefetch Plugin');
    await page.goto(options.entry, {
      timeout,
    });
    await page.waitForNetworkIdle({
      idleTime: 5000,
      timeout,
    });
  } catch (e) {
    console.log('[fetchWithPuppeteer] error', e);
  } finally {
    await browser.close();
  }
}


