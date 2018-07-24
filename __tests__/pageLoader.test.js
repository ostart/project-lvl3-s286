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

  // it('test resource files', async () => {
  //   const host = 'http://ru.hexlet.io';
  //   nock(host).get('/').replyWithFile(200, path.join(__dirname, 'barbershop/catalog-item.html'));
  //   nock(host).get('/css/normalize.css').replyWithFile(200, path.join(__dirname, 'barbershop/css/normalize.css'));
  //   nock(host).get('/css/style.css').replyWithFile(200, path.join(__dirname, 'barbershop/css/style.css'));
  //   nock(host).get('/img/small_logo.png').replyWithFile(200, path.join(__dirname, 'barbershop/img/small_logo.png'));
  //   nock(host).get('/img/main-figure.jpg').replyWithFile(200, path.join(__dirname, 'barbershop/img/main-figure.jpg'));
  //   nock(host).get('/img/small_figure1.jpg').replyWithFile(200, path.join(__dirname, 'barbershop/img/small_figure1.jpg'));
  //   nock(host).get('/img/small_figure2.jpg').replyWithFile(200, path.join(__dirname, 'barbershop/img/small_figure2.jpg'));
  //   nock(host).get('/img/small_figure3.jpg').replyWithFile(200, path.join(__dirname, 'barbershop/img/small_figure3.jpg'));
  //   nock(host).get('/js/script.js').replyWithFile(200, path.join(__dirname, 'barbershop/js/script.js'));

  //   // создать временную директорию
  //   const tempDir = await fs.mkdtemp(`${os.tmpdir()}${path.sep}`);
  //   const response = await pageLoad(host, tempDir);
  //   expect(response).toBe(true);
  //   // проверить что есть файл во временной директории с именем ru-hexlet-io.html
  //   const fileName = 'ru-hexlet-io.html';
  //   const isFileExists = await fs.exists(path.join(tempDir, fileName));
  //   expect(isFileExists).toBe(true);
  //   // проверить что есть директория с ресурсами во временной директории с именем ru-hexlet-io_files
  //   const dirName = 'ru-hexlet-io_files';
  //   const isDirExists = await fs.exists(path.join(tempDir, dirName));
  //   expect(isDirExists).toBe(true);
  //   // проверяем, что все нужные файлы ресурсов скачались
  //   const isFile1Exists = await fs.exists(path.join(tempDir, dirName, 'css-normalize.css'));
  //   expect(isFile1Exists).toBe(true);
  //   const isFile2Exists = await fs.exists(path.join(tempDir, dirName, 'css-style.css'));
  //   expect(isFile2Exists).toBe(true);
  //   const isFile3Exists = await fs.exists(path.join(tempDir, dirName, 'img-small_logo.png'));
  //   expect(isFile3Exists).toBe(true);
  //   const isFile4Exists = await fs.exists(path.join(tempDir, dirName, 'img-main-figure.jpg'));
  //   expect(isFile4Exists).toBe(true);
  //   const isFile5Exists = await fs.exists(path.join(tempDir, dirName, 'img-small_figure1.jpg'));
  //   expect(isFile5Exists).toBe(true);
  //   const isFile6Exists = await fs.exists(path.join(tempDir, dirName, 'img-small_figure2.jpg'));
  //   expect(isFile6Exists).toBe(true);
  //   const isFile7Exists = await fs.exists(path.join(tempDir, dirName, 'img-small_figure3.jpg'));
  //   expect(isFile7Exists).toBe(true);
  //   const isFile8Exists = await fs.exists(path.join(tempDir, dirName, 'js-script.js'));
  //   expect(isFile8Exists).toBe(true);
  // });
});
