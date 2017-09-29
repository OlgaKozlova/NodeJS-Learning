function setTimeoutTest() {
    const timeout1 = setTimeout((one, two) => {
        console.log(one, two)
    }, 2000, 'one1', 'two1');
    const timeout2 = setTimeout((one, two) => {
        console.log(one, two)
    }, 5000, 'one2', 'two2');

    clearTimeout(timeout2);
}

function setIntervalTest() {
    let counter = 0;
    const interval = setInterval((one, two) => {
        counter++;
        console.log(one, two);
        if (counter >= 5) {
            clearInterval(interval);
        }
    }, 1000, 'one1', 'two1');
}

function mixedTests1() {
    const timeout1 = setTimeout((one, two) => {
        console.log(one, two)
    }, 2000, 'one1', 'two1');
    const timeout2 = setTimeout((one, two) => {
        console.log(one, two)
    }, 5000, 'one2', 'two2');

    clearInterval(timeout2);
}

function mixedTests2() {
    let counter = 0;
    const interval = setInterval((one, two) => {
        counter++;
        console.log(one, two);
        if (counter >= 5) {
            clearTimeout(interval);
        }
    }, 1000, 'one1', 'two1');
}

function refUnrefTests() {
    const timeout1 = setTimeout((one, two) => {
        console.log(one, two)
    }, 2000, 'one1', 'two1');
    const timeout2 = setTimeout((one, two) => {
        console.log(one, two)
    }, 5000, 'one2', 'two2');
    timeout2.unref();
}

function setImmediateTest() {
    const immediate = setImmediate((one, two) => {
        console.log(one, two);
    }, 'one', 'two');
    clearImmediate(immediate);

    const immediate2 = setImmediate((one, two) => {
        console.log(one, two);
    }, 'one2', 'two2');
}

// setTimeoutTest();
// setIntervalTest();
// mixedTests1();
// mixedTests2();
// refUnrefTests();
// setImmediateTest();