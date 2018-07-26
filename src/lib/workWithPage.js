import cheerio from 'cheerio';
import url from 'url';
import path from 'path';
import _ from 'lodash';

const kvPairsTagAttr = {
  img: 'src',
  script: 'src',
  link: 'href',
};

export const getResourceLinks = (data) => {
  const $ = cheerio.load(data);
  const tags = Object.keys(kvPairsTagAttr);

  const callbackFn = (acc, currTag) => {
    const resourceLinks = [];
    $(currTag).each((i, elem) => {
      const res = $(elem).attr(kvPairsTagAttr[currTag]);
      if (res) {
        const linkObj = url.parse(res);
        if (!linkObj.protocol) {
          resourceLinks.push(res);
        }
      }
    });
    return [...acc, ...resourceLinks];
  };

  const resourceLinks = tags.reduce(callbackFn, []);
  return { data, resourceLinks };
};

export const getResourceFileName = (relativePath) => {
  const str = _.trim(relativePath, '/');
  return str.replace(new RegExp('/', 'g'), '-');
};

export const transformHtml = (data, localPath) => {
  const $ = cheerio.load(data);
  const tags = Object.keys(kvPairsTagAttr);

  const callbackFn = (currTag) => {
    $(currTag).each((i, elem) => {
      const res = $(elem).attr(kvPairsTagAttr[currTag]);
      if (res) {
        const linkObj = url.parse(res);
        if (!linkObj.protocol) {
          const newPath = path.join(localPath, getResourceFileName(res));
          $(elem).attr(kvPairsTagAttr[currTag], newPath);
        }
      }
    });
  };

  tags.map(callbackFn);
  return $.html();
};
