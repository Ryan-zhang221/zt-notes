## react 与 jsx



React 组件的特点

使用 jsx 编写，最纯粹的 js 开发

* react 组价可以是一个方法，也可以是一个 class 类
* 可以直接在 js 文件里写一段 html 来作为一个组件，也可以写成一个单独的 jsx 或者 js 文件



函数组件

```js
function hello() {
  return (
  	<div>1123</div>
  )
}
```

Class 组件

```js
class hello extends React.component(
	render(){
  	return (
			<div>123</div>
		)
  }
)
```



jsx 的特点

* 可以直接写在 js 文件中

  React 项目利用 babel 做了对 js 的编译，所以我们可以直接在 js 里面写 jsx

* 写法接近于 js

  jsx 几乎和 js 一样，不同点在于，可以更方便的写 html 在 js 里