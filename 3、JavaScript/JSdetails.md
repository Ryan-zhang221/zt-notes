## 语言基础

* `var`操作符

  * 在函数内部定义时会成为该函数的局部变量；

  * 如果函数内部定义变量时省略`var`关键字，那么该变量会成为一个全局变量；

  * 可以定义多个变量，中间用逗号隔开；

  * 声明提升，在定义该变量前可以使用该变量，不过值为`undefined`，这里的解释为JS解析器会在执行代码前统一收集使用`var`关键字声明的变量并全部赋值为`undefined`;

    ```js
    function foo() {
      concole.log(message);
      var message = 'Hello World';
    }
    foo(); // undefined
    ```

* `let`声明

  * 作用同`var`差不多，但是有重要区别

  * `let`声明的范围是块作用域，即`{ }`内部声明的变量只能在该大括号内部使用，外部使用都会报错referenceError。但是`var`声明的范围是函数作用域，即在同一个函数作用域内都生效。

    ```js
    if (true) {
      let age = 20;
    }
    console.log(age); // referenceError:age未定义
    
    if (true) {
      var name = 'ryan';
    }
    console.log(name); // ryan
    ```

  * 暂时性死区：`let`声明的变量不会在作用域中被提升，即在变量被声明之前使用时会直接报错referenceError，而不是和`var`一样打印undefined。在let声明之前的执行瞬间被称为暂时性死区，在此阶段引用任何后面才声明的变量都会抛出referenceError。其实这是为了规范代码，让变量必须声明后才能使用。

  * `let`在全局作用域中声明的变量不会成为window对象的属性，但是`var`声明的变量则会，这么做是为了简化window对象的大小，window对象本身已经存在许多属性。let声明的全局变量会在页面的生命周期内存续；

  * `let`无法进行条件赋值！

  * 经典`var`循环问题：因为for循环并不是一个函数作用域，此时var定义的迭代变量会渗透到循环体外部：

    ```js
    for (var i = 0; i < 5; i++) {
      // 循环逻辑
      setTimeout(() => console.log(i), 0)
    }
    console.log(i); // 5,5,5,5,5
    // 之所以这样，是因为在退出循环时，迭代变量保存的是导致循环退出的值：5，在之后执行超时逻辑时，所有的i都是同一个变量，所以输出的都是同一个值。
    ```

    改为let声明后，该问题即可解决，JS引擎会在后台为每一个迭代循环声明一个新的迭代变量，每个timeout引用的都是不同的变量实例。

* `const`声明
  * 基本行为和`let`相同，唯一一个重要区别就是使用`const`声明变量时必须同时初始化变量，且无法修改该值。
  * `const`声明的限制只适用于它指向的变量的引用。即如果`const`引用的是一个对象，那么修改该对象内部的属性并不违反`const`的限制。
  * for循环中无法使用`const`来声明迭代变量，因为迭代变量会自增。
* 几个原则：不使用`var`，`const`优先使用，`let`次之。




## 数据类型
* 6中简单数据类型：`Undefined, Null, Boolean, Number, String, Symbol`

* 1中复杂数据类型：`Object`

* `typeof`操作符：确定任意变量的数据类型，返回值有以下："undefined"未定义、"boolean"布尔值、"string"字符串、"number"数值、"object"对象或null，"function"函数、"symbol"符号。

* `undefined`详解：在变量声明后未初始化时，默认赋值undefined，一般来说，永远不用显式地给某个变量赋值undefined，字面值undefined主要是用来比较。ES3之前是不存在的，增加这个特殊值的目的就是为了正式明确空对象指针（null）和未初始化变量的区别。注意一点：typeof操作符号对于"未声明变量"和"已声明变量但未初始化"两者的返回值都是"undefined"，故最好在声明变量时进行初始化。

* `null`详解：null表示一个空对象指针，这也是为什么`typeof null`会返回一个"Object"的原因。只要变量要保存对象，但是现在又没有那个对象，这时就建议使用null来初始化。这样就可以通过检查这个值是不是一个null来判断这个变量后来是不是被赋值了。

* `Boolean`详解：虽然布尔值只有两个，但是其余类型的值都可以转化为布尔值，调用特定的`Boolean()`函数，转化规则如下：

  | 数据类型  | 转化为true的值 | 转化为false的值 |
  | --------- | -------------- | --------------- |
  | Boolean   | true           | false           |
  | String    | 非空字符串     | ""(空字符串)    |
  | Number    | 非零数值       | 0、NaN          |
  | Object    | 任意对象       | null            |
  | Undefined | 不存在         | undefined       |

* `number`详解：经典`0.1 + 0.2 !== 0.3`问题，简单解决办法如下`parseFloat((1.0 - 0.9).toFixed(10)) 返回值为0.1`，其实就是控制精度。一个特殊的数值`NaN`意思为“Not a Number”，用于表示本来要返回数值的操作失败了（不是抛出错误），比如用0除以任何数的操作。`NaN`有几个独特的属性：任何涉及NaN的操作都会返回NaN，还有`isNaN()`函数的使用。数值转换：3个函数可以将非数值转换为数值：`Number()/parseInt()/parseFloat()`，其中Number可以将任何数据类型转换为数字，但是后两个主要是用于将字符串转换为数值。常用parseInt()函数。

* `string`详解：toString()方法返回当前值的字符串等价物，null和undefined没有该方法。string()函数可以用来判断一个值是不是null或者undefined。如下

  ```js
  console.log(String(null)); // "null"
  console.log(String(undefined)); // "undefined"
  ```

  模版字符串的使用"``"
  
* `symbol`详解：

* `Object`数据类型：对象其实就是一组数组和功能的集合，每个对象都有如下属性和方法：

  ```js
  constructor
  hasOwnProperty(propertyName)
  isPrototypeOf(object)
  toLocaleString()
  toString()
  valueOf()
  ```









## 操作符

* 一元操作符
* 位操作符
* 布尔操作符：逻辑非`!`始终返回布尔值，可以同时使用两个`!!`，相当于调用了转型函数`Boolean()`，第一个！总会返回布尔值，第二个！对该布尔值取反，从而给出变量真正对应的布尔值；逻辑与`&&`可用于任何类型的操作数，不限于布尔值，它是一种短路操作符，只有第一个操作数为true的情况下才会对&&后面的求值，如果第一个操作数为false，那么他会直接跳过；逻辑或`||`如果有一个操作数不是布尔值，那么返回值也不一定是布尔值。它也有短路的特性，它是第一个操作数求值为true，第二个操作数就不会被求值了。

