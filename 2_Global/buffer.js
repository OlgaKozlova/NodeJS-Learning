function createBuffer() {
    console.group('Buffer.from(array) tests');
    var array = [0x62, 0x75, 0x66, 0x66, 0x65, 0x72, 0xFF];
    console.log('Here is my array', array);
    const buf = Buffer.from(array);
    console.log('Buffer from array: ', buf);
    array[0] = 0x01;
    console.log('1st element of array changed to be 0x01');
    console.log('But buffer is not changed, this is a copy', buf);
    console.groupEnd('Buffer.from(array) tests');

    const buffer = new ArrayBuffer(8);
    const view = new Int8Array(buffer);
    for (let i = 0; i < 8; i++) {
        view[i] = i + 1;
    }

    const buf3 = Buffer.from(buffer);
    console.log(buf3);
    const buf4 = Buffer.from(buffer, 2, 2);
    console.log(buf4);
    view[0] = 0;
    console.log(buf3);

    const buf5 = Buffer.from('buffer');
    console.log(buf5);

    const buf6 = Buffer.from(buf5);
    console.log(buf6);

    buf5[0] = 0;
    console.log(buf5);
    console.log(buf6);


}

createBuffer();