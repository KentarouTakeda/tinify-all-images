import { File } from './File';
import glob = require('glob');

export class FileList {

  private readonly files: File[] = [];

  constructor(
    private dir: string,
  ) {
    glob.sync(`${dir}/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}`, {
      ignore: ['**/node_modules/**'],
    }).forEach(path => {
      this.files.push(new File(path));
    })
  }

  all() {
    return this.files;
  }
}
