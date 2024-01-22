const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

const myPath = path.join(__dirname, 'text.txt');

fs.createWriteStream(myPath);
stdout.write('Please, write something\n');

const stopProcess = () => {
  stdout.write('Goodbye!');
  exit();
};

stdin.on('data', (chunk) => {
  if (chunk.toString().trim() === 'exit') {
    stopProcess();
  } else {
    fs.appendFile(myPath, chunk, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
});

process.on('SIGINT', stopProcess);
