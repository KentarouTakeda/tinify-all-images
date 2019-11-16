import { File } from "./File";
import { Converter } from "./Converter";
import fs = require('fs');

const file = new File('./example-orig.png');
console.log(file.hash, file.size);
const converter = new Converter('RrpzmMNJkq0z30vdxBb0TGhG16f2llTp');

(async () => {
  const converted = await converter.convert(file);

  await fs.renameSync(file.path, converted.backup);
  await fs.writeFileSync(file.path, converted.buffer);
  console.log(converted);
  console.log(converted.toCache());
})()

