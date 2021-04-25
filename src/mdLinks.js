const {
  validatePath,
  toAbsolutePath,
  getLinksWithPath,
  validateAllLinks,
} = require('./index.js');

const mdLinks = (path, options = { validate: true }) => {
  const newPromise = new Promise((resolve, reject) => {
    const absoluteRoute = toAbsolutePath(path);
    if ((validatePath(path) === true && options.validate === undefined) || (validatePath(path) === true && options.validate === '')) {
      return resolve(getLinksWithPath(absoluteRoute));
    } if (validatePath(path) === true && options.validate === true) {
      return validateAllLinks(absoluteRoute).then((resp) => {
        resolve(resp);
      }).catch((err) => { reject(err); });
    } if (validatePath(path) === false) {
      return resolve(console.log('Ruta invalida'));
    }
  });
  return newPromise;
};

module.exports = { mdLinks };
