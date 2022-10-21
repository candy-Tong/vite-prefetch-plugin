import { Plugin } from 'vite';
import { IncomingMessage, NextFunction, ServerStackItem } from 'connect';
import http from 'http';
import { strategyMap } from './strategy';

function prefetchPlugin({
  strategy,
}: {
  strategy: keyof typeof strategyMap
}): Plugin {
  let currentRequestNum = 0;
  let max = 0;

  const context = {
    isHttps: false,
    host: 'localhost',
    port: 3002,
    base: '/',
    protocol: 'http',
  };

  function getEntryUrl() {
    return `${context.isHttps ? 'https' : 'http'}://${context.host}:${context.port}${context.base}`;
  }

  return {
    name: 'test',
    configResolved(config) {
      context.isHttps = Boolean(config.server.https);

      context.protocol = config.server.https ? 'https' : 'http';
      context.base = config.base;

      if (config.server.port) {
        context.port = config.server.port;
      }
      if (config.server.base) {

      }
    },
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        console.log('listen');
        const entry = getEntryUrl();
        setTimeout(() => {
          try {
            strategyMap[strategy]({
              entry,
              ...context,
            });
          } catch (err) {
            console.log(err);
          }
        }, 100);
      });
      server.middlewares.stack.unshift({
        route: '',
        handle(req: IncomingMessage, res: http.ServerResponse, next: NextFunction) {
          currentRequestNum++;
          if (currentRequestNum > max) {
            max = currentRequestNum;
          }
          // console.log('新增请求，当前请求数', req.url, currentRequestNum);
          res.once('close', () => {
            currentRequestNum--;
            if (req.headers['user-agent']?.includes('Prefetch Plugin')) {
              console.log('完成，当前请求数', req.url, currentRequestNum, max, true);
            } else {
              console.log('完成，当前请求数', req.url, currentRequestNum, max);
            }
            if (currentRequestNum === 0) {
            }
          });
          next();
        },
      } as ServerStackItem);
    },
  };
}

export default prefetchPlugin;
