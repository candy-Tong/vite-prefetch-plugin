import { Plugin } from '@tencent/tds-vue-core';
export function demo(): Plugin {
  return {
    async created({ tdsApp }) {
      console.log('this is a demo plugin');
      console.log('tdsApp', tdsApp);
    },
  };
}
