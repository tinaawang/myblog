---
title: "跨域"
---

# 跨域问题

前端打工仔面试时经常遇到的跨域问题 到底什么是跨域呢？

出现跨域这个词 首先是因为[浏览器的同源限制策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)。
浏览器规定只有 **端口,协议 ，域名**都一致才属于同源，可以互相访问

下图给出了不同源的结果

```

URL                                      	结果	原因
http://store.company.com/dir2/other.html	同源	只有路径不同
http://store.company.com/dir/inner/another.html	同源	只有路径不同
https://store.company.com/secure.html	         失败	协议不同
http://store.company.com:81/dir/etc.html	失败	端口不同 ( http:// 默认端口是80)
http://news.company.com/dir/other.html   	失败	主机不同
```

小朋友 你是否有很多问号 跨域原来是浏览器的锅 为什么一定要限制同源才能互相访问呢？

如果没有限制同源访问 一些钓鱼网站可以读取你的 cookie 信息 伪造身份向其他浏览器发送请求 也就是我们常说的 csrf 攻击。

### 解决跨域的常用方法

## JSONP

JSONP 这个名字听起来好像和 JSON 有很大关系 其实并没有。实质上就是通过动态插入 script 标签 通过 src 路径去访问跨域的地址 参数上带上要执行的回调函数 然后通过解析响应得到想要的信息。

这种做法有限制就是只能发送 GET 请求。那 img 标签的 src 可以用吗？别问，问就是不行，因为只有 script 标签可以解析响应。

实现如下： 具体可以参考我的另一篇文章[JSONP 是什么](https://www.jianshu.com/p/c6c221f825db)

```
  let functionName = 'tina'+parseInt(Math.random()*100000,10);
//给调用函数创建一个随机的函数名
  script.src = 'http://u.com:8002/pay?callback=' + functionName;
//u.com为响应网站的域名，8002为响应网站的端口号

window[callback] = function(result){ //定义函数
            if(result === 'success'){
                amount.innerText = amount.innerText - 1;
            }
        }
        script.onload = function(e){
            e.currentTarget.remove();//执行结束删除script标签
            delete window[callback]; //执行结束删除函数
        }
        script.onerror = function (e) {
            alert('fail');
            e.currentTarget.remove();//执行结束删除script标签
            delete window[callback];//执行结束删除函数
        }
    })
```

## window.postMessage

MDN 上的定义[window.postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)

从广义上讲，一个窗口可以获得对另一个窗口的引用（比如 targetWindow = window.opener），然后在窗口上调用 targetWindow.postMessage() 方法分发一个 MessageEvent 消息。接收消息的窗口可以根据需要自由处理此事件。传递给 window.postMessage() 的参数（比如 message ）将通过消息事件对象暴露给接收消息的窗口。

语法

```
otherWindow.postMessage(message, targetOrigin, [transfer]);
// targetOrigin属性规定了哪些窗口可以接收到消息

```

```
/*
 * A窗口的域名是<http://example.com:8080>，以下是A窗口的script标签下的代码：
 */

var popup = window.open(...popup details...);

// 如果弹出框没有被阻止且加载完成

// 这行语句没有发送信息出去，即使假设当前页面没有改变location（因为targetOrigin设置不对）
popup.postMessage("The user is 'bob' and the password is 'secret'",
                  "https://secure.example.net");

// 假设当前页面没有改变location，这条语句会成功添加message到发送队列中去（targetOrigin设置对了）
popup.postMessage("hello there!", "http://example.org");

function receiveMessage(event)
{
  // 我们能相信信息的发送者吗?  (也许这个发送者和我们最初打开的不是同一个页面).
  if (event.origin !== "http://example.org")
    return;

  // event.source 是我们通过window.open打开的弹出页面 popup
  // event.data 是 popup发送给当前页面的消息 "hi there yourself!  the secret response is: rheeeeet!"
}
window.addEventListener("message", receiveMessage, false);


/*
 * 弹出页 popup 域名是<http://example.org>，以下是script标签中的代码:
 */

//当A页面postMessage被调用后，这个function被addEventListenner调用
function receiveMessage(event)
{
  // 我们能信任信息来源吗？
  if (event.origin !== "http://example.com:8080")
    return;

  // event.source 就当前弹出页的来源页面
  // event.data 是 "hello there!"

  // 假设你已经验证了所受到信息的origin (任何时候你都应该这样做), 一个很方便的方式就是把event.source
  // 作为回信的对象，并且把event.origin作为targetOrigin
  event.source.postMessage("hi there yourself!  the secret response " +
                           "is: rheeeeet!",
                           event.origin);
}

window.addEventListener("message", receiveMessage, false);
```

postMessage 在使用的过程中如果没有指定 origin 去验证发消息的窗口是否合法是很危险的 同时也需要验证接收到的内容是否对站点是否构成攻击

## document.domain

这种方式只适合主域名相同，但子域名不同的 iframe 跨域。比如主域名是http://crosdomain.com:9099，子域名是http://child.crosdomain.com:9099，这种情况下给两个页面指定一下document.domain即document.domain = crosdomain.com 就可以访问各自的 window 对象了。

## CROS

CORS 是一个 W3C 标准，全称是"跨域资源共享"（Cross-origin resource sharing）这里可以参考[阮一峰老师的文章](http://www.ruanyifeng.com/blog/2016/04/cors.html)

cros 跨域请求分为简单请求和非简单请求

```
（1) 请求方法是以下三种方法之一：

HEAD
GET
POST
（2）HTTP的头信息不超出以下几种字段：

Accept
Accept-Language
Content-Language
Last-Event-ID
Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain`
```

对于简单的请求只需要在请求头添加上 origin 标示自己身份 后端添加上 Access-Control-Allow-Origin 标示同意这个身份访问;

如果需要发送 cookie 则需要前后端都设置 Access-Control-Allow-Credentials

对于非简单请求 会先发送一个预请求 检查请求头成功后返回 204 然后再触发第二次请求

## Nginx 反向代理

前端请求以本地路径路径进行访问 发送请求到 Nginx 服务器上 再以真实的域名广播到请求服务器上 这一层代理之后就不存在跨域问题了 。
