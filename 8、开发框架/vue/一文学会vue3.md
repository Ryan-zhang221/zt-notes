# vue2 和 vue3 的区别

1. 3去掉了 filter ，没有了 beforeCreated created 而是用 setup 取代
2. setup 里面没有 this
3. 响应式不区分数组和对象
4. 新增 composition API，更好的逻辑复用和代码组织







# vue3 中常用函数

1. setup函数，可以代替 vue2 中的 data 和 methods 属性，直接把逻辑加在 setup 中
2. reactive 用于为对象添加响应式状态（获取值的时候直接获取，不需要加.value，参数只能传入对象类型）
3. ref用于为数据添加响应式状态（由于reactive只能传入对象类型的参数，而对于基本数据类型要添加响应式状态就只能用ref）
4. toRef 用于为源响应式对象上的属性新建一个ref，从而保持对其源对象属性的响应式连接。接收两个参数：源响应式对象和属性名，返回一个ref数据
5. toRefs 用于将响应式对象转换为结果对象，其中结果对象的每个属性都是指向原始对象相应属性的ref









# vue3 优点

1. 将Vue内部的绝大部分api对外暴露，使Vue具备开发大型项目的能力，例如compile编译api等
2. webpack的treeshaking(tree shaking 是 DCE 的一种方式，它可以在打包时忽略没有用到的代码。)支持度友好
3. 使用Proxy进行响应式变量定义，性能提高1.2~2倍，ssr快了2~3倍
4. 可在Vue2.0中单独使用composition-api插件，或者直接用它开发插件
5. 对typescript支持更加友好
6. 面向未来：对于尤雨溪最近创新的vite开发服务器（舍弃webpack、底层为Koa框架的高性能开发服务器）,直接使用的Vue3.0语法







# Vue3的响应式系统



如下只记录基本使用，不涉及原理解析



setup 语法使用方法如下：

```vue
<script setup>
import { ref, reactive } from 'vue'

let num = ref(0)
let objA = reactive({
  name: 'ryan',
  age: 18,
  job: 'coder'
})

function changeData() {
  num.value++
  objA.age = 25
}
</script>

<template>
  <h2>{{ num }}</h2>
  <p>{{ objA }}</p>

  <button @click="changeData">change</button>
</template>

```

script setup 语法可以帮助我们大量简化代码，如上所示



可以看出来，import 一下 ref 和 reactive 来声明响应式变量

* ref ———— 用来声明基本类型变量

* reactive ———— 用来声明 对象和数组 这种引用类型变量



这是因为 vue3 使用了 JavaScript Proxy 来实现响应式系统，我们的响应式对象其实就是 JavaScript Proxy，它的行为表现和一般对象类似，不同之处在于 vue 可以跟踪响应式对象属性的**访问**和**更改**操作。



值得注意的是，reactive() 返回的是一个原始对象的 Proxy，它和原始对象是不相等的。只有这个返回的代理对象是响应式的，更改原始对象不会触发更新。



当更改响应式状态时，DOM 会自动更新，但是 DOM 的更新不是同步的。相反，Vue 将缓冲它们直到更新周期的 “下个时机” 以确保无论你进行了多少次状态更改，每个组件都只需要更新一次。若要等待一个状态改变后的 DOM 更新完成，你可以使用 [nextTick()](https://cn.vuejs.org/api/general.html#nexttick) 这个全局 API



vue 中状态都是默认深层响应式的，我们在修改深层对象或数组时，改动也能被检测到



reactive() 的局限性

* 它只对 对象、数组、Map、Set 这样的引用类型生效，对 String、Number 等原始类型无效
* 不能随意替换一个响应式对象，这会导致对初始引用的响应性连接丢失

同时这也意味着当我们将响应式对象的属性赋值或解构至本地变量时，或是将该属性传入一个函数时，我们会失去响应性

```js
const state = reactive({count: 0})

let n = state.count // n失去响应性

let { count } = state // 解构后count失去响应性

func(state.count) // 无法跟踪state.count的变化
```





由于 reactive() 的限制，Vue 提供了 ref() 方法，可以帮助我们创建任何值类型的响应式 ref，ref() 方法返回一个带 value 属性的 ref 对象

```js
const count = ref(0)

console.log(count) // { value: 0 }
```

ref 的 .value 属性也是响应式的，而且 ref 被传递或者被解构时，不会丢失响应性。

ref 当然也可以包裹对象，可以响应式地替换整个对象：

```js
const objectRef = ref({ count: 0 })

// 这是响应式的替换
objectRef.value = { count: 1 }
```

总之，ref() 帮助我们创造一种对任意值的引用，并能够在不丢失响应性的前提下传递这些引用，它很重要，会经常用于将逻辑提取到 组合函数 中。





ref 的解包（可以理解为不用 .value，就和正常变量那样使用的几种情况）

* ref 在模版中的解包

  ref 在模版中 {{ xxx }} 使用时，如果它是顶层属性，可以不用使用 .value，那什么是顶层属性呢，其实就是 `const count = ref(0)` 这种情况，而像 `const obj = {foo:ref(1)} ` 这种就不行

  

* ref 在响应式对象中的解包

  当一个 `ref` 被嵌套在一个响应式对象中，作为属性被访问或更改时，它会自动解包，因此会表现得和一般的属性一样

  ```js
  const count = ref(0)
  const state = reactive({
    count
  })
  ```

  

* 数组和集合类型的 ref 解包

  跟响应式对象不同，当 ref 作为响应式数组或像 `Map` 这种原生集合类型的元素被访问时，不会进行解包



后续可能会出现响应性语法糖，让我们不再手动加 .value，还在实验阶段







# Vue3里面的计算属性



我们应该都会 Vue2 中的 computed 属性的基本使用，简单来说就是对我们的响应式数据做一次额外的处理，让模版更加简洁，其中和 methods 最大的不同就是它会缓存数据，只要它依赖的数据不改变，它就都使用之前计算后的值。



那我们看看 Vue3 中是如何实现 computed 属性的吧~

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'ryan zhang',
  books: [
    'how to live',
    'how to think',
    'how to love',
  ]
})

