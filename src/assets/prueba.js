const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const marked = require('marked');


// const directory = './directory';
// const archivo = './directory/glitchArtGenerator.md';

let inputPath = process.argv[2];

function getFiles(filepath) {
  if (path.parse(inputPath).ext === '.md'){
    showLinks(filepath);
  }else{
    let input = fs.readdirSync(filepath);
    input.forEach((file) => {
      let thisFilePath = filepath + '\\' + file;
      if(path.parse(thisFilePath).ext === '.md'){
        showLinks(thisFilePath)
      } else {
        let thisFilePath = inputPath + '\\' + file;
        getFiles(thisFilePath)
      }
    })
  }
}
getFiles(inputPath, console.log);

function showLinks (selectedFiles) {
  let links = [];
  fs.readFile(selectedFiles, (err, data) => {
    if (err) {
      console.log(err)
    }
    document = data.toString();
    const renderer = new marked.Renderer();
    renderer.link = (href, title, text) => {
      links.push({ href, title, text })
    }
    marked.use({ renderer });
    marked(document);

    links.forEach((link) => {
    console.log(chalk.blue(link.href), chalk.gray(link.text))
    })
  });
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

// --quiero filtrar los link href de un documento
function showAllLinks (filesExt) {
  let links = [];
  fs.readFile(filesExt, 'UTF-8', (err, data) => {
    if (err) {
      console.log(err)
    }
    const info = data;
    const renderer = new marked.Renderer();
    renderer.link = (href, title, text) => {
      links.push({ href, title, text })
    }
    marked.use({ renderer });
    marked(info);

    links.forEach((link) => {
    console.log(chalk.blue(link.href), chalk.yellow(link.title), chalk.red(link.text))
    })
  });
}
showAllLinks(archivo);


// --- función para filtar .md
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

// ---- filtra mds

function getMds(dirPath){
  if (path.parse(dirPath).ext === '.md'){
    console.log(dirPath);
  } else if (path.parse(dirPath).ext === ''){
    let files = fs.readdirSync(dirPath);
    files.forEach((file) => {
      let thisFilePath = dirPath + '\\' + file;

      console.log(thisFilePath)
      if(path.parse(thisFilePath).ext === '.md'){
        getMds(thisFilePath)
      } else {
        let thisFilePath = dirPath + '\\' + file;
        getMds(thisFilePath)
      }
    });
  }
}

getMds(directory);


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
