## vue：vue 声明周期和生命周期函数



beforeCreated

created

beforeMounted

mounted

beforeUpdate

updated

beforeDestory

destoryed



一共11个，去官网查看



## vue：vue 的两个核心是什么，你是怎么理解他们的



1. 双向数据绑定（数据驱动、响应式）

   数据劫持+发布订阅

2. 组件化

   代码的复用和后期维护方便





## vue：vue中，如何让 css 只在当前组件起作用？



style 标签中加入 scope

scope 的底层原理是什么？

自定义属性

使用第三方组件的时候，如果做穿透

/deep/ 选择器

::v-deep

```
>>>
```







## vue：mvc 和 mvvm 的理解



它们两个都是一种分层开发的思想

mvc最先是后端的一种分层编程思想，代码分为

M：Model 的简写，模型，负责和数据（库）打交道

V：View 的简写，视图，负责数据的收集和展示

C：controller 的简写，控制器，负责业务逻辑的处理，由控制器决定是否需要模型和视图的载入（如果业务需要模型参与，则可以实例化一个 model，如果需要视图参与则进行视图的载入即可）



MVVM 是借鉴后端的 MVC 形成的一种分层开发的编程思想

M：Model 的简写，也叫模型，负责数据的处理，前端的表现形式就是一个 js 字面量对象

 new Vue({el, data})

V：View 的简写，翻译过来叫做 视图，负责数据的展示和收集，前端的表现形式就是 vue 管理的区域，可以使用 vuejs 的语法，例如插值表达式，还有指令 v-for v-text v-html ...

VM：viewMOdel的简写，翻译过来叫做视图模型，负责业务逻辑的实现，表现形式就是我们的 new Vue() 的实例对象，该实例读写充当一个桥梁的角色，通过桥梁连接视图和模型，当模型数据变化后，可以通过桥梁的（数据劫持+发布订阅）实现视图的更新，当视图发生变化（v-model或事件），可以直接通过桥梁响应到模型里面。

vuejs通过mvvm的思想，实现了双向数据绑定，可以做到响应式，底层使用的就是 数据劫持+发布订阅 ，底层使用的 api 就是基于 es5 的 Object.defineProperty 去对模型里面的数据做劫持，然后使用发布订阅模型去更新视图。





## vue：vue 的简单实现









## vue：vue-router 有哪几种导航守卫（导航钩子）



路由前置守卫

Router.beforeEach((to, from, next) => {})

to 代表将要前往的路由的信息

from 代表从哪里来的路由信息

next 是一个放行函数，如果执行之后可以到达 to ，否则可以给 next('/login ')



路由的后置守卫

Router.afterEach((to, from) => {})







## vue：怎么定义 vue-router 的动态路由？怎么获取传过来的动态参数？



1. 动态路由传参

```js
{
  path: '/login/:id',
  name: 'login',
  component: login
}
```

this.$route.params.id 获取



2. query传参

```js
{
  path: '/detail',
  name: 'detail',
  component: detail
}
```

// 编程式导航，做页面跳转

this.$route.push({

​	path: '/detail',

​	query: { id: 12 }

})

this.$route.query.id 获取



## vue：vue使用 keep-alive 缓存的组件使用哪个钩子函数刷新组件



在做组件切换的时候，组件是新增或者销毁，如果有的时候，我们切换组件时不希望组件销毁，而是希望组件的状态要保持，则我们可以在该组件外面套一个 keep-alive 组件，那这个组件就不会被销毁，那么其他的生命周期函数就会失效，那么这个时候要使用如下的生命周期函数

activated

deactivated





## vue：v-show 和 v-if 的区别



V-show 控制 css 的 display 属性，适用于频繁显示隐藏的场景

v-if 控制 dom 元素的新增或移除，适用于不经常显示隐藏的场景



## vue：vue 里面引用文件的方式有哪些



考察的是 ES6 里面的模块化

```js
import 'npm 包'

import xx from './xx.js'

// 按需导入
import { xxx } from './xxxx.js'
```



## vue：v-for 中 key 的理解



考点：虚拟dom

key 是虚拟 dom 的唯一标识

首次：使用 v-for 做循环遍历的时候，根据数据生成一份 虚拟dom，然后在 虚拟DOM 转换为 真实DOM 更新到页面

