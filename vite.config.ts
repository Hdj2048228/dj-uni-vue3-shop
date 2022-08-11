import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import path from 'path'
function _resolve(dir: string){
	return path.resolve(dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
      alias: {
        '@': _resolve('src'),
      },
    }
});
