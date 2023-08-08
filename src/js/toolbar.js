import TOOLBAR_STYLE from "@finos/perspective-viewer-datagrid/dist/css/perspective-viewer-datagrid-toolbar.css";

export class HTMLPerspectiveViewerDatagridNoRollupsToolbarElement extends HTMLElement {
  connectedCallback() {
    if (this._initialized) {
      return;
    }

    this._initialized = true;
    this.setAttribute("slot", "plugin-settings");
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
                ${TOOLBAR_STYLE}
            </style>
            <div id="toolbar">
                <span id="scroll_lock" class="button">
                    <span>Free Scroll</span>
                </span>
                <span id="edit_mode" class="button"><span>Read Only</span></span>
            </div>
        `;

    const viewer = this.parentElement;
    const plugin = viewer.querySelector(
      "perspective-viewer-datagrid-norollups",
    );
    plugin._scroll_lock = this.shadowRoot.querySelector("#scroll_lock");
    plugin._scroll_lock.addEventListener("click", () =>
      toggle_scroll_lock.call(plugin),
    );

    plugin._edit_mode = this.shadowRoot.querySelector("#edit_mode");
    plugin._edit_mode.addEventListener("click", () => {
      toggle_edit_mode.call(plugin);
      plugin.regular_table.draw();
      viewer.dispatchEvent(new Event("perspective-config-update"));
    });
  }
}
