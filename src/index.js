import fs from 'mz/fs';
import path from 'path';
import url from 'url';
import debug from 'debug';
import Listr from 'listr';
import axios from './lib/axios';
import { makeFileName, makeDirName } from './lib/transformUrl';
import { getResourceLinks, transformHtml, getResourceFileName } from './lib/workWithPage';

const debugLog = debug('page-loader:');

const downloadFile = (urlLink, resourceLink, localFolder) => {
  const downloadLink = url.resolve(urlLink, resourceLink);
  debugLog(`Download link: ${downloadLink}`);
  const newFileName = getResourceFileName(resourceLink);
  const newPathToFile = path.join(localFolder, newFileName);
  return axios.get(downloadLink, { responseType: 'stream' })
    .then(response => response.data.pipe(fs.createWriteStream(newPathToFile)))
    .then(() => debugLog(`Resource file was downloaded to: ${newPathToFile}`));
};

const makeTasks = (urlLink, resourceLinks, newDirPath) => {
  const tasks = resourceLinks.reduce((acc, currLink) => {
    const currTask = {
      title: `${url.resolve(urlLink, currLink)}`,
      task: () => downloadFile(urlLink, currLink, newDirPath),
    };
    return [...acc, currTask];
  }, []);
  return new Listr(tasks, { concurrent: true });
};

const downloadFiles = (urlLink, objRespDataResourceLinks, localFolder) => {
  const { data, resourceLinks } = objRespDataResourceLinks;
  const newDirName = makeDirName(urlLink);
  const newDirPath = path.join(localFolder, newDirName);
  return fs.mkdir(newDirPath)
    // .then(() => Promise.all(
    //   resourceLinks.map(currLink => downloadFile(urlLink, currLink, newDirPath)),
    // ))
    .then(() => makeTasks(urlLink, resourceLinks, newDirPath))
    .then(tasks => tasks.run())
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
    .then(() => {
      debugLog(`Main file ${newFileNameWithExt} was downloaded to ${localFolder}`);
      return `Page was downloaded as '${newFileNameWithExt}'`;
    });

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
// DEBUG="page-loader:*" page-loader --output /var/tmp/ https://www.iana.org/domains/reserved
