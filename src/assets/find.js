const fs = require('fs').promises;
const path = require('path');


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

