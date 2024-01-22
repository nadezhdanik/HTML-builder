const fs = require('fs');
const path = require('path');
const { stdout } = process;

const readStream = fs.createReadStream(
  path.join(__dirname, './text.txt'),
  'utf-8',
);
readStream.on('data', (chunk) => stdout.write(chunk));
