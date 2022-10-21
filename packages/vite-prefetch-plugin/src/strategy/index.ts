import { fetchWithPuppeteer } from './puppeteer';
import { fetchEntry } from './fetchEntry';

export const strategyMap = {
  puppeteer: fetchWithPuppeteer,
  fetchEntry,
};
