const path = require('path');

console.log(path.extname(__filename).slice(1));

console.log(path.parse(__filename));
console.log(path.resolve(__dirname, '..', './modules', './app.js'));
console.log(path.join(__dirname, '..', './modules', './app.js'));
