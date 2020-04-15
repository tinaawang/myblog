---
title: "深拷贝与浅拷贝"
---

# JS 中的深拷贝与浅拷贝了解一下

在使用 Vue 做项目的时候，通常会有许多组件间传递对象的情况。如果只是简单的赋值的话（浅拷贝），是很危险的，因为你不知道什么情况下这个值就被修改了，还一脸蒙蔽，所以我们需要进行深拷贝。深拷贝和浅拷贝的概念，需要一点数据结构的知识去了解。

```
声明一个object1对象
var object1 = {
  a:'a',
  b:'b'
}
```

这时候我们来画个内存图：声明一个对象后在内存内某个地址上存入对象 object 的内容，这个地址指向 object1

![image.png](https://user-gold-cdn.xitu.io/2018/5/28/163a4e1862fa46f5?w=1240&h=727&f=png&s=39559)
然后把 对象 1 赋给对象 2 var object2 = object1
这时候的内存 我们来看一下
![image.png](https://user-gold-cdn.xitu.io/2018/5/28/163a4e1866e9a3bf?w=1240&h=699&f=png&s=64982)
内存内同一个地址指向了两个变量，其中一个变量内容的改变都会影响这个地址内存储内容的改变，这就是浅拷贝。
我们在组件间传递对象的时候，当然不能进行这么危险的操作，应该将内存拷贝出去，使得另一个地址指向 object2,这样的拷贝就叫做深拷贝。深拷贝之后两个变量拥有相同的内容，但是内存地址不一样，互不影响。
那应该怎么进行深拷贝呢？？

### 1、简单粗暴的对象深拷贝

```
var object2 = JSON.parse( JSON.stringify(object1) )
```

简单粗暴法没有办法深拷贝函数，如果需要得自己封装一个方法，去递归的深拷贝对象属性。方法大家可以参考这篇文章 [深入剖析 JavaScript 的深复制](http://jerryzou.com/posts/dive-into-deep-clone-in-javascript/)

### 2.在这里值得一提的是以下这种方式，这种方式看起来像是深拷贝，其实是浅拷贝

```
function test() {
  'use strict';

  let obj1 = { a: 0 , b: { c: 0}};
  let obj2 = Object.assign({}, obj1);
  console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}

  obj1.a = 1;
  console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
  console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}

  obj2.a = 2;
  console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
  console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 0}}

  obj2.b.c = 3;
  console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 3}}
  console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 3}}
```

[Object.assign()]([https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)方法将一个的对象上的属性枚举复制给另一个对象，但是当 object2 的值改变时也会改变 object1。感兴趣的同学可以去看看 object.assign()接口的源码，你会发现 object.assign()只是深拷贝了源对象的顶层属性，并没有递归的去进行深拷贝，当源对象的属性值是一个指向对象的引用，它也只拷贝那个引用值。

### 3、 ES8 中提供的新方法

ES8 中提供了一个新方法： [Object.getOwnPropertyDescriptors](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors)。MDN 描述：该方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）。应用如下：

```
let a = {name:'lili',age:9,birth:'1995-10-13',sex:'gril'}

console.info(Object.getOwnPropertyDescriptors(a))

/* {name: {…}, age: {…}, birth: {…}, sex: {…}}
age
:
{value: 9, writable: true, enumerable: true, configurable: true}
birth
:
{value: "1995-10-13", writable: true, enumerable: true, configurable: true}
name
:
{value: "lili", writable: true, enumerable: true, configurable: true}
sex
:
{value: "gril", writable: true, enumerable: true, configurable: true}*/
```

结合[Object.defineProperties()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)方法，该方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象,可以实现对象的深拷贝,结合上一个例子：

```
let obj1 = { a: 0 , b: { c: 0}};
console.info(Object.getOwnPropertyDescriptors(obj1))
/*  {a:0,b:{c:0}}*/
obj1.b.c = 233;
obj1.a = 22;
console.info(Object.getOwnPropertyDescriptors(obj1))
/*  {a:22,b:{c:233}}*/
let obj2 = {}
Object.defineProperties(obj2,Object.getOwnPropertyDescriptors(obj1))
console.info( obj2 )
/*  {a:22,b:{c:233}}*/
```

#### 递归拷贝函数

```
拷贝函数

function deepCopy(obj){
    if(typeof obj !== 'object')return;
    var newObj = obj instanceof Array ? [] : {};
    for(var i in obj){
         newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
    return newObj
}
```
