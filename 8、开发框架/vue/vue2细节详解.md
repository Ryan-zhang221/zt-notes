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





















