# 1.问题
项目中存在多种语言文件，默认导入英文，如何实现其他语言动态加载
# 2.方案
```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        clean: true,
      },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'My App',
          template: 'src/index.html',
        })
    ],
  }
```

```bash
src
│
└───lcoale
│   │   zh.json
│   │   en-json
│index.js  
```
## 1.require with expression 全量导入，同步加载
[https://webpack.js.org/guides/dependency-management/#require-with-expression](https://webpack.js.org/guides/dependency-management/#require-with-expression)
```javascript
import en from './locale/en.json'
let curLanguage = localStorage.getItem('locale') || 'en'
let locale = Object.assign({}, en, require(`./locale/${curLanguage}.json`))
render(locale)
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/29028148/1705905873683-ecbe4024-d746-4edb-a320-2701b28643d0.png#averageHue=%23252421&clientId=u33633b18-d288-4&from=paste&height=215&id=u4f75dea7&originHeight=215&originWidth=802&originalType=binary&ratio=1&rotation=0&showTitle=false&size=45262&status=done&style=none&taskId=u7c4be826-fddf-45f2-a5f5-c84d18de0ce&title=&width=802)
打包结果：所有多语言打包到main.js中
## 2.import() 动态加载
[https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import](https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import)
```javascript
import en from './locale/en.json'
let curLanguage = localStorage.getItem('locale') || 'en'
import(`./locale/${curLanguage}.json`)
   .then(lang => {
      let locale = Object.assign({}, en, lang)
      render(locale)
})
```
## ![image.png](https://cdn.nlark.com/yuque/0/2024/png/29028148/1705905851992-8777392d-8994-4455-a872-3f97e1d66fea.png#averageHue=%23252421&clientId=u33633b18-d288-4&from=paste&height=246&id=udbf67297&originHeight=246&originWidth=755&originalType=binary&ratio=1&rotation=0&showTitle=false&size=46101&status=done&style=none&taskId=ud6583f95-16f4-4b44-a329-073856a9713&title=&width=755)
多语言文件打包到单独的chunk中
## 3.require.context 全量导入，按需加载
[https://webpack.js.org/api/module-methods/#requirecontext](https://webpack.js.org/api/module-methods/#requirecontext)
```javascript
import en from './locale/en.json'
let curLanguage = localStorage.getItem('locale') || 'en'
const context = require.context('./locale', false, /\.json$/, 'lazy');
context(`./${curLanguage}.json`).then(lang => {
   let locale = Object.assign({}, en, lang)
   render(locale)
})
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/29028148/1705905900261-4eab48c2-7bef-4670-8277-9de2c9d0eb00.png#averageHue=%23252321&clientId=u33633b18-d288-4&from=paste&height=268&id=ue2303ac0&originHeight=268&originWidth=794&originalType=binary&ratio=1&rotation=0&showTitle=false&size=55893&status=done&style=none&taskId=uad2dfd8d-fe79-41c8-87fb-53a7304cc2b&title=&width=794)
## 4.静态文件复制，使用fetch动态请求文件
webpack 配置中 pluginst 添加 copy-webpack-plugin
```javascript
plugins: [
        new HtmlWebpackPlugin({
          title: 'My App',
          template: 'src/index.html',
        }),
        new CopyPlugin({
            patterns: [
              { from: 'src/locale', to: "./locale" },
            ],
          }),
    ],
```
```javascript
import en from './locale/en.json'
let curLanguage = localStorage.getItem('locale') || 'en'
function init(){
   fetch(`./locale/${curLanguage}.json`)
   .then(res => {
      res.json()
      .then(lang => {
         let locale = Object.assign({}, en, lang)
         render(locale)
      })
   })
}
init()
```
# ![image.png](https://cdn.nlark.com/yuque/0/2024/png/29028148/1705905956561-98379a38-6fde-4200-a508-f207f3bf33d1.png#averageHue=%23262521&clientId=u33633b18-d288-4&from=paste&height=228&id=uc4d4ef3e&originHeight=228&originWidth=795&originalType=binary&ratio=1&rotation=0&showTitle=false&size=45827&status=done&style=none&taskId=u55fb946a-9e83-4dee-a4b9-5c25d4acd78&title=&width=795)
# 3.结论
todo
# 4.项目地址
[https://github.com/DavosLi/i18n_load_webpack_test](https://github.com/DavosLi/i18n_load_webpack_test)


