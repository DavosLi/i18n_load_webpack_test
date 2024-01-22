import en from './locale/en.json'
let curLanguage = localStorage.getItem('locale') || 'en'




// 方案1 全量导入，按需加载 
import(`./locale/${curLanguage}.json`)
   .then(lang => {
      let locale = Object.assign({}, en, lang)
      render(locale)
})


// 方案2 全量导入，全量加载
// let locale = Object.assign({}, en, require(`./locale/${curLanguage}.json`))
// render(locale)

// 方案3 全量导入，按需加载 (基于 webpack require.context: https://webpack.js.org/api/module-methods/#requirecontext)
// const context = require.context('./locale', false, /\.json$/, 'lazy');
// context(`./${curLanguage}.json`).then(lang => {
//    let locale = Object.assign({}, en, lang)
//    render(locale)
// })

// 方案4 打包时直接拷贝多语言文件，前端请求（需要webpack插件：copy-webpack-plugin，请在webpack.config.js中启动该插件）
// function init(){
//    fetch(`./locale/${curLanguage}.json`)
//    .then(res => {
//       res.json()
//       .then(lang => {
//          let locale = Object.assign({}, en, lang)
//          render(locale)
//       })
//    })
// }
// init()


//模拟UI，语言加载后开始渲染
function render(locale){
   var select = document.getElementById('languageSelect');
   select.value = curLanguage
   // 添加事件监听器
   select.onchange = () => {
   // 获取选中的值
      var selectedValue = select.value;
      localStorage.setItem('locale', selectedValue)
      location.reload()
   }
   
   let p = document.createElement('p');
   p.innerHTML = locale['LANG1'] + locale['LANG2']
   document.body.append(p)
}