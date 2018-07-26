import fs from 'mz/fs';
import path from 'path';
import url from 'url';
import axios from './lib/axios';
import { makeFileName, makeDirName } from './lib/transformUrl';
import { getResourceLinks, transformHtml, getResourceFileName } from './lib/workWithPage';

const downloadFile = (urlLink, resourceLink, localFolder) => {
  const downloadLink = url.resolve(urlLink, resourceLink);
  // console.log(downloadLink);
  const newFileName = getResourceFileName(resourceLink);
  const newPathToFile = path.join(localFolder, newFileName);
  // console.log(newPathToFile);
  return axios.get(downloadLink, { responseType: 'stream' })
    .then(response => response.data.pipe(fs.createWriteStream(newPathToFile)));
};

const downloadFiles = (urlLink, objRespDataResourceLinks, localFolder) => {
  const { data, resourceLinks } = objRespDataResourceLinks;
  const newDirName = makeDirName(urlLink);
  const newDirPath = path.join(localFolder, newDirName);
  return fs.mkdir(newDirPath)
    .then(() => Promise.all(
      resourceLinks.map(currLink => downloadFile(urlLink, currLink, newDirPath)),
    ))
    .then(() => data);
};

const pageLoad = async (urlLink, localFolder) => {
  const newFileNameWithExt = makeFileName(urlLink);
  return fs.exists(localFolder)
    .then(() => axios.get(urlLink))
    .then(response => getResourceLinks(response.data))
    .then(objRespDataResourceLinks => downloadFiles(urlLink, objRespDataResourceLinks, localFolder))
    .then(respData => transformHtml(respData, makeDirName(urlLink)))
    .then(finalHtml => fs.writeFile(path.join(localFolder, newFileNameWithExt), finalHtml, 'utf-8'))
    .then(() => true);

  // const flag = await fs.exists(localFolder);
  // if (flag) {
  //   const response = await axios.get(urlLink);
  //   const resourceLinks = getResourceLinks(response.data);
  //   await downloadFiles(urlLink, resourceLinks, localFolder);
  //   const finalHtml = transformHtml(response.data, makeDirName(urlLink));
  //   await fs.writeFile(path.join(localFolder, newFileNameWithExt), finalHtml, 'utf-8');
  //   return true;
  // }
  // return false;
};

export default pageLoad;

// pageLoad('https://www.iana.org/domains/reserved', '/var/tmp/');
