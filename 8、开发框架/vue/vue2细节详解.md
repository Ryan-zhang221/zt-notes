## 🚀 为什么 data 中要返回一个对象？



```vue
<script type="text/javascript">
	export default {
    data() {
      this.num = 12;
      return {
        a: 1,
        b: 2,
        c: 3
      }
    },
    
    methods: {
    
  	}
  }
</script>
```



我们可以发现，一个 vue 文件实际上暴露出去之后就是一个 VueComponent 对象，而其中的数据啊方法啊都是这个对象的一个个属性，比如说数据，我们在 data(){} 方法中 return 出去的这个对象里面的属性会被全部保存在 VueComponent 对象的 $data 属性中，与此同时，data(){} 中 return 出去的这些属性也会保存在 VueComponent 对象的第一层内。



这样，我们在 .vue 文件中就可以使用 this.a/this.b/this.c 等来访问或修改这些属性，而不是 this.$data.a ...



当然，我们也可以直接在 data(){} 方法中不 return ，直接声明属性，这样的话就不会保存在 VueComponent 对象的 $data 属性中去，这时，数据依然是双向绑定的，但是 watch 监听这些特殊的属性时，无法像常规那样监听到原本的值和修改后的值。



那我们回答问题：对象为引用类型，当重用组件时，由于数据对象都指向同一个data对象，当在一个组件中修改data时，其他重用的组件中的data会同时被修改；而使用返回对象的函数，由于每次返回的都是一个新对（Object的实例），引用地址不同，则不会出现这个问题。

组件是一个可复用的实例，当你引用一个组件的时候，组件里的data是一个**普通的对象**，所有用到这个组件的都**引用的同一个data**，就会造成**数据污染**。
将data封装成函数后，在实例化组件的时候，我们只是**调用了data函数生成的数据副本**，避免了数据污染。





## 🐴 computed 和 methods 的区别

 在模版中使用一些复杂数据时，不宜写入过多的运算过程，这样的代码不好维护。我们需要使用 computed 计算属性来帮助我们实现，如下，同理，我们也可以使用 methods 来实现同样的事情。那么，两者区别呢？

```vue
<template>
	<div>
    computed: {{ total }}
  </div>
	<hr />
	<div>
    methods: {{ getTotal() }}
  </div>
</template>
<script>
	export default {
    data() {
      return {
        price: 10,
        num: 100
      }
    },
    
    computed: {
      total() {
        return this.price * this.num
      }
    },
    
    methods: {
      getTotal() {
        return this.price * this.num
      }
    }
  }
</script>
```



最重要的区别就是：computed 有缓存。



例如，我们在模版中使用多次某个需要计算的属性之后，如果我们使用 methods 中的方法，那么每次使用时，都会去调用该方法。但是，如果我们使用了计算属性 computed ，就会发现，在数据不变的情况下，我们每次使用时不会重新去调用 computed 中的方法，而是使用上次计算后的结果。



注意，有个细节，计算属性，顾名思义就是计算后的属性，你要是直接上手去修改是不被允许的，比如`this.total = '123'` 。但是我们有一种特殊的办法来修改，如下，其实就是自定义 get 和 set 方法

```vue
<script>
	export default {
    data() {
      return {
        str: 'hello world'
      }
    },
    
    computed: {
      total：function() {
        return this.str
      },
      change: {
        get() {
          return this.str
        },
        set(val) {
          this.str = val
        }
      }
    }
  }
</script>
```

这里有点细节要描述下：computed 本质上是一个对象，而 getter 是一种获得属性值的方法，setter是一种设置属性值的方法。所以我们获取 change 属性值时，就会进入我们定义的 get(){} 方法中，同理设置 change 值时，就会进入 set(){} 方法中。



我还有一个疑问：看上述代码，total 是一个函数，而 change 是一个对象，刚开始我不理解，想了一会儿，应该是这样的，其实 total 本身也可以改写成如下形式：

```js
computed: {
  total: {
    get() {
      return this.str
    }
  }
}
```

