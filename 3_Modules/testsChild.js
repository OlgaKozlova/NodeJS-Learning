module.exports = function sayAboutYourself() {
    console.log(module.id); // D:\Projects\NodeJS-Learning\3_Modules\testsChild.js
    console.log(module.exports); // [Function: sayAboutYourself]
    console.log(module.parent === null); // false
    console.log(module.filename); // D:\Projects\NodeJS-Learning\3_Modules\testsChild.js
    console.log(module.loaded); // true
    console.log(module.children); // []
    console.log(module.paths);  // [ 'D:\\Projects\\NodeJS-Learning\\3_Modules\\node_modules',
                                // 'D:\\Projects\\NodeJS-Learning\\node_modules',
                                // 'D:\\Projects\\node_modules',
                                // 'D:\\node_modules' ]

};