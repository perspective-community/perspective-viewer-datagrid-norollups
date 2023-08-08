function get_psp_type(metadata) {
  if (metadata.x >= 0) {
    return this._column_types[metadata.x];
  } else {
    return this._row_header_types[metadata.row_header_x - 1];
  }
}

export function rollup_style_listener(regularTable) {
  for (const tr of regularTable.children[0].children[1].children) {
    for (const td of tr.children) {
      const metadata = regularTable.getMeta(td);
      console.log(metadata);
      if (metadata.row_header[metadata.row_header.length - 1]) {
        // keep the content
        continue;
      }
      if (metadata.y === 0 && metadata.row_header_x === 0) {
        // "TOTAL" header
        td.textContent = "All";
        continue;
      }
      if (metadata.row_header_x !== undefined) {
        // header, keep the content
        continue;
      }
      // Delete the content
      td.textContent = "";
    }
  }
}
