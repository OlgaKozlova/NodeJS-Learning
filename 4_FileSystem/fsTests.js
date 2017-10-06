const fs = require('fs');

function testExists() {
    const callback = (result) => { // Хаха, а тут ошибок вообще не ожидается!
        console.log(result);
    };

    fs.exists('./testFiles/files', callback); // true
    fs.exists('./testFiles/files1', callback); // false
    fs.exists('./testFiles/files/helloworld.txt', callback); // true
    fs.exists('./testFiles/files/helloworld1.txt', callback); // false
}

function testCreate() {
    const callback = (error, result) => {
        console.log(error, result);
    };
    fs.mkdir('./testFiles/filesNew', callback); // undefined
    fs.mkdtemp('./testFiles/filesTmp', callback); // undefined
    fs.symlink('./testFiles/files/', './testFiles/symLinkToFiles/', callback); // ./testFiles/filesTmpTTJDzN
    fs.link('./testFiles/files/', './testFiles/hardLinkToFiles/', callback); // Error: EPERM: operation not permitted even as admin
}

function testGetInfo() {
    const callback1 = (error, result) => {
        console.log(result.isDirectory(), result.isSymbolicLink(), result.isFile());
    };

    fs.stat('./testFiles/files', callback1); // true false false
    fs.lstat('./testFiles/softLinkToFiles', callback1); // false true false
    // Если симлинку создавать через ноду, она создает нечто, выдающее на isSymbolicLink - false!!
    fs.stat('./testFiles/files/helloworld.txt', callback1); // true false false

    var fd = fs.openSync('./testFiles/files', 'a');
    fs.fstat(fd, (...args) => {
        callback1(...args); // true false false
        fs.closeSync(fd);
    });

    const callback2 = (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log('ID of device containing file: ', result.dev); // ID of device containing file: 2526709645
        console.log('Inode number: ', result.ino); // Inode number: 480759260221896000
        console.log('File type and mode: ', result.mode); // File type and mode: 16822
        console.log('Number of hard links: ', result.nlink); // Number of hard links: 1
        console.log('User ID of owner: ', result.uid); // User ID of owner: 0 POSIX only
        console.log('Group ID of owner: ', result.gid); // Group ID of owner: 0 POSIX only
        console.log('Device ID (if special file): ', result.rdev); // Device ID (if special file): 0
        console.log('Total size, in bytes: 0 ', result.size); // Total size, in bytes: 0
        console.log('Size of block in OS: ', result.blksize); // undefined
        console.log('How many blocks if file: ', result.blocks); // undefined
        console.log('Last access time: ', result.atime, result.atimeMs); // last access time: 2017-10-02T11:40:51.216Z 1506944451215.722
        console.log('Last modified time: ', result.mtime, result.mtimeMs); // last modified time: 2017-10-02T11:40:51.216Z 1506944451215.722
        console.log('Last modified metadata time:', result.ctime, result.ctimeMs); // last modified type time: 2017-10-02T11:40:51.216Z 1506944451215.722
        console.log('Creation time:', result.birthtime, result.birthtimeMs); // creation time: 2017-10-02T07:17:40.267Z 1506928660267.1638
    };

    fs.stat('./testFiles/files', callback2);
    /*
     ID of device containing file:  2526709645
     Inode number:  480759260221896000
     File type and mode:  16822
     Number of hard links:  1
     User ID of owner:  0 POSIX ONLY
     Group ID of owner:  0 POSIX ONLY
     Device ID (if special file):  0
     Total size, in bytes: 0  0
     Size of block in OS:  undefined POSIX ONLY
     How many blocks if file:  undefined POSIX ONLY
     Last access time:  2017-10-02T13:52:54.919Z 1506952374918.8948
     Last modified time:  2017-10-02T13:52:54.919Z 1506952374918.8948
     Last modified metadata time: 2017-10-04T08:54:01.266Z 1507107241265.961
     Creation time: 2017-10-02T07:17:40.267Z 1506928660267.1638
    */
    fs.stat('./testFiles/files/helloworld.txt', callback2);
    /*
     ID of device containing file:  2526709645
     Inode number:  12947848929724630
     File type and mode:  33206
     Number of hard links:  1
     User ID of owner:  0 POSIX ONLY
     Group ID of owner:  0 POSIX ONLY
     Device ID (if special file):  0
     Total size, in bytes: 0  12
     Size of block in OS:  undefined POSIX ONLY
     How many blocks if file:  undefined POSIX ONLY
     Last access time:  2017-10-02T11:40:51.164Z 1506944451163.7117
     Last modified time:  2017-10-02T11:40:51.166Z 1506944451166.2122
     Last modified metadata time: 2017-10-02T11:40:51.215Z 1506944451215.222
     Creation time: 2017-10-02T11:39:41.791Z 1506944381790.8398
     */
}

