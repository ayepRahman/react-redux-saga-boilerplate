const fs = require('fs');
const path = require('path');

// const componentGenerator = require('./component/index.js');
const graphqlContainerGenerator = require('./graphql-container/index.js');
const routesGenerator = require('./routes/index.js');

module.exports = plop => {
  // plop.setGenerator('component', componentGenerator);
  plop.setGenerator('graphql-container', graphqlContainerGenerator);
  plop.setGenerator('routes', routesGenerator);
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
