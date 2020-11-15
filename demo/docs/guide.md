## 介绍

一个简易签名组件，基于vue和canvas。

## 安装

    
`@1.0.1` 表示版本号，建议锁定版本号来保证代码的稳定性

### npm 安装

推荐使用npm安装，它能更好地和[webpack](https://webpack.js.org/)打包工具配合使用。而且可以更好的和
es6配合使用。并且支持按需引入

```shell
npm i zm-sign -S
# or 
yarn add zm-sign
```

### 引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import ZmSign from 'zm-sign';
import "zm-sign/lib/zm-sign.css";

Vue.use(ZmSign);
```

### 最新版本

[![NPM version](https://img.shields.io/npm/v/zm-sign)](https://www.npmjs.com/package/zm-sign)
