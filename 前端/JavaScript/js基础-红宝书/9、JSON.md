> 理解JSON最关键的一点就是把它当做一种数据格式，而不是编程语言。JSON不属于JavaScript，它们只是拥有相同的语法而已。JSON也不是只能在JavaScript中使用，它是一种数据格式，很多语言都有解析和序列化JSON的内置能力。
>
> 
>
> - JSON 是一种数据格式，具有自己的独立标准和大多数编程语言的库。
> - JSON 支持 object，array，string，number，boolean 和 `null`。
> - JavaScript 提供序列化（serialize）成 JSON 的方法 [JSON.stringify](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 和解析 JSON 的方法 [JSON.parse](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)。
> - 这两种方法都支持用于智能读/写的转换函数。
> - 如果一个对象具有 `toJSON`，那么它会被 `JSON.stringify` 调用。





## 语法

* 最简单的的JOSN可以是一个数值。例如`5`，还可以是一个字符串`"Hello World"`，而JS字符串与JSON字符串的区别就是JSON字符串必须使用双引号。实际使用中JSON通常用来表示复杂的数据结构，其中会包含简单值。

* JSON第一种复杂数据类型是对象，但与JS中对象字面量不同的是：JSON中的对象必须使用双引号把属性名包围起来，且没有变量声明（JSON中没有变量），最后没有分号（不需要，因为不是JS语句）。属性值可以是简单值或复杂数据类型值，例如嵌套对象，同一个对象中不允许出现两个相同的属性。

  ```js
  {
    "name": "ryan",
    "age": 23,
    "school": {
      "name": "msg",
      "location": "msg"
    }
  }
  ```

* JSON第二种复杂数据类型是数组。数组在JSON中使用JS的数组字面量形式表示，同样，也没有分号和变量。数组和对象可以组合使用，以表示更加复杂的数据结构。

  ```js
  [
    {
     "title": "professional JS",
     "author": ["aaa", "bbb"],
     "edition": 4,
     "year": 2017
    },
    {
     "title": "professional JS",
     "author": ["aaa", "bbb"],
     "edition": 4,
     "year": 2017
    }
  ]
  ```

  





## 解析与序列化



>JSON的流行不仅仅是因为其和JS语法类似，很大程度上还是因为JSON可以直接被解析成可用的JS对象。与解析为DOM文档的XML相比，这个优势非常明显。开发者可以很方便使用JSON数据。



* JSON对象有两个方法：`stringify()`和`parse()`
  * stringify会输出不包含空格或缩进的JSON字符串。
  * JSON字符串可以直接传给JSON.parse()，然后得到相应的JS值。
* JSON.stringify()方法也可以接收第二个参数，如果是一个数组的话，那么该方法返回的结果只会包含该数组中列出的对象属性。第二个参数还可以是一个函数，其实就是过滤器函数。
* JSON.stringify()方法的第三个参数控制缩进和空格，这个参数是数值时，表示每一级缩进的空格数。如果缩进参数是一个字符串而非数值，那么JSON字符串中就会使用这个字符串而不是空格来缩进。
* 有时需要在JSON.stringify()之上自定义JSON序列化，此时需要自定一个toJSON()方法。
* JSON.parse()方法可以接收一个额外的参数（一个函数），这个函数会针对每一个键值对都调用一次。这个函数叫做还原函数，且需要返回值。









## 小结

* JSON是一种轻量级的数据格式，可以方便表示复杂数据结构。这个格式使用JS语法的一个子集来表示对象、数组、字符串、数值、布尔值、null。虽然XML也能胜任同样的角色，但是JSON更简洁，JS支持也更友好，所有浏览器也原生支持JSON对象

* ES5定义了原生JSON对象，用于将JS对象序列化为JSON字符串，以及将JSON数组解析为JS对象。`JSON.stringify()`和`JSON.parse()`方法分别用于实现这两种操作。这两个方法都有一些选项可以用来改变默认的行为，以实现过滤或修改流程。