import axios from 'axios';
// import * as https from 'https';
import { StrategyOptions } from '../type';


export async function fetchEntry(options: StrategyOptions) {
  // const instance = axios.create({
  //   httpsAgent: new https.Agent({
  //     rejectUnauthorized: false
  //   })
  // });
  // const { origin } = new URL(options.entry);
  // const agent = new https.Agent({
  //   rejectUnauthorized: false,
  // });
  await axios.get(options.entry, {
    headers: {
      // axios accept header default use application/json
      // It will return 404 if accept header is application/json
      // because vite HTML fallback middleware that using connect-history-api-fallback
      // do not fall back to index.html
      // when accept header container application/json
      accept: 'text/html',
    },
  }).then(res => res.data);
}
