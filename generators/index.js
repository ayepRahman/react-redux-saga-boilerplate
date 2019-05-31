const fs = require('fs');
const path = require('path');

const componentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');
// const routesGenerator = require('./routes/index.js');

module.exports = plop => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
