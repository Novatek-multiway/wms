const { notEmpty } = require('../utils.cjs');
const { resolve } = require('path');

module.exports = {
  description: 'generate a page',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'page name please',
      validate: notEmpty('name'),
    },
  ],
  actions: (data) => {
    const name = '{{name}}';
    const actions = [
      {
        type: 'add',
        path: `src/pages/${name}/index.tsx`,
        templateFile: resolve(__dirname, 'index.txt'),
      },
    ];
    return actions;
  },
};
