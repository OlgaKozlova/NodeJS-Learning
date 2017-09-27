var fs = require('fs');

function testConstructor() {
    // создаем 2 writableStream
    const output = fs.createWriteStream('./stdout.log');
    const errorOutput = fs.createWriteStream('./stderr.log');

    // создаем собственную консоль
    const myConsole = new global.console.Console(output, errorOutput);
    const count = 5;

    // используем собственную консоль как обычную консоль
    myConsole.log('log: %d', count); // in stdout: count 5
    myConsole.error('error: %d', count); // in stderr: count 5

}

function testConsoleLogInfo() {
    console.log('Name: %s, age: %d.', 'Olga', 18);
    console.info('Name: %s, age: %d.', 'Olga', 18);
}

function testConsoleDir() {
    var obj = {
        prop1_1: {
            prop2_1: {
                prop3_1: {
                    prop4_1: {
                        prop5_1: 'Hello',
                        prop5_2: [1, 2, 3]
                    }
                }
            }
        }
    };
    Object.defineProperty(obj, 'prop1_2', {enumerable: false, value: 'Not Enumerable'});
    console.dir(obj);
    console.dir(obj, {showHidden: true});
    console.dir(obj, {depth: 3});
    console.dir(obj, {depth: null});
    console.dir(obj, {depth: null, colors: true});
}

function testConsoleErrorWarnTrace() {
    console.error('Name: %s, age: %d.', 'Olga', 18);
    console.warn('Name: %s, age: %d.', 'Olga', 18);
    console.trace('Name: %s, age: %d.', 'Olga', 18);
}

function testConsoleAssert() {
    console.assert(true, 'does nothing'); // никакого вывода
    console.assert(false, 'Whoops %s', 'didn\'t work'); // выбрасывает ошибку AssertionError, прекращает работу скрипта
    console.log('You\'ll never see this'); // этот код не исполняется
}

function testTimeAndTimeEnd() {
    console.time('one');
    for (let i = 0; i < 1000; i++) {
        // do nothing
    }
    console.time('two');
    for (let i = 0; i < 1000; i++) {
        // do nothing
    }
    console.timeEnd('two');
    console.timeEnd('one');
    console.timeEnd('one');
}

function testGroupingMethods() {
    console.log('Log one');
    console.group('Group one');
    console.log('Log two');
    console.error('Log three');
    console.group('Group one');
    console.log('Log four');
    console.groupEnd('Group one');
    console.log('Log five');
    console.groupEnd('Group one');
    console.log('Log six');
    console.groupEnd('Group one');
}

function testCount() {
    console.count();
    console.count('One');
    console.count();
    console.count('One');
    console.countReset();
    console.countReset('One');
    console.count();
    console.count('One');
}

function testClear() {
    console.log('One');
    setTimeout(console.clear, 1000);
}

 console.log(console);
 testConstructor();
 testConsoleLogInfo();
 testConsoleDir();
 testConsoleErrorWarnTrace();
 testConsoleAssert();
 testTimeAndTimeEnd();
 testGroupingMethods();
 testCount();
 testClear();