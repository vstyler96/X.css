# X.css

A CSS library that makes web pages look like **Mac OS X Lion**: glossy traffic lights, aqua buttons, gradient title bars, and blue source lists.

No JavaScript. Works with any framework. [See the docs](https://vstyler96.github.io/x.css/)

## Install

**CDN:** add this to your `<head>`:

```html
<link rel="stylesheet" href="https://unpkg.com/@vstyler96/x.css" />
```

**npm:**

```sh
npm i @vstyler96/x.css
```

## Example

```html
<div class="window" style="width: 30rem">
  <div class="title-bar">
    <button aria-label="Close" class="close"></button>
    <button aria-label="Minimize" class="minimize"></button>
    <button aria-label="Zoom" class="maximize"></button>
    <h1 class="title">Hello</h1>
    <button aria-label="Full Screen" class="resize"></button>
  </div>
  <div class="window-pane">
    Hello world!
    <button class="btn">Cancel</button>
    <button class="btn btn-default">OK</button>
  </div>
</div>
```

## Components

| Component | Markup |
|---|---|
| Window | `.window` > `.title-bar` + `.window-pane` |
| Traffic lights | `button.close`, `.minimize`, `.maximize`, `.resize` inside `.title-bar` |
| Buttons | `.btn`, `.btn-default` (pulsing aqua), `disabled` |
| Checkbox / radio | `<input type="checkbox">` + `<label>` |
| Select, text box | plain `<select>` and `<input>` |
| Menu bar | `<ul role="menu-bar">` with `role="menu-item"` / `role="menu"` |
| Dialogs | `.standard-dialog`, `.modal-dialog`, `.alert-box`, `.modeless-dialog` |
| Segmented control | `.segmented` with `.push` or `.textured` labels |
| Scope bar | `div.scope.bar` with `.scope` controls |
| Source list | `.splitview` > `.sourcelist` |

The class names match [system.css](https://github.com/sakofchit/system.css), so system.css markup works here too.

## Develop

```sh
make preview   # build + live reload on http://localhost:3000
make build     # build dist/x.css and the docs
make publish   # publish to npm
make deploy    # publish the docs to GitHub Pages
```

All styles live in [`style.css`](style.css). Icons are in [`icon/`](icon).

## Credits

X.css is built on the work of:

- **[system.css](https://github.com/sakofchit/system.css)** by Sakun Acharige: the project structure, class names, and build.
- **[Lion CSS UI Kit](https://sakamies.github.io/Lion-CSS-UI-Kit/)** by Ville V. Vanninen ([@sakamies](https://github.com/sakamies)): buttons, segmented controls, scope bar, and source list.
- **[Mac OS X Lion on CodePen](https://codepen.io/rapttor/pen/PaVmZK)** by [rapttor](https://codepen.io/rapttor): window chrome, traffic lights, and menu bar.

Maintained by Vincent GS ([@vstyler96](https://github.com/vstyler96)). Bugs and PRs are welcome on [GitHub](https://github.com/vstyler96/x.css/issues).

## License

[MIT](LICENSE)
