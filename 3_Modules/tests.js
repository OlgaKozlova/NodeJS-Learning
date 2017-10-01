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
   // console.log(require);
    console.log(module.__proto__);
}

// globalModuleFileNameDirNameTest();
// moduleTest();
requireTest();