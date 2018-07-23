import fs from 'mz/fs';
import os from 'os';
import nock from 'nock';
import path from 'path';

import pageLoad from '../src';


describe('Page Loader', () => {
  beforeAll(() => {
    nock.disableNetConnect();
  });

  it('test data', async () => {
    const host = 'http://ru.hexlet.io';
    const body = 'test data';
    nock(host).get('/').reply(200, body);

    // создать временную директорию
    const tempDir = await fs.mkdtemp(`${os.tmpdir()}${path.sep}`);
    const response = await pageLoad(host, tempDir);
    expect(response).toBe(true);
    // проверить что есть файл во временной директории с именем ru-hexlet-io.html
    const fileName = 'ru-hexlet-io.html';
    const isFileExists = await fs.exists(path.join(tempDir, fileName));
    expect(isFileExists).toBe(true);
    // проверить что содержимое файла 'test data'
    const fileContent = await fs.readFile(path.join(tempDir, fileName), 'utf-8');
    expect(fileContent).toBe(body);
  });
});
