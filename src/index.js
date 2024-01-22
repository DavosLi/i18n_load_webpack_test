import en from './locale/en.json'
let curLanguage = localStorage.getItem('locale') || 'en'




// 方案1 按需导入，异步加载 
// import(`./locale/${curLanguage}.json`).then(lang => {
//    let locale = Object.assign({}, en, lang)
//    render(locale)
// })


// 方案2 全量导入，同步加载
// let locale = Object.assign({}, en, require(`./locale/${curLanguage}.json`))
// render(locale)


// 方案3 打包时直接拷贝多语言文件，前端请求（需要webpack插件：copy-webpack-plugin）
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