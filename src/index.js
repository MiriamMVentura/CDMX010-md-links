module.exports = () => {
  // ...
};

// --- prueba de export/require
// Trayendo nuestro modulo, accediendo a su ruta
const modulo = require('./mdLinks');
// ejecutar una funcion del modulo
// ejecutar el onjeto con propiedad
console.log(modulo.prop1);

modulo.saludar();

// leer, escribir y eliminar un archivo
const fs = require('fs');
const chalk = require('chalk');

function read(ruta, cb) {
  fs.readFile(ruta, (err, data) => {
      cb(data.toString());
  })
}

function write(ruta, contenido, cb) {
  fs.writeFile(ruta, contenido, function (err) {
      if (err) {
          console.error('No he podido escribirlo', err);
      } else {
          console.log(chalk.bold.yellow('El archivo se ha escrito correctamente'));
      }
  });
}

function toTrash(ruta, cb) {
  fs.unlink(ruta, cb);
}

read(__dirname + '/glitchInvest/definitionGlitch.txt', console.log)
write(__dirname + '/glitchInvest/archivoxxx.txt', 'vuelvo a escribir sobre el error, no soy un archivo .md', console.log);
// toTrash(__dirname + '/glitchInvest/archivoxxx.txt', console.log);
