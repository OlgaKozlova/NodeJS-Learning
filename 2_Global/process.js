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
    console.log(`This processor architecture is ${process.arch}`);
    console.log(`This platform is ${process.platform}`);
    console.log(`Available variables: ${JSON.stringify(process.env, null, 2)}`);
}

function printProcessInfo() {
    console.log(`This process pid: ${process.pid}`);
    console.log(`This process node.js parameters are: ${JSON.stringify(process.execArgv, null, 2)}`);
    console.log(`This process cl arguments are: ${JSON.stringify(process.argv, null, 2)}`);
    console.log(`This 1st cl argument: ${process.argv0}`);
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
// printProcessInternals();
// printNodeJSInfo();
// printEnvironmentInfo();
// printProcessInfo();
// printProfilingInfo();
// testChangeDir();