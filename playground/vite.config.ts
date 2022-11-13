import { defineConfig } from "vite";
import Uni from "@dcloudio/vite-plugin-uni";
import UniManifest from "@uni-helper/vite-plugin-uni-manifest";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Uni(), UniManifest()],
});