使用 total(){} 或者 total: function(){} 的形式仅仅是为了让它不被修改，保持纯粹的计算属性功能。但是如果我们非要改，就可以使用对象的写法，暴露出来 set(){} 方法。





## ☁️ 单向数据流（v-bind）



vue 是一个 MVVM 框架，其中的 M 指的是 （数据），而 V 指的是视图层 （template）

这里的单向数据流就是值数据从 M 流向了 V

我们使用 v-bind: （简写：）来绑定的数据都是单向数据流，只有数据改变了，视图会变，但是视图改变后，数据M是不会变的。

还有一点，所有的属性都是可以绑定的，也就是说，模版中所有的属性都可以与数据进行单向的流动。



有一点，localhost:8080 其实是 public 目录下的 index.html ，而不是 src 目录，所以静态资源应该放在 public 目录下才可以。





## 🥢 单向数据流和双向数据流



v-bind:xxx ——单向数据流

v-modal ——双向数据流，双向绑定

```vue
<input type="text" v-model="value" />
```



使用场景：

单向绑定主要用于：纯展示的数据

双向绑定主要用于：有交互的行为，例如修改和输入行为，我们要在js中获取





## 🌺 生命周期



Vue2.x中的生命周期有以下：

创建前、后：beforeCreate、created

挂载前、后：beforeMount、mounted

修改前、后：beforeUpdate、updated

销毁前、后：beforeDestory、destoryed



created 和 mounted 的理解和区别：

https://juejin.cn/post/7063098432184909832

created在模板渲染成html前调用

mounted在模板渲染成html后调用



浏览器简单渲染流程

- 构建DOM树
- 构建css规则树,根据执行顺序解析js文件。
- 构建渲染树Render Tree
- 渲染树布局layout
- 渲染树绘制



阶段详解

beforeCreate阶段：对浏览器来说，整个渲染流程尚未开始或者说准备开始，对vue来说，实例尚未被初始化，data observer和 event/watcher也还未被调用，在此阶段，对data、methods或文档节点的调用现在无法得到正确的数据。

created阶段：对浏览器来说，渲染整个HTML文档时,dom节点、css规则树与js文件被解析后，但是没有进入被浏览器render过程，上述资源是尚未挂载在页面上，也就是在vue生命周期中对应的`created`阶段，实例已经被初始化，但是还没有挂载至 **$el**上，所以我们无法获取到对应的节点，但是此时我们是可以获取到vue中data与methods中的数据的

beforeMounted阶段：实际上与`created`阶段类似，节点尚未挂载，但是依旧可以获取到data与methods中的数据。

mounted阶段：对浏览器来说，已经完成了dom与css规则树的render，并完成对render tree进行了布局，而浏览器收到这一指令，调用渲染器的paint（）在屏幕上显示，而对于vue来说，在`mounted`阶段，vue的**template成功挂载在$el中**，此时一个完整的页面已经能够显示在浏览器中，所以在这个阶段，即可以调用节点了（关于这一点，在笔者测试中，在mounted方法中打断点然后run，依旧能够在浏览器中看到整体的页面）。



什么场景下使用？

created：一般是用于请求接口，通常用于**初始化某些属性值**，例如data中的数据，然后再渲染成视图。

mounted：主要是用来操作 dom，通常在初始化页面完成后，**对html的dom节点进行需要的操作**。

updated：观测数据是否更新，页面上内容发生了变动后使用。注意，beforeUpdate 和 updated 里面获取修改前后的值时，获取到的都是修改后的值

destoryed：页面销毁时（关闭前）调用，一个典型使用场景是，当一个视频页面播放了一会，下一次进来我要接着之前的播放，我们就需要在页面关闭前记录下当前播放的时间，下次进同一个页面时就从这里开始播放。





vue的一些api补充：

this.$data  ——>  当前组件的 data 数据

this.$el  ——>  当前组件的节点（dom）其实就是 template 中



一些面试题

1. 第一次进入页面（组件）会执行哪些声明周期？

   beforeCreate：    没有 this.$data❌ ，没有 this.$el❌，没有methods❌

   created：                 有 this.$data✅ ，没有 this.$el❌，有methods✅

   beforeMount：        有 this.$data✅ ，没有 this.$el❌，有methods✅

   mounted：               有 this.$data✅，有 this.$el✅，有methods✅



