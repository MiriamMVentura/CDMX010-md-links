const chalk = require('chalk');

// creando el módulo saludar
function saludar() {
  console.log(chalk.italic.blue('Hola mundo!!'));
}

// eportando el modulo
module.exports = {
  saludar,
  prop1: 'Hola que tal'
};
