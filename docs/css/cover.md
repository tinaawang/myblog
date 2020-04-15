---
title: "堆叠上下文"
---

# 什么是堆叠上下文(The stacking context)

首先我们需要了解 css 中堆叠顺序的概念
在没有触发堆叠上下文时，正常的堆叠顺序应该为：
负 z-index<background<border<块级元素<浮动元素<文字/内联元素<定位元素<正 z-index （如果是兄弟同级元素，后出现的属性会覆盖前一个属性）

现在我们引入堆叠上下文的概念
在 MDN 文档上对堆叠上下文的定义是：
**【层叠上下文是 HTML 元素的三维概念，这些 HTML 元素在一条假想的相对于面向（电脑屏幕的）视窗或者网页的用户的 z 轴上延伸，HTML 元素依据其自身属性按照优先级顺序占用层叠上下文的空间】**

根据字面定义我们很难理解堆叠上下文，所以我们先了解堆叠上下文的特性，知道什么样的特性会触发堆叠上下文
以下是 MDN 给出的触发堆叠上下文的元素特性：

- 根元素 (HTML),
- z-index 值不为 "auto"的   绝对/相对定位，
- 一个 z-index 值不为 "auto"的  flex 项目 (flex item)，即：父元素 display: flex|inline-flex，
- [`opacity`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/opacity "opacity属性指定了一个元素的透明度。换言之，opacity属性指定了一个元素后面的背景的被覆盖程度。")  属性值小于 1 的元素（参考  [the specification for opacity](http://www.w3.org/TR/css3-color/#transparency "http://www.w3.org/TR/css3-color/#transparency")），
- [`transform`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)  属性值不为 "none"的元素，
- [`mix-blend-mode`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode "此页面仍未被本地化, 期待您的翻译!")  属性值不为 "normal"的元素，
- [`filter`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter "CSS滤镜（filter）属提供的图形特效，像模糊，锐化或元素变色。过滤器通常被用于调整图片，背景和边界的渲染。")值不为“none”的元素，
- [`perspective`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective "perspective 属性指定了观察者与z=0平面的距离，使具有三维位置变换的元素产生透视效果。z>0的三维元素比正常大，而z<0时则比正常小，大小程度由该属性的值决定。")值不为“none”的元素，
- [`isolation`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/isolation "isolation CSS属性定义该元素是否必须创建一个新的stacking context。")  属性被设置为 "isolate"的元素，
- `position: fixed`
- 在  [`will-change`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change "CSS 属性 will-change 为web开发者提供了一种告知浏览器该元素会有哪些变化的方法，这样浏览器可以在元素属性真正发生变化之前提前做好对应的优化准备工作。")  中指定了任意 CSS  属性，即便你没有直接指定这些属性的值（参考  [这篇文章](http://dev.opera.com/articles/css-will-change-property/)）
- [`-webkit-overflow-scrolling`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/-webkit-overflow-scrolling "-webkit-overflow-scrolling 属性控制元素在移动设备上是否使用滚动回弹效果.")  属性被设置 "touch"的元素

那么，堆叠上下文到底有什么用呢？
在这里我们先思考一个问题，一个元素 X 设置了 z-index:999；这个元素 X 一定是离用户最近的元素吗？

答案当然不是。从定义中我们可以看到堆叠上下文可以对元素的 z-index 产生影响。当某个元素触发了堆叠上下文，就相当于形成了一个小部门，假如这个堆叠上下文的 层级 比元素 X 的堆叠上下文的 层级 要高,这时候在小部门里的元素层级都要比元素 X 要高，因为这个部门本身就比 X 所处的部门高级。
不同堆叠上下文中，z-index 的大小不会影响到元素的堆叠顺序，此时的堆叠顺序与堆叠上下文所属元素的堆叠顺序有关

以上是对堆叠上下文的一个简单理解，如有错误，欢迎指出。
