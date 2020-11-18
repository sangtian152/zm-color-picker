## 介绍

ColorPicker 基于vue和canvas的颜色选择器。

## 安装

    
### npm 安装

推荐使用npm安装，它能更好地和[webpack](https://webpack.js.org/)打包工具配合使用。而且可以更好的和
es6配合使用。并且支持按需引入

```shell
npm i zm-color-picker -S
# or 
yarn add zm-color-picker
```

### 引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import ZmColorPicker from 'zm-color-picker';
import "zm-color-picker/lib/zm-color-picker.css";

Vue.use(ZmColorPicker);
```

### 最新版本

[![NPM version](https://img.shields.io/npm/v/zm-color-picker)](https://www.npmjs.com/package/zm-color-picker)
