import mkdirp = require('mkdirp');
import fs = require('fs');
import { FileList } from "./FileList";
import { Converter, Result } from "./Converter";

export async function main(srcdir: string): Promise<Result.cache[]> {

  const cacheFile = `${srcdir}/tinified.json`;
  const cache: {[path:string]: Result.cache} = {};
  try {
    const file = fs.realpathSync(cacheFile);
    const caches: Result.cache[] = require(file);
    caches.forEach(c => {
      cache[c.path] = c;
    })
  } catch(e) {}

  const converter = new Converter(null);
  const list = new FileList(srcdir);
  const results: Result.cache[] = [];

  for(let file of list.all()) {
    const cached = cache[file.path];
    let convert = false;
    convert = convert || (cached==null);
    convert = convert || (file.size != cached.size);
    convert = convert || (file.hash != cached.hash);

    if(convert === false) {
      continue;
    }

    const converted = await converter.convert(file);

    await fs.renameSync(file.path, converted.backup);
    await fs.writeFileSync(file.path, converted.buffer);

    results.push(converted.toCache());
  }

  results.sort((a, b) => {
    return a.path.localeCompare(b.path);
  })

  const json = JSON.stringify(results);
  fs.writeFileSync(cacheFile, json);

  return results;
}
