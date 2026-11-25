import {readdir, mkdir, copyFile} from 'node:fs/promises';
import path from 'node:path';

// GitHub Pages serves /route.html and /route/index.html differently.
// Retain the export's original files and support shared URLs ending in /.
const root = path.resolve('dist/client');
async function addAliases(directory) {
  for (const entry of await readdir(directory, {withFileTypes:true})) {
    const source = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await addAliases(source);
    } else if (entry.name.endsWith('.html') && !['index.html','404.html'].includes(entry.name)) {
      const destination = source.slice(0, -5);
      await mkdir(destination, {recursive:true});
      await copyFile(source, path.join(destination, 'index.html'));
    }
  }
}
await addAliases(root);
