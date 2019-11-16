import { File } from '../src/File';

describe('File', ()=>{
  it('ファイルサイズの取得', ()=>{
    const file = new File(`${__dirname}/files/file/hello.txt`);
    expect(file.size).toBe(6);
  });

  it('ハッシュの取得', ()=>{
    const file = new File(`${__dirname}/files/file/hello.txt`);
    expect(file.hash).toBe('b1946ac92492d2347c6235b4d2611184');
  });

  describe('ファイルの比較', ()=>{
    it('同じ内容', ()=>{
      const f1 = new File(`${__dirname}/files/file/a.1.txt`);
      const f2 = new File(`${__dirname}/files/file/a.2.txt`);
      const compare = f1.compare(f2);
      expect(compare).toBe(true);
    });

    it('サイズが同じで内容が異なる', ()=>{
      const f1 = new File(`${__dirname}/files/file/a.1.txt`);
      const f2 = new File(`${__dirname}/files/file/b.txt`);
      const compare = f1.compare(f2);
      expect(compare).toBe(false);
    });

    it('サイズが異なる', ()=>{
      const f1 = new File(`${__dirname}/files/file/a.1.txt`);
      const f2 = new File(`${__dirname}/files/file/cc.txt`);
      const compare = f1.compare(f2);
      expect(compare).toBe(false);
    });
  });
});
