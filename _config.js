import lang_bash from "https://unpkg.com/@highlightjs/cdn-assets@11.9.0/es/languages/bash.min.js";
import lang_clojure from "https://unpkg.com/@highlightjs/cdn-assets@11.9.0/es/languages/clojure.min.js";
import lang_javascript from "https://unpkg.com/@highlightjs/cdn-assets@11.9.0/es/languages/javascript.min.js";
import lang_json from "https://unpkg.com/@highlightjs/cdn-assets@11.9.0/es/languages/json.min.js";
import lang_typescript from "https://unpkg.com/@highlightjs/cdn-assets@11.9.0/es/languages/typescript.min.js";
import lume from "lume/mod.ts";
import attributes from "lume/plugins/attributes.ts";
import base_path from "lume/plugins/base_path.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import date from "lume/plugins/date.ts";
import feed from "lume/plugins/feed.ts";
import jsx from "lume/plugins/jsx.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import pagefind from "lume/plugins/pagefind.ts";
import postcss from "lume/plugins/postcss.ts";
import sitemap from "lume/plugins/sitemap.ts";
import terser from "lume/plugins/terser.ts";

const markdown = {
	options: {
		linkify: true,
	},
};

const site = lume({}, { markdown });

site.remoteFile(
	"_includes/css/code/default.css",
	"https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/github.min.css",
);
site.ignore("README.md", "CHANGELOG.md", "node_modules", "tools");
site.copy("img");
site.copy("CNAME");
site.copy("site.webmanifest");
site.use(
	feed({
		query: "type=posts",
		info: {
			title: "ハッカーと漫画家",
			description: "Clojure 好きなプログラマ kbaba1001 のブログ",
			published: new Date("2023", "11", "18"),
			lang: "ja_JP",
			generator: true,
		},
	}),
);
site.use(
	pagefind({
		indexing: {
			rootSelector: "main",
			verbose: false,
			excludeSelectors: ["#posts-index"],
		},
	}),
);
site.use(attributes());
site.use(base_path());
site.use(
	code_highlight({
		languages: {
			clojure: lang_clojure,
			bash: lang_bash,
			typescript: lang_typescript,
			javascript: lang_javascript,
			json: lang_json,
		},
	}),
);
site.use(date());
site.use(jsx());
site.use(lightningCss());
site.use(postcss());
site.use(terser());
site.use(sitemap());

export default site;
