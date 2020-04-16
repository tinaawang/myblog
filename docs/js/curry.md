---
title: "函数柯里化"
---

# 函数柯里化

## 概念

在计算机科学中，柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。这个技术是由逻辑学家 Haskell Curry 命名的。

举个例子：

```
function fun (a,b,c){
    return a + b + c
}

var _fun =  curry(fun)

// 这几种函数调用方式的输出结果是一样
_fun(a,b,c)
_fun(a,b)(c)
_fun(a)(b)(c)
fun(a,b,c)

```

curry 函数在上面那段代码中的作用就是只接收一个参数 返回接收其余参数的函数 依次递归调用

## 封装一个简单的 curry 函数

```
//简单版本
function createCurry(func) {
   var args = [].slice.call(arguments, 1);
    return function() {
        var newArgs = args.concat([].slice.call(arguments));
        return func.apply(this, newArgs);
    };
}

function add(a,b){
    return a+ b
}
var _add = createCurry(add)
var _bdd = createCurry(add,3)
_add(1,2) // output: 3
_add(1)(2) // output: 3
_bdd(1) // output: 4
```
