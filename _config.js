import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import terser from "lume/plugins/terser.ts";
import parcel_css from "lume/plugins/parcel_css.ts";
import date from "lume/plugins/date.ts";
import jsx from "lume/plugins/jsx.ts";
import base_path from "lume/plugins/base_path.ts";
import attributes from "lume/plugins/attributes.ts";

const site = lume();

site.ignore("README.md", "CHANGELOG.md", "node_modules");
site.copy("img");
site.copy("CNAME");
site.use(attributes());
site.use(base_path());
site.use(date());
site.use(jsx());
site.use(parcel_css());
site.use(postcss());
site.use(terser());

export default site;
