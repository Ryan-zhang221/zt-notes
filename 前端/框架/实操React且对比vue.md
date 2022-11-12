## react 与 jsx
《jsx 就是赋予了一个在 js 中写 html 的能力》

React 组件的特点
使用 jsx 编写，最纯粹的 js 开发
* react 组件可以是一个方法，也可以是一个 class 类
* 可以直接在 js 文件里写一段 html 来作为一个组件，也可以写成一个单独的 jsx 或者 js 文件

函数组件和 class 组件的代码对比
```jsx
function hello() {
  return (
  	<div>1123</div>
  )
}

class hello extends React.component(
	render(){
  	return (
			<div>123</div>
		)
  }
)
```

jsx 的特点
* 可以直接写在 js 文件中：React 项目利用 babel 做了对 js 的编译，所以我们可以直接在 js 里面写 jsx
* 写法接近于 js：jsx 几乎和 js 一样，不同点在于，可以更方便的写 html 在 js 里

## 创建项目

react
`npx create-react-app name`
npx 是npm5.2版本后自带的一个工具，让我们不用安装就直接使用一些包

vue3（基于 vite）
`npm init vue@lateset`

## 响应式数据

react 的 class 组件内实现响应式数据：
```jsx
export default class Text2 extends React.component {
	constructor(prop){
		super(prop);
		this.state = {
			// 这里定义的变量就是 react 中的响应式数据
			a: 123,
			arr: [1,2,3]
		}
	}
}
```

react 的函数式组件使用 hooks 实现响应式数据：
```jsx
import { useState } from 'react'
export default function Test1() {
	let [obj, setObj] = useState({
		a: 123
	})
	return (<div>{ obj.toString() }</div>)
}
```

vue2 实现响应式数据
```js
export default {
	data() {
		return {
			a: '112233'
		}
	}
}
```

vue3 使用组合式api reactive() 和 ref() 创建响应式数据：

注意：setup() 函数只在两种情况下使用，其余都使用`<script setup>`语法，vue3后续代码默认都是使用 setup 语法：

* 非单文件组件中
* 在 vue2 中想使用组合式 api 时

```js
import { reactive, ref } from 'vue'
const 
```









