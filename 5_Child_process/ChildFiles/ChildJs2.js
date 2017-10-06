let counter = 0;
const interval = setInterval(() => {
    if (counter >= 10) {
        clearInterval(interval);
    } else {
        process.send(`Message ${counter++}`);
    }
}, 1000);
