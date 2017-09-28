function createBufferFromArray() {
    // Buffer from Array of 0x numbers
    const sourceArray = [0x62, 0x75, 0x66, 0x66, 0x65, 0x72, 0xFF];
    console.log('Here is my array', sourceArray);
    const bufferFromArray = Buffer.from(sourceArray);
    console.log('Here is buffer from array: ', bufferFromArray);
    sourceArray[0] = 0x01;
    console.log('1st element of array changed to be ', sourceArray[0]);
    console.log('But buffer is not changed, this is a copy:', bufferFromArray);
    // Buffer from Array of non 0x numbers
    const sourceArray2 = [1 ,2, 3, 16, 18];
    console.log('Here is Buffer from non 16-numberic array', Buffer.from(sourceArray2));
    // Buffer from mixed array
    const sourceArray3 = [{name: 'Olga'}, [6], 'Olga Kozlova', '2.2', null, undefined ];
    console.log('Here is Buffer mixed affay', Buffer.from(sourceArray3));
    // Buffer from Array-like object
    const sourceArray4 = {length: 5};
    console.log('Here is Buffer from array-like object', Buffer.from(sourceArray4));
}

function createBufferFromArrayBuffer() {
    // создаем и заполняем ArrayBuffer;
    const sourceArrayBuffer = new ArrayBuffer(8);
    const view = new Int8Array(sourceArrayBuffer);
    for (let i = 0; i < 8; i++) {
        view[i] = i + 10;
    }

    // cоздаем Buffer из всего ArrayBuffer
    const buffer1 = Buffer.from(sourceArrayBuffer);
    console.log(buffer1);
    // создаем Buffer из кусочка ArrayBuffer
    const buffer2 = Buffer.from(sourceArrayBuffer, 2, 2);
    console.log(buffer2);
    // меняем исходный ArrayBuffer
    view[3] = 0;
    console.log(buffer1);
    console.log(buffer2);
}

function createBufferFromString() {
    const buf1 = Buffer.from('this is a tést');
    const buf2 = Buffer.from('this is a tést', 'ascii');
    const buf3 = Buffer.from('7468697320697320612074c3a97374', 'hex');
    console.log(buf1.toString());
    console.log(buf2.toString());
    console.log(buf3.toString());
    const buf4 = Buffer.from('7468697320697320612074c3a97374', 'hexq');
}

function createBufferFromAnotherBuffer() {
    const buf1 = Buffer.from('buffer');
    const buf2 = Buffer.from(buf1);
    buf1[0] = 0x61;
    console.log(buf1.toString());
    console.log(buf2.toString());
}

function createBufferFromObject() {
    const buf = Buffer.from(new String('this is a test'));
    console.log(buf);
    //const buf1 = Buffer.from(new Number(5));
    //console.log(buf1);

    class Foo {
        [Symbol.toPrimitive]() {
            return 'this is a test';
        }
    }
    const buf3 = Buffer.from(new Foo(), 'utf8');
    console.log(buf3);
    class Foo2 {
        [Symbol.toPrimitive]() {
            return '';
        }
        valueOf() {return [1,2,3] }
    }
    const buf4 = Buffer.from(new Foo2(), 'utf8');
    console.log(buf4);
}

function BufferFromOtherArgumentsCausesError() {
    // Other arguments cause errors
    try {
        Buffer.from({});
    } catch(e) {
        console.error(e);
    }
}


// createBufferFromArray();
// createBufferFromArrayBuffer();
// createBufferFromString();
// createBufferFromAnotherBuffer();
createBufferFromObject();
//BufferFromOtherArgumentsCausesError()