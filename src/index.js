import en from './locale/en.json'
let curLanguage = localStorage.getItem('locale') || 'en'


//UI

var select = document.getElementById('languageSelect');
select.value = curLanguage
// 添加事件监听器
select.addEventListener('change', function() {
  // 获取选中的值
  var selectedValue = select.value;

  // 根据选中的值执行相应操作
  switch (selectedValue) {
    case 'en':
      // 执行英语相关操作
      console.log('选择了英语');
      break;
    case 'zh':
      // 执行法语相关操作
      console.log('选择了中文');
      break;
    default:
      // 默认操作
      break;
  }
  localStorage.setItem('locale', selectedValue)
});


/**
 * 
 * 按需导入，异步加载 
 * 
*/
import(`./locale/${curLanguage}.json`).then(lang => {
   let p = document.createElement('p')
   let locale = Object.assign({}, en, lang)
   p.innerHTML = locale['LANG1'] + locale['LANG2']
   document.body.append(p)
})




/**
 * 
 * 全量导入，同步加载
***/
// let p = document.createElement('p')
// let locale = Object.assign({}, en, require(`./locale/${curLanguage}.json`))
// p.innerHTML = locale['LANG1'] + locale['LANG2']
// document.body.append(p)


/**
 * 
 * 直接请求静态文件
 *  
 ***/
async function init(){
   let p = document.createElement('p')
   let res = await fetch(`./locale/${curLanguage}.json`)
   let lang = await res.json()
   let locale = Object.assign({}, en, lang)
   p.innerHTML = locale['LANG1'] + locale['LANG2']
   document.body.append(p)
}

function init2(){
   let p = document.createElement('p');
   fetch(`./locale/${curLanguage}.json`)
   .then(res => {
      res.json()
      .then(lang => {
         let locale = Object.assign({}, en, lang)
         p.innerHTML = locale['LANG1'] + locale['LANG2']
         document.body.append(p)
      })
   })
}
// init2()
// init()