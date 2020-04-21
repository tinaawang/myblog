---
title: "手写call apply bind"
---

# 手写 call apply

## funcion.call()

call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

```
Function.prototype.mycall = function(context){
    var context = context || window
    context.fn = this;
    var args = []
    for(let i  =1; i < arguments.length ;i++){
        args.push('arguments[' + i + ']')
    }
    var res = eval('context.fn(' + args +')');
    delete context.fn ;
    return res

}
```

## function.apply()

apply() 方法调用一个具有给定 this 值的函数，以及作为一个数组（或类似数组对象）提供的参数

```
Function.prototype.myapply = function(context,arr){
    var context = context || window
    context.fn = this;
    if(!arr){result = context.fn();}

    var args = []
    for(let i = 1;i< arr.length;i++){
        args.push('arr[' + i + ']')
    }
    var res = eval('context.fn('+ args + ')')
    delete context.fn;
    return res;

}
```

## function.bind()

bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```
Function.prototype.bind2 = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```
