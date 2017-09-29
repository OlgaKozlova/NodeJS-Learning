var fs = require('fs');
var util = require('util');
var cp = require('child_process');

function printProcessInternals() {
    console.log(Object.keys(process));
    console.log(process);
}

function printNodeJSInfo() {
    console.log(`Node version: ${process.version}`);
    console.log(`Node release info: ${JSON.stringify(process.release, null, 2)}`);
    console.log(`Node dependencies: ${JSON.stringify(process.versions, null, 2)}`);
    console.log(`Node executable is located on: ${process.execPath}`);
    console.log(`Node is run with following flags: ${JSON.stringify(process.execArgv)}`);
}

function printEnvironmentInfo() {
    console.log(process.arch); // x64
    console.log(process.platform); // win32
    console.log(process.env); // { ALLUSERSPROFILE: 'C:\\ProgramData',
                              //  ANDROID_HOME: 'D:\\Exe\\AndroidSDK', .....
}

function printProcessInfo() {
    console.log(process.pid);      // 7548
    console.log(process.execArgv); // [ '--harmony' ]
    console.log(process.argv);     // [ 'C:\\Program Files\\nodejs\\node.exe',
                                   // 'C:\\Users\\OlgaKozlova\\MyProjects\\nodejs\\2_Global\\process.js',
                                   // 'hello' ]
    console.log(process.argv0);    // C :\Program Files\nodejs\node.exe
}

function printProfilingInfo() {
    console.log(`Memory snapshot: ${JSON.stringify(process.memoryUsage(), null, 2)}`);
    const cpuUsage = process.cpuUsage();
    const hrtime = process.hrtime();
    console.log(`CPU usage: ${JSON.stringify(cpuUsage, null, 2)}`);
    console.log(`hrtime, s, ms: ${JSON.stringify(hrtime, null, 2)}`);
    for (let i = 0; i < 10000000; i++) {
        // do nothing
    }
    console.log(`CPU usage in comparison to previous call: ${JSON.stringify(process.cpuUsage(cpuUsage), null, 2)}`);
    console.log(`hrtime in comparison to previous call, s, ms: ${JSON.stringify(process.hrtime(hrtime), null, 2)}`);
    console.log(`Process works ${process.uptime()} seconds`);
}

function testChangeDir() {
    console.log(`Current directory: ${process.cwd()}`);
    process.chdir('../../');
    console.log(`Current directory: ${process.cwd()}`);
}

function testProcessEvents() {
    var childProcess = cp.fork('./sub.js');
    let didBeforeExitFired = false;
    process.on('beforeExit', (exitCode) => {
        if (didBeforeExitFired) { // пляски вокруг асинхронной консоли
            return;
        }
        console.log(`I am going to exit with exitCode ${exitCode}`);
        didBeforeExitFired = true;
    });
    process.on('exit', (exitCode) => {
        console.log(`exit with exitCode ${exitCode}`)
    });
    process.on('uncaughtException', (err) => {
        console.log(`Caught exception: ${err}`);
    });
    process.on('unhandledRejection', (err) => {
        console.log(`Unhandled rejection: ${err}`);
    });
    process.on('warning', (warning) => {
        console.warn(warning.name, warning.message);
    });
    childProcess.on('message', (message) => {
        console.log('Child process send me a message', message);
    });
    childProcess.on('disconnect', () => {
        console.log('Child process disconnected', );
    });
    // handledRejection

    Promise.reject('unhandledRejection emitted');
    process.emitWarning('warning emitted');
    throw new Error('uncaughtException emitted');
}

function testKill() {
    process.kill(process.pid); // Process finished with exit code 1
    console.log('hi');
}

function testAbort() {
    process.abort(); // Process finished with exit code 3
    console.log('hi');
}

function testExit1() {
    process.exit(7); //Process finished with exit code 7
    console.log('hello');
}

function testExit2() {
    process.exitCode = 5;
    process.exit();  //Process finished with exit code 5
    console.log('hello');
}


function testExit3() {
    process.exit();  //Process finished with exit code 0
    console.log('hello');
}

function IPCTest() {
    console.log(process.channel);    // undefined
    console.log(process.connected);  // undefined
    console.log(process.send);       // undefined
    console.log(process.disconnect); // undefined
    let childProcess = cp.fork('./sub.js'); // creating of child process
    childProcess.on('message', (message) => {
        console.log('Child process send me a message', message); // Child process send me a message { foo: 'message1', baz: null }
    });
}


// printProcessInternals();
// printNodeJSInfo();
// printEnvironmentInfo();
// printProcessInfo();
// printProfilingInfo();
// testChangeDir();
// testProcessEvents();
// testKill();
// testAbort();
// testExit1();
// testExit2();
// testExit3();
IPCTest();