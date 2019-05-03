/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

function view1(container, config, settings) {
    // Render the view of this data
    container.innerHTML = "";

    const cols = row =>
        Object.keys(row)
            .filter(key => key !== "__ROW_PATH__")
            .map(c => `<td>${row[c]}</td>`);

    const rows = data => data.map((r, i) => `<tr><th>${r.__ROW_PATH__ ? r.__ROW_PATH__.join(",") : i}</th>${cols(r).join("")}</tr>`);

    container.innerHTML = `<table>${rows(config.data).join("")}</table>`;
}
view1.plugin = {
    type: "template_view_1",
    name: "Template View 1",
    max_size: 25000
};
export default view1;
