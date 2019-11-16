import fs = require('fs');
import crypto = require('crypto');

export class File {

  private stats?: fs.Stats;
  get size() {
    if(this.stats === undefined) {
      this.stats = fs.statSync(this.path);
    }
    return this.stats.size;
  }

  private _hash?: string;
  get hash() {
    if(this._hash === undefined) {
      const hash = crypto.createHash('md5');
      hash.update(this.buffer);
      this._hash = hash.digest('hex');
    }
    return this._hash
  }


  private _buffer?: Buffer;
  get buffer() {
    if(this._buffer === undefined) {
      this._buffer = fs.readFileSync(this.path);
    }
    return this._buffer;
  }

  get path() {
    return this._path;
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
    private _path: string,
  ) { }
}
