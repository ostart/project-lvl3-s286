const errorMessage = (err) => {
  if (err.code) {
    const message = `ErrorCode: ${err.code}. `;
    switch (err.code) {
      case 'ENOENT':
        return message.concat(`No such file or directory: ${err.path}`);

      case 'EACCES':
        return message.concat('Permission denied');

      case 'EEXIST':
        return message.concat(`File or directory exists: ${err.path}`);

      case 'ENOTDIR':
        return message.concat(`Not a directory: ${err.path}`);

      case 'ENAMETOOLONG':
        return message.concat(`File name too long: ${err.path}`);

      case 'ECONNREFUSED':
        return message.concat(`Connection refused: ${err.config.url}`);

      case 'ENOTFOUND':
        return message.concat(`Address not found: ${err.config.url}`);

      default:
        return message.concat(err.message);
    }
  } else if (err.response && err.response.status) {
    const message = `ResponseStatus: ${err.response.status}. `;
    switch (err.response.status) {
      case 301:
        return message.concat(`Moved Permanently: ${err.response.config.url}`);

      case 302:
        return message.concat(`Moved Temporarily: ${err.response.config.url}`);

      case 400:
        return message.concat(`Bad Request: ${err.request}`);

      case 403:
        return message.concat(`Forbidden: ${err.response.config.url}`);

      case 404:
        return message.concat(`Not Found: ${err.response.config.url}`);

      case 408:
        return message.concat(`Request Timeout: ${err.response.config.url}`);

      case 429:
        return message.concat(`Too Many Requests: ${err.response.config.url}`);

      case 500:
        return message.concat(`Internal Server Error: ${err.response.config.url}`);

      case 503:
        return message.concat(`Service Unavailable: ${err.response.config.url}`);

      default:
        return message.concat(err.message);
    }
  }

  return err.message;
};

export default errorMessage;
