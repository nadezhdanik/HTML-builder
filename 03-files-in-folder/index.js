const { readdir } = require('fs/promises');
const fs = require('fs');
const path = require('path');

const myPath = path.join(__dirname, 'secret-folder');

const getFileInfo = async () => {
  const files = await readdir(myPath);
  for (const file of files) {
    fs.stat(path.join(myPath, file), (error, stats) => {
      if (error) console.error(error.message);
      if (stats.isFile()) {
        const name = file.slice(0, file.indexOf('.'));
        const extension = path.extname(file).slice(1);
        const size = stats.size;
        console.log(`${name} - ${extension} - ${size}`);
      }
    });
  }
};

getFileInfo();