当数据发生改变则会生成新的 虚拟DOM

后面会拿新生成的虚拟DOM和首次的虚拟DOM做比较，底层使用的Diff算法

新的虚拟DOM的key值和首次的虚拟key值做比较

key值一致：继续比较内容，如果内容没有变化，则直接复用之前的真实DOM。如果内容变化了，则生成新的虚拟DOM，替换之前老的 DOM 节点

key值不一致：直接生成新的虚拟DOM，转换为真实的DOM



为什么使用虚拟DOM

主要就是为了实现dom 的复用，我们在开发的时候，dom创建是非常消耗性能的。传统的操作，当数据变化后，都是重新生成dom结构，然后再append到dom树进行重新的渲染。

虚拟dom的出现使得dom结构最大程度实现复用，减少dom的创建和渲染，提升性能。



## vue：vue的组件通信



父>子：属性传递

子>父：自定义事件



兄弟：eventBus



最终的解决方案：vuex









## vue：谈谈对vuex的理解





vuex是一种集中化处理数据的方案

vuex和vuejs搭配来解决组件之间的通信问题

使用分为

* 同步：mutations
* 异步：actions







## vue优点



- 轻量级
- 速度快
- 简单易学
- 低耦合
- 可重用性
- 独立开发
- 文档齐全，且文档为中文文档



## vue父组件向子组件传递数据



* props

## 子组件向父组件传递事件



* $emit



## v-show和v-if指令的共同点和不同点



- 相同点:都可以控制dom元素的显示和隐藏
- 不同点:v-show只是改变display属性，dom元素并未消失，切换时不需要重新渲染页面
- v-if直接将dom元素从页面删除，再次切换需要重新渲染页面



## 如何让CSS只在当前组件中起作用



* scoped



##  keep-alive的作用是什么



* 主要是用于需要频繁切换的组件时进行缓存，不需要重新渲染页面



## 如何获取dom



* 给dom元素加ref=‘refname’,然后通过this.$refs.refname进行获取dom元素



## 说出几种vue当中的指令和它的用法



- v-model
- v-on
- v-html
- v-text
- v-once
- v-if
- v-show



## vue-loader是什么？它的用途是什么？



- vue文件的一个加载器，将template/js/style转换为js模块
- 用途:js可以写es6、style样式



## 为什么用key



* 给每个dom元素加上key作为唯一标识 ，diff算法可以正确的识别这个节点，使页面渲染更加迅速。



## 分别简述computed和watch的使用场景



- 用官网的一句话来说，所有需要用到计算的都应该使用计算属性。多条数据影响一条数据时使用计算属性，使用场景购物车。
- 如果是一条数据更改，影响多条数据时，使用watch，使用场景搜索框。



## v-on可以监听多个方法吗？



* 可以 比如 v-on=“onclick,onbure”



## $nextTick的使用



* 在data()中的修改后，页面中无法获取data修改后的数据，使用$nextTick时，当data中的数据修改后，可以实时的渲染页面



## vue组件中data为什么必须是一个函数？



* 因为javaScript的特性所导致，在component中，data必须以函数的形式存在，不可以是对象。
* 组件中的data写成一个函数，数据以函数返回值的形式定义，这样每次复用组件的时候，都会返回一份新的data，相当于每个组件实例都有自己私有的数据空间，他们值负责各自维护数据，不会造成混乱。而单纯的写成对象形式，就是所有组件实例共用了一个data，这样改一个全部都会修改。



## vue在双向数据绑定是如何实现的？



- vue双向数据绑定是通过数据劫持、组合、发布订阅模式的方式来实现的，也就是说数据和视图同步，数据发生变化，视图跟着变化，视图变化，数据也随之发生改变
- 核心：关于vue双向数据绑定，其核心是Object.defineProperty()方法



## 单页面应用和多页面应用区别及缺点



- 单页面应用（SPA），通俗的说就是指只有一个主页面的应用，浏览器一开始就加载所有的js、html、css。所有的页面内容都包含在这个主页面中。但在写的时候，还是分开写，然后再加护的时候有路由程序动态载入，单页面的页面跳转，仅刷新局部资源。多用于pc端。
- 多页面（MPA），就是一个应用中有多个页面，页面跳转时是整页刷新
- 单页面的优点：用户体验好，快，内容的改变不需要重新加载整个页面，基于这一点spa对服务器压力较小；前后端分离，页面效果会比较酷炫
- 单页面缺点：不利于seo；导航不可用，如果一定要导航需要自行实现前进、后退。初次加载时耗时多；页面复杂度提高很多。



