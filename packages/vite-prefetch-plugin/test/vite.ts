import { createServer } from 'vite';
import { resolve } from 'path';
import { Options } from './type';

export async function runVite(options: Options) {
  const server = await createServer({
    // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
    configFile: resolve(__dirname, '../../../playground/tdesign-vue-next-starter/vite.config.ts'),
    root: resolve(__dirname, '../../../playground/tdesign-vue-next-starter'),
    ...options.viteConfig,

  });
  await server.listen();

  server.printUrls();
  return server;
}
