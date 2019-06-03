const jsonfile = require('jsonfile');
const chalk = require('chalk');
const TJO = require('translate-json-object')();

const { languages } = require('../src/i18n/constants');

const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

TJO.init({
  googleApiKey: googleApiKey,
});

for (var i = 0; i < languages.length; i++) {
  const lng = languages[i];
  const file = `src/i18n/locales/${lng}/translations.json`;
  if (lng !== 'en') {
    jsonfile
      .readFile(file)
      .then(obj => {
        TJO.translate(file, 'es')
          .then(function(data) {
            console.log(data);
            jsonfile
              .writeFile(file, data)
              .then(res => {
                console.log(chalk.green(`Remove from ${file} successfully`));
              })
              .catch(error => console.error(chalk.red(error)));
          })
          .catch(function(err) {
            console.log('error ', err);
          });
      })
      .catch(error => console.error(error));
  }
}
