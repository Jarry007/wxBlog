var Prism = require('../highlight/prism.js')
function highlight(data){
  let nameArr = ['pre'];
  let langArr = new Array();
  langArr = listLanguages();
 // console.log('all-language:'+langArr)
  let html = data;
  let tagArr = data.match(/<\/?code[^>]*>/g);
  if(tagArr == null){
    return html;
  }
  let indexArr = [];
  for (let i = 0; i < tagArr.length; i++){
    if (i == 0){
      indexArr.push(data.indexOf(tagArr[i]));
    }
    else{
      indexArr.push(data.indexOf(tagArr[i], indexArr[i-1]));
    }
  }

  let cls;

  let i = 0;
  while (i < tagArr.length - 1) { 
    getStartInfo(tagArr[i])
    var label = tagArr[i].match(/<*([^> ]*)/)[1];
   // console.log('label'+label)
    if (tagArr[i + 1] === '</' + label + '>') { 
    //  console.log('class:'+cls);
      if (label === 'code' ) { 
        let lang = cls.split(' ')[0]; 
        if (/lang-(.*)/i.test(lang)) { 
          lang = lang.replace(/lang-(.*)/i, '$1');
        }
        else if (/languages?-(.*)/i.test(lang)) {
          lang = lang.replace(/languages?-(.*)/i, '$1'); 
        }
        if (langArr.indexOf(lang) == -1 || lang == null || lang == 'none' || lang == 'null') {
        }
        else {
        
          let code = data.substring(indexArr[i], indexArr[i + 1]).replace(/<code[^>]*>/, '');
         // console.log('code：'+code)

          let hcode = Prism.highlight(code, Prism.languages[lang], lang);
          html = html.replace(code, hcode);
  
        }

      }
    
      i++;
    }
  
    i++;
  }
  return html;

  function getStartInfo(str) {
    cls = matchRule(str, 'class');
  }


  function matchRule(str, rule) {
    let value = '';
    let re = new RegExp(rule + '=[\'"]?([^\'"]*)');
    if (str.match(re) !== null) {
      value = str.match(re)[1];
    }
    return value;
  }
  //检查是否为支持的标签
  function checkName(str) {
    let name = 'div';
    for (let i = 0; i < nameArr.length; i++) {
      if (str === nameArr[i]) {
        name = str;
        break;
      }
    }
    return name;
  }

  //html字符转换 // 注意，顺序不能错
  function escape2Html(str) {
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&amp;/g, '&');
    return str;
  }

  // 列出当前 Prism.js 中已有的代码语言，可以自己在 Prism 的下载页面选择更多的语言。
  function listLanguages() {
    var langs = new Array();
    let i = 0;
    for (let language in Prism.languages) {
      if (Object.prototype.toString.call(Prism.languages[language]) !== '[object Function]') {
        langs[i] = language;
        i++;
      }
    }
    return langs;
  }
}

module.exports = {
  highlight: highlight
};
