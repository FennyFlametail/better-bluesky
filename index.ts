import fs from 'fs/promises';
import postcss from 'postcss';
import cssnano from 'cssnano';
import nested from 'postcss-nested';

const css = await fs.readFile('./input.css', 'utf-8');
const header =
  css.match(/\/\* ==UserStyle==\n.+\n\/instructions \*\//s)?.[0] ?? '';

const result = await postcss([nested, cssnano]).process(css, {
  from: './input.css',
  to: './output.css',
});

result.css = result.css.replace(
  /@-moz-document domain\("bsky\.app"\){(.+)}/s,
  `
@-moz-document domain("bsky.app") {
$1
}`
);

fs.writeFile('./output-stylus.css', header.concat(result.css));
if (result.map) fs.writeFile('./output-stylus.css.map', result.map.toString());

/* output Userscripts for Mac/iOS file with @-moz-document removed */
result.css = result.css.replace(
  /@-moz-document domain\("bsky\.app"\) {(.+)}/s,
  '$1'
);
fs.writeFile('./output-userscripts.css', header.concat(result.css));
