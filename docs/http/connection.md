---
title: "http 长连接  短连接"
---

# http 长连接 短连接

## 概念

**长连接** 指在一个连接上可以连续发送多个数据包，在连接保持期间，如果没有数据包发送，需要双方发链路检测包。

**短连接**是指通讯双方有数据交互时，就建立一个连接，数据发送完成后，则断开此连接，即每次连接只完成一项业务的发送。

## 为什么会有 http 是长连接还是短连接的问题？

http 是长连接还是短连接的问题实质是 tcp 连接长连接 短链接的问题。http 是应用层协议，服务端响应之后 此次 http 请求也就结束了。tcp 是传输层协议, 可以保持一段时间不断开 所以有长连接 短连接的区分。

在 http1.0 版本中默认使用的是短连接 ，对每一次请求/响应建立并拆除一次连接。比如你打开一个网页，有图片请求 文档资源请求等等，使用短连接就要建立多个 tcp 连接，并且没次重新打开这个网页都要重新建立。

在 http1.1 之后默认使用长连接，请求头设置 `Connection:keep-alive`。长连接不代表一次建立的 tcp 连接永远不会关闭，一定时间后会关闭。你在一定时间内打开同一个网页只需要复用之前建立过的 tcp 连接。