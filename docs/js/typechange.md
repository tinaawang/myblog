---
title: "类型转换"
---

# JavaScript 中的类型转换

JavaScript 中的类型转换分为两种 显式类型转换 和 隐式类型转换

## 显式类型转换

JavaScript 的类型转换包括 转为 boolean 转为 string 转为 number 三种。

手动的调用 API 转换数据类型，比如：

### 转化布尔值

JavaScript 中，只有 6 种情况可以被转换成 false，其他都会被转换成 true

```
console.log(Boolean(0)) // output: false
console.log(Boolean(-0)) // output: false
console.log(Boolean(undefined)) // output: false
console.log(Boolean(null)) // output: false
console.log(Boolean('')) // output: false
console.log(Boolean(NaN)) // output: false
```

### 转化为字符串

```
// number转化为字符串
console.log(String(123))

```

### 转化为数字

**_boolean 型_**

```
如果是 true，返回 1。参数为 false，返回 +0

console.log(Number(false)) // output: 0

console.log(Number(true)) // output: 0

```

**_null undefiend_**

```

console.log(Number(null)) // output: 0

console.log(Number(undefined)) // output: NaN

```

**_String_**
字符串转化为数字，调用 ToNumer()方法，

```
console.log(Number('')) // output: 0

console.log(Number(' ')) // output: 0

console.log(Number('123.4')) // output: 123.4

console.log(Number('123')) // output: 123

console.log(Number('000123')) // output: 123

console.log(Number('-123')) // output: -123

console.log(Number('chart')) //output: NaN
```

### 转化为字符串

**_boolean 型_**

```
console.log(String(false))  //output: 'false'

console.log(String(true)) //output: 'true'
```

**_null undefiend_**

```

console.log(String(null)) // output: 'null'

console.log(String(undefined)) // output: 'undefined'

```

**_number_**

```
console.log(String(0)) // output: '0'

console.log(String(-0)) // output: '0'

console.log(String(12)) // output: '12'

console.log(String(NaN)) // output: 'NaN'

console.log(String(123.4)) // output: '123.4'

console.log(String(00011))  // output: '9'  00011八进制转换为十进制为9 再输出字符串'9'
```

### 对象转化为数字和字符串

对象转基础类型时优先调用 ToPrimitive()方法，这个方法传入值 一定会返回一个基础数据类型。

然后再根据基础数据类型的转化规则进行转化

参考规范中 ToPrimitive 的定义：

“返回对象的默认值。通过调用对象的[DefaultValue]]内部方法检索对象的默认值，并传递可选的提示 PreferredType。[[DefaultValue]]内部方法的行为由本规范为 8.12.8 中的所有本机 ECMAScript 对象定义。”

**_对象转数字_**

```
console.log(Number([])) // output: 0

console.log(Number({})) // output: NaN

console.log(Number([1]))  // output: 1

console.log(Number({name:'xxx'})) // output: NaN
```

**_对象转字符串_**

```
console.log(String([])) // output: ''

console.log(String({})) // output: '[object Object]'

console.log(String([1]))  // output: '1'

console.log(String({name:'xxx'})) // output: '[object Object]'
```

## 隐式类型转换

JavaScript 是一门弱类型语言，允许数据类型的自动转换,不会直接报错。常见的隐式类型转换的场景：

### +算术运算符

```
console.log(1+ []) // output: 1

console.log(1+ true)  // output: 2
```

### + 字符串连接符

当表达式两边是字符串和数字时 + 是字符串连接符

```
console.log('1' + 2) // output: '12'

console.log(1+ [1])  // output: '11'

console.log(1 + {})  // output: '1[object Object]'
```

### == 关系运算符

== 是不严格的等值比较，只要关系式两边的值相等即可返回 true ，类型不同时会先进行类型转换再比较值

```
console.log([] == ![]) // output :true
解析: [].toNumber 会返回 0; ![]先转化为布尔值为false 再调用 toNumber 方法返回 0
```

```
console.log('1' == 1) // output :true
解析： 如果表达式两边一边是字符串 一边是数字 转化为 数字再进行比较
```

```
console.log(null == undefined) // output :true

解析： 如果类型（x）与类型（y）相同，则：如果类型（x）未 null，则返回 true。如果类型（x）为 undfiend，则返回 true。

```

其他场景参考 [规范](http://es5.github.io/#x11.9.3) 中的译文：

“
比较 x==y，其中 x 和 y 是值，产生 true 或 false。这样的比较执行如下：

如果类型（x）与类型（y）相同，则

如果类型（x）未 null，则返回 true。

如果类型（x）为 undfiend，则返回 true。

如果类型（x）是数字，则

如果 x 是 NaN，则返回 false。

如果 y 为 NaN，则返回 false。

如果 x 与 y 的数值相同，则返回 true。

如果 x 为+0，y 为-0，则返回 true。

如果 x 为-0，y 为+0，则返回 true。

返回 false。

如果类型（x）是字符串，则如果 x 和 y 是完全相同的字符序列（相同的长度和相应位置的相同字符），则返回 true。否则，返回 false。

如果类型（x）是布尔值，则如果 x 和 y 都为 true 或都为 false，则返回 true。否则，返回 false。

如果 x 和 y 引用同一个对象，则返回 true。否则，返回 false。

如果 x 为空且 y 未定义，则返回 true。

如果 x 未定义，y 为空，则返回 true。

如果类型（x）是数字，类型（y）是字符串，

返回比较结果 x==ToNumber（y）。

如果类型（x）是字符串，类型（y）是数字，

返回比较结果 ToNumber（x）==y。

如果类型（x）是布尔值，则返回比较结果 ToNumber（x）==y。

如果 Type（y）是布尔值，则返回比较结果 x==ToNumber（y）。

如果类型（x）是字符串或数字，类型（y）是对象，

返回比较结果 x==ToPrimitive（y）。

如果类型（x）是对象，类型（y）是字符串或数字，

返回比较结果 ToPrimitive（x）==y。

返回 false。
”
