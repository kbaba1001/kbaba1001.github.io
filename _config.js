import lume from "lume/mod.ts";
import feed from "lume/plugins/feed.ts";
import pagefind from "lume/plugins/pagefind.ts";
import postcss from "lume/plugins/postcss.ts";
import terser from "lume/plugins/terser.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import date from "lume/plugins/date.ts";
import jsx from "lume/plugins/jsx.ts";
import base_path from "lume/plugins/base_path.ts";
import attributes from "lume/plugins/attributes.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import lang_clojure from "https://unpkg.com/@highlightjs/cdn-assets@11.6.0/es/languages/clojure.min.js";
import lang_bash from "https://unpkg.com/@highlightjs/cdn-assets@11.6.0/es/languages/bash.min.js";

const site = lume();

site.remoteFile(
  "_includes/css/code/default.css",
  "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/github.min.css"
);
site.ignore("README.md", "CHANGELOG.md", "node_modules");
site.copy("img");
site.copy("CNAME");
site.copy("site.webmanifest");
site.use(feed({
  query: "type=posts",
  info: {
    title: "kbaba1001 ブログ",
    description: "Clojure 好きなプログラマ kbaba1001 のブログ",
    published: new Date('2023', '11', '18'),
    lang: "ja_JP",
    generator: true,
  },
}));
site.use(pagefind({
  indexing: {
    rootSelector: "main",
    verbose: false,
    excludeSelectors: ["#posts-index"]
  },
}));
site.use(attributes());
site.use(base_path());
site.use(
  code_highlight({
    languages: {
      clojure: lang_clojure,
      bash: lang_bash,
    },
  })
);
site.use(date());
site.use(jsx());
site.use(lightningCss());
site.use(postcss());
site.use(terser());

export default site;
