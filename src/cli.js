'use strict';
const chalk = require('chalk');
const art = require('ascii-art');
const inquirer = require('inquirer');
// const process = require('process');
const modulo = require('./index');

// creando el módulo de vienvenida
function intro() {
  console.log(chalk.bold.blue('Hola, bienvenidx a Glitch-CLI'));
  console.log(chalk.bold.blue('archivos filtrados...'));
}


// --- modulo de instrucciones sueltas que llamaré poco a poco
modulo.intro();
console.log(modulo.description);


// --- cabecera con nombre de la cli
function message (mess) {
  art.font(mess, 'doom', (err, rederer) => {
    console.log(chalk.bold.magentaBright(err || rederer))
  })
}

function selectFile () {
  const option = [{
      name: 'type',
      type: 'list',
      message: 'Selecciona el archivo a leer: ',
      choices: ['main()']
    },
  ];
  return inquirer.prompt(option);
};
selectFile();



message('Glitch-CLI');


(async() => {
  message('Glitch-CLI');
  await intro();
})();


