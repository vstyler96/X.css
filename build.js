#!/usr/bin/env node
const dedent = require("dedent");
const ejs = require("ejs");
const fs = require("fs");
const glob = require("glob");
const hljs = require("highlight.js");
const mkdirp = require("mkdirp");
const path = require("path");
const postcss = require("postcss");
const plugins = [
  require("cssnano"),
  require("autoprefixer"),
  require("postcss-import"),
  require("postcss-nested"),
  require("postcss-calc"),
  require("postcss-base64")({
    root: process.cwd() + "/gui",
    extensions: [".png", ".svg"],
  }),
];

const { homepage, version } = require("./package.json");

/**
 * @param {Object} options
 * @param {boolean} [options.usePrefix] - Whether to scope the selectors under `.osx`.
 * @param {boolean} [options.useInlineVars] - Whether to inline CSS variables.
 */
async function buildCSS({ usePrefix, useInlineVars } = {}) {
  const input = `/*! x.css v${version} - ${homepage} */\n` + fs.readFileSync("gui/index.scss");

  let targetFile = "dist/x.css";
  let parser = postcss(plugins);

  if (usePrefix) {
    targetFile = "dist/x.scoped.css";
    parser = postcss([
      ...plugins,
      require("postcss-prefix-selector")({
        prefix: ".osx",
        transform: (prefix, selector, prefixed) => {
          if ("body" === selector) return selector + prefix;
          if (":root" === selector) return prefix;
          return prefixed;
        },
      }),
    ]);
  }
  if (useInlineVars) {
    targetFile = "dist/x.inline.css";
    parser = postcss([...plugins, require("postcss-css-variables")]);
  }

  const result = await parser.process(input, {
    from: "gui/index.scss",
    to: targetFile,
    map: { inline: false },
  });

  mkdirp.sync("dist");
  fs.writeFileSync(targetFile, result.css);
  fs.writeFileSync(targetFile + ".map", result.map.toString());
}

async function buildComponents() {
  const targetFolder = "dist/gui";
  const variablesFile = "_variables.scss";
  const files = fs.readdirSync("gui").filter((file) => file.startsWith("_") && file !== variablesFile);

  mkdirp.sync(targetFolder);
  await Promise.all(
    files.map(async (file) => {
      const target = targetFolder + "/" + file.slice(1).replace("scss", "css");
      const content = fs.readFileSync("gui/" + variablesFile) + fs.readFileSync("gui/" + file);
      const parser = postcss([...plugins, require("postcss-css-variables")]);
      const result = await parser.process(content, { from: "gui/" + file, to: target });
      fs.writeFileSync(target, result.css);
    })
  );
}

function buildDocs() {
  let id = 0;
  function getNewId() {
    return ++id;
  }
  function getCurrentId() {
    return id;
  }

  const template = fs.readFileSync("docs/index.html.ejs", "utf-8");
  function example(code) {
    const magicBrackets = /\[\[(.*)\]\]/g;
    const dedented = dedent(code);
    const inline = dedented.replace(magicBrackets, "$1");
    const escaped = hljs.highlight("html", dedented.replace(magicBrackets, "")).value;

    return `<div class="example">
      <div class="raw">${inline}</div>
      <details class="code">
        <summary>Show code</summary>
        <pre><code>${escaped}</code></pre>
      </details>
    </div>`;
  }

  glob.sync("docs/*", { ignore: ["docs/*.ejs"] }).forEach((srcFile) =>
    fs.copyFileSync(srcFile, path.join("dist", path.basename(srcFile)))
  );
  fs.writeFileSync(path.join(__dirname, "/dist/index.html"), ejs.render(template, { getNewId, getCurrentId, example }));
}

async function build() {
  await buildCSS();
  await buildCSS({ usePrefix: true });
  await buildCSS({ useInlineVars: true });
  await buildComponents();
  buildDocs();
}
module.exports = build;

if (require.main === module) {
  build().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
