# javascript-training-internship
Javascript training

Config:
- Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension
- Intall [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension
- Run:
```bash
npm install -D eslint prettier
npm install -D eslint-config-prettier eslint-plugin-prettier
```
- Create .eslintrc.json
```json
{  
  "extends": ["airbnb", "prettier"],  
  "plugins": ["prettier"],  
  "rules": {  
    "prettier/prettier": ["error"]  
  }  
}  
```
- Create .prettierrc
```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true
}
```
- Install parcel
```bash
npm install --save-dev parcel
```
- Make sure that package.json looks like this:
```json
{
  "name": "javascript-examples",
  "source": "src/index.html",
  "scripts": {
    "start": "parcel",
    "build": "parcel build"
  },
  "devDependencies": {
    "eslint": "^9.9.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.2.1",
    "parcel": "^2.12.0",
    "prettier": "^3.3.3"
  }
}
```
- If there are already config files
```bash
npm install
```