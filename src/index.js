import fs from 'mz/fs';
import path from 'path';
import axios from './lib/axios';
import { makeFileName } from './lib/transformUrl';
// import cheerio from 'cheerio';

const pageLoad = async (urlLink, localFolder) => {
  const newFileNameWithExt = makeFileName(urlLink);
  return fs.exists(localFolder)
    .then(() => axios.get(urlLink))
    .then(response => fs.writeFile(path.resolve(localFolder, newFileNameWithExt), response.data, 'utf-8'))
    .then(() => true);
};

export default pageLoad;
