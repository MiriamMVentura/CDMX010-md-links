'use strict';

const fs = require('fs');
const path = require('path');
const marked = require('marked');
const fetch = require('node-fetch');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// validar si ruta que ingresa el usuario es valida o existe
const validatePath = (pathInput) => fs.existsSync(pathInput);
// console.log(validatePath('directory')); // devuelve true or false

// verificar si la ruta es absoluta, si no lo es, la hace absoluta
const toAbsolutePath = (pathInput) => (path.isAbsolute(pathInput) ? pathInput : path.resolve(pathInput));
// console.log(toAbsolutePath('directory')); //devuelve en algo así : C:\Users\batho\Escritorio\Laboratoria\CDMX010-md-links\directory

//-- verificar si la ruta es una carpeta
const isDirectory = (pathInput) => (fs.statSync(pathInput).isDirectory());
// console.log(isDirectory('directory'));

//-- verificar si la ruta es un archivo
const isAfile = (pathInput) => fs.statSync(pathInput).isFile();
// console.log(isAfile('./directory/prueba.md')); // devuelve true or false

const showDirectory = (routeInput) => fs.readdirSync(routeInput, 'utf-8');
// console.log(showDirectory('directory')); // devuelve un arreglo con todos los archivos dentro de una carpeta

// Evalua si el archivo es md
const mdFile = (routeInput) => path.extname(routeInput) === '.md';
// console.log(mdFile('directory\prueba.md')); // devuelve true or false

// --- funciones recursivas

const getLinksFromMd = (fileMd) => {
  const linksArray = [];
  const readData = fs.readFileSync(fileMd, 'utf-8');
  const fileToHtml = marked(readData);
  const falseDom = new JSDOM(fileToHtml);
  falseDom.window.document.querySelectorAll('a').forEach((object)=> {
    linksArray.push({
      href: object.getAttribute('href'),
      text: object.textContent,
      path: fileMd,
    });
  });
  const newArrayLinks = linksArray.filter((object) =>
    /https?:\/\/[a-zA-Z\.\/-]+/gm.test(object.href)
  );
  // console.log(newArrayLinks)
  return newArrayLinks;
};

// getLinksFromMd('./directory/prueba.md') // para comprobar si esta función retorna los objetos link

const getAllFilesMd = (dirName) => {
  const absolutePath = toAbsolutePath(dirName);
  let filesMdArray = [];
  if (isDirectory(absolutePath)){
    showDirectory(absolutePath).forEach((file) => {
      const pathWithFile = path.join(absolutePath, file);
      filesMdArray = filesMdArray.concat(getAllFilesMd(pathWithFile));
    });
  } else if (isAfile(absolutePath)){
    if (mdFile(absolutePath)){
      filesMdArray.push(absolutePath);
    }
  }
  // console.log(filesMdArray)
  return filesMdArray;
};

// console.log(getAllFilesMd('directory')); //para comprobar si esta función muestra solo los archivos md.

const getLinksWithPath = (route) => {
  let pathAndLink = [];
  const filePaths = getAllFilesMd(route);
  filePaths.forEach((fileMd) => {
    pathAndLink = pathAndLink.concat(getAllFilesMd(fileMd));
  });
  // console.log(pathAndLink)
  return pathAndLink;
};

// console.log(getLinksWithPath('./directory/prueba.md'))

// // validación de links
const newArray = (arr) => arr.map((file) => getLinksFromMd(file));

const validateAllLinks = (route) => {
  const arrayAllLinks = getLinksWithPath(route);
  const concatArray = newArray(arrayAllLinks).flat();
  const statusAllLinks = concatArray.map((object) => fetch(object.href)
    .then((response) => ({
      href: object.href,
      text: object.text,
      path: object.path,
      status: response.status,
      statusText: response.statusText,
    })).catch((err) => ({
      status: err.status,
      statusText: err.statusText,
    })));
    // console.log(statusAllLinks)
  return Promise.all(statusAllLinks);
};

// console.log(validateAllLinks('C:\\Users\\batho\\Escritorio\\Laboratoria\\CDMX010-md-links\\directory\\prueba.md'))


module.exports = {
  validatePath,
  toAbsolutePath,
  isDirectory,
  isAfile,
  showDirectory,
  mdFile,
  getLinksFromMd,
  getAllFilesMd,
  getLinksWithPath,
  validateAllLinks,
};
