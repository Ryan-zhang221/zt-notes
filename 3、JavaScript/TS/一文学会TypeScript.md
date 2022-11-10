## 简介和环境搭建

1. ts 是什么?
是 JS 的超集，有类型约束的 JS，是一个强类型语言

2. 为什么要用 ts ？
ts 文件最终也会编译为 js 文件
把问题在开发阶段解决掉
让代码更加严谨

3. 环境搭建
`npm install -g typescript`
`tsc -v` 查看安装是否成功
`tsc test.ts` 该命令就会在当前目录下生成一个 test.js 文件，如果我们加上 -w 则会实时更新。


## ts常用类型约束

1. ts 基本类型的约束写法
字符串： `let str: string = 'hello world'` 注意这里的 string 是小写
数值： `let num: number = 123`
布尔： `let bool: boolean = true`
any： `let an: any = '123'` any 的意思是 an 后续可以更改为任意类型
null： `let nl: null = null`
undefined：	`let ud: undefined = undefined`

2. 数组约束写法
数组的情况比较复杂，比如一个数组里面可以有多个数据类型，设置对象数组这种，我们分别来看

```ts
// arr数组内部的成员都是数值类型，有以下两种写法
let arr1: number[] = [1,2,3];
let arr2: Array<number> = [4,5,6];

// 数组中有多个类型，两种写法
let arr3: (number, string)[] = [1, 'hello']; // 这里是或的关系，位置不影响
let arr4: [number, string] = [2, 'b']; // 注意这里是前后对应的关系，不能写反了

```


3. void
void 这个字符代表 无返回值，我们无返回值的函数就要使用它
```ts
function add(a:number, b:number):void {
	console.log(a,b)
}
```
如上函数体内我们没有 return 所以返回值就要用字符 void



4. 对象约束写法
本质上就是一对一的关系
```ts
let obj1:{
	a: number,
	b: string,
	c: boolean
} = {
	a: 12,
	b: 'hello',
	c: true
}
```
如上写法其实不常用，常用的是 interface 的写法，后续讲述



## ts函数的约束

1. 函数参数和返回值约束
```ts
// 限定了参数的类型和返回值的类型
function add(a:number, b:number):number {
	return a + b;
}
add(6, 7);
```

2. 函数可选参数
```ts
function add(a:number, b?:number):number {
	return a + b;
}
```
就是 `?:` 这个写法，叫做缺省，表示 b 可以存在也可以不存在

3. 函数参数默认值
```ts
function add(a:number, b:number=2):number {
	return a + b;
}
```
这里的 `b:number=2` 表示如果 b 没有传递的话默认使用 2



4. 箭头函数形式的写法约束
```ts
let fun:(p1:number, p2:number) => string = (a:number, b:number) => {
	return a + b
}
```




## ts interface接口

1. 什么是 interface ，它有什么用？
我们给一个复杂对象定义类型的时候，直接写在逻辑中会显得很多，我们需要做一层封装，也就是我们自定义一个结构。
基本用法如下：
```ts
interface Idata{
	a: number;
	b: string;
}

let obj1:Idata = {
	a: 1,
	b: 'hello'
}
```
注意：interface 首字母大写，且每一项都是 ; 结尾

复杂一点的使用场景：
```ts

interface Ilist {
	list: {
		id: number;
		name: tring;
	}[]
}

interface Idata {
	message: string;
	success: boolean;
	data: Ilist
}

let data:Idata = {
	message: '成功',
	success: true,
	data: {
		list: [
			{ id: 1, name: 'ryan' },
			{ id: 2, name: 'lily' }
		]
	}
}
```


2. 在 vue 中的使用场景
axios的二次封装、api解耦
我们在请求接口时，传递的 data 数据就需要进行一个类型约束 interface


3. interface 的继承
```ts
interface Ires extends Idata {
	children: [];
}
```
Ires 和 Idata 将会是一个合并的关系


## 类、修饰符、抽象类、implements

1. 类
```ts
class Person {
	userName: string;
	userAge: number;

	constructor(name:string, age:number) {
		this.userName = name;
		this.userAge = age;
	}

	run():string {
		return 'hello'
	}
}

new Person('ryan', 23)

```


2. 修饰符

