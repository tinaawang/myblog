---
title: "Vue Object的变化侦测"
---

# Vue Object 的变化侦测

## 数据观察

Vue 中的对象变化侦测是通过`Object.definePorperty`实现的，但是`Object.definePorperty`的方式有缺陷，比如不能直接代理整个对象，每次都要循环遍历对象的所有属性；尤大大说之后会使用 ES6 中的`Proxy` 重写这个部分。这篇博客介绍的是 Object.definePorperty 实现的对象侦测。

我们来看下面这段代码，定义一个 defineReactive 函数，使用 Object.definePorperty 遍历对象对象属性的时候，设置 get 和 set；当对象属性被读取的时候触发 get，对象属性被设置的时候触发 set。这样就完成了对 data 的数据劫持，因为 Vue 的思想是响应式的，我们还需要收集这些变化。

```
function defineReactive(data,key,val){
    Object.definePorperty(data,key,{
        enumerable: true,
        configurable: true,
        get:function(){
            return val;
        }
        set :function (newVal){
            if(val === newVal){return}
            val = newVal;
        }
    })
}
```

## 依赖 收集

创建一个 Dep 类，在 get 中收集依赖，在 set 中新增依赖

```
class Dep{
    constructor(){
        this.arr = []
    }
    addSub(sub){
        this.arr.push(sub)
    }
     removeSub(sub){
        remove(this.arr,sub)
    }
    depend(){
        if(window.target){
            this.addSub(window.target)
        }
    }
    notify(){
        const arrs  = this.arr.slice();
        for(let i = 0; i< arrs.lenth ;i ++){
            arrs[i].update();
        }
    }

}

function defineReactive(data,key,val){

    let dep = new Dep()
    Object.definePorperty(data,key,{
        enumerable: true,
        configurable: true,
        get:function(){
            dep.depend(); // 收集依赖
            return val;
        }
        set :function (newVal){
            if(val === newVal){return}
            val = newVal;
            dep.notify(); // 新增依赖
        }
    })
}


```

## Observer 和 Watcher

我们发现 defineReactive 函数只能将某一个属性转换为 get/set 的形式，所以我们需要一个观察者 Observer 用来帮助递归的侦测所有的 key

```
class Observer{
    constructor(value){
        this.value = value
    }
    if(!Array.isArry(value)){
        this.walk(value)
    }
    walk(obj){
        const keys = Object.keys(obj)
        for(let i = 0; i < keys.length ;i++){
            defineReactive(data,keys[i],obj[keys[i])
        }
    }
}

```

当这些依赖收集完成之后，我们要通知谁呢？怎么样能让视图知道有变化更新？我们需要实现一个订阅者 Watcher,
每次触发 get 的时候都将 dep 指向自己，这样就可以收集到依赖；
每次 set 的时候都循环调用 Watcher 的 update 方法。

```
class Watcher{
    constructor(vm,exp,cb){
        this.vm = vm;
        this.cb = cb;
        this.exp = exp;
        this.value = this.get();
    }
    get(){
        Dep.target = this;    // 将当前订阅者指向自己
        var value = this.vm[exp];    // 触发getter，添加自己到属性订阅器中
        Dep.target = null;    // 添加完毕，重置
        return value;
    }
    update(){
        const oldVal = this.value;
        this.value = this.get();
        this.cb.call(this.vm,this.value,oldVal)
    }
}
```

当 Vue 实例挂载好之后，模板都会绑定一个 Watcher，谁的属性发生变化了就会通知响应的 Watcher,Watcher 再去通知编译器 Compile 进行视图更新

## 侦测没办法监听到对象上属性的新增和删除

Vue 通过`Object.definePorperty`将对象的 key 转化为 getter setter 的形式来进行侦测，但是无法追踪到属性的新增和删除，所以 Vue 中提供了 vm.$set 和 vm.$get 来实现。
