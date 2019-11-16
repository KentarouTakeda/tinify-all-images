import fs = require('fs');
import crypto = require('crypto');

export class File {

  private stats?: fs.Stats;
  get size() {
    if(this.stats == null) {
      this.stats = fs.statSync(this.path);
    }
    return this.stats.size;
  }

  private _hash?: string;
  get hash() {
    if(this._hash == null) {
      const body = fs.readFileSync(this.path);
      const hash = crypto.createHash('md5');
      hash.update(body);
      this._hash = hash.digest('hex');

    }
    return this._hash
  }

  compare(file: File) {
    if(this.size !== file.size) {
      return false;
    }
    if(this.hash !== file.hash) {
      return false;
    }
    return true;
  }

  constructor(
    private path: string,
  ) { }
}