生命周期原理：vue实例的构造函数 Vue 内部实现了流程控制，比如 beforeCreate 函数在 this.$data 之前执行，这样就访问不到 $data 了。

```js
Class Vue{
  constructor(options) {
    options.beforeCreate.bind(this)();
    this.$data = options.data;
    options.created.bind(this)();
    options.beforeMount.bind(this)();
    options.destory.bind(this)();
  }
}
```





## ✈️ 请求接口时的跨域问题



跨域：



我们自己搞一个接口来：

cnpm install -g express

cnpm install -g express-genetator

express server --view=ejs

进入server文件夹 server/routes/index.js 自己写一个接口

```js
router.get('/list', function(req, res, next){
  res.send({
    "a": 1
  })
})
```

重启server

访问：localhost:3000/list

我们使用 localhost:8080 来请求这个接口就会出现跨域问题

要么前端解决，要么后端解决

后端的解决办法：直接在小鹿线官网——博客——搜索node.js解决跨域问题——把代码复制到接口所在 index.js 文件内即可

我们前端的解决办法就是设置代理解决：（注意：这个方法在生产环境是不生效的！！！）

* 打开项目vue.config.js文件

* 在官网：https://cli.vuejs.org/zh/config/#devserver 查看devServer

* 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过 `vue.config.js` 中的 `devServer.proxy` 选项来配置。

* 我们直接在vue.config.js中加入

  ```json
  module.exports = {
    devServer: {
      proxy: 'http://localhost:3000'
    }
  }
  ```

* 设置完代理后一定要重启项目



由于我们跨域问题只能 开发环境 生效，而我们 npm run build 打包之后，也就是到了 生产环境，这个跨域问题是没有解决的（代理不生效）那么我们应该怎么做呢？

我们要引出一个东西叫——环境变量

环境变量🈯️ 随着环境的改变，你这个值也会跟着变。开发 和 生产 环境不同，那么这个值也不同。

我们在项目根目录中创建两个文件： .env.develoment 文件和 .env.production 文件

我们如果使用 npm run dev 就会运行这个文件 .env.develoment 中代码，同理，如果我们使用 npm run build 那么就会运行 .env.production 这个文件代码。

.env 文件中属性名必须以 VUE_APP_ 开头，且不要 const let var 这些来声明变量

```
VUE_APP_BASE_URL = localhost:3000
```

项目中如何调用 .env 文件中的变量呢？  必须使用 process.env.VUE_APP_XXX 这种方式来调用







## axios的二次封装



基本步骤如下：

下载引入 axios

创建 axios 对象

请求拦截器

响应拦截器

返回 axios 对象





## $nextTick 和 Ref



```vue
<script>
export default {
  created() {
    console.log('created')
    getData().then(res => {
      console.log('res', res)
    })
  },
  mounted() {
    console.log('mounted')
  }
}
</script>
```

注意以上代码，我们可以知道，打印顺序是 created、mounted、res ，为什么是这样呢？因为 JS 的逻辑是等所有的同步代码执行完毕之后再执行异步代码。所以我们请求接口的信息是最后打印的。并且，由于 created 阶段是没有 $el 的，所以无法访问真实 dom，但是 created 里面的接口中反而可以访问真实 dom 的原因也是如此。

因此引出了一个问题，我们如果在接口里面访问真实 dom 高度时，由于渲染需要时间，异步函数执行时 dom 没有更新完成，这时获取的高度就会是 0 ，因此引出了 $nextTick 方法

$nextTick方法是 🈯️ 获取更新后的 dom ，也就是说这个步骤是在整个页面的所有操作都完成之后才调用的 （除了手动操作）。我们用 JS 来理解的话就是 window.onload() 方法，这个方法用于在网页加载完毕后立刻执行的操作。（因为 JavaScript 中的函数方法需要在 HTML 文档渲染完成后才可以使用，如果没有渲染完成，此时的 DOM 树是不完整的，这样在调用一些 JavaScript 代码时就可能报出"undefined"错误。）

