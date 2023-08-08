import type { IPerspectiveViewerPlugin } from "@finos/perspective-viewer";

declare global {
  interface CustomElementRegistry {
    get(
      tagName: "perspective-viewer-datagrid-norollups",
    ): HTMLPerspectiveViewerDatagridNoRollupsPluginElement;

    // TODO is this needed?
    whenDefined(
      tagName: "perspective-viewer-datagrid-norollups",
    ): Promise<void>;
  }
}

interface HTMLPerspectiveViewerDatagridNoRollupsPluginElement
  extends IPerspectiveViewerPlugin {}

export declare class HTMLPerspectiveViewerDatagridNoRollupsPluginElement
  extends HTMLElement
  implements IPerspectiveViewerPlugin {}
