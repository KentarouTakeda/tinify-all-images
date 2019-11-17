import program = require('commander');
import { main } from "./main";

program
  .option('-t, --target <dir>', 'target directory', '.')
  .option('-l, --log <dir>', 'log directory', '.')
  .parse(process.argv);
;

const { target, log } = program;

if('string' !== typeof target) {
  throw new Error();
}
if('string' !== typeof log) {
  throw new Error();
}
