---
title: "Cookie"
---

# cookie 你真的了解吗？

cookie 为何物？cookie 是存储在客户端上大小不超过 4kb 的文件，用来记录一些客户端的信息。

#### cookie 的属性

**name/value**
设置 Cookie 的名称及相对应的值，对于认证 Cookie，Value 值包括 Web 服务器所提供的访问令牌

**httpOnly 属性：** 规定了用户端不能通过 document.cookie 来读取文件

**Path 属性：** 定义了 Web 站点上可以访问该 Cookie 的目录

**secure 属性：** 指定是否使用 HTTPS 安全协议发送 Cookie

**domain 属性：** 指定了可以访问该 Cookie 的 Web 站点或域，。Cookie 机制并未遵循严格的同源策略，允许一个子域可以设置或获取其父域的 Cookie。

**Max-Age 属性：** Max-Age 用于设置在 Cookie 失效之前需要经过的秒数

值得一提是一个[sameSite](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie/SameSite)属性。Chrome 51 开始，浏览器的 Cookie 新增加了一个 SameSite 属性，用来防止 CSRF 攻击和用户追踪。

这里有一个跨站的概念（注意：不是跨域）：当两个 url 顶级域名+二级域名不同时被认为是跨站访问。

**sameSite**属性有三个值：
lax:允许部分第三方站点发送 cookie;

none:无论是否跨站都会发送；但是要注意：HTTP 接口不支持 SameSite=none；

Strict:不允许第三方站点发送 cookie;

然而 Chrome 80 版本中默认 sameSite 设置为 lax， 部分第三方站点无法发送 cookie，这是一个头疼的问题 ；并且部分浏览器会将 sameSite= none ；识别为 sameSite = strict；

#### cookie 与 session

session 的作用是用来记录客户端和服务器会话信息的文件 存储在服务器上；而 cookie 存储在客户端上。

session 可以存储任何形式的信息,cookie 只支持 ascii 编码格式。

session 依赖 cookie 中的 sessionId ，当客户端第一次与服务器会话 服务器会创建一个新的 session，并将一个 sessionId 放在 cookie 中保存，这个 id 是唯一的不可重复的。当浏览器第二次会话时 ，服务端会根据 id 查找出相应的 session 文件。