## Vue 项目中为什么要在列表组件中写 key，其作用是什么？



- key是给每一个vnode的唯一id,可以依靠key,更准确, 更快的拿到oldVnode中对应的vnode节点。
- 更准确：因为带key就不是就地复用了，在sameNode函数 a.key === b.key对比中可以避免就地复用的情况。所以会更加准确。
- 更快：利用key的唯一性生成map对象来获取对应节点，比遍历方式更快。





## 父组件和子组件生命周期钩子执行顺序是什么？



- 加载渲染过程：父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted
- 子组件更新过程：父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
- 父组件更新过程：父 beforeUpdate -> 父 updated
- 销毁过程：父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed



## 谈一谈你对 nextTick 的理解？



* 当你修改了data的值然后马上获取这个dom元素的值，是不能获取到更新后的值，你需要使用$nextTick这个回调，让修改后的data值渲染更新到dom元素之后在获取，才能成功。



## SPA首屏加载慢如何解决



安装动态懒加载所需插件；使用CDN资源。





## 第一次页面加载会触发哪几个钩子？



beforeCreate， created， beforeMount， mounted



## created和mounted的区别



- created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
- mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。



## vue生命周期的理解



- 总共分为8个阶段创建前/后，载入前/后，更新前/后，销毁前/后。
- 创建前/后： 在beforeCreated阶段，vue实例的挂载元素$el和数据对象data都为undefined，还未初始化。在created阶段，vue实例的数据对象data有了，$el还没有。
- 载入前/后：在beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。在mounted阶段，vue实例挂载完成，data.message成功渲染。
- 更新前/后：当data变化时，会触发beforeUpdate和updated方法。
- 销毁前/后：在执行destroy方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在。



## vuex有哪几种属性？



- 有五种，State、 Getter、Mutation 、Action、 Module
- state： 基本数据(数据源存放地)
- getters： 从基本数据派生出来的数据
- mutations ： 提交更改数据的方法，同步！
- actions ： 像一个装饰器，包裹mutations，使之可以异步。
- modules ： 模块化Vuex



## vue 常用的修饰符?



**事件修饰符**

- .stop 阻止事件继续传播
- .prevent 阻止标签默认行为
- .capture 使用事件捕获模式，即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理
- .self 只当在 event.target 是当前元素自身时触发处理函数
- .once 事件只会触发一次
- .passive 告诉浏览器你不想阻止事件的默认行为

**v-model 的修饰符**

- .lazy 通过这个修饰符，转变为在 change 事件再同步
- .number 自动将用户输入值转化为数值类型
- .trim 自动过滤用户输入的收尾空格

**键盘事件修饰符**

- .enter
- .tab
- .delete (捕获“删除”和“退格”键)
- .esc
- .space
- .up
- .down
- .left
- .right

**系统修饰符**

- .ctrl
- .alt
- .shift
- .meta

**鼠标按钮修饰符**

- .left
- .right
- .middle



## 组件传值

1. 父传子：子组件通过props[‘xx’] 来接收父组件传递的属性 xx 的值
2. 子传父：子组件通过 this.$emit(‘fnName’,value) 来传递,父组件通过接收 fnName 事件方法来接收回调
3. 其他方式：通过创建一个bus，进行传值
4. 使用Vuex



## Vue.js 双向绑定的原理



Vue.js 2.0 采用数据劫持（Proxy 模式）结合发布者-订阅者模式（PubSub 模式）的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

每个组件实例都有相应的watcher程序实例，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的setter被调用时，会通知watcher重新计算，从而致使它关联的组件得以更新。

Vue.js 3.0, 放弃了Object.defineProperty ，使用更快的ES6原生 Proxy (访问对象拦截器, 也称代理器)

**50、Computed和Watch的区别**

computed 计算属性 : 依赖其它属性值,并且 computed 的值有缓存,只有它依赖的 属性值发生改变,下一次获取 computed 的值时才会重新计算 computed 的值。

watch 侦听器 : 更多的是观察的作用,无缓存性,类似于某些数据的监听回调,每 当监听的数据变化时都会执行回调进行后续操作。

