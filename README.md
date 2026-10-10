# X.css

[![npm](https://img.shields.io/npm/v/@vstyler96/x.css)](http://npm.im/@vstyler96/x.css)
[![npm downloads](https://img.shields.io/npm/dt/@vstyler96/x.css)](http://npm.im/@vstyler96/x.css)

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

### Dist files

| File | What it is |
|---|---|
| `dist/x.css` | Everything. CSS variables (`--osx-*`) stay live so you can theme at runtime. |
| `dist/x.scoped.css` | Same, but every selector is scoped under `.osx`. Only elements inside `class="osx"` are styled. |
| `dist/x.inline.css` | Variables resolved to plain values, for old browsers. |
| `dist/gui/<component>.css` | One file per component (e.g. `dist/gui/button.css`), variables inlined. |

Prefixes: the scope class is **`.osx`**; CSS variables are **`--osx-*`**; keyframes are **`osx-*`**.

## Example

```html
<div class="window active" style="width: 30rem">
  <div class="title-bar">
    <div class="title-bar-text">Hello</div>
    <div class="title-bar-controls">
      <button aria-label="Close"></button>
      <button aria-label="Minimize"></button>
      <button aria-label="Maximize"></button>
      <button aria-label="Fullscreen"></button>
    </div>
  </div>
  <div class="window-body has-space">
    Hello world!
    <button>Cancel</button>
    <button class="default">OK</button>
  </div>
</div>
```

The markup is the same as [7.css](https://github.com/khang-nd/7.css) (and 98.css, XP.css, system.css): only the look changes. The traffic lights always render on the left and the title is centred, whatever the order of the buttons in the HTML.

## Components

| Component | Markup |
|---|---|
| Window | `.window` (`.active`, `.is-bright`) > `.title-bar` + `.window-body` (`.has-space`, `.has-scrollbar`), `.window-footer` / `footer`, `.status-bar` > `.status-bar-field` |
| Title bar | `.title-bar-text` + `.title-bar-controls` > `button[aria-label=Close\|Minimize\|Maximize\|Restore\|Help\|Fullscreen]` or `.is-close` / `.is-minimize` / `.is-maximize` / `.is-restore` / `.is-help` / `.is-fullscreen` |
| Dialog | `.window[role=dialog]`, opens on `:target`; `.is-sheet` for a Lion sheet |
| Button | `button`, `.default` (pulsing aqua), `.active`, `.focused`, `:disabled`, `label[role=button]`, file input; `.is-textured`, `.is-gradient` |
| Checkbox / radio | `input[type=checkbox\|radio]` + `label` |
| TextBox | `input[type=text\|email\|password\|number\|url]`, `textarea` |
| SearchBox | `input[type=search]`, `.searchbox` > `input[type=search]` + `button[aria-label=search]` |
| Combobox | `.combobox` > `input[type=text]` + `button` |
| Dropdown | `select` |
| ListBox | `[role=listbox]` > `[role=option][aria-selected]`, `select[multiple]`; `.has-hover`, `.has-shadow` |
| ListView | `table`; `.has-shadow`, `.is-striped`, `.has-hover`, `.is-full`, `th.highlighted`, `.indicator`, `.indicator.up`, `tr.highlighted`, `th.is-center` / `td.is-center` |
| GroupBox | `fieldset` > `legend`; `.field-row`, `.field-row-stacked`, `.group` |
| Tabs | `menu[role=tablist]` (`.justified`) > `button[role=tab][aria-selected=true]` + `[role=tabpanel]` |
| TreeView | `ul.tree-view` (`.has-container`, `.has-collapse-button`, `.has-connector`) with `details` / `summary` |
| Collapse | `details` > `summary` |
| Menu | `ul[role=menubar]` (`.can-hover`) > `li[role=menuitem]` > `ul[role=menu]`; `.has-divider`, `[aria-haspopup]`, `[aria-disabled]`, `.is-apple` |
| ProgressBar | `[role=progressbar]` > `div` (width = value); `.animate`, `.paused`, `.error`, `.marquee` (barber pole) |
| Slider | `input[type=range]`, `.has-box-indicator`, `.is-vertical` wrapper |
| Spinner | `.spinner` / `.loader`, `.animate` |
| Balloon | `[role=tooltip]`, `.is-top`, `.is-left` |
| Start button | `button.start-button`: the Apple menu, blue while `[aria-expanded="true"]` |
| Scrollbar | `.has-scrollbar` (opt-in) |
| Typography | `.instruction`, `.instruction-primary`, `.header-document`, `.header-group` |

### Extras (Lion only)

| Component | Markup |
|---|---|
| Toolbar | `.toolbar` right after `.title-bar` (unified title bar); `.is-spacer`, `.is-flexible` |
| Segmented control | `.segmented` (`.is-textured`, `.is-gradient`) > `input` + `label` pairs, or `button[aria-pressed]` |
| Scope bar | `.scope-bar` > radio + `label`, `button`, `select`, `input` |
| Source list | `.splitview` > `.sourcelist` > `details` (`summary` = heading) > radio + `label`, `.badge`, `.icon` |

## Migrating from 1.0.0

2.0.0 is a clean break: none of the old class names are kept as aliases.

| 1.0.0 | 2.0.0 |
|---|---|
| `<h1 class="title">` | `<div class="title-bar-text">` |
| `button.close` / `.minimize` / `.maximize` directly in `.title-bar` | wrap them in `.title-bar-controls`; use `aria-label="Close\|Minimize\|Maximize"` or `.is-close` / `.is-minimize` / `.is-maximize` |
| `button.resize` | `button[aria-label=Fullscreen]` or `.is-fullscreen` |
| `button.hidden` | leave the button out |
| `.inactive-title-bar` | `.title-bar` (title bars are inactive by default); add `.active` to `.window` or `.title-bar` for the focused look |
| `.window-pane` | `.window-body.has-space.has-scrollbar` |
| `.details-bar` | `.status-bar` > `.status-bar-field` (now at the bottom) |
| `.separator` | removed; the title bar has its own border |
| `.btn`, `.push`, `.standard-button`, `.button` | `button` |
| `.btn-default` | `button.default` |
| `.textured`, `.gradient` | `button.is-textured`, `button.is-gradient` |
| `div.gradient` (button bar) | `.segmented.is-gradient` |
| `label.push` / `label.textured` in `.segmented` | plain `label` in `.segmented` / `.segmented.is-textured` |
| `.standard-dialog`, `.modeless-dialog` | `.window` (add `role="dialog"` for a modal that opens on `:target`) |
| `.modal-dialog`, `.alert-box`, `.outer-border`, `.inner-border`, `.modal-contents`, `.alert-contents` | `.window[role=dialog].is-sheet` > `.window-body.has-space` |
| `role="menu-bar"` / `role="menu-item"` | `role="menubar"` / `role="menuitem"` |
| `.divider` (menu item) | `.has-divider` |
| `.apple` | `li[role=menuitem].is-apple` |
| `div.scope.bar`, `.scope` on children | `.scope-bar`, no class on children |
| `.sourcelist .section-title` + `input.disclosure` + `.section` | `.sourcelist > details > summary` |
| `.sourcelist .item` | `label` after a radio |
| `.view`, `.space`, `.flexible`, `.disabled` | removed; use `.window-body`, `.toolbar > .is-spacer`, `.toolbar > .is-flexible`, `:disabled` / `aria-disabled` |
| `input.disclosure` | `details` > `summary` |
| `--font`, `--radius`, `--aqua`, … | `--osx-font`, `--osx-el-bdr`, `--osx-el-grad-a`, … (see `gui/_variables.scss`) |

What else changed:

- x.css no longer styles `body`: no wallpaper, font or `min-height`. Set your own page background.
- Scrollbars are no longer global. Add `.has-scrollbar` to the elements that should get them.
- `h1`, `h2` and `hr` are no longer styled.
- Tables no longer have zebra rows by default. Add `.is-striped`.
- `select` is now a plain Lion pop-up button with dark up/down arrows; the aqua cap is gone.
- To keep x.css from leaking into the rest of your page, use `dist/x.scoped.css` and wrap your UI in `class="osx"`.

## Develop

```sh
make preview   # build + live reload on http://localhost:3000
make build     # build dist/ (4 CSS outputs) and the docs
make publish   # publish to npm
make deploy    # publish the docs to GitHub Pages
make clean     # delete dist/
```

`make build` runs `npm install` first when `package-lock.json` is newer than `node_modules`.

The styles live in [`gui/`](gui), one partial per component (`gui/_button.scss`, …), imported by `gui/index.scss`. They are plain CSS with nesting and `@import`, processed by PostCSS (not Sass). Icons are in [`gui/icon/`](gui/icon) and are inlined as base64 at build time.

## Credits

X.css is built on the work of:

- **[system.css](https://github.com/sakofchit/system.css)** by Sakun Acharige: the original fork.
- **[7.css](https://github.com/khang-nd/7.css)** by khang-nd: the architecture, build and markup API.
- **[Lion CSS UI Kit](https://sakamies.github.io/Lion-CSS-UI-Kit/)** by Ville V. Vanninen ([@sakamies](https://github.com/sakamies)): buttons, segmented controls, scope bar, and source list.
- **[Mac OS X Lion on CodePen](https://codepen.io/rapttor/pen/PaVmZK)** by [rapttor](https://codepen.io/rapttor): window chrome, traffic lights, and menu bar.

Maintained by Vincent GS ([@vstyler96](https://github.com/vstyler96)). Bugs and PRs are welcome on [GitHub](https://github.com/vstyler96/x.css/issues).

## License

[MIT](LICENSE)
