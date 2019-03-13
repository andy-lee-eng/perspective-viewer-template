# Perspective Viewer Plugin Template

This project is a template for creating new viewer plugins for [Perspective](https://github.com/jpmorganchase/perspective).

## Setup

  * Fork this repo.
  * Edit `package.json` and set the name to "perspective-viewer-{myplugin}" (replacing "{myplugin}" with the name of your plugin).
  * Open a console window in the project root and run:

```
  yarn
  yarn start
```

## Creating Views

The template project comes with an example View in `/src/js/views/view-1.js`, which renders a basic table of the data.

New views should be added to the list in `/src/js/views/views.js`.

A view is a function that takes a `container` and a `settings` parameter:

```javascript
function myView(container, settings) {
  // Render view of settings into container
}
```

`container` is a DOM node to render the view into
`settings` is a JSON object containing the current view and data:

```json
  {
    row_pivots,
    aggregates,
    col_pivots,
    hidden,
    schema,
    data
  }
```

## Styling with Less and Themes

CSS styles should be added to `/src/less/plugin.less` (additional less modules can be imported into this less file).

Theming is supported via `src/themes/material.dark.less`. Variables defined here can be used in the main less file with a fallback like this:

```css
  .selection {
    color: var(--plugin-theme-variable, #ff0000);
  }
```

To apply the theme at runtime, include the theme css file:

```html
<link rel='stylesheet' href="/myplugin.plugin.dark.css" is="custom-style">
```
