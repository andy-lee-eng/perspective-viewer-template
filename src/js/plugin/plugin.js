/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

import views from "../views/views";
import "./template";
import {name} from "../../../package.json";

export const PRIVATE = Symbol(name);

const DEFAULT_PLUGIN_SETTINGS = {
    initial: {
        type: "number",
        count: 1
    },
    selectMode: "select"
};

views.forEach(view => {
    global.registerPlugin(view.plugin.type, {
        ...DEFAULT_PLUGIN_SETTINGS,
        ...view.plugin,
        create: drawView(view),
        resize: resizeView,
        delete: deleteView
    });
});

function drawView(viewEntryPoint) {
    return async function(el, view, task) {
        // FIXME: super tight coupling to private viewer methods
        const row_pivots = this._get_view_row_pivots();
        const col_pivots = this._get_view_column_pivots();
        const aggregates = this._get_view_aggregates();
        const hidden = this._get_view_hidden(aggregates);

        const [schema, data] = await Promise.all([this._table.schema(), view.to_json()]);
        if (task.cancelled) {
            return;
        }

        getElement.call(this, el).render(viewEntryPoint, {
            row_pivots,
            aggregates,
            col_pivots,
            hidden,
            schema,
            data
        });
    };
}

function resizeView() {
    if (this[PRIVATE] && this[PRIVATE].view) {
        this[PRIVATE].view.resize();
    }
}

function deleteView() {
    if (this[PRIVATE] && this[PRIVATE].view) {
        this[PRIVATE].view.remove();
    }
}

function getElement(div) {
    this[PRIVATE] = this[PRIVATE] || {};
    if (!this[PRIVATE].view) {
        this[PRIVATE].view = document.createElement(name);
    }

    if (!document.body.contains(this[PRIVATE].view)) {
        div.innerHTML = "";
        div.appendChild(this[PRIVATE].view);
    }

    return this[PRIVATE].view;
}
