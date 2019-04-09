var Prism = require('../highlight/prism.js')
function highlight(data){
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
   // console.log('label:'+label)
    if (tagArr[i + 1] === '</' + label + '>') { 
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

          let hcode = Prism.highlight(code, Prism.languages[lang], lang);
          html = html.replace(code, hcode);
  
        }

      }
      i++;
    }else{
      console.log('不是闭包')
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
    //console.log('regexp:'+re)
    if (str.match(re) !== null) {
      value = str.match(re)[1];
      //console.log('value:'+value)
    }
    return value;
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
