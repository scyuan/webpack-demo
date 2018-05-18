### 之前webpack的一些认识

之前接触到webpack的地方只有vue-cli工具了（用于生成vue单页面项目工程）`vue init webpack project-name`。

因为生成的项目关于webpack的配置异常庞大（对于我来说是的）。所以也没想到去深入了解如何使用webpack。

另外还了解webpack可能是一个打包工具，具体如何打包怎么样打包都不清楚。

在最近的一个项目中，学习了如何开发一个vue插件，使用的命令是`vue init webpack-simple project`。该命令生成的项目工程结构就比较简单。webpack的配置也一目了然（视觉上，并不是理解上，🤣）。

#### 那什么是webpack

webpack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。

### 为什么要使用webpack

现今的很多网页其实可以看做是功能丰富的应用，它们拥有着复杂的JavaScript代码和一大堆依赖包。为了简化开发的复杂度，前端社区涌现出了很多好的实践方法

- 模块化，让我们可以把复杂的程序细化为小的文件;
- 类似于TypeScript这种在JavaScript基础上拓展的开发语言：使我们能够实现目前版本的JavaScript不能直接使用的特性，并且之后还能转换为JavaScript文件使浏览器可以识别；
- Scss，less等CSS预处理器
- ...

### 相关教程

[webpack官方文档](https://www.webpackjs.com/)

我是看下面这篇博客开始了解webpack的一些概念和模块功能。教程是基于webpack1.x的，现在最新的webpack已经是4.x。作者写这篇文章的时候已经是v4.8.3了。

[入门webpack 看这篇就够](https://segmentfault.com/a/1190000006178770)

因为一些操作可能会有偏差，所以我又找了一篇基于webpack4.0的教程文章

[webpack 4 教程](https://blog.zfanw.com/webpack-tutorial/#%E5%AE%89%E8%A3%85-webpack)

### 爬坑过程

#### 新建一个webpack-demo文件夹，并在该文件夹下新建一个package.json文件

```bash
# 该命令会一步一步提示你，你该输入什么
npm init
```

```bash
# 一键生成package.json文件
npm init -y
```

#### 新建一个inedx.html并写入最基本的html代码。它在这里的作用是引入打包后的js文件（这里我们先命名为bundle.js）

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>webpack 教程</title>
</head>
<body>
  
<script type="text/javascript" src="bundle.js"></script>
</body>
</html>
```

#### 新建一个greeter.js，依据CommonJS规范导出这个函数为一个模块

```JavaScript
module.exports = function() {
  var greet = document.createElement('div');
  greet.textContent = "Hello World";
  return greet;
};
```

#### 新建一个main.js入口函数，把greeter.js模块返回的节点插入到页面

```JavaScript
const greeter = require('./Greeter.js');
document.querySelector("#root").appendChild(greeter());
```

#### 正式使用webpack

##### 在此之前先安装webpack
```bash
# 局部安装
npm install --save-dev webpack
```

```bash
# {extry file}出填写入口文件的路径，本文中就是上述main.js的路径，
# {destination for bundled file}处填写打包文件的存放路径
# 填写路径的时候不用添加{}
webpack {entry file} {destination for bundled file}
```

##### 指定入口文件后，webpack将自动识别项目所依赖的其它文件，不过需要注意的是如果你的webpack不是全局安装的，那么当你在终端中使用此命令时，需要额外指定其在node_modules中的地址，继续上面的例子，在终端中输入如下命令

[知乎专栏 npx是什么](https://zhuanlan.zhihu.com/p/27840803)

```bash
# webpack非全局安装的情况
node_modules/.bin/webpack main.js bundle.js
```

当运行之后粗线提示

```bash
The CLI moved into a separate package: webpack-cli
Would you like to install webpack-cli? (That will run npm install -D webpack-cli) (yes/NO)
```
选择yes并继续

出错（目前不知道什么原因，以后再说），删除node_modules文件夹后再重新cnpm install

然后
```bash
cnpm install webpack-cli --save--dev
```

然后继续执行
```bash
# webpack非全局安装的情况
node_modules/.bin/webpack main.js bundle.js
```

报错
```bash
ERROR in multi ./main.js bundle.js
Module not found: Error: Can't resolve 'bundle.js' in '/Users/yuansichao/Desktop/webpack-demo'
 @ multi ./main.js bundle.js
```

也不知道什么意思（上述命令参照webpack1.x的教程，觉得可能有误，所以后又参照webpack4.x的教程，添加了 -o，打包成功）

然后继续执行
```bash
# webpack非全局安装的情况
node_modules/.bin/webpack main.js -o bundle.js
```

```bash
Hash: 8ca054b91b7193e4a64e
Version: webpack 4.8.3
Time: 304ms
Built at: 2018-05-17 14:30:20
    Asset       Size  Chunks             Chunk Names
bundle.js  718 bytes       0  [emitted]  main
Entrypoint main = bundle.js
[0] ./Greeter.js 130 bytes {0} [built]
[1] ./main.js 96 bytes {0} [built]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
```
打包成功，但出现黄色警告。这是 webpack 4 引入的模式，包括 development、production、none 三个值，我们不传入值的话，默认使用 production。

调整下命令

```bash
# webpack非全局安装的情况
node_modules/.bin/webpack main.js -o bundle.js --mode development
```

不出现黄色警告了

打开index.html，可以发现运行成功

![](https://ws2.sinaimg.cn/large/006tNc79ly1frebu0f0yrj30b505ot8h.jpg)

PS:如果不指定输入输出会怎么样呢？我们来试一下

```bash
yuansichaodeMacBook-Pro:webpack-demo yuansichao$ node_modules/.bin/webpack --mode development
Hash: 5737d556ca16cd40cb8f
Version: webpack 4.8.3
Time: 52ms
Built at: 2018-05-17 14:39:07

ERROR in Entry module not found: Error: Can't resolve './src' in '/Users/yuansichao/Desktop/webpack-demo'
```

报错，说在 ./src 下找不到 main.js 文件 - 这也是 webpack 4 引入的约定，不指定输入文件的话，则默认为 src/main.js。我们按照约定将项目根目录下的 main.js 移动到 src/main.js：

```bash
mkdir src
mv main.js src
```

重新运行一下

```bash
yuansichaodeMacBook-Pro:webpack-demo yuansichao$ node_modules/.bin/webpack --mode development
Hash: 5737d556ca16cd40cb8f
Version: webpack 4.8.3
Time: 62ms
Built at: 2018-05-17 14:41:08

ERROR in Entry module not found: Error: Can't resolve './src' in '/Users/yuansichao/Desktop/webpack-demo'
```
还是找不到文件。原来webpack 4 引入的约定，不指定输入文件的话，则默认为 src/index.js，所以入口文件main.js修改为index.js，并修改index.js内依赖文件的路径

重新运行

```bash
yuansichaodeMacBook-Pro:webpack-demo yuansichao$ node_modules/.bin/webpack --mode development
Hash: 655e62712617ff21843f
Version: webpack 4.8.3
Time: 115ms
Built at: 2018-05-17 14:42:36
  Asset      Size  Chunks             Chunk Names
main.js  3.32 KiB    main  [emitted]  main
Entrypoint main = main.js
[./Greeter.js] 130 bytes {main} [built]
[./src/index.js] 97 bytes {main} [built]
```

默认在/dist文件夹生成了main.js，为什么是main.js？这也正是 webpack 4 未指定输出文件时默认的位置吧

#### 通过配置文件来使用webpack

webpack拥有很多其它的比较高级的功能（比如说本文后面会介绍的loaders和plugins），这些功能其实都可以通过命令行模式实现，但是正如前面提到的，这样不太方便且容易出错的，更好的办法是定义一个配置文件，这个配置文件其实也是一个简单的JavaScript模块，我们可以把所有的与打包相关的信息放在里面。

##### 在根目录新建一个webpack.config.js的文件

```JavaScript
module.exports = {
  entry:  __dirname + "/src/index.js",  //已多次提及的唯一入口文件
  output: {
    path: __dirname + "/dist",          //打包后的文件存放的地方
    filename: "bundle.js"               //打包后输出文件的文件名
  }
}
```
> **注：** **__dirname**是Node.js中的一个全局变量，它代表当前执行脚本所在的目录

有了这个配置，在命令行执行

```bash
# 全局安装webpack
webpack
# 非全局安装webpack
node_modules/.bin/webpack
```
有警告并出错

```bash
Hash: 40caf2ed6b9f42cad00c
Version: webpack 4.8.3
Time: 70ms
Built at: 2018-05-17 15:01:17

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/

ERROR in Entry module not found: Error: Can't resolve '/Users/yuansichao/Desktop/webpack-demo/src/main.js' in '/Users/yuansichao/Desktop/webpack-demo'
```
警告是因为没有指定模式

出错是因为没有找到文件

刚刚我没有保存webpack.config.js文件😓。。。保存完之后打包成功


##### 上面已经说了两种webpack的打包方法，接下来介绍一种更加快捷方便的打包方法

在命令行中输入命令需要代码类似于node_modules/.bin/webpack这样的路径其实是比较烦人的，不过值得庆幸的是**npm可以引导任务执行**，对npm进行配置后可以在命令行中使用简单的npm start命令来替代上面略微繁琐的命令。在package.json中对scripts对象进行相关设置即可，设置方法如下。修改package.json文件

```json
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "webpack 教程",
  "main": "bundle.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node_modules/.bin/webpack"
    //"start":"webpack" //不管webpack是局部还是全局安装的
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.8.3"
  }
}
```
> **注：** package.json中的script会安装一定顺序寻找命令对应位置，本地的node_modules/.bin路径就在这个寻找清单中，所以无论是全局还是局部安装的Webpack，你都不需要写前面那指明详细的路径了。

npm的start命令是一个特殊的脚本名称，其特殊性表现在，在命令行中使用npm start就可以执行其对于的命令，如果对应的此脚本名称不是start，想要在命令行中运行时，需要这样用npm run {script name}如npm run build，我们在命令行中输入npm start试试，输出结果如下：

```bash
> webpack-demo@1.0.0 start /Users/yuansichao/Desktop/webpack-demo
> webpack

Hash: b18dec58d2a25b156fc7
Version: webpack 4.8.3
Time: 110ms
Built at: 2018-05-17 15:12:29
    Asset       Size  Chunks             Chunk Names
bundle.js  718 bytes       0  [emitted]  main
Entrypoint main = bundle.js
[0] ./Greeter.js 130 bytes {0} [built]
[1] ./src/index.js 97 bytes {0} [built]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
```
打包成功，有警告是因为没有指定模式。

#### 使用webpack构建本地服务器

想不想让你的浏览器监听你的代码的修改，并自动刷新显示修改后的结果，其实Webpack提供一个可选的本地开发服务器，这个本地服务器基于node.js构建，可以实现你想要的这些功能，不过它是一个单独的组件，在webpack中进行配置之前需要单独安装它作为项目依赖

```bash
npm install --save-dev webpack-dev-server
```
试了了一下上面的命令，下载龟速...还是选择cnpm

下载完之后，可在webpack.config.js配置devServer（通过配置文件配置更加快捷吧）,也可使用命令行

[英文文档 webpack DevServer](https://webpack.js.org/configuration/dev-server/)

里面讲了很多配置项，下面简单讲一下几个


配置项名称 | 作用
---|---
contentBase | 本地服务器所加载的资源所在的目录（注意是目录，即webpack会去哪个目录找文件）
port | 端口（默认是8080）
inline | 是否实时刷新
host | 主机（默认localhost）
open | 是否自动开启浏览器
... | ...

```JavaScript
devServer: {
    contentBase: "./dist",                 //本地服务器所加载的页面所在的目录
    historyApiFallback: true,              //不跳转
    inline: true                           //实时刷新
    open:false,
  } 
```
package.json中的scripts添加start

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node_modules/.bin/webpack",
    "server": "webpack-dev-server"
  },
```

运行成功

此时修改入口文件index.js的内容，回到浏览器可以实时刷新。

#### loader

> **官方说法：** loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！



