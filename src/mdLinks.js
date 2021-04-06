'use strict';

const chalk = require('chalk');

// creando el módulo instrucci
function intro() {
  console.log(chalk.bold.blue('Hola'));
  console.log(chalk.bold.blue('Instrucciones:'));
}

// eportando el modulo
module.exports = {
  intro,
  stepOne: 'estos son todos los archivos en tu directorio'
};
