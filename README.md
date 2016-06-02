#如何启动项目

### 第一步:安装node.js  官方网址:https://nodejs.org/en/

###$ node.js会自动安装npm包管理工具.

### 第二步:全局安装工具

    npm install gulp
    npm install webpack
    npm install cnpm  //淘宝镜像环境
    npm install bower
    npm install webpack gulp webpack-dev-server -g

### 第三步:添加es6的配置文件
    在项目根目录新建文件.babelrc
    输入以下内容

    {
      "plugins": ["transform-runtime"],
      "presets": ["es2015", "stage-0"]
    }
### 第四步:在项目根目录输入 gulp 启动项目


## usage

    gulp page --name 模块名  新建页面