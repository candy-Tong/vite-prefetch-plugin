// 通用声明

declare interface ImportMeta {
  env: {
    MODE: 'mock' | 'development' | 'test' | 'release';
  };
  // eslint-disable-next-line no-unused-vars
  glob: (url: string) => { url };
}

declare module '*.svg' {
  const CONTENT: string;
  export default CONTENT;
}

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
