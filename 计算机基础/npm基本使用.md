## 区分全局安装和局部安装



本地安装：`npm install express` 将安装包放在 ./node_modules 下（运行 npm 命令时所在的目录），如果没有 node_modules 目录，会在当前执行 npm 命令的目录下生成 node_modules 目录。可以通过 require() 来引入本地安装的包。



全局安装：`npm install express -g`  将安装包放在 /usr/local 下或者你 node 的安装目录。 可以直接在命令行里使用。













## 初始化



`npm init -y` 会默认生成 package.json 文件











## 版本号



使用 NPM 下载和发布代码时都会接触到版本号。NPM 使用语义版本号来管理代码，这里简单介绍一下。

语义版本号分为`X.Y.Z`三位，分别代表==主版本号==、==次版本号==和==补丁版本号==。当代码变更时，版本号按以下原则更新。

* 如果只是修复bug，需要更新Z位。
* 如果是新增了功能，但是向下兼容，需要更新Y位。
* 如果有大变动，向下不兼容，需要更新X位。

版本号有了这个保证后，在申明第三方包依赖时，除了可依赖于一个固定版本号外，还可依赖于某个范围的版本号。例如"argv": "0.0.x"表示依赖于0.0.x系列的最新版argv。

| 实例   | 说明                                               |
| ------ | -------------------------------------------------- |
| ~1.2.3 | 主版本+次要版本+补丁版本;1.2.3 <= version < 1.3.0; |
| ~1.2   | 主版本+次要版本;1.2.0 <= version < 1.3.0           |
| ~1     | 主版本;1.0.0 <= version < 2.0.0                    |

| 符号                      | 实例           | 版本范围                       | 说明                                                         |
| ------------------------- | -------------- | ------------------------------ | ------------------------------------------------------------ |
|                           | 1.0.0          | 1.0.0                          | 锁定1.0.0版本，必须这个版本。                                |
| ^会匹配最新的大版本依赖包 | ^1.2.3、^0.2.3 | >=1.2.3 <2.0.0、>=0.2.3 <0.3.0 | 表示安装1.x.x的最新版本（不低于1.2.3，包括1.3.0），但是不安装2.x.x，也就是说安装时不改变大版本号。需要注意的是，如果大版本号为0，则插入号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。(主版本) |
| ~会匹配最近的小版本依赖包 | ~1.2.3         | >=1.2.3 <1.3.0                 | 表示安装1.2.x的最新版本（不低于1.2.3），但是不安装1.3.x，也就是说安装时不改变大版本号和次要版本号。 |
| >=                        | >=2.1.0        | >=2.1.0                        | 大于等于2.1.0                                                |
| <=                        | <=2.0.0        | <=2.0.0                        | 小于等于2.0.0                                                |
| laster                    |                |                                | 安装最新的版本                                               |
| *                         |                | >=0.0.0                        | 任何版本                                                     |
| -                         | 1.2.3 - 2.3.4  | >=1.2.3 <=2.3.4                |                                                              |











## NPM 常用命令



* NPM提供了很多命令，例如`install`和`publish`，使用`npm help`可查看所有命令。
* 使用`npm help <command>`可查看某条命令的详细帮助，例如`npm help install`。
* 在`package.json`所在目录下使用`npm install . -g`可先在本地安装当前命令行程序，可用于发布前的本地测试。
* 使用`npm update <package>`可以把当前目录下`node_modules`子目录里边的对应模块更新至最新版本。
* 使用`npm update <package> -g`可以把全局安装的对应命令行程序更新至最新版。
* 使用`npm cache clear`可以清空NPM本地缓存，用于对付使用相同版本号发布新版本代码的人。
* 使用`npm unpublish <package>@<version>`可以撤销发布自己发布过的某个版本代码。











## package.json



package.json 位于模块的目录下，用于定义包的属性。



作用说明：

* 作为一个描述文件，描述了你的项目所依赖的包
* 允许我们使用 “语义化版本规则”（后面介绍）指明你项目依赖包的版本
* 让你的构建更好地与其他开发者分享，便于重复使用



属性说明：

* name：必须字段 ，当前模块\包名称

* version：必须字段 ，当前包的版本号，初次建立默认为`1.0.0`

* description：可选字段，必须是字符串。当前包的描述信息，是一个字符串。它可以帮助人们在使用npm search时找到这个包

* main：可选字段， 指定了项目加载的入口文件

* scripts：可选字段，`scripts`是一个由脚本命令组成的hash对象，他们在包不同的生命周期中被执行。key是生命周期事件，value是要运行的命令。 指定了运行脚本命令的npm命令行缩写，比如start指定了运行npm run start时，所要执行的命令。我们可以自定义我们想要的运行脚步命令。

  ```json
  "scripts": {   
      "build": "webpack --mode=development",
      "dev": "webpack-dev-server --mode=development --contentBase=./dist",
      "server":"node app.js"
    }
  ```

  我们在命令行工具中输入`npm run server` ，就会调用`node app.js`帮我们运行

  简写形式：

  ```shell
  npm start是npm run start
  npm stop是npm run stop的简写
  npm test是npm run test的简写
  npm restart是npm run stop && npm run restart && npm run start的简写
  ```

  常用脚本：

  ```json
  // 删除目录
  "clean": "rimraf dist/*",
  
  // 本地搭建一个 HTTP 服务
  "serve": "http-server -p 9090 dist/",
  
  // 打开浏览器
  "open:dev": "opener http://localhost:9090",
  
  // 实时刷新
   "livereload": "live-reload --port 9091 dist/",
  
  // 构建 HTML 文件
  "build:html": "jade index.jade > dist/index.html",
  
  // 只要 CSS 文件有变动，就重新执行构建
  "watch:css": "watch 'npm run build:css' assets/styles/",
  
  // 只要 HTML 文件有变动，就重新执行构建
  "watch:html": "watch 'npm run build:html' assets/html",
  
  // 部署到 Amazon S3
  "deploy:prod": "s3-cli sync ./dist/ s3://example-com/prod-site/",
  
  // 构建 favicon
  "build:favicon": "node scripts/favicon.js",
  
  "start": "cross-env NODE_ENV=production node server/index.js",
  ```

