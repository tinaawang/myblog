---
title: "css中常见的单位"
---

# css 中常见的单位

### px

PX 是 Pixel 的缩写，就是我们常说的虚拟像素，又称设备独立像素或逻辑像素，它是图像显示的基本单元。

### pt

pt（point，磅）：是一个物理长度单位，指的是 72 分之一英寸。

### em

em 表示相对尺寸，其相对于当前对象内文本的 font-size。em 会继承父级元素的字体大小，所以做移动端适配不太友好

### vw vh

视口就是屏幕上可视区域

vw : 1vw 等于视口宽度的 1%
vh : 1vh 等于视口高度的 1%

### rem

rem 是一个相对单位，指的是当前文本内 font-size 的大小。做移动端适配可以使用 rem 单位

```
document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
1rem =  100px;
放大了100倍是因为防止计算值小于浏览器支持的最小字号。
```
