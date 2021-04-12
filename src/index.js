'use strict';
const path = require('path');
const fs = require('fs');
const fsp = require('fs').promises;
const fetch = require('node-fetch');
const chalk = require('chalk');


// -- donde estan mis archivos
const directory = './directory';
const archivo = './directory/glitchArtGenerator.md'
// const noarchivo = './directory/glitchManifesto.png'


//-- quiero ver todos los archivos que contiene la carpeta "directory" sin importar el nivel de carpeta
function showAllFiles (folderName) {
  console.log(chalk.bold.yellowBright('[+]', folderName));
  const files = fs.readdirSync(folderName);
  for (const file in files){
    let names = path.join(folderName, files[file])
    if(fs.lstatSync(names).isDirectory()==true) {
      showAllFiles(names);
    }else{
      console.log(chalk.bold.blueBright('archivo:'), names)
    }
  }
}
showAllFiles(directory);

//-- quiero ver todos los archivos ".md" que contiene la carpeta "directory"
async function main() {
  console.log(await findFiles(path.join('directory')));
}
main();

async function findFiles(folderName) {
  let allFiles = [];
  const items = await fsp.readdir(folderName, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) {
      allFiles = allFiles.concat(
        await findFiles(path.join(folderName, item.name))
      );
    } else {
      if (path.extname(item.name) === '.md') {
        allFiles.push(path.join(folderName, item.name));
      }
    }
  }
  return allFiles;
}

// ---- quiero leer el contenido de un archivo e imprimirlo en la consola
fs.readFile(archivo,'UTF-8', (error, data) => {
  if (error) {
    console.error('No he podido leer el archivo', error);
  } else {
    console.log(data);
  }
});
console.log(chalk.bold.greenBright('El archivo "glitchArtGenerator.md" contiene lo siguiente:'));



// module.exports = {
//   // intro,
//   // description: 'Estos son todos los archivos .md encontrados:',
//   // main,
//   // findFiles,
// };
