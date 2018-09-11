/* 把code写到#code和style标签*/
function writeCode(prefix, code, fn){
    let domCode = document.querySelector('#code')
    let n = 0 
    let id = setInterval(()=>{
        n += 1 
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0,n), Prism.languages.css)
        styleTag.innerHTML = prefix + code.substring(0,n)
        domCode.scrollTop = domCode.scrollHeight
        if (n >= code.length){
            window.clearInterval(id)
            fn.call()
        }
    },10)
}

function writeMarkdown(markdown,fn){
    let domPaper = document.querySelector('#paper>.content')
    let n = 0 
    let id = setInterval(()=>{
        n += 1 
        domPaper.innerHTML = markdown.substring(0,n)      
        domPaper.scrollTop = domPaper.scrollHeight
        if (n >= markdown.length){
            window.clearInterval(id)
            fn.call()
        }
    },10)
}
var result = `/* 
 * 面试官你好，我是LXX
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */
*{
  transition: all 1s;
}
html{
  background: rgb(222,222,222);
  font-size: 16px;
}
#code{
  border: 1px solid red;
  padding: 16px;
}
/* 走代码高亮吧 */
.token.selector{
    color: #690;
}
.token.property{
    color: #905;
}
.token.function{
    color: #DD4A68;
}

/* 来转个圈 */
#code{
    transform: rotate(360deg);
}

/*  接下来我来介绍自己 */
/*  搞一张白纸 */
#code{
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%;
}
#paper{
    position: fixed;
    right: 0;
    width:50%;
    height: 100%;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
}
#paper > .content{
    background: white;
    width: 100%;
    height: 100%;
}
`
var result2 =  `
/*
* 接下来把 Markdown 变成 HTML
* 会用到一个库 marked.js
*/
`
var md = `
# 自我介绍

我叫 XXX
1994 年 10 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍
熟悉 JavaScript CSS

# 项目介绍
1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式
 QQ xxxxxxxx
 Email xxxxxxxx
 手机 xxxxxxx
`
var result3 =`
/*
* 这就是我的简历
* 谢谢观看
*/
`
writeCode('', result, ()=>{
    createPaper(()=>{
        writeMarkdown(md,()=>{
            writeCode(result, result2, ()=>{
                markdownToHtml(()=>{
                    writeCode(result + result2, result3)
                })
            })
        })
    })
})


function createPaper (fn){
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}

function markdownToHtml(fn){
    var div = document.createElement('div')
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn.call()
}
