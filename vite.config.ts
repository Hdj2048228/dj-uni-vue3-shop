import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { resolve } from 'path'
function _resolve(dir: string){
    return resolve(process.cwd(), '.', dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
      alias:[
          {
            find: /\/@\//,
            replacement: _resolve('src') + '/'
          },
      ]
    }
});
