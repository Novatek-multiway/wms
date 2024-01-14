const { viewGenerator, componentGenerator } = require('plop-templates');
module.exports = function (plop) {
  plop.setGenerator('page', viewGenerator);
  plop.setGenerator('component', componentGenerator);
};
