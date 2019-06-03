const jsonfile = require('jsonfile');
const chalk = require('chalk');

const { languages } = require('../src/i18n/constants');

console.log(chalk.cyan(`Starting...`));

function extractAndDestroy(lng) {
  const file = `src/i18n/locales/${lng}/translations.json`;

  if (lng !== 'en') {
    jsonfile
      .writeFile(file, {})
      .then(res => {
        console.log(chalk.green(`Remove from ${file} successfully`));
      })
      .catch(error => console.error(chalk.red(error)));
  }
}

for (var i = 0; i < languages.length; i++) {
  extractAndDestroy(languages[i]);
}