运用场景：

- 当我们需要进行数值计算,并且依赖于其它数据时,应该使用 computed,因为可以利用 computed的缓存特性,避免每次获取值时,都要重新计算。
- 当我们需要在数据变化时执行异步或开销较大的操作时,应该使用 watch,使用 watch 选项允许我们执行异步操作 ( 访问一个 API ),限制我们执行该操作的频率, 并在我们得到最终结果前,设置中间状态。这些都是计算属性无法做到的。
- 多个因素影响一个显示，用Computed；一个因素的变化影响多个其他因素、显示，用Watch;

Computed 和 Methods 的区别：

- computed: 计算属性是基于它们的依赖进行缓存的,只有在它的相关依赖发生改变时才会重新求值对于 method ，只要发生重新渲染，
- method 调用总会执行该函数



## 过滤器 (Filter)



在Vue中使用filters来过滤(格式化)数据，filters不会修改数据，而是过滤(格式化)数据，改变用户看到的输出（计算属性 computed ，方法 methods 都是通过修改数据来处理数据格式的输出显示。

使用场景： 比如需要处理时间、数字等的的显示格式；





## 如何解决数据层级结构太深的问题



在开发业务时，经常会岀现异步获取数据的情况，有时数据层次比较深，如以下代码: span 'v-text="a.b.c.d">, 可以使用vm.$set手动定义一层数据: vm.$set("demo"，a.b.c.d)



## vue常用指令



- v-model 多用于表单元素实现双向数据绑定（同angular中的ng-model）
- v-bind 动态绑定 作用： 及时对页面的数据进行更改
- v-on:click 给标签绑定函数，可以缩写为@，例如绑定一个点击函数 函数必须写在methods里面
- v-for 格式： v-for=“字段名 in(of) 数组json” 循环数组或json(同angular中的ng-repeat)
- v-show 显示内容 （同angular中的ng-show）
- v-hide 隐藏内容（同angular中的ng-hide）
- v-if 显示与隐藏 （dom元素的删除添加 同angular中的ng-if 默认值为false）
- v-else-if 必须和v-if连用
- v-else 必须和v-if连用 不能单独使用 否则报错 模板编译错误
- v-text 解析文本
- v-html 解析html标签
- v-bind:class 三种绑定方法：对象型 ‘{red:isred}’三元型 ‘isred?“red”:“blue”’数组型 ‘[{red:“isred”},{blue:“isblue”}]’
- v-once 进入页面时 只渲染一次 不在进行渲染
- v-cloak 防止闪烁
- v-pre 把标签内部的元素原位输出



## $route和$router的区别



- $route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。
- $router是“路由实例”对象包括了路由的跳转方法，钩子函数等



## 怎样理解 Vue 的单项数据流



- 数据总是从父组件传到子组件，子组件没有权利修改父组件传过来的数据，只能请求父组件对原始数据进行修改。这样会防止从子组件意外改变父组件的状态，从而导致你的应用的数据流向难以理解。
- 注意：在子组件直接用 v-model 绑定父组件传过来的 props 这样是不规范的写法，开发环境会报警告。
- 如果实在要改变父组件的 props 值可以再data里面定义一个变量，并用 prop 的值初始化它，之后用$emit 通知父组件去修改。



## 虚拟DOM是什么？有什么优缺点？



由于在浏览器中操作DOM是很昂贵的。频繁操作DOM，会产生一定性能问题。这就是虚拟Dom的产生原因。Vue2的Virtual DOM 借鉴了开源库 snabbdom 的实现。Virtual DOM本质就是用一个原生的JS对象去描述一个DOM节点，是对真实DOM的一层抽象。

**优点：**

1、保证性能下限：框架的虚拟DOM需要适配任何上层API可能产生的操作，他的一些DOM操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的DOM操作性能要好很多，因此框架的虚拟DOM至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，既保证性能的下限。

2、无需手动操作DOM：我们不需手动去操作DOM，只需要写好 View-Model的 代码逻辑，框架会根据虚拟DOM和数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率。

3、跨平台：虚拟DOM本质上是JavaScript对象，而DOM与平台强相关，相比之下虚拟DOM可以进行更方便地跨平台操作，例如服务器端渲染、weex开发等等。

