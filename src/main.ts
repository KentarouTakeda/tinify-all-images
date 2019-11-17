import { mkdirp } from 'fs-extra';
import fs = require('fs');
import { FileList } from "./FileList";
import { Converter, Result } from "./Converter";

export declare namespace main {
  type Options = {
    target: string;
    log?: string;
    key?: string;
  };
}

export async function main(options: main.Options): Promise<Result.cache[]> {
  let { target, log, key } = options;
  if(log == null) {
    log = target;
  }

  const cacheFile = `${target}/tinified.json`;
  const cache: {[path:string]: Result.cache} = {};
  try {
    const file = fs.realpathSync(cacheFile);
    const caches: Result.cache[] = JSON.parse(fs.readFileSync(file).toString());
    caches.forEach(c => {
      cache[c.path] = c;
    })
  } catch(e) {}

  const converter = new Converter(key);
  const list = new FileList(target);
  const converteds: Result.cache[] = [];

  for(let file of list.all()) {
    const cached = cache[file.path];
    let convert = false;
    convert = convert || (cached==null);
    convert = convert || (file.size != cached.size);
    convert = convert || (file.hash != cached.hash);

    console.log(file.path);

    if(convert === false) {
      console.log('  変換済');
      console.log('  スキップします');
      continue;
    }

    console.log('  変換中');
    const converted = await converter.convert(file);
    console.log('  変換しました');

    await fs.renameSync(file.path, converted.backup);
    await fs.writeFileSync(file.path, converted.buffer);

    cache[file.path] = converted.toCache()
    converteds.push(converted.toCache());

    const results = Object.values(cache).sort((a, b) => {
      return a.path.localeCompare(b.path);
    })
    const json = JSON.stringify(results);
    fs.writeFileSync(cacheFile, json);
  }


  return converteds;
}
