const helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет, мир!'
};

const sayHello = function (lang) {
    return helloInLang[lang];
};

module.exports.sayHello = sayHello;
