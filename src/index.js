import fs from 'mz/fs';
import path from 'path';
import url from 'url';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

const pageLoad = async (urlLink, localFolder) => {
  axios.defaults.host = urlLink;
  axios.defaults.adapter = httpAdapter;
  const link = url.parse(urlLink);
  const newFileName = `${link.host}${(link.path !== '/') ? link.path : ''}`.replace(/[^A-Za-z0-9]/g, '-');
  const newFileNameWithExt = `${newFileName}.html`;
  // const flag = await fs.exists(localFolder);
  // if (flag) {
  //   const response = await axios.get(urlLink);
  //   await fs.writeFile(path.resolve(localFolder, newFileNameWithExt), response.data, 'utf-8');
  //   return true;
  // }
  // return false;
  return fs.exists(localFolder)
    .then(() => axios.get(urlLink))
    .then(response => fs.writeFile(path.resolve(localFolder, newFileNameWithExt), response.data, 'utf-8'))
    .then(() => true)
    .catch((e) => {
      console.log(e);
      return false;
    });
};

export default pageLoad;
