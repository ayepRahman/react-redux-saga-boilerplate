# react-redux-saga-boilerplate

A lightweight react redux saga boilerplate

## Bucketlists

### Code Generator

Note:
Containers should include test while generating.

- page-container
- stand-alone-container
- component
- routes

- Internationalization
- Test

## Features

### Quick scaffolding

Create components, containers, routes, selectors and sagas right from the CLI!

### Absolute Import Path

You can absolute import `import { Button } from 'components/button'`

### Component-centric splitting

Build with `react-loadable` a higher-order component (a function that creates a component) which lets you dynamically load any module before rendering it into your app.

### Out of the box React Ui/Css framework (React-bootstrap)

By default we're using [react-boostrap](https://react-bootstrap.github.io) for our react ui framework.

### Styling (SASS, styled-components)

This project bootstrap using Create React App. Check the styling guide below.
[Create React App Styling Guide](https://facebook.github.io/create-react-app/docs/adding-a-sass-stylesheet)

1. SASS

To use Sass, first install node-sass:

```
$ npm install node-sass --save
$ # or
$ yarn add node-sass
```

Now you can rename src/App.css to src/App.scss and update src/App.js to import src/App.scss. This file and any other file will be automatically compiled if imported with the extension .scss or .sass.

To share variables between Sass files, you can use Sass imports. For example, src/App.scss and other component style files could include @import "./shared.scss"; with variable definitions.

This will allow you to do imports like

```
@import 'styles/_colors.scss'; // assuming a styles directory under src/
@import '~nprogress/nprogress'; // importing a css file from the nprogress node module
```

2. Styled Components

By default code generator give you an option to use styled-components
