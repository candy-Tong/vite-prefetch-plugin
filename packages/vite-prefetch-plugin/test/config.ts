import { resolve } from 'path';
import prefetchPlugin from '../src';
import { Config } from './type';


export const config: Config = {
  testList: [
    {
      name: 'force-with-strategy-puppeteer',
      viteConfig: {
        plugins: [
          prefetchPlugin({
            strategy: 'puppeteer',
          }),
        ],
        optimizeDeps: {
          force: true,
        },
      },
    },
    {
      name: 'force-with-strategy-fetchEntry',
      viteConfig: {
        plugins: [
          prefetchPlugin({
            strategy: 'fetchEntry',
          }),
        ],
        optimizeDeps: {
          force: true,
        },
      },
    },
    {
      name: 'force-with-strategy-puppeteer',
      viteConfig: {
        plugins: [
          prefetchPlugin({
            strategy: 'puppeteer',
          }),
        ],
        optimizeDeps: {
          force: true,
        },
      },
    },
    {
      name: 'force-with-strategy-fetchEntry',
      viteConfig: {
        plugins: [
          prefetchPlugin({
            strategy: 'fetchEntry',
          }),
        ],
        optimizeDeps: {
          force: true,
        },
      },
    },
    {
      name: 'no-force',
      viteConfig: {},
    },
    {
      name: 'no-force-2',
      viteConfig: {},
    },
    {
      name: 'no-force-3',
      viteConfig: {},
    },
  ],
  resultFile: resolve(__dirname, './result.json'),
};
