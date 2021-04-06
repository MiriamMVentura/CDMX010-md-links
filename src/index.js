#!/usr/bin/env node
'use strict';
const path = require('path');
const fs = require('fs');
const modulo = require('./mdLinks');

// -- quiero comproabar si la ruta de los archivos y directorios son validos

// -- quiero ver todos los arcivos que contiene mi carpeta "directory"
// fs.readdir('./src/directory', (error, files) => {
//   if (error) {
//     throw error
//   }
//   console.log('archivos encontrados:');
//   console.log(files);
// });

// --- quiero saber las rutas de mis archivos



// // ---- quiero leer el contenido de un archivo  e imprimirlo en la consola
// function read(ruta, cb) {
//   fs.readFile(ruta, 'UTF-8', (err, data) => {
//     cb(data);
//   })
// }
// read(__dirname + '/directory/definitionGlitch.txt', console.log)




// // --- quiero saber la extención de mi archivo

// --- modulo de  saludo e instrucciones sueltas que llamaré poco a poco
modulo.intro();
console.log(modulo.stepOne);

fs.readdir('./src/directory', (error, files) => {
    if (error) {
        console.error('No he podido leer el directorio', error);
    } else {
        console.log(files);
    }
    fs.readFile('./src/directory/glitchArtGenerator.md', 'UTF-8', (error, data) => {
      if (error) {
        console.error('No he podido leer el archivo', error);
    } else {
        console.log(data);
    }
    });
    console.log('El archivo "glitchArtGenerator.md" contiene lo siguiente:');
  })

// module.exports = () => {
//   // ...
// };
