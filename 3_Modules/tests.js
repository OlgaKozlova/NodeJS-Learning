function globalModuleFileNameDirNameTest() {
    console.log(__dirname); // D:\Projects\NodeJS-Learning\3_Modules
    console.log(__filename); // D:\Projects\NodeJS-Learning\3_Modules\tests.js}
    console.log(exports, module.exports); // {} {}
    console.log(exports === module.exports); // true
}


function moduleTest() {
   let sayAboutChild = require('./testsChild.js');
   sayAboutChild();
   console.log(module.id); // .
   console.log(module.exports); // {}
   console.log(module.parent); // null
   console.log(module.filename); // D:\Projects\NodeJS-Learning\3_Modules\tests.js
   console.log(module.loaded);  // false
   console.log(module.children.length); // 1
   console.log(module.paths);   // [ 'D:\\Projects\\NodeJS-Learning\\3_Modules\\node_modules',
                                // 'D:\\Projects\\NodeJS-Learning\\node_modules',
                                // 'D:\\Projects\\node_modules',
                                // 'D:\\node_modules' ]
}

function requireTest() {
    console.log(require.resolve('./module.js')); // D:\Projects\NodeJS-Learning\3_Modules\module.js
    console.log(require.resolve('fs')); // fs
    console.log(require.resolve('fs-extra')); // D:\Projects\NodeJS-Learning\node_modules\fs-extra\lib\index.js
    let module = require('./module.js');
    console.log(module); // { sayHello: [Function: sayHello] }
    console.log(require.main.filename); // D:\Projects\NodeJS-Learning\3_Modules\tests.js
    console.log(Object.keys(require.extensions)); // [ '.js', '.json', '.node' ]
    console.log(Object.keys(require.cache)); // [ 'D:\\Projects\\NodeJS-Learning\\3_Modules\\tests.js',
                                             // 'D:\\Projects\\NodeJS-Learning\\3_Modules\\module.js' ]

}

// globalModuleFileNameDirNameTest();
// moduleTest();
requireTest();