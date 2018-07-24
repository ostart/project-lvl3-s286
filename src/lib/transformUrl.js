import url from 'url';

const makeNewName = (urlLink) => {
  const link = url.parse(urlLink);
  const newName = `${link.host}${(link.path !== '/') ? link.path : ''}`;
  return newName.replace(/[^A-Za-z0-9]/g, '-');
};

export const makeFileName = urlLink => `${makeNewName(urlLink)}.html`;

export const makeDirName = urlLink => `${makeNewName(urlLink)}_files`;
