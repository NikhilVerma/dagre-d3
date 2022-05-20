//@ts-expect-error
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  clearScreen: false,
  build: {
    sourcemap: true,
    lib: {
      //@ts-expect-error
      entry: path.resolve(__dirname, "./index.ts"),
      name: "flow",
      fileName: format => `flow.${format}.js`,
      formats: ["es"]
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["d3"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  //   resolve: {
  //     alias: {
  //       "@": path.resolve(__dirname, "./"),
  //       "@cldcvr/flow": path.resolve(__dirname, "./"),
  //     },
  //     extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  //   },
  server: {
    port: 8080,
    host: true
  }
});
