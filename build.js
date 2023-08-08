const {
  NodeModulesExternal,
} = require("@finos/perspective-esbuild-plugin/external");
const { build } = require("@finos/perspective-esbuild-plugin/build");
const { BuildCss } = require("@prospective.co/procss/target/cjs/procss.js");
const fs = require("fs");
const path_mod = require("path");

const BUILD = [
  {
    define: {
      global: "window",
    },
    entryPoints: ["src/js/plugin.js"],
    plugins: [NodeModulesExternal()],
    format: "esm",
    loader: {
      ".css": "text",
      ".html": "text",
    },
    outfile: "dist/esm/perspective-viewer-datagrid-norollups.js",
  },
  {
    define: {
      global: "window",
    },
    entryPoints: ["src/js/plugin.js"],
    plugins: [],
    format: "esm",
    loader: {
      ".css": "text",
      ".html": "text",
    },
    outfile: "dist/cdn/perspective-viewer-datagrid-norollups.js",
  },
];

function add(builder, path) {
  builder.add(
    path,
    fs.readFileSync(path_mod.join("./src/less", path)).toString(),
  );
}

async function build_all() {
  await Promise.all(BUILD.map(build)).catch(() => process.exit(1));
}

build_all();
