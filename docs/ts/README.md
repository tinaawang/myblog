---
title: "TypeScript基础"
---

# TypeScript 基础

TypeScript 是 JavaScript 的超集, 支持 JavaScript 的写法，并且提供类型检查，TypeScript 提供了一些面向对象编程的能力。

## 数据类型

JavaScript 目前的基础数据类型有 `Number， String ，Boolean， Null ，Undfiend ，Symbol ，BigInt`,引用数据类型 `Array Object Function、Date等`
TypeScript 在 JavaScript 的基础上添加了 `Never Any Enum Tuple Void`这些基础数据类型

**Never**
表示永远不存在值的类型，没有值可以赋值给 Never 类型

**Any**
表示可以成为任何类型，比如设定一个变量 没想好它是什么类型的，但是又要通过类型检查，可以设定为 Any

**Void**
表示没有任何类型,比如一些函数没有返回值，可以把这个函数设置为 void 型

**Enum 枚举**
枚举是为一组数据赋予了名字，便于读取这组数据中的元素，例如

```
enum Color {Red = 1, Green = 2, Blue = 4}
let c:Color = Color.Red;
console.log(c) // outut: 1
```

**Tuple 元组**
当你想表示一个已知元素数量和类型的数组，各元素的类型不相同，可以使用元组，例如

```
let  arr:[string, number]
arr = ['a',1]
```

### 类型断言

类型断言就是书写本身去确定数据类型，不经过类型检查

有两种写法

```
// 尖括号
let str:any = 'xxx'
let strlength = (<string>str).length

```

```
// as
let str:any = 'xxx'
let strlength = (<str as string).length
```

## 接口

TypeScript 的核心思想是提供类型检查，接口 interface 就类似于一个契约，我们提前约定一个类型限制

### 对属性的约束

```
interface Value {
  label: string;
}
function check(obj:Value){
    consle.log(obj.label)
}
let a  = {age:17,label:'xxx'}

check(a) // output : 'xxx'

```

### 对函数的约束

对函数的约束可以变量不同，但是类型要一致

```
interface Func{
name:string;
num:number;
}
function getdata:Func(name:string,value:number){
    console.log(value, name)
}
getdata({name:'xxx',vakue:16})
```

### 可索引的接口

```
// 定义一个数组

interface Arr{
    [index:number]:number
}
let array:Arr = [1,2,3,4]
console.log(array[0]) // output:1

let brr:Arr = ['xxx','yyy'] // error!
```

### 可选属性预定义

对一些可能存在存在的属性进行提前定义

```
interface data{
    name ?:string;
    age ?:number;
}

function check(obj:data):{name:number,sex:number}{
let newvalue = {name:'xxx',sex:'fexmal'}
return newSquare
}

check({name:'yyy'})

```

### readonly / const

const 用于声明一个常量，readonly 用于定义接口中的只读属性

```
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
p1.x = 5 // error!
```

## 泛型

泛型可以帮助我们复用组件，不限制传入的数据类型

假设我们使用 any 来定义函数，也可以不限制输入的数据类型,但是这种做法就没有办法控制函数的返回类型，可以输出任意的类型

```
function func(arg: any):any{
   return arg;
}
```

但是我们假设设置一个 T 变量帮我们捕获数据类型，限制函数返回的也是这个类型，这种类型的函数被称为泛型

```
function identity<T>(arg: T): T {
    return arg;
}
```

### 泛型类

```
class Min<T>{
    public arr:T[]=[];
    add(value:T){
        this.arr.push(value);
    }
}
var m1=new MinClassT<number>();
m1.add(123)
```

### 泛型函数

```
  function getData<T>(value:T):T{
        return value;
    }
     getData<number>(123);

     getData<string>('1214231');
```

### 泛型接口

```
interface ConfigFn{
     <T>(value:T):T;
}

var getData:ConfigFn=function<T>(value:T):T{
    return value;
}
    getData<string>('张三');
    getData<string>(1243);  //error!
```

## 函数

## 类型推论

类型推论也和类型检查有关，当我们没有特意指明类型时，TypeScript 会自动进行类型推论来确定类型

### 通用

```
let x = 3 // success ，这里x被推论出是number型的
```

### 上下文类型

有的时候 TypeScript 会根据所处的上下文进行推论
比如我们通常的写法：

```
window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.button);  // Error！
};
```

上面这种写法没有指明 mouseEvent 的类型，TypeScript 会根据 window.onmousedown 来推论，但是把 mouseEvent 设置为 any 类型就可以通过类型检查了
