import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from 'unplugin-auto-import/vite';
import PiniaAutoRefs from 'pinia-auto-refs'

import { resolve } from 'path'
function _resolve(dir: string){
    return resolve(process.cwd(), '.', dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      uni(),
      AutoImport({
          imports: [
              'pinia',
              {
                  '@/helper/pinia-auto-refs': ['useStore'],
              },
          ],
      }),
      PiniaAutoRefs(),
  ],
  resolve: {
      alias:[
          {
            find: /\/@\//,
            replacement: _resolve('src') + '/'
          },
      ]
    }
});
