const fs = require('fs');

function readFileTests() {
    const callback = (error, data) => {
        console.log(data);
    };
    const callback2 = (err, bytesRead, sth) => {
        console.log(bytesRead, sth);
    };

    fs.readFile('./files', callback);
    fs.readFile('./files/helloworld.txt', callback);
    const buffer = Buffer.alloc(12);
    const fd = fs.openSync('./files/helloworld.txt', 'a');
    fs.read(fd, buffer, 0, 12, 0, (...args) => {
        callback2(...args);
        fs.closeSync(fd);
    });
    const fd1 = fs.openSync('./files', 'a');
    const buffer1 = Buffer.alloc(12);
    fs.read(fd, buffer1, 0, 12, 0, (...args) => {
        callback2(...args);
        fs.closeSync(fd1);
    });
}

//testExists();
//testStat1();
// testStat2();
readFileTests();