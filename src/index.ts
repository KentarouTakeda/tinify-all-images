import program = require('commander');
import dotenv = require('dotenv');
import { main } from "./main";

program
  .option('-t, --target <dir>', 'target directory', '.')
  .option('-l, --log <dir>', 'log directory', '.')
  .option('-k, --key <key>', 'tinypng api key')
  .parse(process.argv);
;

const env = dotenv.config().parsed || {};
const key =  program['key'] || env!['TINYPNG_API_KEY'];
if(key == null) {
  console.error('.envにtinypngのAPIキーを設定してください。');
  process.exit(1);
}

const { target, log } = program;

if('string' !== typeof target) {
  throw new Error();
}
if('string' !== typeof log) {
  throw new Error();
}
if('string' !== typeof key) {
  throw new Error();
}

main({ target, log, key });
