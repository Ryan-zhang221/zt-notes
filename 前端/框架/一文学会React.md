## 项目git地址

https://github.com/Ryan-zhang221/ob-my-kanban.git

课程地址：https://time.geekbang.org/column/article/562726

## JSX简介

> 总的来说，React 是一套声明式的、组件化的前端框架。顾名思义，**声明（动词）组件**是 React 前端开发工作最重要的组成部分。在声明组件的代码中使用了 JSX 语法，JSX 不是 HTML，也不是组件的全部。

* Web 应用日益复杂，其视图中往往包含很多的控制逻辑，比如条件、循环等。以声明式开发视图，就需要把控制逻辑代码也加入到声明语句中去。而这样的代码，就对可读性、可维护性提出了挑战。

* 组件是 React 开发的基本单位。在组件中，需要被渲染的内容是用 `React.createElement(component, props, ...children)` 声明的，而 JSX 正是 `createElement` 函数的语法糖。浏览器本身不支持 JSX，所以在应用发布上线前，JSX 源码需要工具**编译成**由若干 `createElement` 函数组成的 JS 代码，然后才能在浏览器中正常执行。如下所示：
  
  ```js
  // jsx代码
  <header className="App-header">
    <h1>我的看板</h1>
  </header>
  
  // 编译成js代码之后
  React.createElement("header", {className: "App-header"},
    React.createElement("h1", null, "我的看板")
  );
  ```

* 为什么需要 JSX ?
  
  编译成 JS 之后的代码之后，不能直观理解，所以我们需要使用一种更加直观的、类 HTML/XML 的语法来让代码更便于我们理解，故出现了 JSX语法，它比起纯 JS 代码也更容易维护。

* JSX 的优势
  
  JSX 中可以直接使用 JS 语句，JS 表达式可以做的，JSX 都可以做。故 JSX 是前端视图领域“最 JS”的声明式语法，它为 React 的推广和流行起了至关重要的作用。

## 前端开发中的声明式和命令式

