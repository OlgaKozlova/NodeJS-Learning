const cp = require('child_process');

const callback = (err, stdout, stderr) => {
    console.log(err, stdout, stderr);
};

function execTest() {
    cp.exec('echo %cd%', callback) // null 'C:\\Users\\OlgaKozlova\\MyProjects\\nodejs\\5_Child_process\r\n' ''
    cp.exec('.\\ChildFiles\\ChildBat.bat Olga', callback) // null 'Hello Olga\r\n' ''
}

function spawnTest() {
    const IpCongif = cp.spawn('ipconfig');
    IpCongif.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    IpCongif.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });
    IpCongif.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
    /*
     stdout:
     Windows IP Configuration


     stdout:
     Ethernet adapter Local Area Connection 2:


     stdout:    Media State . . . . . . . . . . . : Media disconnected
     Connection-specific DNS Suffix  . :
     ..........................
    */
}

function execFileTest() {
    cp.execFile('.\\ChildFiles\\ChildBat.bat', ['Olga'], callback); // null 'Hello Olga\r\n' ''
}

function forkTest() {
    const child = cp.fork('./ChildFiles/ChildJs.js'); // Hello
    child.on('message', (message) => {
        console.log(message); // I am working
    })
}

function childProcessPropertiesTest() {
    const IpCongif = cp.spawn('ipconfig');
    console.log(IpCongif.constructor.name);
    console.log(IpCongif.channel); // undefined
    console.log(IpCongif.connected); // false
    console.log(IpCongif.killed); // false
    console.log(IpCongif.pid); // 11992
    console.log(IpCongif.stderr.constructor.name); // Socket
    console.log(IpCongif.stdin.constructor.name); // Socket
    console.log(IpCongif.stdio.constructor.name); // Socket
    console.log(IpCongif.stdout.constructor.name); // Socket*/

    const child = cp.fork('./ChildFiles/ChildJs.js');
    console.log(child.constructor.name);
    console.log(child.channel.constructor.name); // Pipe
    console.log(child.connected); // true
    console.log(child.killed); // false
    console.log(child.pid); // false
    console.log(child.stderr); // null
    console.log(child.stdin); // null
    console.log(child.stdio); // [ null, null, null, null ]
    console.log(child.stdout); // null*/

    const child2 = cp.execFile('.\\ChildFiles\\ChildBat.bat', ['Olga'], callback);
    console.log(child2.constructor.name);
    console.log(child2.channel); // undefined
    console.log(child2.connected); // false
    console.log(child2.killed); // false
    console.log(child2.pid); // 9576
    console.log(child2.stderr.constructor.name); // Socket
    console.log(child2.stdin.constructor.name); // Socket
    console.log(child2.stdio.constructor.name); // Array
    console.log(child2.stdout.constructor.name); // Socket */

    const child3 = cp.exec('echo %cd%', callback);
    console.log(child3.constructor.name);
    console.log(child3.channel); // undefined
    console.log(child3.connected); // false
    console.log(child3.killed); // false
    console.log(child3.pid); // 9576
    console.log(child3.stderr.constructor.name); // Socket
    console.log(child3.stdin.constructor.name); // Socket
    console.log(child3.stdio.constructor.name); // Array
    console.log(child3.stdout.constructor.name); // Socket */
}

function childProcessMethodsTest() {
    const child = cp.fork('./ChildFiles/ChildJs2.js');
    setTimeout(() => {
        child.kill('SIGINT');
    }, 3000);
    child.on('message', (data) => {
        console.log(data);
    });
    child.on('exit', (exitCode) => {
        console.log('Exited with exitCode ' + exitCode);
    })
    child.on('close', (exitCode) => {
        console.log('Closed with exitCode ' + exitCode);
    })
    child.on('disconnect', () => {
        console.log('Disconnected');
    })
    child.on('error', (exitCode) => {
        console.log('Error: ' + exitCode);
    })
}

// execTest();
// spawnTest();
// execFileTest();
// forkTest();
// childProcessPropertiesTest();
childProcessMethodsTest();
