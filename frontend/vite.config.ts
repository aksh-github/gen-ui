import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@vdom-lib": "/src/lib/microframe.es.DH1vxpfh.js",
    },
  },
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "df",
    // jsxInject: `import { h, df } from '/src/lib/vdom/vdom-lib.js'`,
  },
  server: {
    port: 5173,
    proxy: {
      // string shorthand:
      // http://localhost:5173/foo
      //   -> http://localhost:4567/foo
      "/classify": "http://localhost:8000/",
    },
  },
});
