---
title: "Js实现动画循环"
---

# requestAnimationFrame()了解一下

#### 早期的动画循环

js 中实现动画循环的典型就是使用 setInterval，比如

```
(function (){
    function animations(){
        animation1();
        animation2();
        ...
    }
    setInterval(animations,1000)
})();
```

这种做法需要合理的设置 动画延长执行时间。并且这个时间也并不准确，这个执行时间代表的是何时把这个任务加入 ui 渲染的队列中，不代表时间到了可以准时执行。

#### mozRequestAnimationFrame()

css 动画的优势在于浏览器知道动画什么时候开始，可以设置合理的时间间隔，在恰当的时机刷新 UI。因此这个 api 的出现就是为了告诉浏览器在一个合适的时机执行动画。最早提出这个 API 的是 Mozilla，mozRequestAnimationFrame()方法接收一个参数，在浏览器下一次重绘之前执行。

```
fucntion updateAnimation(){
    var div = document.getElementById('div');
    div.style.width = (parseInt(div.style.width,10) + 5) + '%'
    if(div.style.left != '100%'){
        mozRequestAnimationFrame(updateAnimation)
    }
    mozRequestAnimationFrame(updateAnimation)
}
```

这个 API 只运行一次回调函数，如果在下次重绘之前还行刷新，需要手动执行一次。
这个回调函数还需要接收一个参数，是一个时间码，表示下一次重绘的实际发生时间，以毫秒表示。

#### webkitRequestAnimationFrame() 与 msRequestAnimationFrame()

这两个 api 分别是 chrome 和 IE10+提出的。与 mozRequestAnimationFrame 不同的是 这个 API 的回调函数不需要传递时间码，但是可以传递具体的 dom 对象，限定重绘的 dom 区域。

#### W3C 的 RequestAnimationFrame()

引用[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame) 上的描述：

“window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行”

callback 函数：下一次重绘之前更新动画帧所调用的函数(即上面所说的回调函数)。该回调函数会被传入 DOMHighResTimeStamp 参数，该参数与 performance.now()的返回值相同，它表示 requestAnimationFrame() 开始去执行回调函数的时刻。

返回值：一个 long 整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义。你可以传这个值给 window.cancelAnimationFrame() 以取消回调函数。

与 setTimeout 相比，requestAnimationFrame 最大的优势是由系统来决定回调函数的执行时机。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。
