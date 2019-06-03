const fs = require('fs');
const chalk = require('chalk');

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
  output: './src/i18n/locales',
  options: {
    debug: true,
    func: {
      // @ dev important to include 't' which is a function from useTranslation
      list: ['t', 'i18next.t', 'i18n.t'],
      extensions: ['.js', '.jsx'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx'],
      fallbackKey: function(ns, value) {
        return value;
      },
      acorn: {
        ecmaVersion: 10, // defaults to 10
        sourceType: 'module', // defaults to 'module'
        // Check out https://github.com/acornjs/acorn/tree/master/acorn#interface for additional options
      },
    },
    lngs: ['en', 'de', 'id'],
    ns: ['locale', 'translations'],
    defaultLng: 'en',
    defaultNs: 'translations',
    defaultValue: '__STRING_NOT_TRANSLATED__',
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
    // console.log('parser', parser);

    const content = fs.readFileSync(file.path, enc);
    let count = 0;

    parser.parseFuncFromString(content, { list: ['i18next._', 'i18next.__'] }, (key, options) => {
      // console.log({ key, options });
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
        `i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(
          JSON.stringify(file.relative),
        )}`,
      );
    }

    done();
  },
};
