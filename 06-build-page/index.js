const { mkdir, readdir, readFile, writeFile } = require('fs/promises');
const fs = require('fs');
const path = require('path');

const projectPath = path.join(__dirname, 'project-dist');

const createHTML = async () => {
  const components = await readdir(path.join(__dirname, 'components'));
  let template = await readFile(path.join(__dirname, 'template.html'), 'utf-8');

  components.map(async (comp) => {
    const name = comp.slice(0, comp.indexOf('.'));
    const content = await readFile(
      path.join(__dirname, 'components', comp),
      'utf-8',
    );
    template = template.replaceAll(`{{${name}}}`, `${content}`);
    writeFile(path.join(projectPath, 'index.html'), template);
  });
};

const mergeStyles = async () => {
  const files = await readdir(path.join(__dirname, 'styles'));
  for (const file of files) {
    if (path.extname(file) === '.css') {
      const input = fs.createReadStream(path.join(__dirname, 'styles', file));
      input.on('data', (chunk) => {
        fs.appendFile(path.join(projectPath, 'style.css'), chunk, (error) => {
          if (error) console.error(error.message);
        });
      });
    }
  }
};

const copyFiles = async (folder) => {
  const files = await readdir(path.join(__dirname, folder));
  for (const file of files) {
    fs.stat(path.join(__dirname, folder, file), (error, stats) => {
      if (error) console.error(error.message);
      if (stats.isDirectory()) {
        mkdir(
          path.join(projectPath, folder, file),
          { recursive: true },
          (error) => {
            if (error) console.error(error.message);
          },
        );
        const newPath = folder + '/' + file;
        copyFiles(newPath);
      } else {
        fs.copyFile(
          path.join(__dirname, folder, file),
          path.join(projectPath, folder, file),
          (error) => {
            if (error) console.error(error.message);
          },
        );
      }
    });
  }
};

const copyAssets = async () => {
  await mkdir(
    path.join(projectPath, 'assets'),
    { recursive: true },
    (error) => {
      if (error) console.error(error.message);
    },
  );
  copyFiles('assets');
};

const assemblePage = async () => {
  await mkdir(projectPath, { recursive: true });
  await createHTML();
  await mergeStyles();
  await copyAssets();
};

assemblePage();