**缺点：**

1、无法进行极致优化：虽然虚拟DOM + 合理的优化，足以应对大部分应用的性能需要，但在一些性能要求极高的应用中虚拟DOM无法进行针对性的极致优化。

2、首次渲染大量DOM时，由于多了一层DOM计算，会比innerHTML插入慢。





## Vuex 页面刷新数据丢失怎么解决？



需要做 vuex 数据持久化，一般使用本地储存的方案来保存数据，可以自己设计存储方案，也可以使用第三方插件。

推荐使用 vuex-persist (脯肉赛斯特)插件，它是为 Vuex 持久化储存而生的一个插件。不需要你手动存取 storage，而是直接将状态保存至 cookie 或者 localStorage中。





## Vuex 为什么要分模块并且加命名空间？



模块： 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能会变得相当臃肿。为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块。

命名空间： 默认情况下，模块内部的 action、mutation、getter是注册在全局命名空间的 — 这样使得多个模块能够对同一 mutation 或 action 做出响应。如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced:true 的方式使其成为带命名的模块。当模块被注册后，他所有 getter、action、及 mutation 都会自动根据模块注册的路径调整命名。





## vue 中使用了哪些设计模式？



- 1、工厂模式 - 传入参数即可创建实例
- 虚拟 DOM 根据参数的不同返回基础标签的 Vnode 和组件 Vnode。
- 2、单例模式 - 整个程序有且仅有一个实例
- vuex 和 vue-router 的插件注册方法 install 判断如果系统存在实例就直接返回掉。
- 3、发布-订阅模式。（vue 事件机制）
- 4、观察者模式。（响应式数据原理）
- 5、装饰器模式（@装饰器的用法）
- 6、策略模式，策略模式指对象有某个行为，但是在不同的场景中，该行为有不同的实现方案 - 比如选项的合并策略。





## 你都做过哪些 Vue 的性能优化？



这里只列举针对 Vue 的性能优化，整个项目的性能优化是一个大工程。

- 对象层级不要过深，否则性能就会差。
- 不需要响应式的数据不要放在 data 中（可以使用 Object.freeze() 冻结数据）
- v-if 和 v-show 区分使用场景
- computed 和 watch 区分场景使用
- v-for 遍历必须加 key，key最好是id值，且避免同时使用 v-if
- 大数据列表和表格性能优化 - 虚拟列表 / 虚拟表格
- 防止内部泄露，组件销毁后把全局变量和时间销毁
- 图片懒加载
- 路由懒加载
- 异步路由
- 第三方插件的按需加载
- 适当采用 keep-alive 缓存组件
- 防抖、节流的运用
- 服务端渲染 SSR or 预渲染





## Vue.set 方法原理



在两种情况下修改 Vue 是不会触发视图更新的。

- 1、在实例创建之后添加新的属性到实例上（给响应式对象新增属性）
- 2、直接更改数组下标来修改数组的值。
- Vue.set 或者说是 $set 原理如下：因为响应式数据 我们给对象和数组本身新增了__ob__属性，代表的是 Observer 实例。当给对象新增不存在的属性，首先会把新的属性进行响应式跟踪 然后会触发对象 ob 的dep收集到的 watcher 去更新，当修改数组索引时我们调用数组本身的 splice 方法去更新数组。



## 函数式组件使用场景和原理



函数式组件与普通组件的区别

- 1、函数式组件需要在声明组件时指定 functional:true
- 2、不需要实例化，所以没有this，this通过render函数的第二个参数context代替
- 3、没有生命周期钩子函数，不能使用计算属性，watch
- 4、不能通过$emit对外暴露事件，调用事件只能通过context.listeners.click的方式调用外部传入的事件
- 5、因为函数组件时没有实例化的，所以在外部通过ref去引用组件时，实际引用的是HTMLElement
- 6、函数式组件的props可以不用显示声明，所以没有在props里面声明的属性都会被自动隐式解析为prop，而普通的组件所有未声明的属性都解析到$attrs里面，并自动挂载到组件根元素上（可以通过inheritAttrs属性禁止）



优点：1.由于函数组件不需要实例化，无状态，没有生命周期，所以渲染性要好于普通组件2.函数组件结构比较简单，代码结构更清晰





## 子组件为何不可以修改父组件传递的 Prop？



所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

