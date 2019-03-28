# wxBlog
微信小程序博客
## 3/28
使用`wxParse`代码会挤在一行，使用`towxml`，html文本中无法代码高亮。
原因是源码中没有为`<code>`标签里的内容进行`highlight.highlightAuto`高亮。
解决办法可以参考`wxParse`，提取出`<code>`标签里的内容，然后传入`highlight.js`中。
