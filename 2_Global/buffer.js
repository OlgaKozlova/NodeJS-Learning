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

    class Foo {
        [Symbol.toPrimitive]() {
            return 'this is a test';
        }
    }
    const buf3 = Buffer.from(new Foo(), 'utf8');
    console.log(buf3);
}

function BufferFromOtherArgumentsCausesError() {
    // Other arguments cause errors
    try {
        Buffer.from({});
    } catch(e) {
        console.error(e);
    }
}

function allocationFunctionsTest() {
    const buf1 = Buffer.alloc(32, 'hello', 'utf8');
    const buf2 = Buffer.allocUnsafe(32);
    const buf3 = Buffer.allocUnsafeSlow(32);

    console.log(buf1.toString());
    console.log(buf2.toString());
    console.log(buf3.toString());
}

function StaticBufferMethodsTest() {
    const str = 'this is a tést';
    console.log(Buffer.byteLength(str), str.length);

    const buf1 = Buffer.from([1, 2, 3]);
    const buf2 = Buffer.from([2, 1, 3]);
    const buf3 = Buffer.from([1, 2, 3]);
    console.log(Buffer.compare(buf1, buf2), Buffer.compare(buf2, buf1), Buffer.compare(buf1, buf3));

    console.log(Buffer.concat([buf1, buf2, buf3]));
    console.log(Buffer.concat([buf1, buf2, buf3], 4));

    console.log(Buffer.isBuffer(buf1), Buffer.isBuffer([1, 2, 3]));

    console.log(Buffer.poolSize);
    Buffer.poolSize = 4086;
    console.log(Buffer.poolSize);

    console.log(Buffer.isEncoding('utf8'), Buffer.isEncoding('utf9'))
}

function exemplarPropretiesTest() {
    // создаем и заполняем ArrayBuffer;
    const sourceArrayBuffer = new ArrayBuffer(8);
    const view = new Int8Array(sourceArrayBuffer);
    for (let i = 0; i < 8; i++) {
        view[i] = i + 10;
    }

    // cоздаем Buffer из всего ArrayBuffer
    const b1 = Buffer.from(sourceArrayBuffer);
    const b2 = Buffer.from('this is a tést');
    const b3 = Buffer.from([1, 2, 3]);

    console.log(b1.buffer, b2.buffer, b3.buffer);
    console.log(b1.parent, b2.parent, b3.parent);
    console.log(b1.length, b2.length, b3.length);
}

function fillAndAccessTest() {
    const b1 = Buffer.from('this is a tést');
    console.log(b1[0], b1[1]);

    const b2 = Buffer.allocUnsafe(8);
    b2.fill('é', 'utf8');
    console.log(b2.toString());
}

function writeReadTest() {
    const b1 = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);
    console.log(b1.readInt8()); // 1
    console.log(b1.readInt32BE()); // 16909060 (00000001 00000010 00000011 00000100)
    console.log(b1.readInt32LE()); // 67305985 (00000100 00000011 00000010 00000001)

    b1.writeInt8(9, 2);
    console.log(b1); // <Buffer 01 02 09 04 05 06 07 08>
    console.log(b1.readInt8(2)); // 9
}

function workWithOtherBufferTest() {
    const buf1 = Buffer.from([1, 2, 3, 4]);
    const buf2 = Buffer.from([5, 6, 7, 8]);
    const buf3 = Buffer.from([1, 2, 3, 4]);
    console.log(buf1.compare(buf2), buf2.compare(buf1), buf1.compare(buf3)); // -1 1 0
    console.log(buf1.equals(buf3), buf1.equals(buf2)); // true false

    buf1.copy(buf2, 1, 2, 4); // copy to buf2, starting with position 1, values from buf1 from 2 till 4
    console.log(buf1, buf2); // <Buffer 01 02 03 04> <Buffer 05 03 04 08>
}

function searchMethodsTest() {
    const buf1 = Buffer.from([1, 2, 1, 4]);
    console.log(buf1.includes(1), buf1.includes(0x02), buf1.includes(258), buf1.includes(5)); // true true true false
    console.log(buf1.indexOf(1), buf1.lastIndexOf(1)); // 0 2
}

function bufferSliceTest() {
    const buf1 = Buffer.from([1, 2, 3, 4, 5]);
    const buf2 = buf1.slice(2, 4);
    console.log(buf1, buf2); // <Buffer 01 02 03 04 05> <Buffer 03 04>
    buf1[3] = 9;
    console.log(buf1, buf2); // <Buffer 01 02 03 09 05> <Buffer 03 09> Делят память.
}

function iteratorsTest() {
    const buf = Buffer.from([5, 6, 7]);
    for (const key of buf.keys()) {
        console.log(key); // 0 1 2
    }
    for (const value of buf.values()) {
        console.log(value); // 5 6 7
    }
    for (const value of buf) {
        console.log(value); // 5 6 7
    }
    for (const entry of buf.entries()) {
        console.log(entry); // [ 0, 5 ]  [ 1, 6 ]  [ 2, 7 ]
    }
}

function swapTest() {
    const buf = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);
    const buf2 = Buffer.from(buf);
    const buf3 = Buffer.from(buf);
    const buf4 = Buffer.from([1, 2, 3, 4, 5, 6, 7]);
    buf.swap16();
    console.log(buf); // <Buffer 02 01 04 03 06 05 08 07>
    buf2.swap32();
    console.log(buf2); // <Buffer 04 03 02 01 08 07 06 05>
    buf3.swap64();
    console.log(buf3); // <Buffer 08 07 06 05 04 03 02 01>
    buf4.swap16(); // throw new RangeError('Buffer size must be a multiple of 16-bits');
}

function testBufTransformations() {
    const buf = Buffer.from('this is a tést');
    console.log(buf.toJSON()); // { type: 'Buffer',
                               // data: [ 116, 104, 105, 115, 32, 105, 115, 32, 97, 32, 116, 195, 169, 115, 116 ] }
    console.log(buf.toString()); // this is a tést
}
// createBufferFromArray();
// createBufferFromArrayBuffer();
// createBufferFromString();
// createBufferFromAnotherBuffer();
// createBufferFromObject();
// BufferFromOtherArgumentsCausesError()
// allocationFunctionsTest();
// StaticBufferMethodsTest();
// exemplarPropretiesTest();
// fillAndAccessTest();
// writeReadTest();
// workWithOtherBufferTest();
// searchMethodsTest();
// bufferSliceTest();
// iteratorsTest();
// swapTest();
testBufTransformations();