这里插入一张图片

![](https://www.runoob.com/wp-content/uploads/2019/05/20171231003829544.jpeg)



$nextTick 的原理简单理解：Vue 类中增加了一个 $nextTick 方法，这个方法返回了一个 promise 即可。

```js
Class Vue{
  constructor(options) {
    this.$data = options.data;
    options.created.bind(this)();
   	this.$el = document.querySelector(options.el);
    options.mounted.bind(this)();
  }
  $nextTick(callback) {
    return Promise.resolve().then(() => {
      callback()
    })
  }
}
```



现在来看下简便获取 dom 的方法：ref

我们之前获取 dom 的方法都是使用 document.getElementById('box') 这种方式，比较原始

现在我们可以给 html 中的元素加上 ref='xxx' ，比如 `<div ref='box'></div>`，然后我们在 vue 中使用 this.$refs.box 或者 this.$refs['box'] 这两种方法来方便获取，多个也可以如此获取。







## 组件传值



父传子



父组件如何传递

1. 死数据

   `<Header msg="这是父组件的数据"></Header>`

2. 活数据：单向绑定

   ```js
   <Header :msg="str"></Header>
   
   data() {
     return {
   		str: 'hello world'
     }
   }
   ```



子组件如何接收

1. 数组形式

   ```vue
   <script>
   export default {
   	props: ['msg']
   }
   <script>
   ```

   

2. 对象形式

   ```vue
   <script>
   export default {
   	props: {
       msg: {
         type: String,
         default: 'msg'
       },
       aaa: {
         type: Number,
         default: 'aaa'
       }
     }
   }
   <script>
   ```



这里有一点需要注意：我们从父组件传过来的值，子组件中是不允许修改的，父组件传过来的值我们可以通过 this. 的方式获取到，但是，这个值并没有加入我们子组件的 $data 中，我们打印此时的 this 可以看到。

但是！要注意，如果父组件传递过来的值是一个 对象Object 或者 数据Array 的话，我们在子组件中通过 this. 的方式不仅可以获取还可以修改。但是不建议修改。因为引用类型传递过来只是一个内存地址，而实际的值是保存在堆内存里面的，凡是能拿到内存地址的都可以去修改，而且改了之后，引用的所有都会改变。这也是 vue2 的一个问题。





子组件传值给父组件：通过自定义事件来传递



子组件传递

```vue
<button @click="click">
  点击发送给父组件
</button>
<script>
export default {
  data() {
    return {
      msg: '子组件数据'
    }
  }，
  methods: {
  	click() {
			this.$emit('btnClick', this.msg)
    }
	}
}
</script>
```



这里的 `this.$emit('btnClick', this.msg)`可以理解为是这样 `xx.btnClick = function(this.msg){}`





父组件接收

```vue
<Header @btnClick="change"></Header>
<script>
export default {
  methods: {
    change(val) {
      console.log(val)
    }
  }
}
</script>
```







兄弟组件传值——————————————————



前提需要创建一个 bus.js 文件作为总线程

```js
import Vue from 'vue'
export default new Vue();
```



A兄弟 传递：

```vue
<button @click='btn'>
 	传递
</button>
<script>
import bus from '@/utils/bus'
export default {
  methods: {
    bus.$emit('brotherCheck', 'A的数据')
  }
}
</script>
```



B兄弟 接收：

```js
bus.$on('brotherCheck', val => {
  console.log(val)
})
```







## vue路由



router 的文档：https://v3.router.vuejs.org/zh/zpi

路由就是用来负责跳转页面的

vue.js + vue Router 创建的是 单页面应用（SPA）：整个项目只有一个 index.html

单页面应用的缺点：不适合 SEO。优点：适合我们的后台管理系统



我们直接创建vue项目的时候，选择好 router 这一项，这样创建的项目就会自动给我们配置好相关的路由。



我们在 router 文件夹中的 index.js 文件中配置对应路由时有两种方式：直接引用和懒加载

```js
const route = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../component/about.vue')
  }
]
```



懒加载的好处就是：当打包构建应用时，js包会变得特别大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。结合 vue的异步组件 和 webpack 的代码分割功能，可以轻松实现路由懒加载。

所以基本上除了首页都是懒加载



路由的模式

1. history

   ```js
   const router = new VueRouter({
     mode: 'history',
     base: ...
   })
   ```

   

2. hash

   ```js
   const router = new VueRouter({
     mode: 'hash',
     base: ...
   })
   ```



两个的区别：

找不到路由的情况下：history 会发送一次 get 请求，而 hash 则不会

表现形式：hash 多带了一个 # ，而 history 则没有





router-link

router-link 是写在 template 部分的，用来跳转页面，写法`<router-link to='/对应的页面'></router-link>`，这是系统自带的一个组件。

它还有一些参数如下：

to：用来跳转页面的，表示目标路由的链接，这里的 to 可以进行单向绑定，我们可以用 JS 控制

tag：可以渲染成任意标签，比如加上 tag="h1"，那么点击这个 h1 标签就会发生跳转，默认 a 链接

replace：设置这个属性的话，页面无法返回上一页，也就是不会留下 history 记录



router-view

系统自带的一个组件，就是一个容器，防止匹配到的路由组件的地方。



路由懒加载分包

```js
const routes = [
  {
    path: '/course',
    name: 'course',
    component: () => import(/* webpackChunkName: 'course' */ '../course.vue')
  }
]
```

/* webpackChunkName: 'course' */ 这一段就是用来让 webpack 打包的，打包后的 js 文件前缀就是我们这里输入的 这个值。



配置 404 页面

我们先单独新建一个 404.vue 文件，然后引入到 router/index.js 下，这里使用 * 通配符就是说上面的都找不的话就展示这个页面。

```js
import 404Page from '...'
const routes = [
  {
    path: '*',
    component: 404Page
  }
]
```



子路由

项目不一定需要，但是子路由方便管理

配置的话就是在路由文件里面某个页面下面加上 children :[...] 即可



动态路由

也不是必须的，配置的话如下

```js
const routes = [
  {
    path: '/news',
    name: 'news',
    children: [
      {
        path: '/news/:id',
        name: 'newsId',
        component: ()=>import('../views/newsDetail')
      }
    ]
    component: () => import('../views/news.vue')
  }
]
```





路由导航守卫

什么是？一句话简单理解就是，我从 a 是否能进入到 b 页面，比如我们需要进入一个页面前需要判断身份（是否登录），如果登录状态下可以进入，如果没有登录则不可以进入（跳转登录页面）

路由独享导航守卫（用的最多）

使用如下，我们在路由对象中声明 beforeEnter 函数，其中的参数 to、from、next 分别是去哪个页面、从哪个页面去、继续函数

```js
const routes = [
  {
    path: '/home',
    name: 'home',
    beforeEnter: (to, from, next) => {
      next()
    }
  }
]
```



全局导航守卫（其次）

beforeEach

beforeResolve

afterEach



组件内导航守卫（用的最少）

beforeRouteEnter

beforeRouteUpdate

beforeRouteLeave







## vuex

什么是 vuex：集中式存储管理，存储的东西有：全局共享的属性，全局共享的方法...

使用场景：多个组件共用某一个值的时候，组件传值可能很繁琐，此时用全局共享的话比较方便，数据统一管理好维护

vuex中的属性：

* state              有点像组件的data，用来存放共享数据的
* getters           有点像组件的 computed，计算 state 的
* mutations      有点像组件的 methods ，放全局共享方法的
* actions
* modules



基本使用：

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.store({
  state: {
    str1: '这是全局共享的属性',
    num: 0,
    number: 1
  },
  getters: {
    changeStr1() {
      return 1212
    },
    getStr(state) {
      return state.str1
    }
  },
  mutations: {
    add() {
      state.num++;
    }
  },
  actions: {
    addNumber({commit, state}) {
      state.number++;
    }
  },
  modules: {}
})
```

state使用方法一：我们在 store/index.js 文件夹下的 state 中声明一个  str1 变量，然后我们在别的组件中要使用的话，可以不引入，直接通过 $store.state.str1 来使用。在 JS 部分可以通过 this.$store.state.str1 来使用。

state使用方法二：

```vue
<template>
	<div>
    {{ str1 }}
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState(['str1'])
    }
  }
