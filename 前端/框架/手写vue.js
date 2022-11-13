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

/*
	响应式对照表，每个属性对应一个数组，数组里面是对应要更新的
	effect函数，或者是多个组件（组件也就是effect函数）
	const proxyTable = {
		obj: {
			key: [effect1, effect2]
		}
	}
	我希望对象中 key 是任意的东西，但是对象的话，key 只能是数字、字符串
	symbol这三种类型，所以我们使用 Map 做存储，所以要优化下
	key => new Set() why？不会用重复值的数组，强化的数组
	obj => new Map() why？key可以是任意数据类型
	proxyTable => new weakMap() why? weakMap中存的key value是弱引用
	其中的 key 可以被垃圾回收，否则 Map 的话不会垃圾回收，就会造成内存泄漏
*/
const proxyDeps = new WeakMap()

function reactive(value) {
	return new Proxy(value, {
		get(target, key, receiver) {
			// 改造前
			// if(currentEffect) {
			// 	effectPool.push(currentEffect)
			// }
			if (currentEffect) {
				let deps = proxyDeps.get(target)
				if(!deps) {
					deps = new Map()
					proxyDeps.set(target, deps)
				}
				let dep = deps.get(key)
				if(!dep) {
					dep = new Set()
					deps.set(key, dep)
				}
				dep.add(currentEffect)
			}

			const res = Reflect.get(...arguments)
			// return res
			return typeof res === "object" ? reactive(res) : res
		},
		set(target, key, receiver) {
			// 改造前
			// 这里必须先让值更新，最后再去执行逻辑
			// try {
			// 	return Reflect.set(...arguments)
			// } finally { // 这里 finally 的作用是在 return 之后还可以写逻辑
			// 	effectPool.forEach(fn => fn())
			// }
			const res = Reflect.set(...arguments)
			const deps = proxyDeps.get(target)
			if(deps) {
				const dep = deps.get(key)
				if(dep) {
					dep.forEach(fn => {
						if(fn.computed) {
							fn.dirty = true
						}
					})
					dep.forEach(fn => {
						if(!fn.computed) {
							fn()
						}
					})
				}
			}

			return res
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

/*
	effect 函数收集还有问题，如果发生了函数嵌套，那么就会出现
	依赖收集不到的情况。vue是一个精确收集的过程，目前的 effect
	函数做不到这一点。现在是reactive函数中任何嵌套的变量改变都
	会触发更新，我们想做到精确更新。
	之前的：
	function effect(fn) {
		currentEffect = fn
		fn()
		currentEffect = null
	}
*/
function effect(fn, options = {}) {
	/* options的结构如下
		options: {
			lazy: false
		}
	*/
	// 创建一个包装后的函数effectFn，往它身上挂一些东西进去
	const effectFn = Object.assign(function() {
		effectFn.parent = currentEffect
		currentEffect = effectFn
		const res = fn()
		currentEffect = effectFn.parent
		currentEffect = null
		return res
	}, {
		parent: null,
		dirty: true,
		computed: false
	}, options)

	if (!options.lazy) {
		effectFn()
	}

	return effectFn
} 





// 实现 computed (缓存/脏值检测)
/* 改造前
	function computed(getter) {
		let value = void 0 // undefined
		let dirty = true

		effect(() => {
			value = getter()
		})

		return {
			get value() {
				if (currentEffect) {
					effectPool.push(currentEffect)
				}
				return dirty ? getter() : value
			},
			set value(newValue) {
				console.log('computed没有传递修改函数')
			}
		}
	}
*/
function computed(getter, setter) {
	let _value = getter()

	return new (class {
		get value() {
			if(this._effect.dirty) {
				this._effect()
			}
			return _value
		}
		set value(newValue) {
			if(setter) {
				effect(newValue)
			} else {
				console.log('setter没有，改不了')
			}
		}

		constructor() {
			const self = this
			this._effect = effect(() => {
				self.dirty = false
				_value = getter()
			}, {lazy: true, computed: true})
		}
	})()
}




// ----------------------------------------------
// 此时 obj 就变成了一个代理后的对象
// const obj = reactive({ num: 1 })

// 这里可以类比于 template 中内容转化为的函数，数据改变后每次更新
// 视图 = template 编译后的渲染函数
// effect(function() {
// 	// 这里获取了 obj.name 触发了 get 方法
// 	// obj.num + 10
// 	let b = obj.num
// })

// 这里改变 obj.num 就会触发 set 方法
// obj.num += 1

// ----------------------------------------------
// ref
// let refValue = ref(1)
// effect(function() {
// 	let c = refValue + 2
// })
// refValue += 8

// ----------------------改造后的精确更新------------------------
const obj1 = reactive({
	num: 1,
	child: {
		num: 100
	}
})
effect(() => {
	console.log('我更新了', obj1.child.num)
})
// obj1.num += 1
obj1.child.num += 1







