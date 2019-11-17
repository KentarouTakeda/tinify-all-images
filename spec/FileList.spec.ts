import path = require('path');
import { FileList } from '../src/FileList';

describe('FileList', ()=>{
  it('ディレクトリ配下のファイル一覧', ()=>{
    const list = new FileList(`${__dirname}/files/list`);
    const files = list.all().map(file => path.basename(file.path)).sort();
    expect(files).toEqual([ '1.jpeg', '2.jpg', '3.png', '5.PNG' ]);
  });

  it('node_modules配下は除外', ()=>{
    const list = new FileList(`${__dirname}/files/exclude`);
    const files = list.all().map(file => path.basename(file.path)).sort();
    expect(files).toEqual([ 'a.png']);
  });

  it('相対パスでの保持', ()=>{
    const list = new FileList(`spec/files/list`);
    const files = list.all().map(file => file.path).sort();
    const EXPECTED = [
      'spec/files/list/1.jpeg',
      'spec/files/list/2.jpg',
      'spec/files/list/3.png',
      'spec/files/list/5.PNG'
    ];
    expect(EXPECTED).toEqual(files);
  });
});
