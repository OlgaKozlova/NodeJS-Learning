const fs = require('fs');

function readDirTests() {
    fs.readdir('./files', (error, result) => {
        console.log(result); // [ 'helloworld.txt', 'subdir' ]
    })
}

function rmDirTests() {
    fs.mkdtemp('./filesTmp', (err, folder) => {
        setTimeout(() => {
            fs.rmdir(folder, () => {})
        }, 5000);
    });

    fs.rmdir('./files', (error) => {
        console.error(error); // Error: ENOTEMPTY: directory not empty
    });

    fs.rmdir('./files1', (error) => {
        console.error(error); // Error: ENOENT: no such file or directory
    })
}


// testExists();
// testStat1();
// testStat2();
// mkDirTests();
// readDirTests();
rmDirTests();