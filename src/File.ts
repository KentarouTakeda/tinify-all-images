import fs = require('fs');

export class File {

  private stats?: fs.Stats;
  get size() {
    if(this.stats == null) {
      this.stats = fs.statSync(this.path);
    }
    return this.stats.size;
  }

  constructor(
    private path: string,
  ) {
  }
}