</script>
```



以上两者的区别是：方式一是直接使用的 vuex 中的 state 的源头。而方式二是把 vuex 中的 state 复制了一份到 mapState 中，由此可以知道，**方式一是可以直接修改 vuex 中的值的**。而方式二就不能直接修改 vuex 中的数据。	



getters用法一：同state，直接 this.$store.getters.changeStr1 使用即可

getters用法二：辅助函数形式，注意这里的调用方式是 this.changeStr1 而不是 state 中直接的 str1

```vue
<template>
	<div>
    {{ this.changeStr1 }}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['changeStr1'])
    }
  }
</script>
```

我们组件的 computed 有两种写法，一种是方法，另一种是一个对象，里面有 get 和 set  函数。但是 getters 里面是不允许 set 和 get 这种写法的。因为 vuex 是单向数据流，我们如果使用 v-modal 绑定会报错。

getters 中的方法都可以传递参数，比如我们可以把 vuex 的 state 传入进去，相当于一个二次计算。本质和组件的 computed 一样。



mutations基本用法

用法一：

```vue
<template>
	<div>
    <button @click='add'></button>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    methods: {
      ...mapMutations(['add'])
    }
  }
</script>
```

我们引入进来 mapMutations 然后在 methods 中使用，button 按钮的点击事件就可以正常使用这个方法了，当然也可以传递值过去。但是注意，只能传递一个值，如果要传递多个值，记得搞成一个对象。

用法二：

```vue
<template>
	<div>
    <button @click='btn'></button>
  </div>
