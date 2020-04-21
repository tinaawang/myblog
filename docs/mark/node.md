---
title: "自己写一个Node脚本"
---

# 自己写一个 Node 脚本

只要本地电脑装了 node 环境的 你就可以撸一个简易 node 服务。

先创建文件

```
cd desktop
mkdir node_demo
cd node_demo

touch serve.js

// 打开serve.js编辑 ，我用的vscode
```

附上脚本代码

```
//引入http模块
var http = require("http");
//引入文件读写模块fs
var fs = require("fs");
// 引入url
var url = require("url");

//设置端口
var port = process.argv[2];

if (!port) {
  console.log("指定一个端口号哦\n 像node server.js 8083 这样");
  process.exit(1);
}
// 创建服务
var server = http.createServer(function(request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  if (path === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    response.write(`hello`);
    response.end();
  } else if (path === "/x") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/css;charset=utf-8");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    response.write(`nothing`);
    response.end();
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    response.write(`你输入的路径不存在对应的内容`);
    response.end();
  }
});

server.listen(port);
console.log("监听 " + port + " 成功啦！\n请打开 http://localhost:" + port);

```

运行`node server.js + 你指定的端口号'`

打开控制台输出的路径，你就可以看到服务响应的信息啦
