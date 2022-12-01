链接：https://juejin.cn/post/6844904038543130637

https://juejin.cn/post/7048497932647006216



## 什么是 webpack



本质上,webpack 是一个现代 JavaScript 应用程序的==静态模块打包器(module bundler)==。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。



webpack 就像一条生产线,要经过一系列处理流程后才能将源文件转换成输出结果。 这条生产线上的每个处理流程的职责都是单一的，多个流程之间有存在依赖关系，只有完成当前处理后才能交给下一个流程去处理。 插件就像是一个插入到生产线中的一个功能，在特定的时机对生产线上的资源做处理。



webpack 通过 Tapable 来组织这条复杂的生产线。 webpack 在运行过程中会广播事件,插件只需要监听它所关心的事件，就能加入到这条生产线中，去改变生产线的运作。 webpack 的事件流机制保证了插件的有序性，使得整个系统扩展性很好。



==主要功能==：提供了友好的前端模块化开发支持，以及代码压缩混淆，处理浏览器端js 的兼容性，性能优化等强大的功能



==好处==：让程序员把工作重心放在具体功能的实现上，提高了前端开发效率和项目的可维护性。











## webpack 核心概念



==Entry==

入口起点(entry point)指示 webpack 应该使用哪个模块,来作为构建其内部依赖图的==开始==。

进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

每个依赖项随即被处理，最后输出到称之为 bundles 的文件中。



==Output==

output 属性告诉 webpack 在哪里输出它所创建的 bundles,以及如何命名这些文件,默认值为 ./dist。

基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。



==Module==

模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。



==Chunk==

代码块,一个 Chunk 由多个模块组合而成,用于代码合并与分割。



==Loader==

loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。

loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块,然后你就可以利用 webpack 的打包能力,对它们进行处理。

本质上,webpack loader 将所有类型的文件,转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。



==Plugin==

loader 被用于转换某些类型的模块,而插件则可以用于执行范围更广的任务。

插件的范围包括,从打包优化和压缩,一直到重新定义环境中的变量。插件接口功能极其强大,可以用来处理各种各样的任务。









## webpack 构建流程



Webpack 的运行流程是一个串行的过程,从启动到结束会依次执行以下流程 :

1. 初始化参数：从配置文件和 shell 语句中读取与合并参数，得出最终的参数。
2. 开始编译：用上一步的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
3. 确定入口：根据配置中的 entry 找出所有的入口文件
4. 编译模块：从文件入口出发，调用所有的 loader 对模块进行翻译，再找出模块依赖的模块，再递归本步直到所有入口依赖的文件都经过了本步的处理
5. 完成模块编译：Loader 翻译完所有的模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
6. 输出资源：根据入口和模块之间的依赖，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，后续无法修改输出
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把内容写入到文件系统

在以上过程中,Webpack 会在特定的时间点广播出特定的事件,插件在监听到感兴趣的事件后会执行特定的逻辑,并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。











## 基本使用



==1、项目中安装webpack+webpack-cli：==

`npm install webpack webpack-cli -D`

`-D` 写入到`package.json`中 `devDependencies`进行添加，表示我们只有在开发阶段才使用到

`-S` 相当于 `--save `写入到 `dependencies` 对象，表示开发环境和生产都使用

如果项目中没有 package.json 使用 `npm init -y` 快速配置



==2、配置启动命令：==

在 package.json 中配置 scripts

```json
"scripts": {
    "dev": 'webpack'
}
```

在命令行使用 `npm run dev` 来启动 webpack 命令



==3、创建 webpack.config.js 文件：==

在项目根目录中，创建 webpack.config.js 文件，webpack真正开始打包构建之前，会先读取这个配置文件，从而基于给定的配置，对项目进行打包

 1. 设置 mode 字段，可选值：development（开发环境，不会优化和压缩代码）、production（生产环境，优化压缩代码）

 2. 设置入口entry和出口output，默认入口：src/index.js，默认出口：dist/main.js

    ```js
    const path = require('path')
    module.exports = {
      mode: 'development',
      entry: path.join(__dirname, './src/index.js'), //打包入口文件路径
      output: {
        path: path.join(__dirname, './dist'), //输出文件路径
        filename: 'js/bundle.js', //把生成的bundle.js放在dist/js/bundle.js下面
      },
    }
    ```











