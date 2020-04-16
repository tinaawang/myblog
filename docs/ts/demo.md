---
title: "TypeScript与Vue初体验"
---

# TypeScript 与 Vue 初体验

把之前的项目框架改改，加入 typescript 的使用。

功能： 登录，权限菜单， 请求封装， layout 配置

明人不说暗话，先上[git 地址](https://github.com/tinaawang/vue-typescript-admin)

更多[优秀资源参考](https://github.com/Armour/vue-typescript-admin-template)

## 配置

可以参考我之前的一篇文章[两行命令! 搞定 vue+typescript 配置](https://juejin.im/post/5dbcfbfa6fb9a0203277ac04)

执行 `vue add @vue/typescript`完成下面的提示配置

```
* Use class-style component syntax：  y

* Use Babel alongside TypeScript (required for modern mode, auto-detected polyfi
lls, transpiling JSX)? ：y

* Convert all .js files to .ts? Yes

* Allow .js files to be compiled? Yes
```

#### warning 建议使用 3.6 以下的版本

```
SUPPORTED TYPESCRIPT VERSIONS: >=3.2.1 <3.6.0

YOUR TYPESCRIPT VERSION: 3.7.5
```

## 变化

#### 1.tslint

可以看到所有的.js 文件都变成了.ts 文件，有语法提示错误，逐个进行修改，一般是没有进行类型定义

#### script 部分

需要加上 lang="ts"就可以用 ts 进行编写，可以看到引入了 vue-property-decorator"装饰器

这里写几个示例

```
import { Vue, Component,Prop,Watch} from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue" // 要指定.vue后缀的文件

@Component({
    HelloWorld
})
export default class Login extends Vue {
    @Prop(Number) readonly propA: number | undefined
    count:string = "1",
    array:any[] = []

    login(){}

    get list(){
        return this.array;
    }

    @Watch('child')
       onChildChanged(val: string, oldVal: string) {}

    mounted(){
        this.login();
    }
}
```

等同于

```
import HelloWorld from "@/components/HelloWorld"
expoer default {
    components:{
        HelloWorld
    },
    props: {
    propA: {
      type: Number
    },
  },
    data(){
        return{
          count:'1',
          array:[]
        }
    },
    computed: {
    list(){
        return this.array
    },
    watch: {
        child: [
      {
        handler: 'onChildChanged',
        immediate: false,
        deep: false
      }
    ],}
    methods:{
        login(){},
        onChildChanged(val, oldVal) {},
    },
    mounted(){
        this.login()
    }
}
```

具体用法参考[官方文档](https://github.com/kaorun343/vue-property-decorator)

#### vuex

可以看到引入了"vuex-module-decorators"装饰器，[官方文档](https://championswimmer.in/vuex-module-decorators/pages/installation.html)

install

```
npm install -D vuex-module-decorators
```

vuex 新用法

```
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module
export default class Counter2 extends VuexModule {
  count = 0

  @Mutation
  increment(delta: number) {
    this.count += delta
  }
  @Mutation
  decrement(delta: number) {
    this.count -= delta
  }

  // action 'incr' commits mutation 'increment' when done with return value as payload
  @Action({ commit: 'increment' })
  incr() {
    return 5
  }
  // action 'decr' commits mutation 'decrement' when done with return value as payload
  @Action({ commit: 'decrement' })
  decr() {
    return 5
  }
}
```

注意 ⚠️

```

action调用mutation的两种用法

this.context.commit('mutationname', payload)

 Dynamic Module
@Module({ dynamic: true, store: store, name: 'mm' })
this.mutationname();
```

## 踩坑

这里强调一下配置时遇到的一些问题

#### 旧项目 npm 包安装之后仍然报错

解决方法：安装 typescript 版本的包，`yarn add @types/your packagename`

#### vue 版本和 typescript 版本不兼容报错

vue2.5.0 之后的版本对 typescript 的使用更好，建议使用 vue2.5.0 之后的版本

此项目版本 @vue/cli 4.2.2
