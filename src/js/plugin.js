import { HTMLPerspectiveViewerDatagridNoRollupsToolbarElement } from "./toolbar";
import { rollup_style_listener } from "./style_listener";

const Datagrid = customElements.get("perspective-viewer-datagrid");

export class HTMLPerspectiveViewerDatagridNoRollupsPluginElement extends Datagrid {
  constructor() {
    super();
  }

  connectedCallback() {
    // NOTE: don't do this as it wont respect the child types
    // super.connectedCallback();
    if (!this._toolbar) {
      this._toolbar = document.createElement(
        "perspective-viewer-datagrid-norollups-toolbar",
      );
    }
    this.parentElement.appendChild(this._toolbar);
  }

  async activate(view) {
    await super.activate(view);

    this.regular_table.addStyleListener(
      rollup_style_listener.bind(this.model, this.regular_table),
    );
  }

  get name() {
    return "Datagrid (No Rollups)";
  }
}

customElements.define(
  "perspective-viewer-datagrid-norollups",
  HTMLPerspectiveViewerDatagridNoRollupsPluginElement,
);

customElements.define(
  "perspective-viewer-datagrid-norollups-toolbar",
  HTMLPerspectiveViewerDatagridNoRollupsToolbarElement,
);

function register_element() {
  customElements
    .get("perspective-viewer")
    .registerPlugin("perspective-viewer-datagrid-norollups");
}

customElements.whenDefined("perspective-viewer").then(register_element);
