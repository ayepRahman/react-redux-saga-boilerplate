const fs = require('fs');
const chalk = require('chalk');

const { languages } = require('../../i18n/constants.js');
const funcLists = ['t', 'i18next.t', 'i18n.t', 'this.props.t', 'props.t'];

module.exports = {
  input: [
    './src/app/components/**/*.{js,jsx}',
    './src/app/containers/**/*.{js,jsx}',
    // Use ! to filter out files or directories
    './src/!app/store/*.{js,jsx}',
    './src/!app/**/*.test.{js,jsx}',
    './src/!i18n/**',
    '!**/node_modules/**',
  ],
  sort: true,
  output: './src/i18n/locales',
  options: {
    debug: true,
    func: {
      // @dev important to include 't' when use i18n hook function from useTranslation()
      list: funcLists,
      extensions: ['.js', '.jsx'],
    },
    lngs: languages,
    ns: ['translations'],
    defaultLng: 'en',
    defaultNs: 'translations',
    defaultValue: function(lng, ns, key) {
      console.log('lng', lng);
      if (lng === 'en') {
        // Return key as the default value for English language
        return key;
      } else if (lng !== 'en') {
        return '';
      }
    },
    resource: {
      loadPath: '{{lng}}/{{ns}}.json',
      savePath: '{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: function customTransform(file, enc, done) {
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    let count = 0;

    parser.parseFuncFromString(content, { list: funcLists }, (key, options) => {
      // console.log({ content, key, options });
      parser.set(
        key,
        Object.assign({}, options, {
          nsSeparator: false,
          keySeparator: false,
        }),
      );

      ++count;
    });

    if (count > 0) {
      console.log(
        `[i18next-scanner]: count=${chalk.cyan(count)}, file=${chalk.yellow(
          JSON.stringify(file.relative),
        )}`,
      );
    }

    done();
  },
};
