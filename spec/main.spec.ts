import { main } from '../src/main';
import fs = require('fs-extra');

describe('main', ()=>{

  describe('最初の変換', ()=>{
    const SRC = `spec/files/main/create/src`;
    const WORK = `spec/files/main/create/work`;
    beforeEach(()=>{
      fs.removeSync(WORK);
      fs.copySync(SRC, WORK);
    });
    afterEach(()=>{
      fs.removeSync(WORK);
    });

    it('対象ファイルが上書きされる', async done =>{
      const results = await main(WORK);
      expect(results.length).toBe(1);

      const converted = fs.readFileSync(`${WORK}/example-orig.png`).toString('utf8');
      expect(converted).toBe('hello');
      done();
    });
  });

  describe('変換不要', ()=>{
    const SRC = `spec/files/main/notmodified/src`;
    const WORK = `spec/files/main/notmodified/work`;
    beforeEach(()=>{
      fs.removeSync(WORK);
      fs.copySync(SRC, WORK);
    });
    afterEach(()=>{
      fs.removeSync(WORK);
    });

    it('変換済みは再変換されない', async done =>{
      const results = await main(WORK);
      expect(results.length).toBe(0);

      done();
    });
  });

  describe('変換後にオリジナルが更新された', ()=>{
    const SRC = `spec/files/main/modified/src`;
    const WORK = `spec/files/main/modified/work`;
    beforeEach(()=>{
      fs.removeSync(WORK);
      fs.copySync(SRC, WORK);
    });
    afterEach(()=>{
      fs.removeSync(WORK);
    });

    it('再変換される', async done =>{
      const results = await main(WORK);
      expect(results.length).toBe(1);

      done();
    });
  });

});
