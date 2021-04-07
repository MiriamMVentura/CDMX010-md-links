#!/usr/bin/env node
'use strict';
const path = require('path');
const fs = require('fs').promises;
const fsr = require('fs');
const fetch = require('node-fetch');
const chalk = require('chalk');

// creando el módulo de vienvenida
function intro() {
  console.log(chalk.bold.blue('Hola, bienvenidx a Glitch-CLI'));
  console.log(chalk.bold.blue('archivos filtrados...'));
}


// -- quiero ver todos los arcivos .md que contiene mi carpeta "directory" sin importar el nivel
async function main() {
  console.log(await findFiles(path.join(__dirname, 'directory')));
}
main();

async function findFiles(folderName) {
  let allFiles = [];
  const items = await fs.readdir(folderName, { withFileTypes: true });
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


// // ---- quiero leer el contenido de un archivo  e imprimirlo en la consola
// function read(ruta, cb) {
//   fsr.readFile(ruta, 'UTF-8', (err, data) => {
//       cb(data)
//     })
//   }
//   read(__dirname + '/directory/glitchArtGenerator.md', console.log)





// // --- quiero saber la extención de mi archivo



// fs.readdir('./src/directory', (error, files) => {
//     if (error) {
//         console.error('No he podido leer el directorio', error);
//     } else {
//         console.log(files);
//     }
//     fs.readFile('./src/directory/glitchArtGenerator.md', 'UTF-8', (error, data) => {
//       if (error) {
//         console.error('No he podido leer el archivo', error);
//     } else {
//         console.log(data);
//     }
//     });
//     console.log('El archivo "glitchArtGenerator.md" contiene lo siguiente:');
// })


module.exports = {
  intro,
  description: 'Estos son todos los archivos .md encontrados:',
  // main,
  // findFiles,
};
