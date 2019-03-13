/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

import {bindTemplate} from "@jpmorganchase/perspective-viewer/cjs/js/utils";
import style from "../../less/plugin.less";
import {name} from "../../../package.json";

const template = `<template id="${name}"><div id="container"></div></template>`;

@bindTemplate(template, style) // eslint-disable-next-line no-unused-vars
class TemplateElement extends HTMLElement {
    connectedCallback() {
        this._container = this.shadowRoot.querySelector("#container");
    }

    render(view, settings) {
        this._container.innerHTML = "";
        view(this._container, settings);
    }

    resize() {
        
    }
}
