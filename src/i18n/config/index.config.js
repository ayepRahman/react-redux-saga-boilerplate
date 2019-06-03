const fs = require('fs');
const chalk = require('chalk');
const Parser = require('i18next-scanner').Parser;

const languages = ['en', 'de', 'id', 'ja'];

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
      list: ['this.pros.t', 'props.t', 't', 'i18next.t', 'i18n.t'],
      extensions: ['.js', '.jsx'],
    },
    lngs: languages,
    ns: ['translations'],
    defaultLng: 'en',
    defaultNs: 'translations',
    defaultValue: function(lng, ns, key) {
      if (lng === 'en') {
        // Return key as the default value for English language
        return key;
      }
      // Return the string '__STRING_NOT_TRANSLATED__' for other languages
      return '__STRING_NOT_TRANSLATED__';
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
    // console.log('parser', parser.parseFuncFromString());

    const content = fs.readFileSync(file.path, enc);
    let count = 0;

    parser.parseFuncFromString(content, { list: ['t', 'i18next.t', 'i18n.t'] }, (key, options) => {
      console.log({ content, key, options });
      parser.set(
        key,
        Object.assign({ test: 1 }, options, {
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
