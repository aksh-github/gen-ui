import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@vdom-lib": "/src/lib/microframe.es.CzW53S12.js",
    },
  },
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "df",
    // jsxInject: `import { h, df } from '/src/lib/vdom/vdom-lib.js'`,
  },
  server: {
    port: 5173,
  },
});
