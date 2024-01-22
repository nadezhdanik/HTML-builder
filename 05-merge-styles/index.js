const { readdir, rm } = require('fs/promises');
const fs = require('fs');
const path = require('path');

const pathStyles = path.join(__dirname, 'styles');
const pathBundle = path.join(__dirname, 'project-dist', 'bundle.css');

const mergeStyles = async () => {
  await rm(pathBundle, { force: true, recursive: true });
  const files = await readdir(pathStyles);
  for (const file of files) {
    if (path.extname(file) === '.css') {
      const input = fs.createReadStream(path.join(pathStyles, file));
      input.on('data', (chunk) => {
        fs.appendFile(pathBundle, chunk, (error) => {
          if (error) console.error(error.message);
        });
      });
    }
  }
};

mergeStyles();
