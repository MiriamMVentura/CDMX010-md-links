#!/usr/bin/env node
'use strict';
const chalk = require('chalk');
const art = require('ascii-art');
// const inquirer = require('inquirer');
// const process = require('process');
const modulo = require('./index');




// --- modulo de  saludo e instrucciones sueltas que llamaré poco a poco
modulo.intro();
console.log(modulo.description);


// --- cabecera con nombre de la cli
function message (mess) {
  art.font(mess, 'doom', (err, rederer) => {
    console.log(chalk.bold.magentaBright(err || rederer))
  })
}

// function selectFile () {
//   const option = [{
//       name: 'type',
//       type: 'list',
//       message: 'Selecciona el archivo a leer: ',
//       choices: ['main()']
//     },
//   ];
//   return inquirer.prompt(option);
// };
// selectFile();



// message('Glitch-CLI');
// message('hola');


// IIFE (Immediately Invoked Function Expression)

// (async() => {
//   message('Glitch-CLI');
//  await intro();
// })();


