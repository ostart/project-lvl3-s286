import cheerio from 'cheerio';
import url from 'url';
import path from 'path';
import _ from 'lodash';

export const getResourceLinks = (data) => {
  const $ = cheerio.load(data);
  const resourceLinks = [];

  $('img').each((i, elem) => {
    const res = $(elem).attr('src');
    if (res) {
      const linkObj = url.parse(res);
      if (!linkObj.protocol) {
        resourceLinks.push(res);
      }
    }
  });

  $('script').each((i, elem) => {
    const res = $(elem).attr('src');
    if (res) {
      const linkObj = url.parse(res);
      if (!linkObj.protocol) {
        resourceLinks.push(res);
      }
    }
  });

  $('link').each((i, elem) => {
    const res = $(elem).attr('href');
    if (res) {
      const linkObj = url.parse(res);
      if (!linkObj.protocol) {
        resourceLinks.push(res);
      }
    }
  });

  return resourceLinks;
};

export const getResourceFileName = (relativePath) => {
  const str = _.trim(relativePath, '/');
  return str.replace(new RegExp('/', 'g'), '-');
};

export const transformHtml = (data, localPath) => {
  const $ = cheerio.load(data);

  $('img').each((i, elem) => {
    const res = $(elem).attr('src');
    if (res) {
      const linkObj = url.parse(res);
      if (!linkObj.protocol) {
        const newPath = path.join(localPath, getResourceFileName(res));
        $(elem).attr('src', newPath);
      }
    }
  });

  $('script').each((i, elem) => {
    const res = $(elem).attr('src');
    if (res) {
      const linkObj = url.parse(res);
      if (!linkObj.protocol) {
        const newPath = path.join(localPath, getResourceFileName(res));
        $(elem).attr('src', newPath);
      }
    }
  });

  $('link').each((i, elem) => {
    const res = $(elem).attr('href');
    if (res) {
      const linkObj = url.parse(res);
      if (!linkObj.protocol) {
        const newPath = path.join(localPath, getResourceFileName(res));
        $(elem).attr('href', newPath);
      }
    }
  });

  return $.html();
};