## webpack-dev-server 的使用



当我们修改了代码，webpack会自动打包，不用每次自己去 `npm run dev` 了，webpack-dev-server 提供热更新的开发服务器

* 安装：`npm install webpack-dev-server -D`，完成后通过 `webpack serve` 启动

* 配置：

  * package.json中新加一个scripts命令：`"serve": "webpack serve"`；

  * 在webpack.config.js中配置端口

    ```js
    module.export = {
        devServer: {
            port: 8080
        }
    }
    ```

* 使用：我们使用 `npm run serve` 进行项目的打包，打包完毕后会出现一个实时打包的 http 服务器，提示我们访问 `http://localhost:8080/` 访问之后就可以查看我们的页面效果

* 一些细节

  * 打包生成的文件存放在了内存中，因为内存更快。
  * 上述设置的 output 的输出是针对 没有使用webpack-dev-server 的项目来使用的
  * 如何访问我们打包生成的 bundle.js 呢？webpack-dev-server 开启了一个服务器，我们可以使用`http://localhost:8080/bundle.js` 直接访问

devServer的其他配置选项如下：

```json
devServer.compress，启用gzip压缩。
devServer.contentBase，告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
devServer.host，指定host。使用0.0.0.0可以让局域网内可访问。
devServer.hot，启用 webpack 的模块热替换特性（Hot Module Replacement）。
devServer.hotOnly，构建失败的时候是否不允许回退到使用刷新网页。
devServer.inline，模式切换。默认为内联模式，使用false切换到iframe模式。
devServer.open，启动webpack-dev-server后是否使用浏览器打开首页。
devServer.overlay，是否允许使用全屏覆盖的方式显示编译错误。默认不允许
devServer.port，监听端口号。默认8080。
devServer.proxy，代理，对于另外有单独的后端开发服务器API来说比较适合。
devServer.publicPath，设置内存中的打包文件的输出目录。区别于output.publicPath。
```













## 插件的使用



通过安装和配置第三方的插件，可以拓展 `webpack` 使它更强大

1. html-webpack-plugin
2. clean-webpack-plugin













## 加载器Loader



loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。

loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块,然后你就可以利用 webpack 的打包能力,对它们进行处理。

本质上,webpack loader 将所有类型的文件,转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。

>* css-loader 打包处理 .css 相关的文件
>* less-loader 打包处理 .less 相关的文件
>* babel-loader 打包处理 webpack 无法处理的高级 js 语法



==css打包==

安装：`npm i style-loader css-loader -D`

配置（webpack.config.js中）：`test` 表示匹配的文件类型（用正则）， `use` 表示对应要调用的 `loader` ，调用顺序是：从右往左

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}
```





==less打包==

安装：`npm i less-loader less -D`

配置（webpack.config.js中）：

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    }
}
```





==打包文件==

安装：`npm i url-loader file-loader -D`

配置（webpack.config.js中）：

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.jpg|png|gif$/,
        use: {
            loader: 'url-loader',
           	options: {
                limit: 77777, // 图片的大小，单位是字节（byte）只有 ≤ limit 大小的图片，才会被转为 base64 格式的图片
                outputPath: 'image', // 指定的存储文件夹 dist/image 把图片文件统一生成到 image 目录中
            }
        }
      },
    ],
  },
}
```





==babel-loader的使用==

安装：`npm i babel-loader @babel/core @babel/plugin-proposal-decorators -D`

配置（webpack.config.js中）：

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/ // 排除掉 /node_modules/下面的模块
      },
    ],
  },
}
```

在项目根目录下，创建`babel.config.js`文件并配置

```js
module.exports = {
    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
}
```









## 打包发布



开发环境打包生成的文件不会进行代码压缩和性能优化，而且存放在内存中

生产环境中打包发布需要新增 scripts 脚本

```json
"scirpts": {
    "build": "webpack --mode production"
}
```



之后使用 `npm run build` 直接打包发布，这时的代码会进行代码压缩和性能优化，会覆盖 webpack.config.js 中的 model 选项













## webpack 创建 Vue 项目



vue-cli创建的项目会自动帮我们配置 webpack

这里看一下整个流程是如何实现的



























