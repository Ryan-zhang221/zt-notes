/*
	依赖收集：有一个池子，我们可以往其中添加一些任务，当某些时机达成，
	我再把我池子中的这些任务挨个跑一遍。就是一个订阅发布模式

	目标：修改obj的值之后，effect函数能重新执行一遍

	Proxy构造函数接收两个参数，目标对象和处理程序对象。get函数和set
	函数都会接受三个参数：目标对象、要查询的属性、代理对象。这些参数是
	用来重建被捕获方法的原始行为（你不能一代理连对象原本操作都改变了吧）
	简便方法：Reflect对象上封装了原始行为，直接调用即可
	Reflect.get(...arguments)

*/

const effectPool = []
let currentEffect = null

function reactive(value) {
	return new Proxy(value, {
		get(target, key, receiver) {
			console.log(2)
			if(currentEffect) {
				effectPool.push(currentEffect)
			}
			return Reflect.get(...arguments)
		},
		set(target, key, receiver) {
			console.log(3)
			// 这里必须先让值更新，最后再去执行逻辑
			try {
				return Reflect.set(...arguments)
			} finally { // 这里 finally 的作用是在 return 之后还可以写逻辑
				effectPool.forEach(fn => fn())
			}
		}
	})
}

/*
	ref 的实现不能使用 Proxy，因为无法代理基本数据类型
	这时就要使用 Object.defineProperty ，它有两种写法完全等价：
	case1
	Object.defineProperty(obj, 'value', {
		get() {},
		set(newValue) {}
	})

	case2
	const obj = {
		get value() {},
		set value(newValue) {}
	}
*/
function ref(value) {
	return {
		get value() {
			if(currentEffect) {
				effectPool.push(currentEffect)
			}
			return value
		},
		set value(newValue) {
			value = newValue
			effectPool.forEach(fn => fn())
		},
		__v_isRef: true
	}
}

function effect(fn) {
	console.log(1)
	currentEffect = fn
	fn()
	currentEffect = null
}

// ----------------------------------------------
// 此时 obj 就变成了一个代理后的对象
const obj = reactive({ num: 1 })

// 这里可以类比于 template 中内容转化为的函数，数据改变后每次更新
// 视图 = template 编译后的渲染函数
effect(function() {
	// 这里获取了 obj.name 触发了 get 方法
	// obj.num + 10
	let b = obj.num
})

// 这里改变 obj.num 就会触发 set 方法
obj.num += 1

// ----------------------------------------------
// ref
let refValue = ref(1)
effect(function() {
	let c = refValue + 2
})
refValue += 8







