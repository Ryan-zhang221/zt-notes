## 使用 ESlint



确保安装了 node 和 npm 环境



创建项目并`npm init -y`



安装依赖包：`npm install eslint --save-dev ` 把 eslint 安装到 package.json 文件中的 devDependencies 属性中，意思是只是开发阶段用到这个包，上线时就不需要这个包了。



设置 package.json 文件，修改 scripts 属性

```json
"scripts": {
    "test": "react-scripts test --env=jsdom",
    "lint": "eslint src",
    "lint:create": "eslint --init"
}
```

* `"lint:create": "eslint --init"` 这个脚本是为了生成 .eslintrc.js 文件，在介绍 Lint 的时候说到 Lint 应该提供编码规范，规范写在哪里，就写在这个文件，所以我们需要创建它
* `"lint": "eslint src"` 在介绍 Lint 的时候也说到 Lint 应该提供自动校验代码的程序，这个脚本是让 Lint 自动检验 src 目录下所有的 .js 文件。



创建 .eslint.js 文件：`npm run lint:create`

```shell
$ npm run lint:create

> 20170811@0.1.0 lint:create D:\code\test\20170811
> eslint --init

? How would you like to configure ESLint? Answer questions about your style // 以问答的形式创建配置文件
? Are you using ECMAScript 6 features? Yes      // 是否校验 Es6 语法
? Are you using ES6 modules? Yes                // 是否校验 Es6 模块语法
? Where will your code run? Browser             // 代码运行环境，Browser 指浏览器
? Do you use CommonJS? Yes                      // 是否校验 CommonJs 语法
? Do you use JSX? Yes                           // 是否校验 JSX 语法
? Do you use React? Yes                         // 是否校验 React 语法
? What style of indentation do you use? Tabs    // 首行空白选择 Tab 键还是 Space
? What quotes do you use for strings? Double    // 字符串使用单引号 'string' 还是双引号 "string"
? What line endings do you use? Windows         // 操作系统
? Do you require semicolons? Yes                // 每行代码结尾是否校验加分号 ;
? What format do you want your config file to be in? JavaScript     // 以 .js 格式生成配置文件
Installing eslint-plugin-react@latest   // 因为要校验 Reac 语法，所以这里需要下载一个 React 语法规则的包
```

创建完成后根目录下应该会出现 `.eslintrc.js` 文件



新建 js 文件并校验代码：在src目录下新建index.js 文件，然后运行`npm run lint`，如果有问题会提示



设置 --fix 参数：打开 package.json 修改 script 属性

```json
"scripts": {
    "test": "react-scripts test --env=jsdom",
    "lint": "eslint src --fix",
    "lint:create": "eslint --init"
}
```

这里给 `"lint": "eslint src --fix",` 加上 `--fix` 参数，是 Eslint 提供的自动修复基础错误的功能。

此时保存，eslint会帮我们自动修复了基础错误，但是有的错误需要我们手动修改









## 配置文件详解



```json
// .eslintrc.js 
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
}
```



==env、parserOptions、plugins==

这三个放在一起将是因为你只需要知道它们是干嘛的：我的程序里要用到 ES6 、React 、JSX 语法，这几个属性就是让 Eslint 能够检验到这些语法的。其余的你不需要知道更多的哪怕一丢丢的东东了。

作者在学习之初在这块浪费了很多时间，官方文档看了很多遍，大多不能理解什么意思，后来想它既然提供这么一个自动生成配置文件的工具，并且是命令行交互的方式，我只需要告诉它我要用 ES6 、React 、JSX 语法，它会自动进行相关配置满足我的要求即可。



==extends==

前面一直说检验代码遵循编码规范，那到底是什么规范呢。