const computedAuthor = computed(() => {
  return author.books.length > 0 ? 'yes' : 'no'
})

function changeData() {
  console.log(author.books)
  author.books.length = 0
  console.log(author.books)
}

</script>

<template>
  <h2>is the {{ author.name }} write book?</h2>
  <h3 class="ans">{{ computedAuthor }}</h3>
  <button @click="changeData">change</button>
</template>

<style>
.ans {
  color: red;
}
</style>


```



如上可以看出，我们引入了 computed 方法，这个方法接收一个 getter 函数作为参数，返回值是一个 计算属性ref。和其他 ref 使用方式一致。即可以使用 .value 来查看这个值。



Vue的计算属性会自动追踪响应式依赖，它会检测到 computedAuthor 依赖于 author.books 所以当 author.books 发生改变时，任何依赖于 computedAuthor 的绑定都会更新。



至于缓存问题，我们可以很方便的测试

```js
const now = computed(() => Date.now()) 
```







# Vue3的生命周期



vue3 中对生命周期进行了比较大的更新



生命周期简介：每个 Vue 组件实例在创建时都要经历一系列的初始化步骤，比如设置好数据监听，编译模版，挂载实例到 DOM，以及在数据改变时更新 DOM。在这个过程中会运行被称为生命周期钩子的函数。开发者有机会在特定阶段运行自己的代码。

onMounted

onUpdated

onUnmounted

这是最常用的三个钩子函数



具体用法如下：

```vue
<script setup>
import { onMounted } from 'vue',

onMounted(() => {
  console.log('mounted')
})
</script>
```





![](https://cn.vuejs.org/assets/lifecycle.16e4c08e.png)











# vue3中的监听器



计算属性允许我们声明性地计算衍生值。然而在有些情况下，我们需要在状态变化时执行一些“副作用”：例如更改 DOM，或是根据异步操作的结果去修改另一处的状态。



在组合式 API 中，我们可以使用 watch 函数在每次响应式状态变化时触发回调函数

```js
import { ref, watch } from 'vue'

const question = ref('')

watch(question, (newValue, oldValue) => {
  console.log(newValue, oldValue)
})
```

我们可以直接监听一个 ref，然后这个 ref 可以和 input 进行双向绑定，当这个 ref 发生改变就可以出发 watch 函数中的回调函数。



watch() 函数的第一个参数可以是 ref（包括计算属性）、一个响应式对象、一个 getter 函数、或多个数据源组成的数组。



但是不能直接监听响应式对象的属性值：

```js
const obj = reactive({ count: 0 })
// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(count)
})
```

这里需要一个返回该属性的 getter 函数：

```js
watch(()=>obj.count, (count) => {
  console.log(count)
})
```



直接给 `watch()` 传入一个响应式对象，会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发。

相比之下，一个返回响应式对象的 getter 函数，只有在返回不同的对象时，才会触发回调。不过可以显式加上 deep 选项，强制转换为深层监听器

深度侦听需要遍历被侦听对象中的所有嵌套的属性，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。



watchEffect()

watch() 是懒执行的，仅当数据源变化时，才会执行回调。但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调。举例来说，我们想请求一些初始数据，然后在相关状态更改时重新请求数据。我们可以这样写：

```js
const url = ref('https://...')
const data = ref(null)

async function fetchData() {
  const response = await fetch(url.value)
  data.value = await response.json()
}

// 立即获取
fetchData()
// ...再侦听 url 变化
watch(url, fetchData)
```

用 watchEffect() 来简化上面代码：

```js
watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})
```

watchEffect() 会立即执行一遍回调函数，执行期间，它会自动追踪 url.value 作为依赖，每当 url.value 发生改变，回调会再次执行



watch 和 watchEffect 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

- watch 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。watch 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
- watchEffect，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。
