import { appRootPath } from "@nx-plus/vite/src/app-root";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { join } from "path";
import baseTsConfig from "../../tsconfig.base.json";

const { STAGE } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: __dirname,
  build: {
    outDir: "../../dist/apps/smeet",
    emptyOutDir: true,
  },
  resolve: {
    alias: Object.entries(baseTsConfig.compilerOptions.paths).reduce(
      (acc, [key, paths]) => ({
        ...acc,
        [key]: (paths as string[]).map((path) => join(appRootPath, path)),
      }),
      {}
    ),
  },
  server: {
    proxy: {
      '/api': {
        target: `https://api.${STAGE}.smeet.ihomer.academy`,
        changeOrigin: true
      }
    }
  }

});
