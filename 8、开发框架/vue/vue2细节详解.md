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





## 单向数据流和双向数据流



v-bind:xxx ——单向数据流

v-modal ——双向数据流













