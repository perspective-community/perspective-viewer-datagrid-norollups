import { test, expect } from "@playwright/test";

async function getDatagridContents(page) {
  return await page.evaluate(async () => {
    const viewer = document.querySelector(
      "perspective-viewer perspective-viewer-datagrid-norollups regular-table",
    );
    return viewer.innerHTML || "MISSING";
  });
}

test.describe("Datagrid with superstore data set", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./examples/index.html", {
      waitUntil: "networkidle",
    });

    // wait up to 10s for perspective to render
    await page.waitForFunction(
      () => document.querySelector("perspective-viewer"),
      null,
      { timeout: 10000 },
    );

    await page.evaluate(async () => {
      await document.querySelector("perspective-viewer").restore({
        plugin: "Datagrid (No Rollups)",
      });
    });

    // wait 1s for it to process
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  });

  test("exists", async ({ page }) => {
    const viewer = await getDatagridContents(page);
    await expect(viewer).not.toBe("MISSING");
  });

  test("Correct default view", async ({ page }) => {
    const viewer = await getDatagridContents(page);
    await expect(viewer).toContain(
      '<tbody><tr><th class="psp-tree-label psp-tree-label-collapse psp-align-left" colspan="3">All</th><td class="psp-align-right" style="color: rgb(51, 141, 205);"></td>',
    );
  });
});
