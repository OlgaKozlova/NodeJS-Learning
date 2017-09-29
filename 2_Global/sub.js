console.log(process.channel); // Pipe {
                              //   bytesRead: 0,
                              //   _externalStream: [External],
                              //   fd: -1,
                              //   writeQueueSize: 0,
                              //   buffering: false,
                              //   onread: [Function],
                              //   sockets: { got: {}, send: {} } }
console.log(process.connected); // true
const result = process.send({ foo: 'message1', baz: NaN, func: ()=> {} });
console.log(result); // true
process.disconnect();
console.log(process.connected); // false
const result2 = process.send({ foo: 'message2', baz: NaN, func: ()=> {} }); // Error [ERR_IPC_CHANNEL_CLOSED]: channel closed
console.log(result2); // code not exited