import tinify = require('tinify');
import { File } from './File';
import crypto = require('crypto');

export class Converter {
  constructor(private key?: string) {
    if(key != null) {
      tinify.key = key;
    }
  }

  async convert(file: File) {
    let tinified: Uint8Array;
    if(this.key == null) {
      tinified = new Uint8Array(Buffer.from('hello')); // テスト側でモックしたい
    } else {
      tinified = await tinify.fromBuffer(file.buffer).toBuffer();
    }
    const date = new Date();
    return new Result(file.path, tinified);
  }
}

export class Result {
  hash: string;
  backup: string;
  get size() { return this.buffer.length }

  constructor(
    public path: string,
    public buffer: Uint8Array,
  ) {
    const hash = crypto.createHash('md5');
    hash.update(buffer);
    this.hash = hash.digest('hex');
    this.backup = path + `.${new Date().toLocaleString().replace(' ', '-')}`;
  }

  toCache(): Result.cache {
    return {
      hash: this.hash,
      size: this.size,
      path: this.path,
    }
  }
}

export declare namespace Result {
  interface cache {
    hash: string;
    size: number;
    path: string;
  }
}