</template>

<script>
  export default {
    methods: {
      btn() {
        this.$store.commit('add')
      }
    }
  }
</script>
```

我们通过 commit 的方式提交 mutations



actions基本用法

用法一：

基本和 mutations 类似，也是用来存放方法，但是注意一点：我们传递参数的时候必须是一个 ({ commit, state }){} 这个形式，就是说必须传入一个 commit 参数进去，而且是要用 对象的形式传递。

```vue
<template>
	<div>
    <button @click='addNumber'></button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    methods: {
      ...mapActions(['addNumber'])
    }
  }
</script>
```

用法二：直接使用 dispatch 来提交，同样可以携带参数

```vue
<template>
	<div>
    <button @click='addNumber'></button>
  </div>
</template>

<script>
  export default {
    methods: {
      btn() {
        this.$store.dispatch('addNumber')
      }
    }
  }
</script>
```





总结：mutations 可以通过 commit 来提交，actions 可以通过 dispatch 提交。那么 mutations 和 actions 的区别就是：

* mutations 只能是同步操作，而 actions 可以包含任何异步操作
* actions 提交的是 mutations，而不是直接变更状态。

有一个问题：actions 可以直接修改 state 属性值吗 ？ 答案是可以的，但是不建议这样写。

那我们应该怎么做呢？

mutations 里面实现逻辑，actions 里面来提交 mutations

```js
import Vue from 'vue'
import Vuex from 'vuex',
  
Vue.use(Vuex)

