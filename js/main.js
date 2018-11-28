var css1 = `/* 
   * 面试官你好,我是徐志贤
   * 只以文字介绍太单调了
   * 下面我就用代码来介绍吧
   * 首先要准备一些样式
   */

*{
  transition: all 1s; 
}
html{
  font-size:16px;
}
#code { 
  border: 1px solid transparent;
  padding: 16px;
}
#code {
    left: 0;
    width: 100%;
    height: 100%;
}
/*接下来代码加高亮*/

.token.comment{ color:slategray;}
.token.property{ color:#f92672;}
.token.selector{ color:#a6e22e; }

/* 加点3D效果 */
 #code {
    animation: breathe 1s infinite alternate-reverse;
 }

 /* 好了 开始来介绍下我自己吧*/
 /* 我需要一张白纸*/
.code-wrapper{
    width: 50%; left: 0; position: fixed; 
    height: 100%;
}
#paper > .content {
    display: block;
}
/*接下来开始介绍下我自己吧*/`
var css2 = `
/* 把 Markdown 变成 HTML*/
`
var md = `
# 自我介绍
我叫 XXX
1988 年 12 月出生
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
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

`
let css3 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`
writeCode('', css1, () => {
    creatPaper(() => {
        writeMarkdown(md, () => {
            writeCode(css1, css2, () => {
                convertMarkdownToHtml(() => {
                    writeCode(css1 + css2, css3, () => {
                        console.log('完成')
                    })
                })
            })
        })
    })
})


function creatPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('div')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn && fn.call()
}

function writeCode(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    let n = 0
    let timer = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
        styleTag.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight
        if (n >= code.length) {
            window.clearInterval(timer)
            fn && fn.call()
        }
    }, 40)
}
function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let timer = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = domPaper.scrollHeight
        if (n >= markdown.length) {
            window.clearInterval(timer)
            fn && fn.call()
        }
    }, 20)
}

function convertMarkdownToHtml(fn) {
    var div = document.createElement('div')
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn && fn.call()
}