readonly 只读的，无法修改
public 公开的，在任何地方都可以访问
protected 受保护的，只有在当前类和当前类的子类内部使用
private 私有的，当前类的内部使用

```ts
class Person{
	readonly a: number;
	public b: string;
	protected c: boolean;
	private d: null;
	constructor() {

	}
}

let p1 = new Person()
p1.a
p1.b
p1.c
p1.d
```


3. 抽象类 abstract

特点：
不完成具体的功能
抽象类不能用
抽象类可以继承，如果要继承，就必须实现该类的抽象方法
开发业务场景下使用较少，大多用在封装一些东西的情况下

```ts
abstract class Person{
	abstract run():void;
	abstract change():void;
}

new Person() // error

class Child extends Person {
	run(): void {
		//必须实现具体功能
	}
	change():void {
		//必须实现具体功能
	}
}

```


4. implements 针对类的约束
```ts
interface Ip1 {
	name: string,
	age: number
}
interface Ip2 {
	change():void;
}

class Person implements Ip1, Ip2 {
	name: string;
	age: number;
	change():void {

	}
}
```




## 泛型

1. 什么是泛型？
泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而是在使用的时候再指定类型的一种特性。

2. 函数的泛型写法
可以用形参来理解
比如我们有一个函数fun，如果传递的参数类型是number，那我们就想让这个函数的类型和返回值类型都是number，但是如果传递的参数是string，就想让其参数类型和返回值类型是string，如果我们之前的做法，要实现这个是不可能，但是泛型就是做着一点的
我们理解为就是把当前参数的类型当做一个形参传递过去，然后然后就根据这个形参确定自己的参数类型和返回值类型。
使用方法如下（函数使用单个泛型）：
```ts
function fun<T>(arg:T):T {
	return arg
}

fun<number>(1);
fun<string>('hello')
```

函数使用多个泛型：
```ts
function fun<T,M>(a:T,b:M) {

}
fun<number, string>(1, '123')
```

T 就是一个标识符，可以用很多字母代替，一般使用 T U M
我们函数的参数必须有length属性，如果没有（比如传递了一个字符串）那么就要如下操作：
```ts
// T extends string 表示泛型 T 必须是 string 的子类
// | 表示可以有联合声明，字符串数组也可以了，类型并列
function fun<T extends string | string[]>(arg:T):number {
	return arg.length
}

fun<string>('你好呀')
fun<string[]>(['a', 'b', 'c'])

// 但是我们如果要传递一个 number 类型数组呢，一直并列可不行，最好是使用interface
// 也就是我们下面说的接口的泛型写法
fun<number[]>([1,2,3])
```


3. 接口的泛型写法
```ts
interface Idata{
	length: number
}
function fun<T extends Idata>(arg:T):number {
	return arg.length;
}

fun<string[]>(['a', 'b', 'c'])
fun<string>('123')
fun<number[]>([1,2,3])
```


4. 泛型接口
```ts
interface IPromise<T> {
	data: {};
	header: {};
	status: T
}

let data1: IPromise<string> = {
	data: {},
	header: {},
	status: 'hello'
}
let data2: IPromise<number> = {
	data: {},
	header: {},
	status: 123
}
```


5. class的泛型写法
```ts
class Person<T, U> {
	userName: T;
	userAge: U
	constructor(name: T, age: U) {
		this.userName = name;
		this.userAge = age;
	}
}

let person = new Person<string, number>('张三', 23);
```



## ts在vue项目中的应用

我们可以对 axios 的参数和返回值都进行类型约束(Idata，Ires)
```ts
export function getData(data: Idata): Promise<Ires> {
	return request({
		url: './api/data',
		method: 'post',
		data
	})
}
```

返回值深层嵌套时可以继续传递泛型
```ts
export function getData(data: Idata): Promise<Ires<Imod>> {
	return request({
		url: './api/data',
		method: 'post',
		data
	})
}
```


## ts装饰器

参考文章：https://www.xuexiluxian.cn/blog/detail/b2a537cc56884d0aa9dc338d406603b4

1. 什么是装饰器？
就是一个方法，可以注入到类、方法、属性参数上来扩展类、属性、方法、参数的功能。
就是一个扩展的东西

2. 类装饰器
3. 装饰器工厂


