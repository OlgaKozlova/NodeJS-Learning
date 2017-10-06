const fs = require('fs');
const { URL } = require('url');

function generalSyncExample() {
    const content = fs.readFileSync('./files/helloworld.txt');
    console.log(content.toString()); // hello world!
    try {
        const content = fs.readFileSync('./files/helloworld1.txt');
    } catch (error) {
        console.error(error); // Error: ENOENT: no such file or directory
    }
}


function generalASyncExample() {
    const callback = (error, data) => {
        if (error) {
            console.error(error);
        } else {
            console.log(data.toString())
        }
    };

    fs.readFile('./files/helloworld.txt', callback); // hello world!
    fs.readFile('./files/helloworld1.txt', callback); // Error: ENOENT: no such file or directory
}

function generalPathExample() {
    const buffer = Buffer.from('./files/helloworld.txt');
    const content = fs.readFileSync(buffer);
    console.log(content.toString()); // hello world!
    // Only absolute path, and only file scheme supported now
    const content2 = fs.readFileSync(new URL(`file:///${process.cwd()}/files/helloworld.txt`));
    console.log(content2.toString()); // hello world!
}

// generalSyncExample();
// generalASyncExample();
// generalPathExample();