export default new Vuex.store({
  state: {
    num: 1
  },
  getters: {},
  mutations: {
    add(state) {
      state.num++;
    }
  },
  actions: {
    total({commit, state}) {
      commit('add')
    }
  }
})
```

actions 不直接修改状态，修改状态而是要通过 mutations 来修改。





modules 把整个状态管理再次细分，主要取决于你项目的大小，大的话要细分就用，不大就不用

我们在 store 目录下新建一个 modules 文件夹，里面存放多个 js 文件，每个文件就是一个部分在 vuex 中管理的数据，相当于我们把 index.js 文件中的 state 细分为了多个。然后我们在 index.js 文件中引用这些文件，这时我们使用的时候，就可以不使用 state 的这种形式：...mapState(['xxxx', 'yyyyy']) ，而是可以改写为一个对象，然后其中写法如下：

```js
computed: {
  ...mapState({
    组件自定义属性名: state => state.模块.具体属性名
  })
}
```





vuex 的持久化存储

面试题：当某一个组件使用了 vuex 的数据，比如 1 改为了 2，但是刷新页面又到了 1 该怎么办？

vuex 是一个集中式的状态管理工具，本身不是持久化存储，如果要实现持久化存储，可以：

* 自己写 localStorage

  ```js
  export defalut {
    state: {
      num: localStroage.getItem('num') || 1
    },
    mutations: {
      add (state) {
        state.num++;
        localStorage.setItem('num', state.num)
      }
    }
  }
  ```

  

* 使用插件

  小鹿线官网博客搜索：vuex持久化存储插件



面试题：在某个组件中可以直接修改 vuex 的状态（数据 state）吗？

可以

方法一：通过 mutations 方法来修改

方法二：组件直接修改 vuex 数据源 this.$store.state.shop.num = 12

不可以的方式：

* 直接使用辅助函数：比如 this.num = 12







面试题：vuex 中的 getters 属性在组件中被 v-modal 绑定会发生什么？

面试题：vuex 是单向数据流还是双向数据路？

如果修改了会报错，因为vuex 是单向数据流







## 插槽



匿名插槽：插槽没有名字

父：

```vue
<template>
	<HelloWorld>
    <p>111</p>    这个p元素就对应了子组件里面的 slot
  </HelloWorld>
</template>
```

子：

```vue
<template>
	<div>
    <slot></slot>
    <input type="text" />
  </div>
</template>
```





具名插槽：如果有多个插槽的情况下就需要给每个插槽命名，方便我们确定位置，还可以传递数据

父：

```vue
<template>
	<HelloWorld>
    <template #one="user">
			<p>111 {{user}} </p>
		</template>
    <template #two>
			<p>222</p>
		</template>
  </HelloWorld>
</template>
```

子：

```vue
<template>
	<div>
    <slot name="one" :user="user"></slot>
    <input type="text" />
    <slot name="two"></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {name:'ryan', age:16}
    }
  }
}
</script>
```



作用域插槽：可以传递数据的插槽，如上例子







## 查找组件 $parent $root $children



查找父组件：

this.$parent ====》 返回当前组件的父组件实例

this.$root =====> 返回根组件，即当前实例的父实例，如果没有，此实例将会是自己



查找子组件：

this.$children  ======> 返回当前组件所有子组件实例（列表形式），并且可以拿到子组件data中的数据，也可以修改。



面试题：如果父组件想直接修改子组件的数据怎么办？

答：this.$children[0].xxx = 'aaaa'



ref 我们之前学过，是用来获取 dom 的，我们可以通过这种方式变相的获取子组件实例

先在父组件引入子组件的标签中加入 ref 

```vue
<News ref='child'></News>
```

然后获取方式：this.$refs.child

修改子组件数据：this.$refs.child.xxx = 'bbb'





$set的用法：当修改一个响应式数据的时候，数据本身改变了但是视图没有更新，这时使用 $set 进行更新

如下这种情况，我们点击之后 arr 数组已经改变，但是视图层并没有更新，此时就是 $set 的使用场景了

修改方法：this.$set( 目标，修改的key或下标，修改后的值 )

```vue
<template>
	<div>
    {{ arr }}
  </div>
	<button @click='change'></button>
</template>
<script>
export default {
  data() {
    return {
      arr: ['a', 'b', 'c']
    }
  },
  methods: {
    change() {
      this.arr[1] = 'xxxx'
      
	    // 下面这种方式就可以改掉
      // this.$set(this.arr, '1', 'xxxx')
    }
  }
}
</script>
```





## 依赖注入 provide、inject



某组件可以直接向它下面的组件传值，没有组件的父子限制

使用方法：

父：

```vue
<script>
export default {
  provide() {
    return {
      str: 'hello'
    }
  }
}
</script>
```

子：

```vue
<template>
	<div>
    {{str}}
  </div>
</template>

<script>
export default {
  inject: ['str']
}
</script>
```

它有一个问题就是子组件不知道这个数据是从谁那里传过来的





