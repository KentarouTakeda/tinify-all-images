import { File } from '../src/File';

describe('File', ()=>{
  it('ファイルサイズの取得', ()=>{
    const file = new File(`${__dirname}/files/hello.txt`);
    expect(file.size).toBe(6);
  });
});