function testFsAccess() {
    const callback = (err) => {
        console.log(err ? 'no access!' : 'has access');
    };

    fs.access('./testFiles/files', fs.constants.R_OK | fs.constants.W_OK, callback);
    fs.access('./testFiles/softLinkToFiles', fs.constants.R_OK | fs.constants.W_OK, callback);
    fs.access('./testFiles/files/helloworld.txt', fs.constants.R_OK | fs.constants.X_OK, callback);
}

function testRealPath() {
    const callback = (err, result) => {
        console.log(err, result);
    };

    fs.realpath('./testFiles/files', callback);
    fs.realpath('./testFiles/files/helloworld.txt', callback);
}

function testOpenClose() {
    const callback = (err, fd) => {
        console.log(fd);
        fs.close(fd, (err, data) => {
            console.log(err);
        });
    };

    fs.open('./testFiles/files', 'a', callback); // 3 null
    fs.open('./testFiles/files/helloworld.txt', 'a', callback); // 4 null
}

function readTests() {
    const callback = (error, result) => {
        console.log(result);
        console.log(result.toString());
    };

    fs.readdir('./testFiles/files', callback); // [ 'helloworld.txt', 'subdir' ] helloworld.txt,subdir
    fs.readFile('./testFiles/files/helloworld.txt', callback); // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64 21> hello world!
    const fd = fs.openSync('./testFiles/files/helloworld.txt', 'a+');
    const buffer = Buffer.alloc(12);
    fs.read(fd, buffer, 0, 12, 0, (error, result) => {
        console.log(error);
        console.log(result, result.toString()); // <Buffer 6e 65 77 20 73 74 72 69 6e 67 74 72 69 6e 67 68 65 6c 6c 6f 68 65 6c 6c 6f> new stringtringhellohello
        fs.closeSync(fd);
    });
}

function writeFile() {
    const callback = (error, result) => {
        console.log(error, result);
    };
    const filepath = './testFiles/files/helloworld.txt';
    /*fs.appendFile(filepath, 'new string', callback); // in file: hello world /n new string
    fs.writeFile(filepath, 'new string', callback); // in file: new string*/
    const fd = fs.openSync(filepath, 'a+');
    const buffer = Buffer.from('hello hello');
    fs.write(fd, buffer, 0, 5, 0, (error, result) => { // hello hello appended to file
        console.log(error);
        console.log(result, result.toString());
        fs.closeSync(fd);
    });

    //fs.write(fd, string[, position[, encoding]], callback)
}

function testTrunkate() {
    const callback = (error, result) => {
        console.log(error, result);
    };
    const filepath = './testFiles/files/helloworld.txt';
    //fs.ftruncate(fd[, len], callback)
    fs.truncate(filepath, 4, callback); // in file: hell
    const fd = fs.openSync(filepath, 'a+');
    fs.read(fd, buffer, 0, 12, 0, (error, result) => { // Error: EPERM: operation not permitted
        console.log(error);
        console.log(result, result.toString());
        fs.closeSync(fd);
    });
}

// testExists();
// testCreate();
// testGetInfo();
// testFsAccess();
// testRealPath();
// testOpenClose();
readTests();
// writeFile();
//testTrunkate();