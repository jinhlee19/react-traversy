# Webpack Override

- Sass 설치의 선행과정 - webpack 설정
-

## cra에서 webpack 또는 babel을 오버라이딩 할 수 있도록 해주는 패키지를 설치

yarn add customize-cra react-app-rewired --dev

### 필요시 선행 설치 (Yarn)

npm install --global yarn

## 설치 후, package.json에 적용

```json
/* package.json */
// before
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
}

// after
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
}
// after : Sass
  "scripts": {
    "start": "npm run build:css && react-rewired start",
    "build": "npm run build:css && react-rewired build",
    "test": "react-rewired test",
    "eject": "react-scripts eject",
    "build:css": "postcss src/styles/tailwind.scss -o"
  }
```

## 이제 웹팩을 오버라이딩할 수 있다, 프로젝트 root 경로에 config-overrides.js 를 만들어 웹팩을 오버라이딩 한다.

```javascript
const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
addWebpackAlias({
'@': path.resolve(\_\_dirname, 'src'),
}),
);
```
