const jsonfile = require('jsonfile');
const { languages } = require('../src/i18n/constants');

function extractAndDestroy(lng) {
  const file = `src/i18n/locales/${lng}/translations.json`;
  console.log(file);

  if (lng !== 'en') {
    jsonfile.writeFile(file, {}, function(err, obj) {
      if (err) console.error(err);
      console.dir(obj);
    });
  }
}

for (var i = 0; i < languages.length; i++) {
  extractAndDestroy(languages[i]);
}
