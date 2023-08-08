import * as perspective from "../node_modules/@finos/perspective/dist/cdn/perspective.js";

async function load() {
  let resp = await fetch("superstore.csv");
  let csv = await resp.text();
  const worker = perspective.worker();
  const table = worker.table(csv);
  const viewers = document.querySelectorAll("perspective-viewer");
  viewers.forEach(async (viewer) => {
    await viewer.load(table);
  });
}

await load();

document
  .querySelectorAll("div.container-row > div > perspective-viewer")
  .forEach(
    async (viewer) =>
      await viewer.restore({
        plugin: "Datagrid (No Rollups)",
        group_by: ["Ship Mode", "Segment"],
      }),
  );
