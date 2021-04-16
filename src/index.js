'use strict';
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const marked = require('marked');
const fetch = require('node-fetch');

// -- donde estan mis archivos
const directory = './directory';
const archivo = './directory/prueba.md';
const liga = 'http://artpulsemagazine.com/glossing-over-thoughts-on-glitch-a-poetry-of-error ';

// arreglos a llenar
let links = [];

//-- ver todos los archivos ".md" que contiene la carpeta "directory"
function showFilesExt(fileName) {
  console.log(chalk.bold.cyanBright('[+]', fileName));
  const files = fs.readdirSync(fileName);
    for (const file in files){
      let names = path.join(fileName, files[file])
      if(fs.lstatSync(names).isDirectory() ===true) {
        showFilesExt(names);
      console.log(chalk.bold.greenBright('esta es una subcarpeta:'), names)
    }else{
      if(fs.lstatSync(names).isFile() ===true) {
        // entonces filtra md
        //
        console.log(chalk.bold.redBright('este es un archivo:'), names)
      }
    }
  }
}
showFilesExt(directory);


// filtrar archivos .md
const getMds= (dirPath)=> {
  if (path.parse(dirPath).ext === '.md'){
    console.log(dirPath);
  } else if (path.parse(dirPath).ext === ''){
    let files = fs.readdirSync(dirPath);
    files.forEach((file) => {
      let filesPath = dirPath + '\\' + file;
      if(path.parse(filesPath).ext === '.md'){
        getMds(filesPath)
      } else {
        let filesPath = dirPath + '\\' + file;
        getMds(filesPath)
      }
    });
  }
}
getMds(directory);





// -- extraer todos los links, falta refinar busqueda
const getLinks = (filesExt) => {
  return new Promise ((resolve, reject) => {
    fs.readFile(filesExt, 'UTF-8', (err, data) => {
      if (err) {
        console.log(err)
      } else {
        // integrar esta expresión regular
        // const regex = /https?\S+\w/gi;
        let document = data.toString();
        const renderer = new marked.Renderer();
        renderer.link = function (href, file, title) {
          links.push({
            href: href,
            file: filesExt,
            title: title
          })
        }
        marked.use({ renderer });
        marked(document);
        links.forEach((link) => {
          console.log(chalk.yellowBright(link.file), chalk.cyanBright(link.href), chalk.redBright(link.title))
          })
        if (links.length === 0) {
          console.log(chalk.bold.red("We haven't found any links at: ") + chalk.red.underline(filesExt));
        } else
        // console.log(links)
          resolve(links);
      }
    })
  })
}
getLinks(archivo);



// -- para leer los archivos y ver los links http/https
const getAllLinks = (filesExt) => {
  fs.readFile(filesExt, 'UTF-8', (err, data) => {
    if (err) {
      console.log(err)
    }
    const info = data;
    // console.log(chalk.green(info))
    const regex = /https?\S+\w/gi;
    const str = info;
    let m;
    while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
          console.log(`link: ${match}`);
      });
    }
  });
}
getAllLinks(archivo);

// module.exports = {

// };