值为 "eslint:recommended" 的 extends 属性启用一系列核心规则，这些规则是经过前人验证的最佳实践（所谓最佳实践，就是大家伙都觉得应该遵循的编码规范），**想知道最佳实践具体有哪些编码规范**，可以在 [eslint规则表](https://links.jianshu.com/go?to=http%3A%2F%2Feslint.cn%2Fdocs%2Frules%2F)  中查看被标记为 √ 的规则项。

如果觉得官方提供的默认规则不好用，可以自定义规则配置文件，然后发布成 Npm 包，eslint-config-airbnb 就是别人自定义的编码规范，使用 npm 安装后，在我们自己的 .eslintrc.js 中进行配置 "extends": "airbnb"，eslint-config 这个前缀可以省略不写，这样我们就使用了 eslint-config-airbnb 中的规则，而不是官方的规则 "extends":"eslint:recommended" 了。关于如何创建自定义规则配置并共享可以参考： [如何自定义规则配置](https://links.jianshu.com/go?to=http%3A%2F%2Feslint.cn%2Fdocs%2Fdeveloper-guide%2Fshareable-configs)

关于 "airbnb" 编码规范说两句，在接触到大多数开源项目中，大多数的作者都会使用 "airbnb" 编码规范而不是 官方的 "extends": "eslint:recommended" 编码规范。

如果我们觉得 eslint-config-airbnb 规则配置中个别规则并不符合当前项目的要求，可以直接在 .eslintrc.js 配置 rules 属性，优先级高于共享规则 airbnb。



==rules==

配置文件也生成了，我们怎么知道我们的系统会遵循什么规则呢？

在前面的列子中，使用 `npm run lint` 校验出了三处错误，假如我们的项目中字符串就是要使用单引号而不是双引号，代码结尾就是要不加分号才好看，变量就是定义了可能不会使用，我们可以通过设置 rules 来定义我们自己的编码规范，即规则。

ESLint 附带有大量的规则，修改规则应遵循如下要求：

* "off" 或 0 - 关闭规则
* "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
* "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

有的规则没有属性，只需控制是开启还是关闭，像这样："eqeqeq": "off"，有的规则有自己的属性，使用起来像这样："quotes": ["error", "double"]，具体有没有自带属性，可查看 [eslint规则表](https://links.jianshu.com/go?to=http%3A%2F%2Feslint.cn%2Fdocs%2Frules%2F)。

修改 .eslintrc.js 文件中的 rules 属性：



```json
"rules": {
    "indent": [
        "error",
        "tab"
    ],
    "linebreak-style": [
        "error",
        "windows"
    ],
    "quotes": [
        "error",
        "single"        // 改成字符串必须由单引号括起来而不是双引号，'string'不报错，"string"报错
    ],
    "semi": [
        "error",
        "never"         // 改成代码结尾不再加分号，加了分号报错，不加分号不报错
    ],
    "no-unused-vars": 0 // 0 相当于 off，表示关闭规则，相当于不再校验这条规则：变量定义了必须使用
}
```

此时再使用 `npm run lint` 进行代码校验，没有报错就说明校验通过，代码符合统一编码规范。





## 注意点



* ESlint 的配置文件并不是一次性完成的，而是在项目过程中慢慢完善的。你可以放心大胆的先进行编码，然后使用 `npm run lint` 校验代码的编码规范，如果这时候报错，可以在报错信息中知道是哪一条编码规范报错了，你可能并不认识它们，此时去 [eslint规则表](https://links.jianshu.com/go?to=http%3A%2F%2Feslint.cn%2Fdocs%2Frules%2F) 查询相应规则的使用方法，如：`no-unused-vars`，从而进一步确定项目中是否需要这条编码规范，如果需要，进行局部调整即可。

* 如使用 window 对象，默认情况下会报 no-undef 的错误，需要在 .eslintrc 中进行相应配置。

  ```json
  {
      "rules": {
          // ...
      },
      "globals": {
          "window": true
      }
  }
  ```

* 单行跳过 lint 校验

  ```js
  const apple = "apple";  // eslint-disable-line
  const balana = "balana";  // eslint-disable-line
  ```

* `object-shorthand` 设置该规则，表示[对象属性要简写](https://links.jianshu.com/go?to=http%3A%2F%2Fes6.ruanyifeng.com%2F%23docs%2Fobject%23%E5%B1%9E%E6%80%A7%E7%9A%84%E7%AE%80%E6%B4%81%E8%A1%A8%E7%A4%BA%E6%B3%95)

* `prefer-arrow-callback` 要求回调函数使用箭头函数

* `no-param-reassign` 禁止对函数的参数重新赋值

* `no-trailing-spaces` 禁止行尾空格

* `no-shadow` 禁止变量声明与外层作用域的变量同名

* 常用的几个规则

  ```json
  "quotes": [1, "single"],            # 单引号
  "quote-props":[2, "as-needed"],     # 双引号自动变单引号
  "semi": [2, "never"],               # 一行结尾不要写分号
  "comma-dangle": [1,"always-multiline"]  # 对象或数组多行写法时，最后一个值加逗号
  ```

  