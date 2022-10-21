import { runVite } from './vite';
import { runPuppeteer } from './puppeteer';
import { Options, PageTimeRecord } from './type';
import { config } from './config';
import { readFile, writeFile } from 'fs/promises';


async function runSingleTest(options: Options) {
  console.log('runSingleTest', JSON.stringify(options));
  const server = await runVite(options);
  const time = await runPuppeteer();
  await server.close();
  console.log('runSingleTestFinish', JSON.stringify(options));
  console.log('runSingleTestFinish', time);
  return time;
}

async function go() {
  const timeList: (PageTimeRecord & {name: string})[] = [];
  let resMap: Record<string, PageTimeRecord[]> = {};
  try {
    const resultFile = await readFile(config.resultFile, {
      encoding: 'utf-8',
    });
    resMap = JSON.parse(resultFile);
  } catch (e) {
    console.log(e);
  }


  for (const configElement of config.testList) {
    if (!resMap[configElement.name]) {
      resMap[configElement.name] = [];
    }
    const time = await runSingleTest(configElement);
    resMap[configElement.name].push(time);
    timeList.push({
      name: configElement.name,
      ...time,
    });
  }
  console.log(timeList);

  await writeFile(config.resultFile, JSON.stringify(resMap), {
    encoding: 'utf8',
  });
  // return process.exit(0);
}

go();


