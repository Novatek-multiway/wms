const { notEmpty } = require('../utils.cjs');
const { resolve } = require('path');

module.exports = {
  description: 'generate vue component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'component name please',
      validate: notEmpty('name'),
    },
  ],
  actions: (data) => {
    const name = '{{properCase name}}';
    const actions = [
      {
        type: 'add',
        path: `src/components/${name}/index.tsx`,
        templateFile: resolve(__dirname, 'index.txt'),
        data: {
          name,
        },
      },
    ];

    return actions;
  },
};
