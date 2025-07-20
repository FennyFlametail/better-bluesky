import fs from 'fs/promises';
import postcss from 'postcss';
import cssnano from 'cssnano';
import nested from 'postcss-nested';

const css = await fs.readFile('./input.css');

const result = await postcss([nested, cssnano]).process(css, {
  from: './input.css',
  to: './output.css',
});

fs.writeFile('./output.css', result.css);
if (result.map) fs.writeFile('./output.css.map', result.map.toString());
