// aqui estan todas las funciones que fui haciendo, que si funcionan y no tienen modificación


// -- quiero ver todos los archivos que contiene la carpeta "directory" sin importar el nivel de carpeta
function showAllFiles (dirName) {
  console.log(chalk.bold.cyanBright('[+]', dirName));
  const files = fs.readdirSync(dirName);
  for (const file in files){
    let names = path.join(dirName, files[file])
    if(fs.lstatSync(names).isDirectory()==true) {
      showAllFiles(names);
      console.log(chalk.bold.greenBright('esta es una subcarpeta:'), names)
    }else{
      console.log(chalk.bold.redBright('este es un archivo:'), names)
    }
  }
}
showAllFiles(directory);



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



// -- extraer todos los links, falta refinar busqueda
const getLinks = (filesExt) => {
  return new Promise ((resolve, reject) => {
    fs.readFile(filesExt, 'UTF-8', (err, data) => {
      if (err) {
        console.log(err)
      } else {
        // const regex = data.match(/https?\S+\w/gi);
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
