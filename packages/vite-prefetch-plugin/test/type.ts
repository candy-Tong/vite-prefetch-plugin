import { InlineConfig } from 'vite';

export interface Options{
  name: string
  viteConfig?: InlineConfig
}

export interface PageTimeRecord {
  domContentLoadedEventStart: number,
  domContentLoadedEventEnd: number,
  loadEventStart: number,
  loadEventEnd: number,
  FMPTime: number
}

export interface Config{
  testList: Options[]
  resultFile: string
}
