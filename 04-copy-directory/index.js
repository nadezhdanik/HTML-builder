const { readdir, rm, mkdir } = require('fs/promises');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');

const copyFiles = async () => {
  const files = await readdir(filePath);
  for (const file of files) {
    fs.copyFile(
      path.join(filePath, file),
      path.join(copyPath, file),
      (error) => {
        if (error) console.error(error.message);
      },
    );
  }
};

const createCopy = async () => {
  await rm(copyPath, { force: true, recursive: true });
  await mkdir(copyPath, { recursive: true }, (error) => {
    if (error) console.error(error.message);
  });
  copyFiles();
};

createCopy();