* dependencies、devDependencies：可选字段， `dependencies`字段指定了项目运行所依赖的模块 ， `devDependencies`指定项目开发所需要的模块 。

  ```shell
  npm install express // 后边没有参数时，表示安装到dependencies属性
  npm install express --save // --save参数表示将该模块写入dependencies属性
  npm install express --save-dev // --save-dev表示将该模块写入devDependencies属性
  ```

* config：config字段用于向环境变量输出值

* engines：可选字段，指明了该模块运行的平台版本，比如 Node 的某个版本或者浏览器， 也可以指定适用的`npm`版本 

* license：许可证。不同的协议有不同的限制。MIT：最大许可，别人下载你的代码可以改你的代码,默认安装值









## dependencies、devDependencies 区分



`devDependencies`是开发所需要的模块，所以我们可以在开发过程中需要的安装上去，来提高我们的开发效率，比如一些知名的第三方库， `webpack`、`rollUp`、`less`、`babel`这些。 就没必要在生成环境安装。



以下类库都建议安装到`devDependencies`:

* 单元测试支撑（mocha、chai）；
* 语法兼容（babel）；
* 语法转换（jsx to js、coffeescript to js、typescript to js）
* 程序构建与优化（webpack、gulp、grunt、uglifyJS）；
* css 处理器（postCSS、SCSS、Stylus）；
* 代码规范（eslint）；







## package-lock.json



前提：比如你的packgae.json的依赖是`"react": "^17.0.2"`，因为有标识符`^`，所以如果react模块有在17大版本下更新的小版本17.0.3，npm install时候会自动安装17下的最新版本17.0.3



问题：你本地是"react": "^17.0.2"，如果这时候react更新"react": "^17.0.3"，别人npm install的时候，安装就是"react": "^17.0.3"。这样导致你们版本不一致，可能引起一些相关错误。



解决：package-lock.json：简单来说就是锁定安装模块的版本号。就是在npm install的时候，记录各个模块的版本信息和下载路径，这样别人拉项目npm install时候， 就会依据packgae-lock.json去安装"react": "^17.0.2"，保证大家依赖一致并且安装模块速度也能提高。



注意点：

1. npm安装，没有package-lock.json文件，如果npm版本是5+，会自动生成package-lock.json。有的话会默认依据该文件进行安装而不是package.json。cnpm不支持（忽略）依据package-lock.json文件安装模块，默认依赖package.json进行安装。
2. 需要更新版本，得去更新package.json里的模块版本，然后npm install，才能同步更新到package-lock.json
3. 该功能基于npm5+







## npx



npx可以直接执行node_modules/.bin文件 不需要在去配置scripts

如果模块不存在可以安装，安装完有后会自己销毁，避免安装全局模块





## pnpm



官方文档：https://pnpm.js.org/en/

pnpm 本质上就是一个包管理器，这一点跟 npm/yarn 没有区别，但它作为杀手锏的两个优势在于:

* 包安装速度极快；
* 磁盘空间利用非常高效。

安装非常简单：`npm i -g pnpm



特点：

* 速度快。会比 npm/yarn 快 2-3 倍
* 高效利用磁盘空间。内部是基于内容寻址的文件系统来存储磁盘上的所有文件，它不会重复安装一个包，且如果包版本不同，会极大复用之前的包
* 支持 monorepo。monorepo 的宗旨就是用一个 git 仓库来管理多个子项目，所有的子项目都存放在根目录的`packages`目录下，那么一个子项目就代表一个`package`
* 安全性高



依赖管理不再是扁平化，包的依赖都是嵌套的，和npm、yarn的扁平化都不一样（为什么安装一个包，node_modules中会出现很多东西）。将`包本身`和`依赖`放在同一个`node_module`下面，与原生 Node 完全兼容，又能将 package 与相关的依赖很好地组织到一起，设计十分精妙。



现在我们回过头来看，根目录下的 node_modules 下面不再是眼花缭乱的依赖，而是跟 package.json 声明的依赖基本保持一致。即使 pnpm 内部会有一些包会设置依赖提升，会被提升到根目录 node_modules 当中，但整体上，根目录的`node_modules`比以前还是清晰和规范了许多。



pnpm 使用起来十分简单，如果你之前有 npm/yarn 的使用经验，甚至可以无缝迁移到 pnpm 上来。不信我们来举几个日常使用的例子。



```shell
// 安装 axios
pnpm install axios
// 安装 axios 并将 axios 添加至 devDependencies
pnpm install axios -D
// 安装 axios 并将 axios 添加至 dependencies
pnpm install axios -S
```

另外，对于我们经常用到`npm run/start/test/publish`，这些直接换成 pnpm 也是一样的