> ![](https://static001.geekbang.org/resource/image/25/2f/250e1722bde8db58da7b49c38b4e902f.jpg?wh=4000x2250)

* 如上图所示，React 是声明式的前端技术，这一点首先就体现在创建组件的视图上，无论是使用 JSX 语法还是直接利用 `React.createElement()`  函数，都是在描述开发者期待的视图状态。开发者只需**关心渲染结果**，而 React 框架内部会实现具体的渲染过程，最终调用浏览器 DOM API。目前的三大主流前端框架，React、Vue、Angular 都是声明式的。

## JSX 的具体用法和常见坑

> JSX 是 JavaScript XML 的缩写，所以我们分为两部分：
> 
> 1、X 的部分：标签的命名规则、支持的元素类型、子元素类型；
> 
> 2、JS 的部分：JSX 中哪里可以加入 JS 表达式，规则是什么等

* 虽然在写 JSX 时并不需要时时惦记着编译出来的React.createElement() 语句，但在学习时还是很有帮助的。我们来看一下 JSX 各个组成部分与React.createElement() 函数各参数的对应关系
  
  ```js
  React.createElement(type, props, ...children)
  ```
  
  其中 type 参数是必须的，props 可选

* 坑1：return 语句后面返回的 JSX 时，将 JSX 包在了一对括号（）中，这是为了避免踏入 JS 自动加分号的陷阱。养成了为 JSX 最外层加括号的习惯，甚至连单行 return 都会加上括号。毕竟在改老代码时，单行 return 有可能会改成多行，留下忘加括号的隐患。

* `命名规则：`
  
  * 自定义 React 组件时，组件本身采用的变量名或者函数名，需要以大写字母开头
    
    ```js
    function MyApp() {
      return (<div></div>)
    }
    const kanbanCard  = () => (
        <div></div>
    )
    ```
  
  * 在 JSX 中编写标签时，HTML 元素名称均为小写字母，自定义组件首字母务必大写
    
    `<KanbanCard />`
  
  * 至于 props 属性名称，在 React 中使用驼峰命名（camelCase），且区分大小写

* `JSX 元素类型：`
  
  JSX 产生的每个节点都称作 React 元素，它是 React 应用的最小单元。React 元素有三种基本类型：
  
  * React 封装的 DOM 元素，如 `<div></div>  <img/>` ，这部分元素最终会被渲染成真实的DOM
  * React 组件渲染的元素，如 `<KanbanCard />` ，这部分元素会调用对应组件的渲染方法
  * React Fragment 元素，没有业务意义，也不会产生额外的 DOM ，主要用来将多个元素分组

  不同类型元素的 props 有所区别：

* React 封装的 DOM 元素将浏览器 DOM 整体做了一次面向 React 的标准化
* React 组件渲染的元素，JSX 中的 props 应该与自定义组件定义中的 props 对应起来；如果没有特别处理，没有对应的 props 会被忽略掉。这也是开发 JSX 时偶尔会犯的错误，在组件定义中改了 props 的属性名，但忘了改对应的 JSX 元素中的 props，导致子组件拿不到属性值。
* 至于 Fragment 元素，没有 props

* `JSX 子元素类型：`
  
  JSX 元素可以指定子元素。在之后的课程里你会看到很多子组件的概念，这里先留一个印象：子元素不一定是子组件，子组件一定是子元素。子元素的类型包括
  
  * 字符串，最终会被渲染成 HTML 标签里的字符串；
  * 另一段 JSX，会嵌套渲染；
  * JS 表达式，会在渲染过程中执行，并让返回值参与到渲染过程中；
  * 布尔值、null 值、undefined 值，不会被渲染出来；
  * 以上各种类型组成的数组。

* `JSX 中的 JS 表达式：`
  
  在 JSX 中可以插入 JS 表达式，特征是用大括号 { } 包起来，主要有两个地方：
  
  * 作为 props 值，如 `<button disabled={ showAdd }>添加新卡片</button>`
  * 作为 JSX 的子元素，如 `<div className="card-title">{ title }</div>`

  这些表达式可以简单到原始数据类型 {true} 、{123} ，也可以复杂到很长的函数表达式

```js
todoList.filter(card => card.title.startWith('TODO:').map(props => <KanbanCard {...props} />))
```

  只要确保最终的返回值符合 props 值或者 JSX 子元素的要求，就是有效的表达式。

  **JSX 是声明式的，所以它的内部不应该出现命令式的语句** ，比如 if... else... 语句。当你拿不准自己写到 JSX { } 里的代码到底是不是表达式，可以试着把这部分代码直接赋值给一个 JS 变量。如果这个赋值能成功，说明它确实是表达式；如果赋值不成功，可以从如下四个方面进行检查：

* 是否有语法错误

* 是否是用了 for...of 的声明变体 array.forEach，这个中招几率比较高

* 是否没有返回值

* 是否有返回值，但是不符合props或者子元素的要求
  
  另外有个 props 表达式的特殊用法：属性展开， 利用 JS ... 语法把 props 这个对象中的所有属性都传给 KanbanCard 组件。
  
  JSX 里加注释需要改用 {/* */} 来加注释，编译时它会被识别成 JS 注释然后抛弃掉。

* `回顾：条件渲染和循环渲染`
  
  条件渲染：
  
  ```js
  { showAdd && <KanbanNewCard onSubmit={handleSubmit} /> }
  ```
  
  上面是一个典型的条件表达式，如果showAdd 为 true 时，会返回后面的 JSX，渲染《新建看板卡片》组件；否则会返回 showAdd 的值，即 false 。根据子元素类型中描述的，false 值并不会被渲染出来，《新建看板卡片》组件就不会被渲染了。

  循环渲染：

```js
{ todoList.map(props => <KanbanCard {...props} />) }
```

  上面是一个典型的数组转换表达式。当 todoList 为空数组时，表达式返回一个新的空数组，不会渲染出来；而当todoList 包含 1 个或更多个项目时，会返回一个 JSX 的数组，相当于：

```js
{[
  <KanbanCard title="开发任务-1" status="22-05-22 18:15" />,
  <KanbanCard title="开发任务-2" status="22-05-22 18:15" />
]}
```

## JSX 和 React 组件的关系

> 灵魂拷问：反复提到 React 组件，为啥一个普普通通的function App() {} 函数就成组件了？

* 鲁迅笔下的名人孔乙己曾说过“茴字有四样写法”，巧了，React 组件也是。React 组件最初不是这么精简的。目前 React 的版本是 v18，7 年前的 2015 年 React 发布了两个大版本 v0.13 和 v0.14（你可以理解成 v13 和 v14），当时的主流写法是
  
  ```js
  const KanbanCard = React.createClass({
    render: function() {
      return (<div>....</div>)
    }
  })
  ```
  
  后台 FB 在 V13 中推广 ES6 Class 写法
  
  ```js
  class KanbanCard extends React.Component {
    render() {
      return (<div>...</div>)
    }
  }
  ```
  
  用这两种方式**定义组件时，最核心的就是实现 render() 方法**。render() 方法的返回值可以是一段 JSX（或对应的 React 元素）、原始数据类型（注：该方法在 React v18 以前的版本不可以返回undefined，否则会报错） 、其他 React 数据类型或者是这几种类型的数组。

* 除了上述两种写法，V14版本新加入了一种简化的无状态函数组件：
  
  ```js
  // ES6箭头函数
  const KanbanCard = (props) => {
    var title = props.title;
    return (<div>KanbanCard {title}</div>)
  }
  
  // 更简单的箭头函数+参数解构
  const KanbanCard = ({ title }) => (
      <div>KanbanCard {title}</div>
  )
  ```
  
  函数的参数就是 props，函数的返回值与前面两种写法中render()方法的返回值相同。这种函数组件在 React Hooks 尚未发布时，还不能自己处理 state 状态，需要在它的父组件提供状态，并通过 props 传递给它。虽然函数组件功能受限，但它贵在简单，受到了开发者的广泛欢迎。以至于开源社区开发了各种支持库，用诸如高阶组件（recompose）的方式补足函数组件缺失的功能。

  到了 React v16.8，Hooks 正式发布，函数组件取代类组件成为了 React 组件的 **C 位**。题外话，对于 React 函数组件的流行，我在当年是有点意外的。我本人是 ES6 class 的死忠粉，但后来先后上手了 recompose 和官方的 Hooks，真香。

  简单总结一下，函数组件上位的原因包括：

* React 的哲学 UI=f(state) ；
* 更彻底的关注点分离（Separation Of Concerns）；
* 函数式编程的影响；
* React 内部实现的不断优化；
* 开源社区的反哺。

* JSX 就是 React？
  
  * 不是。JSX 只是 React 其中一个 API，createElement 函数的语法糖。

* JSX 就是 React 组件？
  
  * 不是。JSX 是 React 组件渲染方法返回值的一部分，React 组件还有其他的功能。

* JSX 就是另一种 HTML？
  
  * 不是。JSX 本质还是 JS，只是在最终渲染时才创建修改 DOM。

* JSX 既能声明视图，又能混入 JS 表达式，那是不是可以把所有逻辑都写在 JSX 里？
  
  * 可以是可以，但毕竟不能在 JSX 里使用命令式语句，能做的事情很有限。

## 前端组件化：完整应用拆分为React组件

> 组件化开发已经成为前端开发的主流趋势，市面上大部分前端框架都包含组件概念，有些框架里叫 Component，有些叫 Widget。React 更是把组件作为前端应用的核心。不过无论是哪种框架，几乎每一位学习前端组件的开发者都会遇到下面这些问题：
> 
> * 开发应用时是不是一定要拆分组件？一个应用我只用一个组件开发行不行？
> * 如果一定要拆分组件，面对需求文档我该怎么下手？
> * 组件拆分的粒度是应该大些还是小些？有没有可以参照的标准？

* 误区：组件确实是代码复用的手段之一，但并不是每个组件都需要复用。

* `为什么需要前端组件化？`
  
  在前端领域，组件是对视图以及与视图相关的逻辑、数据、交互等的封装。如果没有组件这层封装，这些代码将有可能四散在各个地方，低内聚，也不一定能低耦合，这种代码往往难写、难读、难维护、难扩展。
  
  既然是由前端开发者编写代码，那么前端技术就有必要辅助开发者写出更好的代码。低耦合高内聚的封装已经被证明是更加有效的软件工程实践，那么组件化，就让前端开发走在了正确的道路上。

* `为什么要有组件层级结构？`
  
  比组件化更进一步的概念是组件层次结构（Hierarchy）。一般是指父类子类之间的继承关系。
  
  React 并没有用类继承的方式扩展现有组件（类组件继承 React.Component类，但类组件之间没有继承关系），所以在 React 中提到 Hierarchy，一般都是指组件与组件间的层次结构。
  
  组件层次结构可以帮助我们在设计开发组件过程中，**将前端应用需要承担的业务和技术复杂度分摊到多个组件中去，并把这些组件拼装在一起。**
  
  React 组件层次结构从一个根部组件开始，一层层加入子组件，最终形成一棵组件树。

* `如何拆分 React 组件？`
  
  如何拆分组件，首先影响的就是 JSX 的写法。反过来说，你可以用 JSX 来快速验证拆分出来的组件层次结构。
  
  。。。先做组件拆分，把具体实现留到拆分之后

  组件拆分的基本原则：

* 单一职责原则 Single Responsibility
* 关注点分离原则 Separation of Concern
* 一次且仅一次原则 DRY, Don’t Repeat Yourself
* 简约原则 KISS，Keep It Simple & Stupid

* `组件拆分的建议`
  
  决策疲劳（Decision Fatigue）是个心理学概念，大致意思就是说当你连续做决定时，你的决定的效率和效果都会逐渐下降，甚至会做出错误的决定。在开发 React 应用时，为了实现一个完整的设计稿，你需要将其拆分成若干组件。而组件可大可小，可复杂可简单，你往往在组件拆分阶段需要连续做出决策，在颗粒度、复杂度、可维护性、可测试性间达到平衡。这就容易导致**决策疲劳**，可能造成的后果就是，越靠后拆分的组件越拿不准，越怀疑前面我是不是拆错了，搞得自己很累。建议如下：
  
  * 没必要追求一次性拆分彻底，在具体实现过程中依然可以继续拆分组件；
  
  * 没必要追求绝对正确，在后续开发中可以根据需要，随时调整拆分过的组件；
  
  * 在拆分组件时尽量专注，暂时不要分神去考虑其他方面（如后端），少做些决策；
  
  * 在平时开发工作中有意积累组件拆分的经验，这会让你在后续的项目中游刃有余。

  组件什么时候该用 props、什么时候该用 state、还有 context，这也是 React 中容易导致决策疲劳的地方，后面课程里会讲到的单向数据流，可以帮你尽可能避免这种情况。

* `对 React 子组件概念的澄清`
  
  React有自己独特的渲染机制，和别的框架不同，请注意分别
  
  严格来说，React 没有组件树（Component Tree），只有元素树（Element Tree），即从根元素开始，父元素子元素之间形成的树。上节课学到，React 元素的子元素可以是可以是 React 组件渲染的元素、HTML 元素，也可以是字符串，那么一定有下面的元素树：
  
  ```
  图书馆
  ├── main
  │   └── div
  │       └── 分类阅览室
  └── footer
      └── "地址：XX路YY号"
  ```
  
  其中图书馆、分类阅览室是 React 组件，main、div 是图书馆组件 render() 方法返回值的一部分，分类阅览室的渲染结果作为前者 div 的子元素。
  
  React内部，尤其是引入了新的 Fiber 引擎后，已经逐步不再依赖以类（Class）为中心的实现。元素（Element）只是节点的 POJO 描述，非常轻量，元素本身并不负责实例化类组件或是调用 rende 方法。在类组件的实例上，也没有 addChild()、getParent() 这样描述组件间父子关系的方法或属性，函数组件更是如此。
  
  我们经常提到的组件树和父子组件，其实可以从 **组件声明** 和 **组件实例** 两个层面来理解：
  
  * **组件声明层面**：根据静态代码，在一个组件返回的 JSX 中，加入另一个组件作为子元素，那么可以说前者是父组件，后者是自组件。父子组件形成的树即为组件树。
  * **组件实例层面**：组件树是来自运行时的 React 元素树、从逻辑上排除掉 HTML、Fragment 等元素，仅保留对应 React 组件的元素节点而形成的 **精简树**。在这棵组件树中，对应元素呈父子关系的一对组件可以称作父子组件。

* `小结：`
  
  * 组件化是前端框架普遍采用的封装形式，将一个完整应用拆分成组件层次结构，会把业务和技术复杂度分摊到多个组件中去。
  
  * 然后用 oh-my-kanban 项目的源码，实践了如何利用 JSX 协助拆分 React 组件。介绍了拆分组件的四个基本原则，也借此机会向你兜售了“决策疲劳”的理论。最后基于 React 的内部机制，形而上学地纠正了你对 React 子组件的理解。
  
  * 下节课我们依然会从拆分组件工作入手，更深入地介绍 React 组件的渲染过程，也为之后要学习的组件生命周期、单项数据流等概念打基础。

## 虚拟DOM：React组件的渲染机制

> 可以为你解答如下问题：
> 
> * 为什么我需要关心 React 组件的渲染机制？
> * 为什么数据变了，但组件没重新渲染？
> * 为什么数据没变，但组件也重新渲染了？
> 
> 后两个问题本身都可以作为第一个问题的答案。至于后两个问题，掌握 React 组件重新渲染的时机，避免无效的重新渲染都需要学习 React 组件的渲染机制。

* `虚拟DOM`
  
  虚拟 DOM 是前端领域近几年比较出圈的一个概念，是相对于 HTML DOM 更为轻量的 JS 模型。在 React、Vue.js、Elm 这样的声明式前端框架中，都包含了虚拟 DOM

  面向前端开发者，React 提供了包括 JSX 语法在内的声明组件 API ，在运行时，开发者声明的组件会被渲染成虚拟 DOM ，虚拟 DOM 再由 React 框架渲染为真实的 DOM ，虚拟 DOM 的变动，最终会自动体现在真实 DOM 上，与真实 DOM 的交互，也会由 React 框架抽象成虚拟 DOM 上的副作用，与开发者编写的交互逻辑关联起来。

  理想状态下，开发者在开发 React 应用时，可以完全不去接触真实 DOM（但现实世界中这种情况很少见），一定程度上隐藏了 Web 原生技术的细节，有助于提高开发效率。我们的项目中代码量比浏览器实际展示的代码量要少。

  比起代码量的减少，虚拟 DOM 更重要的功能之一，是作为 React 面向开发者的 API 与 React 内部实现对接的桥梁。React API 整体都是声明式的，而 DOM API 是命令式的。我们知道，No Magic（没有魔法），开发者用 API 声明的 React 组件，最终成为页面上的动态 DOM 元素，必然在 React 框架内部有着一系列命令式的实现，负责最终调用浏览器 DOM API。

  如果没有虚拟 DOM 这个中间模型，那么 React API 就需要直接对接 DOM API，耦合程度提高，React 概念和 API 设计也会受制于浏览器，React Native 这样对接多端的愿景也无从实现了，React 也许就很难称作是 React 了。

* `真实 DOM 有什么问题？`
  
  前面的课程里我们介绍过 React 的设计哲学 UI=f(state) ，理论上来说，对于给定的 f() 和状态数据，一定可以重现一模一样的 UI；这也意味着，只要状态数据有变化，f() 就需要重新执行，整个 UI 需要重新渲染。

  正如 120FPS 的电影拍摄贵，放映更贵，现实世界的 f() 成本也是可观的。对于浏览器网页中的应用，我们降低一档标准，60FPS，意味着 1000ms ÷ 60 ≈ 16ms 之内至少需要执行完一次 f() ，否则会掉帧，显示和交互都会卡顿。

  操作真实 DOM 是比较耗费资源的，无脑地大量调用 DOM API 绘制页面，页面就很容易卡住，浏览器的高 CPU 和高内存占用就会让风扇发出哀嚎。

  这时就需要 React 提供一系列算法和过程，过滤掉没有必要的 DOM API 调用，最终把 f() 的成本降下来。虚拟 DOM 就是这些算法过程的中间模型，它远比 DOM API 轻量，跟最终的 DOM API 分摊成本后，可以保证 React 组件的渲染效率。

  新兴框架 Svelte 的作者里奇·哈里斯说：虚拟 DOM 的价值在于，当你构建应用时，无需考虑状态的变化如何体现在 UI 上，且一般情况下不用担心性能问题。这减少了代码 Bug，比起乏味的编码，你可以把更多时间投入到创造性的工作上。

* `协调`
  
  上节课最后讲到 React 组件会渲染出一棵元素树。因为开发者使用的是 React 的声明式 API，在此基础上，每次有 props、state 等数据变动时，组件会渲染出新的元素树，React 框架会与之前的树做 Diffing 对比，将元素的变动最终体现在浏览器页面的 DOM 中。这一过程就称为协调（Reconciliation）。

* `diffing`
  
  React 框架后续的版本中也在不断优化 Diffing 算法。近四年算法细节变了不少，但基本逻辑还是能归纳出以下几点：
  
  * 从根元素开始，React 将递归对比两棵树的根元素和子元素
  * 对比不同类型的元素，如对比 HTML 元素和 React 组件元素，React 会直接清理旧的元素和它的子树，然后建立新树
  * 对比同为 HTML 元素，但 Tag 不同的元素，如从 <a> 变成 <div>， react 会直接清理旧的元素和子树，然后建立新树
  * 对比同为 React 组件元素，但组件类或组件函数不同的元素，如从 KanbanNewCard 变成 KanbanCard ，React 会卸载旧的元素和子树，然后挂载新的元素树；
  * 对比 Tag 相同的 HTML 元素，如 <input type='text' value='old'> 和 <input type='text' value='new'> ，React 将会保留该元素，并记录有改变的属性，在这个例子里就是 value 的值从 "old" 变成了 "new" ；
  * 对比组件类或组件函数相同的组件元素，如 <KanbanCard title='老卡片'> 和 <KanbanCard title='新卡片'> ，React 会保留组件实例，更新 props，并触发组件的生命周期方法或者 Hooks。

  需要强调的是，在对比两棵树对应节点的子元素时，如果子元素形成一个列表，那么 React 会按顺序尝试匹配新旧两个列表的元素。

  如果对比结果是在列表末尾新增或者减少元素那还好，但如果是在列表头部或者中间插入或者删除元素，React 就不知道该保留哪个元素了，干脆把整个列表都推翻了重建，这样会带来性能损耗。

  为了应对这种情况，React 引入了 key 这个特殊属性，当有子元素列表中的元素有这个属性时，React 会利用这个 key 属性值来匹配新旧列表中的元素，以减少插入元素时的性能损耗。

  这样的用途就要求在任何一个子元素列表中，key 对于每个元素应该是唯一的且稳定的。比如你的数据来自于数据库，包含了自增 ID，那么你就可以用这个 ID 当作 key 的值。

* `触发协调的场景`
  
  了解了什么是协调，以及协调对比算法的基本逻辑，我们再回到 React 应用开发者的视角，看一下开发者做什么事情时会触发协调。

  一般有两个方向的选择，拉（Pull）和推（push）

* 轮询就是一种“拉”的方案

* “推”的方案：只有数据变化时，才需要触发协调 diff
  
  在 React API 中有哪些操作是操作组件数据的呢？props 和 state ，除此之外还有一个 context 。其中 props 是从组件外面传进来的，state 则是活跃在组件内部，至于 context，在组件外面的 Context.Provider 提供数据，组件内部可以消费 context 数据。

  只要这三种数据之一发生了变化，React 就会对当前组件触发 diff 过程，最终按照 diff 结果更改页面

  这里的重点：props 和 state 都是不可变的

  其中 state 不可变性是我们通过 setState() 方法来更新 state 数据，页面才能正确做出反应

  至于 props，我们尝试一下给它增加一个属性会发现浏览器报错，React 不允许我们这样操作。一个组件的 props 应该由父组件传进来，props 数据的变动也应该由父组件负责。

* `什么是 Fiber 协调引擎？`
  
  虽然前面一直在提虚拟 DOM，但翻遍 React 的 API 文档和源代码，也找不到任何一个类、函数或者变量叫 VirtualDOM ，它更多还是一个抽象概念。React 中最接近这个概念的实现，你猜是什么？你说是 React 元素。嗯，是个好答案。不过要深究 React 协调的技术细节，那么这个答案也对也不对。

  在 React 的早期版本，协调是一个同步过程，这意味着当虚拟 DOM 足够复杂，或者元素渲染时产生的各种计算足够重，协调过程本身就可能超过 16ms，严重的会导致页面卡顿。

  而从 React v16 开始，协调从之前的同步改成了异步过程，这主要得益于新的 Fiber 协调引擎。从此在 React 中更贴近虚拟 DOM 的，是在 Fiber 协调引擎中的核心模型 FiberNode。

  FiberNode 依靠对元素到子元素的双向链表、子元素到子元素的单向链表实现了一棵树，这棵树可以随时暂停并恢复渲染，触发组件生命周期等副作用（Side-effect），并将中间结果分散保存在每一个节点上，不会 block 浏览器中的其他工作。

  Fiber 引擎细节比较多，这里暂不展开。你若感兴趣的话请在留言区告诉我，后期也许会有加餐。

* `学习螺旋曲线`
  
  实际上的学习曲线并不是二维的，而是三维的螺旋曲线
  
  在螺旋曲线中学习过程会经历：学习技术表层 → 学习技术底层 → 回过头来理解表层 → 继续学习更多表层 → 底层 → …如此往复… → 掌握技术。当然，并不是所有人都是这样学习的，但我希望在这门课程中用这一方法能帮到你。

* `小结`
  
  我们学习了 React 中的虚拟 DOM 远是真实 DOM 的抽象，且远比后者更轻量，是 React 面向开发者的 API 与内部实现对接的桥梁。也介绍了 React 组件的 props、state 或者 context 改变时，React 会触发协调过程对比新旧两棵元素树，计算出有哪些真实 DOM 需要变更。

  虚拟 DOM 是真实 DOM 的抽象，React 开发者通过 JSX 等 API 声明组件树，React 内部则会生成对应的虚拟 DOM；组件 props、state、context 有变化时会触发协调过程，通过 Diffing 算法比对新旧虚拟 DOM，最终只针对差异部分调用 DOM API 改变页面。

  这些就是 React 组件的渲染机制。理解了渲染机制，你就更清楚该如何写出对的组件、快的组件。

  下节课我们会稍微轻松一下，转过头来聊聊决定 Web 应用样式的 CSS，看看在 React 应用中如何写 CSS。

## 组件样式：CSS-in-js

> 应用拆分为组件后，css 也需要组件化。你可能会好奇，一个 JSX 文件对应一个 CSS 文件，这不就是 CSS 的组件化了吗？其实这还远不够。CSS 与 JS 天生就是异构的，对于 React 的组件层次结构，CSS 很难做到一一对应。此外，不同组件中样式的隔离也是必须的。
> 
> 我们需要解决的问题：
> 
> * 如何为 React 组件定义样式，才能做到样式与组件的共生？
> * 如何防止不同组件的 CSS 互相影响？
> * 如何在 CSS 里使用 props 或 state 值？
> 
> 前端尤其是 React 社区，先后推出了许多 CSS-in-JS 框架来解决这些问题。在这节课我会以流行度较高的 emotion 为例，介绍 CSS-in-JS 的特点和使用中的注意事项。

* `什么是 CSS in JS ?`
  
  CSS 从一开始就是 Web 技术的三驾马车之一，与 HTML 和 JS 平起平坐，也和后者一样因为浏览器兼容性问题薅掉了老中青三代程序员的头发。近年来 CSS 越来越标准化，功能也越来越强，实乃前端开发者之幸。

  你可能要问了，既然 CSS 这么好，那为什么还要 JS 帮它？还要有 CSS-in-JS 这类技术？

  这是个好问题，说白了，领域不同，CSS（截止到目前标准化的）尚不具备现代前端组件化开发所需要的部分领域知识和能力，所以需要其他技术来补足。这些知识和能力主要包括四个方面：

* 组件样式的作用域需要控制在组件级别；

* 组件样式与组件需要在源码和构建层面建立更强的关联；

* 组件样式需要响应组件数据变化；

* 组件样式需要有以组件为单位的复用和扩展能力。
  
  这里提到的“其他技术”基本就在指 JS 了，CSS-in-JS 就是这样一种 JS 技术，它扛起了补足 CSS 组件化能力的重任。

  从字面上看，CSS-in-JS 就是在 JS 里写 CSS，反过来说 CSS 需要 JS 才能起作用。原生的 JS 操作 CSS 无外乎下面五种方式：

* 通过 DOM API 设置元素的 style 属性，为元素加入内联（Inline）样式；

* 通过 DOM API 设置元素的 className 属性，为元素关联现有的类（Class）样式；

* 通过 DOM API 在页面文档中动态插入包含 CSS 规则文本的 <style> 标签

* 第 3 条的变体：通过 CSSOM 的 CSSStyleSheet 对象动态修改页面中的 CSS 规则；

* 非运行时方案：在编译阶段把 JS 中的 CSS 通过 AST（Abstract Syntax Tree，抽象语法树）剥离出来，生成静态 CSS 文件并在页面中引用。
  
  开源社区里常见的 CSS-in-JS 框架，它们的内部实现最终都会落地于以上五种方式之一或组合。

* `emotion 框架`
  
  这个框架比起其他框架更注重开发者体验、功能相对完整、也比其他一些专注于用 JS、TS 语法写样式的框架更加 “CSS” 一些。
  
  改写我们 ob-my-kanban 项目的组件样式

## Hooks

> 文章链接：https://www.freecodecamp.org/news/the-beginners-guide-to-react-hooks/
> 
> 什么是Hooks？
> 
> Hooks 是 React 实现组件逻辑的重要方式，可以用来操作 state，定义副作用，更支持开发者自定义 Hooks。Hooks 借鉴自函数式编程，但同时在使用上也有一些限制。
> 
> 我们不妨借助函数式编程中纯函数和副作用这两个概念，来理解什么是 Hooks。
> 
> React 对 UI 的理想模型是 UI = f(state) ，其中 UI 是视图，state 是应用状态，f 则是渲染过程，比起类组件，函数组件更加符合这一模型。早期的函数组件功能与类组件还有不少的差距。
> 
> 纯函数：我们把满足下面两点的函数就叫纯函数
> 
> * 函数无论被调用多少次，只要参数相同，返回值就一定相同，这一过程不受外部状态或者 IO 操作的影响
> * 函数被调用时不会产生副作用（Side Effect），即不会修改传入的引用参数，不会修改外部状态，不会触发 IO 操作，也不会调用其他会产生副作用的函数。
> 
> 纯函数组件可以最直观地展示输入的 props 与输出的渲染元素之间的关系，非常利于开发者把握组件的层次结构和样式。
> 
> 但需要知道，这样的纯函数组件除了 props、JSX 外，几乎不能使用 React 组件的所有其他特性——对于纯函数组件来说，这些其他特性全部都是外部状态或副作用。
> 
> 反过来说，若想让函数组件使用这些其他特性，只要让它以某种方式，显式地访问函数的外部状态（应限制在 React 框架的范围以内，所以对 React 而言是内部状态），或者执行副作用就好了。
> 
> Hooks 就是这样一套为函数组件设计的，用于访问 React 内部状态或执行副作用操作，以函数形式存在的 React API。注意，这里提到的“React 内部状态”是比组件 state 更广义的统称，除了 state 外，还包括后面课程中会详细讲解的 context、memo、ref 等。

* `useState hook`
  
  React组件中状态的含义：它是保存我们组件所依赖的数据的变量，并且可能随着时间而改变。一句话，状态就是变量。当这些变量发生变化时，React 通过使用状态变量的当前值重新渲染 DOM 中的组件来更新 UI

  useState hook 接收一个可选参数：状态的初始值，然后返回一个包含两个值的数组：

* 状态变量

* 更新状态的函数
  
  如：const [count, setCount] = useState(0)   这里是进行了数组解构，得到一个变量和一个函数。组件代码可以通过 count 变量来读取这个 state，当需要更新这个 state 时，则调用 setCount 函数，如 setCount(1)。每次组件更新，在渲染阶段都会再次调用这个 useState 函数，但它不会初始化 state，而是保持 count 的值是最新的。

  一个组件内多个 useState 函数之间是通过 useState 的调用次数和顺序来决定的。

  每次组件更新都会调用 useState，这其实是有性能隐患的，如果 useState 函数的参数过于复杂，比如 useState(fibonaci(40))，这时性能肉眼可见变差，我们还有一种设置默认值的方法就是传一个函数作为参数，useState 只在组件挂载时执行一次这个函数，此后组件更新时不会再执行，这下就可以这样写：useState(() => fibonaci(40))

  好玩的是，state 更新函数，这里也就是 setCount 函数也可以传函数作为参数。一般情况下，是调用 state 更新函数后组件会更新，而不是反过来。所以 state 更新函数的调用频率没那么高，传函数参数也并不是为了优化性能。

  在 React 18 里，更是为更新 state 加入了自动批处理功能，多个 state 更新函数调用会被合并到一次重新渲染中。

  这个功能从框架上就保证了 state 变化触发渲染时的性能，但也带来一个问题，只有在下次渲染时 state 变量才会更新为最新值，如果希望每次更新 state 时都要基于当前 state 值做计算，那么这个计算的基准值有可能已经过时了。此时只需要把更新函数 set... 的参数改为传递一个函数，就可以保证更新函数使用最新的 state 值来计算新 state 值。

  state 更新的自动批处理是 React 确保组件基础性能的重要功能。假设没有批处理功能的话，两个 state 更新会触发两次间隔非常近的重新渲染，那前面的这次重新渲染对于用户来说，很有可能是一闪而过的，既没有产生实际交互，也没有业务意义。在此基础上，如果再加上前面这次渲染的成本比较高，那就更是一种浪费了。

* `useRef hook`
  
  我们之前提到，在更新 state 值时，需要使用 state 更新函数，你可能会好奇，既然 useState 返回了 state 值，我们直接修改 state 变量，也就是 count 不行吗？为什么必须要调用 useCount 函数呢？
  
  如此操作，浏览器会直接报错：invalid assignment to。。。

  我们之前提到过，porps 和 state 都是不可变的

  那么，我们如果需要可变值怎么办，答案是我们可以使用 useRef 这个 hook ，我们通过在 React 组件中访问真实 DOM 元素来介绍 useRef 的用法。

```js
import React, { useEffect, useRef, useState } from 'react';
// 添加新卡片组件
const KanbanNewCard = ({ onSubmit }) => {

  const [title, setTitle] = useState('')
  const handleChange = (evt) => {
    setTitle(evt.target.value)
  }
  const handlekeyDown = (evt) => {
    if (evt.key === 'Enter') {
      onSubmit(title)
    }
  }

  // 自动文本输入设置页面焦点
  const inputElem = useRef(null);
  useEffect(() => {
    inputElem.current.focus();
  }, []) // 这里传递空数组是为了让该 hook 只在第一次渲染时运行一次

  return (
    <li className='kanban-card'>
      <h3>添加新卡片</h3>
      <div className='card-title'>
        <input type="text" value={title} ref={inputElem}
          onChange={handleChange} onKeyDown={handlekeyDown} />
      </div>
    </li>
  )
}
```

  我们调用 useRef 会返回一个可变 ref 对象，而且会保证组件每次重新渲染过程中，同一个 useRef hook 返回的可变 ref 对象都是同一个对象。

  可变 ref 对象有一个可供读写的 current 属性，组件重新渲染本身不会影响 current 属性的值；反过来，变更 current 属性值也不会触发组件的重新渲染。

  HTML 元素的 ref 属性，这个属性是 React 特有的，不会传递给真实的 DOM 。当 ref 属性的值是一个可变的 ref 对象时（ref={inputElem}），组件在挂载阶段，会在 HTML 元素对应的真实 DOM 元素创建后，将它赋值给可变 ref 对象的 current 属性（inputElem.current）；在组件卸载，真实 DOM 销毁之前，也会把 current 属性设置为 null。

  再接下来就是 useEffect(func, []) ，这种使用方法会保证 func 只在组件挂载的提交阶段执行一次，接下来的组件更新时不会再执行。

  这三个特性串起来，就让 KanbanNewCard 组件在挂载时，将 的真实 DOM 节点赋值给 inputElem.current，然后在处理副作用时从 inputElem.current 拿到这个真实 DOM 节点，命令式地执行它的 focus() 方法设置焦点。

* `什么是副作用？`
  
  计算机领域的副作用是指：当调用函数时，除了返回可能的函数值以外，还对主调用函数产生附加的影响。例如修改全局变量，修改参数，向主调方、管道输出字符或改变外部存储信息等。

  总之，副作用就是一个让 ***函数不再是纯函数*** 的各类操作。

  注意，这个概念并不是贬义的，在 React 中，大量行为都可以被称作副作用，比如：挂载、更新、卸载组件、事件处理、添加定时器、修改真实 DOM、请求远程数据、在 console 中打印调试信息等。

  上述 state 其实是绑定在组件函数之外的 FiberNode 上。这让你想到了什么？没错，就是函数执行 state 其实从逻辑上说也是一种副作用。

* `副作用hook：useEffect hook` 
  
  面对上述所说那么多的副作用，React 大方提供了 useEffect 这个执行副作用操作的 hook。当你打算在函数组件中加入副作用时，useEffect 基本上会成为你的首选，同时也建议务必把副作用放在 useEffect 中执行，而不是直接放在组件的函数体中，这样可以避免很多难以调试的 bug。

  这个 hook 有好几种用法：

* 只传入一个没有返回值的 ***副作用回调函数***     useEffect(() => { ... })
  
  虽然 useEffect 作为函数体的一部分，在每次组件渲染（包括挂载和更新阶段）时都会被调用，但作为参数的副作用回调函数是在提交阶段才会被调用的，这时副作用回调函数可以访问到组件的真实 DOM。虽然这是最简单的用法，但现实中的用例反而比较少：毕竟每次渲染后都会被调用，如果使用不当，容易产生性能问题。

* 副作用的条件执行（最常用）：传入一个依赖值数组作为第二个参数
  
  useEffect(() => {}, [var1, var2, var3])
  
  React 在渲染组件时，会记录当时的依赖值数组，下次渲染时会把依赖值数组里的值依次与前一次记录下来的值作浅对比。如果有不同，才会在提交阶段执行副作用回调函数，否则就跳过这次执行，下次渲染时再继续比对依赖值数组。
  
  依赖值数组里可以加入 props、state、context 值。一般来说，只要副作用回调函数中用到了自已范围之外的变量，都应该加入到这个数组里，这样 React 才能知道应用状态的变化和副作用间的因果关系。
  
  ```js
  //   ------------   --------------
  //   | 省份... |v|   | 城市...  |v|
  //   ------------   --------------
  
  const [province, setProvince] = useState(null);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    if (province === '山东') {
      // 这些数据可以是本地数据，也可以现从服务器端读取
      setCities(['济南', '青岛', '淄博']);
    }
  }, [province]);
  ```
  
  空数组[]也是一个有效的依赖值数组，由于在组件生命周期中依赖值不会有任何变化，所以副作用回调函数只会在组件挂载时执行一次，之后不论组件更新多少次，副作用都不会再执行。这个用法可以用来加载远程数据。

  我们可以为项目添加远程数据的存取

  对比类组件的生命周期方法，useEffect 根据用法的不同，可以很容易地实现 componentDidMount、componentWillUnmount 的功能，而且还能根据 props、state 的变化有条件地执行副作用，比类组件生命周期方法灵活很多。

  ----------------------------------------------------------------------------

  用于取代 React 类的生命周期方法，可以把 useEffect hook 视作 componentDidMount、componentDidUpdate、componentWillUnmount 生命周期方法都组合在一个函数中，它允许在功能组件中复制 React 的生命周期方法

  useEffect hook 允许在函数组件中执行副作用，副作用是可以与组件的主要操作一起运行的操作，例如与外部 API 交互、修改状态变量和数据获取。

  useEffect hook 接受 2 个参数：

* 带有要运行的代码的函数

* 一个数组，包含来自组件范围（props、context、state变量）的值列表，称为依赖数组，它告诉 hook 在每次更新其值时运行。如果未提供，则 hook 在每次渲染后运行
  
  ```js
  function Counter() {
  const [count, setCount] = useState(0)
  const [product, setProduct] = useState("Eggs")
  useEffect(() => {
    console.log(`${product} will rule the world`)
  })
  return (
      <div>
        ...
    </div>
  )
  }
  ```
  
  如上就是只有一个参数的情况： console 语句在每次状态更新后运行

```js
useEffect(() => {
  console.log(`${product} will rule the world`)
}, [product])
```

  如果加入第二个参数：hook 将仅在第一次渲染时运行，并且在 product 的值发生更改时运行。

  如果仅想在第一次渲染时运行一次，那么第二个参数就可以传递一个空数组 [] 作为依赖项

* `useContext hook`
  
  useContext hook 与 React context API 一起工作，它提供了一种方法，使整个应用程序中的所有组件都可以访问特定数据，无论它们嵌套的深度如何

  React 具有单向数据流， 其中数据只能从父级传递到子级。要将数据从父级传递到子级，需要根据子组件的嵌套深度手动将其作为 prop 向下传递到各个级别

  对于诸如用户的首选语言、主题、经过身份验证的用户属性之类的数据，必须手动将它们向下传递到组件树种是很麻烦的

  React 的 context API 和 useContext hook 使得在应用程序中所有组件之间传递数据变得容易

```js
const value = useContext(SomeContext)
```

  它接受通过 React.createContext 创建的 context 对象，并返回当前的 context 

* `性能优化hooks：useMemo 和 useCallback`

  这两个 hooks 和 useEffect 没有关系。且不说它们的用途完全不同，单从回调函数的执行阶段来看，前者是在渲染阶段执行，而后者是在提交阶段。看起来它们最大的相似点是在 hook 的第二个参数都是依赖值数组。

  这里插入一个概念记忆化（Memoization），**对于计算量大的函数，通过缓存它的返回值来节省计算时间，提升程序执行速度。**对于记忆化函数的调用者而言，存入缓存这件事本身就是一种副作用。useMemo 和 useCallback 做性能优化的原理就是记忆化，所以它们的本质和 useEffect 一样，都是在处理副作用。

* `useMemo`：这个 hook 接受两个参数，一个是工厂函数，另一个是一个依赖值数组，它的返回值就是执行工厂函数的返回值。
  
  ```js
  const memoized = useMemo(() => createByHeavyComputing(a, b), [a, b]);
  ```
  
  useMemo 的功能是**为工厂函数返回一个记忆化的计算值，在两次渲染之间，只有依赖数组中的依赖值发生变化时，该 hook 才会调用工厂函数重新计算，将新的返回值记忆化并返回给组件。**

    useMemo 的重要使用场景是，将执行成本较高的计算结果存入缓存，通过减少重复计算来提升组件性能。我们依旧用上节课的斐波那契数列递归函数来举例，从state 中获取 num ，转换成整数 n 后传递给函数 ，即计算第 n 个斐波那契数：
    
    ```js
    const [num, setNum] = useState('0')
    const sum = useMemo(() => {
      const n = parseInt(num, 10)
      return fibonacci(n)
    }, [num])
    ```
    
    状态num 的初始值是字符串 '0' ，组件挂载时 useMemo 会执行一次 fibonacci(0) 计算并返回 0 。如果后续通过文本框输入的方式修改 num 的值，如 '40' ， '40' 与上次的 '0' 不同，则 useMemo 再次计算 fibonacci(40) ，返回 102334155 ，如果后续其他 state 发生了改变，但 num 的值保持 '40' 不变，则 useMemo 不会执行工厂函数，直接返回缓存中的 102334155 ，减少了组件性能损耗。

* 然后是 `useCallback` ：它会把作为第一个参数的回调函数返回给组件，只要第二个参数依赖值数组的依赖项不改变，它就会**保证一直返回同一个回调函数（引用）**，而不是新建一个函数，这也保证了回调函数的闭包也是不变的；相反，当依赖项改变时，useCallback 才会更新回调函数及其闭包。
  
  上节课讲什么是纯函数时，我们顺带提到了纯组件的特性：当组件的 props 和 state 没有变化时，将跳过这次渲染。而你在函数组件内频繁声明的事件处理函数，比如 handleSubmit ，在每次渲染时都会创建一个新函数。

    如果把这个函数随着 props 传递给作为子组件的纯组件，则会导致纯组件的优化无效，因为每次父组件重新渲染都会带着子组件一起重新渲染。这时就轮到useCallback 出马了，使用妥当的话，子组件不会盲目跟随父组件一起重新渲染，这样的话，反复渲染子组件的成本就节省下来了。

* `hooks 的使用规则`
  
  我们前面学习了基础的状态和副作用 Hooks，以及部分扩展 Hooks，相信你对这种函数式的 API 有了更进一步的了解。

  虽然借鉴了很多函数式编程的特性，Hooks 本身也都是 JavaScript 函数，但 Hooks 终归是一套 React 特有的 API，使用 Hooks 并不等于函数式编程，也不能把函数式编程的各种最佳实践完整地搬到 Hooks 身上。

  比起传统的函数式编程，有两条限制，需要你在使用 Hooks 时务必注意。

1. **只能在 React 的函数组件中调用 hooks **
   
   这也包括了在自定义的 Hook 中调用其他 Hooks 这样间接的调用方式，目的是保证 Hooks 能“勾”到 React 的虚拟 DOM 中去，脱离 React 环境的 Hooks 是无法起作用的。

2. **只能在组件函数的最顶层调用 hooks** 
   
   无论组件函数运行多少遍，都要保证每个 Hook 的执行顺序，这样 React 才能识别每个 Hook，保持它们的状态。当然，这就要求开发者不能在循环、条件分支中或者任何 return 语句之后调用 Hooks。
* `用类组件还是函数组件加 hooks ？`
  
  可以认为函数组件已经代替类组件成为主流组件形式，学习好函数组件加 Hooks，基本就可以应对主流 React 应用开发了。

  二是先入为主。类组件和函数组件代表了两种不同的编程方式，前者更面向对象，后者更接近函数式编程。先学习类组件，会让开发者倾向于用面向对象的思路理解 React 的各种概念，而实际上，在 React v18.2.0 版本的源码中，面向对象的比重已经越来越低了。这时再去学习类组件以外的概念，开发者就不得不先修正之前的理解。

  我有不少同事完整经历了从类组件到函数组件加 Hooks 的转换，我观察到，当他们在已经掌握类组件的基础上再学习 Hooks 时，会不自觉地从前者中寻找参照物，一旦发现在特定的功能上找不到参照物时，多少会走些弯路。

  比如他们会用 useEffect 理解成类组件里的 componentDidMount 和 componentWillUnmount ，但他们意外地发现 useEffect 在每次组件更新时都会被执行。学完前面内容的你，相信已经知道其中的原因了。

  反过来优先学习函数组件加 Hooks，可以让开发者更直接地接触 React 元素、props、state、协调、渲染这些核心概念，提升学习效率和效果。

## 事件处理

> 我们讲到的组件逻辑以展示为主，与用户的交互是偏单向的，而在实际项目中，Web 应用也包含很多双向交互。实现双向交互的一个重要途径，就是**事件处理**。
> 
> 在浏览器中，事件处理不是一个新鲜的概念。标准的 DOM API 中，有完整的 DOM 事件体系。利用 DOM 事件，尤其是其捕获和冒泡机制，网页可以实现很多复杂交互。
> 
> React 里内建了一套名为合成事件（SyntheticEvent）的事件系统，和 DOM 事件有所区别。不过第一次接触到合成事件概念的开发者，常会有以下疑问：
> 
> * 什么是 React 合成事件？
> * 为什么要用合成事件而不直接用原生 DOM 事件？
> * 合成事件有哪些使用场景？
> * 有哪些场景下需要使用原生 DOM 事件？
> 
> 经过这节课的学习，你将了解到合成事件的底层仍然是 DOM 事件，但隐藏了很多复杂性和跨浏览器时的不一致性，更易于在 React 框架中使用。在 oh-my-kanban 出现过的受控组件，就是合成事件的重要使用场景之一。此外，我们还会利用其他合成事件为看板卡片加入拖拽功能，顺便了解一下合成事件的冒泡捕获机制。最后，我会介绍一些在 React 中使用原生 DOM 事件的场景。

* `什么是 React 合成事件？`

  如果你熟悉原生 DOM 事件的使用，应该会很熟悉这种写法：

```html
<!-- 这是HTML不是JSX -->
<button onclick="handleClick()">按钮</button>
<input type="text" onkeydown="handleKeyDown(event)" />
```

  在 React 中，HTML 元素也有类似的、以 on* 开头的事件处理属性。最直接的不同是，这些属性的命名方式遵循驼峰格式，如 onClick、onKeyDown。

  在 JSX 中使用这些属性时，**需要传入函数，而不能是字符串**

```js
const Component = () => {
  const handleClick = () => {/* ...省略 */};
  const handleKeyDown = evt => {/* ...省略 */};
  return (
    <>
      {/* 这次是JSX了 */}
      <button onClick={handleClick}>按钮</button>
      <input type="text" onKeyDown={evt => handleKeyDown(evt)} />
    </>
  );
};
```

  以上面的 button 为例，开发者将 handleClick 函数传入 onClick 属性。在浏览器中，当用户点击按钮时，handleClick 会被调用，无论开发者是否需要，React 都会传入一个描述点击事件的对象作为函数的第一个参数。而这个对象就是 React 中的合成事件（SyntheticEvent）。

  合成事件是原生 DOM 事件的一种包装，它与原生事件的接口相同，根据 w3c 规范，React 内部规范化了这些接口在不同浏览器之间的行为，开发者不用再担心事件处理的浏览器兼容性问题。

* `合成事件与原生 DOM 事件的区别`
  
  包括刚才提到的，对事件接口在不同浏览器行为的规范化，合成事件与原生 DOM 事件之间也有着一系列的区别。
  
  1. 注册事件监听函数的方式不同
  2. 特定事件的行为不同
  3. 实际注册的目标 DOM 元素不同

* `受控组件与表单`
  
  表单处理是前端领域一个常见需求，在 React 中也是一个重要场景。我们看一下目前 oh-my-kanban 项目中唯一的表单代码（省略了部分代码）：
  
  ```js
  const KanbanNewCard = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const handleChange = (evt) => {
      setTitle(evt.target.value);
    };
    // ...省略
  
    return (
      <li>
        <h3>添加新卡片</h3>
        <div>
          <input type="text" value={title} onChange={handleChange} />
        </div>
      </li>
    );
  };
  ```
  
  用户在文本框中输入文本时，会触发 onChange 合成事件，调用 handleChange(evt) 函数，handleChange 函数又会将文本框变更后的值保存在组件 state title 中，state 的变化导致组件重新渲染，文本框的当前值会更新成 title ，与刚才的更新值保持一致。

  可以看出，这一过程形成了一个闭环。这种以 React state 为 **单一事实来源** （Single Source of Truth），并用 React 合成事件处理用户交互的组件，被称为**“受控组件”**。

  除了文本框之外，大部分表单元素，包括单选框、多选框、下拉框等都可以做成受控组件。当这些元素组合成一个表单时，开发者可以很容易获取到任一时刻的表单数据，然后进一步做验证、提交到服务器端等操作。

  其实看板新卡片组件里文本框的 onKeyDown ，可以看作是提交表单。用户按回车后， handleKeyDown 函数会通过 onSubmit 属性将表单值传给父组件：

```js
const KanbanNewCard = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const handleChange = (evt) => {
    setTitle(evt.target.value);
  };
  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      onSubmit(title);
    }
  };

  return (
    <li>
      <h3>添加新卡片</h3>
      <div>
        <input type="text" value={title}
          onChange={handleChange} onKeyDown={handleKeyDown} />
      </div>
    </li>
  );
};
```

  你也可以选择显式地将这些表单元素集中在一个 form 表单里，这样你就可以利用表单的 onSubmit 事件来规范提交表单的时机。但要注意，这里需要禁用掉表单提交事件的默认行为：

```js
const Form = () => {
  // ...省略
  const handleSubmit(evt) {
    console.log('表单元素state');
    evt.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit}>
      {/* 省略 */}
      <input type="submit" value="提交" />
    </form>
  );
};
```

* `合成事件的冒泡和捕获`
  
  需要进行代码

* `什么时候使用原生DOM事件？`
  
  一般情况下，React 的合成事件已经能满足大部分的需求了，有两种情况例外
1. 需要监听 React 组件树之外的 DOM 节点的事件。这也包括了 window 和 document 对象的事件。需要注意的是，在组件里监听原生 DOM 事件，属于典型的副作用，所以务必在 useEffect 中监听，并在清除函数中及时取消监听。
   
   ```js
   useEffect(() => {
     window.addEventListner('resize', handleResize);
     return function cleanup() {
       window.removeEventListner('resize', handleResize)
     }
   }, [])
   ```

2. 很多第三方框架，尤其与 React 异构的框架，在运行时会生成额外的 DOM 节点。在 React 应用中整合这些框架时，常会有非 React 的 DOM 侵入 React 渲染的 DOM 树中。当需要监听这类框架的事件时，要监听原生 DOM 事件，而不是 React 合成事件。这同样也是 useEffect 或 useLayoutEffect 的领域。当然，只要你知道原理，也完全可以用原生 DOM 事件加上一些特殊处理来替代合成事件，但这种做法就没那么“React”了。
* 小结
  
  我们介绍了 React 合成事件，知道了合成事件是原生 DOM 事件的一种规范化的封装，也了解了它在注册监听方式、onChange 等特定事件的行为、实际注册的目标 DOM 这三个方面与原生 DOM 事件的区别。

  然后在 oh-my-kanban 代码基础上，我们进一步学习了受控组件和表单处理，也上手为看板加入了卡片拖拽的功能，并顺路实践了合成事件的事件冒泡和事件捕获。

  最后，我们还列举了一些合成事件力不能及，必须监听原生 DOM 事件的场景。

## React 组件之间的数据流转

> 我们在 React 应用中写了多段逻辑代码之后，代码之间是如何串联起来的？
> 
> 反过来说，怎样才能把每段代码写在它合适的地方，让它们各司其职，支撑应用跑起来呢？
> 
> 接下里，我们需要把视野从单个 React 组件中拓展开来，看看组件与组件之间的分工和交互，从而解决上述问题
> 
> 本节是 React 的单向数据流。当你理解了在 React 的设计哲学中数据应该如何流转，就会对如何设计 props 和 state 了然于心

* `什么是数据流？`
  
  提到数据流，要先提一下 **函数响应式编程**，顾名思义，函数响应式编程是一种利用函数式编程的部件进行响应式编程的编程范式。

  数据流 则是其中响应式编程的重要概念。响应式编程将程序逻辑建模成为在：**运算之间流动的数据及其变化**。

  简单的例子，对于 b = a * 2 这个赋值语句，如果把 a * 2 定义为一个运算，那么如果流动进来的 a 发生了改变，则 b 会自动响应前者的变化。

  看到这个例子就会想到 React 的设计哲学 UI = f(state) ，比如一个函数组件 ({ a }) => (<>{ a * 2 }<>) ，只要 prop 属性 a 发生变化，组件渲染的<>包含的内容就会自动变化。

  当然，一个程序往往会包含多个运算，当数据流经过多个运算时，每个运算只负责自己的部分，这样的数据处理过程有点像是工厂流水线，那类比到 React 应用呢？

  我们知道 React 的开发单元是组件，多个组件在运行时会形成一颗组件树，根组件会沿着子组件树传递数据。对于任意一条从根组件到叶子节点组件的路径，都可以看作是一条工厂流水线，而每个组件都是流水线上的一道工序，对流过的数据各取所需，完成本职工作。

* `React 的数据流包含哪些数据？`
  
  React 的数据主要包含了三种数据：属性prop 状态state 上下文context
  
  这三个概念在 React 中是属于专有名词，我们系统来学习一下
1. props
   
   自定义 React 组件接受一组输入参数，用于改变组件运行时的行为，这组参数就是 props
   
   在声明函数组件时，函数的第一个参数就是 props ，有以下两种写法
   
   * 一个是在组件内部读取 props 对象的属性
   * 另一个是通过 es6 的解构赋值语法展开函数参数，直接在组件内部读取单个 prop 变量
   
   这两个写法本质都是相同的
   
   ```js
   function MyComponent(props) {
     return (
         <ul>
           <li>{props.prop1}</li>
         <li>{props.prop2}</li>
       </ul>
     )
   }
   
   function MyComponent({ prop1, prop2 }) {
     return (
         <ul>
           <li>{props.prop1}</li>
         <li>{props.prop2}</li>
       </ul>
     )
   }
   ```
   
   第二种写法有些很方便的功能，比如为 prop 设置默认值
   
   function MyComponent({prop1, prop2, option = 'default'}){ }
   
   以及 es2018 的剩余参数写法，将解构剩余属性赋值给一个变量，便于传给子元素：
   
   ```js
   function MyComponent({ prop1, prop2, ...restProps }) {
     return (
         <ul {...restProps}>
           <li>{props.prop1}</li>
         <li>{props.prop2}</li>
       </ul>
     )
   }
   ```
   
   注意：类组件的 props 可以通过 this.props 读取
   
   无论哪种写法，props 都是 **不可变的** ，不能在组件内改写从外面传进来的 props

     上面了解到如何声明 props ，再看看如何赋值。在其他组件中使用子组件时，可以通过 JSX 语法为子组件的 props 赋值：
    
     ```js
    
     const ParentComponent = () => (
       <MyComponent prop1="文本" prop2={123} booleanProp={false}
         onClick={(evt) => {console.log('clicked')}} />
     );
     ```
    
    
    
     说回数据流，props 的数据流向是单向的，只能从父组件流向子组件，而不能从子组件流回父组件，也不能从当前组件流向平级组件

2. state
   
   在 props 之外，组件也可以拥有自己的数据，对于一个函数而言，“自己的数据”一般是指函数内声明的变量。

     而对于一个函数组件来说，因为每次渲染函数体都会重新执行，函数体内变量也会被重新声明，如果需要组件在它的生命周期期间拥有一个 “稳定存在” 的数据，那就需要为组件引入一个专有的概念 state
    
    
    
     在函数组件中使用 state，需要调用 useState/useReducer hooks。这两个 hook 我们学过，如下例子
    
     ```js
    
     function MyComponent() {
       const [state1, setState1] = useState('文本');
       const [state2, setState2] = useState(123);
       const handleClick = () => {
         setState1('更新文本');
         setState2(456);
       };
       return (
         <ul>
           <li>{state1}</li>
           <li>{state2}</li>
           <li><button onClick={handleClick}>更新state</button></li>
         </ul>
       );
     }
     ```
    
     需要反复强调的是，state 和 props 一样，也是不可变的。需要修改 state 时，不能直接给 state 变量赋值，而是必须调用 state 更新函数，即 setXXX/dispatch 或 this.setState
    
    
    
     当 组件的 state 发生改变时，组件将重新渲染。那什么才算是改变呢？从底层实现来看，React 框架是通过 Object.is() 来判断两个值是否不同的。尤其注意，当新旧值都是对象，数组，函数时，判断依据是它们的值引用是否不同。
    
    
    
     对同一个对象属性的修改不会改变对象的值引用，对同一个数组成员的修改也不会改变数组的值引用，在 React 中都不认为是变化。所以在更新这类 state 时，需要新建对象、数组：
    
     ```js
    
     function MyComponent() {
       const [obj, setObj] = useState({ a: '文本', b: true });
       const [arr, setArr] = useState([1, 2, 3]);
       const handleClick = () => {
         setObj({...obj, a: '更新文本'}); // ...对象展开语法
         setArr([...arr, 4, 5, 6]); // ...数组展开语法
       };
       return (
         <ul>
           <li>{obj.a}</li>
           <li>{arr.join(',')}</li>
           <li><button onClick={handleClick}>更新state</button></li>
         </ul>
       );
     }
     ```
    
     还需要注意的就是 state 更新的 异步性 和 自动批处理。如果印象有些模糊了，记得复习。
    
    
    
     再来看看 state 的数据流向，当读取和更改 state 都发生在同一组件中时，state 的流动仅限于当前组件之内。
    
    
    
     如果希望由子组件或后代组件来更改 state，需要将对应的 state 更新函数包在另一个函数，比如事件处理函数中，然后将函数以 props 或 context 的方式传给子组件或后代组件，由它们来决定调用的时机和参数。当这个函数被调用，state 被更新，当前组件则会重新渲染。

3. context
   
   React 很早就引入了 context 这个概念，它的 API 也经历过新老版本的更迭，用于组件跨越多个组件层次结构，向后代组件传递和共享“全局”数据。
   
   使用 context 分三个步骤：
   
   1. 调用 React.createContext 方法创建 context 对象，如 MyContext:
      
      ```js
      const MyContext = React.createContext('初始值')
      ```

     2. 在组件 JSX 中使用 《MyContext.Provider》组件，定义 value 值，并将子组件声明在前者的闭合标签里：
    
        ```js
        function MyComponent() {
          const [state1, setState1] = useState('文本')
          const handleClick = () => {
            setState1('更新文本')
          }
          return (
              <MyContext.provider value={state1}>
                <ul>
                    <MyChildComponent />
                    <li><button onClick={handleClick}>更新state</button></li>
                </ul>
            </MyContext.provider>
          )
        }
        ```
    
    
    
     3. 为子组件或后代组件中使用 useContext hook 获取 MyContext 的值，这个组件就成为 MyContext 的消费者（Consumer）：
    
        ```js
    
        function MyChildComponent() {
          return (
            <MyGrandchildComponent />
          );
        }
    
        function MyGrandchildComponent() {
          const value = useContext(MyContext);
          return (
            <li>{value}</li>
          );
        }
        ```
    
        其中 MyContext.Provider 是可以嵌套使用的。
    
        MyGrandchildComponent 组件会去到组件树，从它的祖先节点中找到离它最近的 MyContext.Provider 即 MyComponent ，读取后者的 value 值；当 MyComponent 的 state1 ，也就是 MyContext.Provider 的 value 值发生更改时，会通知到它后代组件中所有消费者组件重新渲染。
    
    
    
        Context.Provider 的 value 值也可以传一个对象进去，但要注意写法，避免在组件重新渲染时反复创建新的对象，比如利用 state 或 useMemo ：
    
        ```js
    
        // 不要这样写
        function MyComponent() {
          const [state1, setState1] = useState('文本');
          // ...
          return (
            <MyContext.Provider value={{ key1: state1 }}>
              <MyChildComponent />
            </MyContext.Provider>
          );
        }
    
        // 可以利用state
        function MyComponent() {
          const [obj, setObj] = useState({ key1: '文本' })
          // ...
          return (
            <MyContext.Provider value={obj}>
              <MyChildComponent />
            </MyContext.Provider>
          );
        }
    
        // 也可以利用useMemo
        function MyComponent() {
          const [state1, setState1] = useState('文本');
          const obj = useMemo(() => ({ key1: state1 }), [state1]);
          // ...
          return (
            <MyContext.Provider value={obj}>
              <MyChildComponent />
            </MyContext.Provider>
          );
        }
        ```
    
        从数据流的角度来看，context 的数据流向也是单向的，只能从声明了 Context.Provider 的当前组件传递给它的子组件树，即子组件和后代组件。而不能向父组件或祖先组件传递，也不能向当前子组件树之外的其他分支组件树传递。正如下图所示：
    
        ![](https://static001.geekbang.org/resource/image/1f/cc/1fec023c27077010ef7e61dd1960e6cc.jpg?wh=1000x563)
    
        至此，我们介绍完了 props、state 和 context 这三个概念。其中 props 和 state，我们已经在 oh-my-kanban 中做了丰富的实践，至于 context，我们下节课会利用它为看板加入管理员功能。接下来，仍然让我们将注意力集中在数据流上。

* `React 的单向数据流`

  上面说的 props、state、context 共同组成了 React 组件的数据流，我们知道 React 是一种声明式的前端框架，在 React 的数据流上也体现了这一点。在典型场景下，可以通过声明这三种数据来设计 React 应用的数据流，进而控制应用的交互和逻辑。

  只要这三种数据的变更会自动通知到 React 框架，触发组件必要的重新渲染。当你的数据流中混入了不属于它们其中任意一种的数据，就要小心，这种跳出“三界之外”的数据很有可能带来 bug，比如数据改变了但组件并不重新渲染。

  这种 Bug 其实并不难定位，但当项目代码比较多，逻辑变得复杂时，你还是有可能会搞混数据的来源，花不少时间去 Debug。顺便提一下，“三界之外”这个说法来自于我的一位同事，当时她正是遇到了这类 Bug，我们一起调试了好久才恍然大悟。

  虽然说 props、state 和 context 是不同的概念，但从一棵组件树的多个组件来看，同一条数据在引用不变的前提下，在传递过程中却可以具有多重身份。

  比如，一条数据最初来自于组件 A 的 state，通过 props 传递给子组件 B 后就成为了组件 B 的 prop。再比如，另一条数据来自于组件 A 的 state，通过在 A 中声明 context 传给了子组件树，子组件 B 的子组件 C 消费了这个 context 值。

  从三者分别的流向可知，React 整体的数据流也是单向的

## 用接口的思路设计开发 React 组件

## 工程化

> 写出来的源码毕竟还不能用来上线，还得经过 npm run build 打包构建出生产环境代码，然后才能上线。你可能会好奇，这个命令都做了什么？这个命令是 CRA，由 Create React App 脚手架工具提供，它的内部对开发者而言是个黑盒。要想了解它，我们得先把黑盒打开，或者，用更好的方式：自己搭一个**白盒**出来。
> 
> 我们需要不依赖 CRA，用现代的工程化技术重新搭建一个 React 项目，然后把 oh-my-kanban 的代码迁移过来。

* `CRA 为我们做了什么？`
  
  我们用 FB 官方提供的 CRA 脚手架工具创建了 oh-my-kanban 项目，在这之后我们就一直专注于代码开发，再也没有关注过项目配置了。现在 oh-my-kanban 项目开发已经步入正轨，是时候回过头来看看 CRA 为我们做了哪些事情。
  
  在项目根目录 package.json 文件的 scripts 节点下，有四个 NPM 命令。
  
  最先接触的 npm start ，你对它的使用应该已经比较熟悉了。这个命令启动了一个开发服务器（Dev Server），内置了开发环境构建（Development Build）、监听文件变化（Watch）、增量构建（Incremental Build）、模块热替换（Hot Module Replacement）等功能。其实这些功能你在前面的开发实践中都用到了。
  
  与这个命令对应的还有生产环境构建。
