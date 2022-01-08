(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1c463758"],{"2df4":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"content element-doc"},[e._m(0),e._m(1),r("br"),r("demo-block",[r("template",{slot:"source"},[r("element-demo0")],1),r("template",{slot:"highlight"},[r("pre",{pre:!0},[r("code",{pre:!0,attrs:{class:"html"}},[e._v('<template>\n  <div style="height: 200px; text-align:center;">\n    <zm-color-picker v-model="colorValue" @change="handleChange" @active-change="handleActiveChange"></zm-color-picker>\n  </div>\n</template>\n<script>\n    export default {\n      data(){\n        return {\n          colorValue: \'rgb(255, 166, 0)\',\n        } \n      },\n      watch:{\n        colorValue(value){\n          console.log(value)\n        }\n      },\n      created(){\n      }, \n      methods:{\n        handleChange(data){\n          console.log(data)\n        },\n        handleActiveChange(data){\n          console.log(data)\n        },\n      }  \n    }\n<\/script>\n')])])])],2),e._m(2),e._m(3),e._m(4),e._m(5),e._m(6),e._m(7)],1)},a=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("h2",{attrs:{id:"demo-yan-shi-an-li"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#demo-yan-shi-an-li"}},[e._v("$")]),e._v(" Demo 演示案例")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("h3",{attrs:{id:"ji-chu-yong-fa"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#ji-chu-yong-fa"}},[e._v("$")]),e._v(" 基础用法")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("h3",{attrs:{id:"attributes"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#attributes"}},[e._v("$")]),e._v(" Attributes")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("table",[r("thead",[r("tr",[r("th",[e._v("参数")]),r("th",[e._v("说明")]),r("th",[e._v("类型")]),r("th",[e._v("可选值")]),r("th",[e._v("默认值")])])]),r("tbody",[r("tr",[r("td",[e._v("v-model")]),r("td",[e._v("绑定值")]),r("td",[e._v("String")]),r("td",[e._v("—")]),r("td",[e._v("——")])]),r("tr",[r("td",[e._v("disabled")]),r("td",[e._v("是否禁用")]),r("td",[e._v("Boolean")]),r("td",[e._v("—")]),r("td",[e._v("false")])]),r("tr",[r("td",[e._v("show-alpha")]),r("td",[e._v("是否支持透明度选择")]),r("td",[e._v("Boolean")]),r("td",[e._v("—")]),r("td",[e._v("false")])]),r("tr",[r("td",[e._v("color-format")]),r("td",[e._v("写入 v-model 的颜色的格式")]),r("td",[e._v("String")]),r("td",[e._v("hex / rgb")]),r("td",[e._v("hex（show-alpha 为 false）/ rgb（show-alpha 为 true）")])]),r("tr",[r("td",[e._v("predefine")]),r("td",[e._v("预定义颜色")]),r("td",[e._v("Array")]),r("td",[e._v("—")]),r("td",[e._v("——")])])])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("h3",{attrs:{id:"events"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#events"}},[e._v("$")]),e._v(" Events")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("table",[r("thead",[r("tr",[r("th",[e._v("事件名")]),r("th",[e._v("说明")]),r("th",[e._v("返回值")])])]),r("tbody",[r("tr",[r("td",[e._v("change")]),r("td",[e._v("当绑定值变化时触发")]),r("td",[e._v("当前值")])])])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("h3",{attrs:{id:"slot"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#slot"}},[e._v("$")]),e._v(" Slot")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("table",[r("thead",[r("tr",[r("th",[e._v("参数")]),r("th",[e._v("说明")])])]),r("tbody",[r("tr",[r("td",[e._v("reference")]),r("td",[e._v("触发 colorPicker 显示的 HTML 元素")])])])])}];r("a4d3"),r("4de4"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("159b");function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var l={name:"component-doc",components:{"element-demo0":function(){var e=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[[r("div",{staticStyle:{height:"200px","text-align":"center"}},[r("zm-color-picker",{on:{change:e.handleChange,"active-change":e.handleActiveChange},model:{value:e.colorValue,callback:function(t){e.colorValue=t},expression:"colorValue"}})],1)]],2)},t=[],r={data:function(){return{colorValue:"rgb(255, 166, 0)"}},watch:{colorValue:function(e){console.log(e)}},created:function(){},methods:{handleChange:function(e){console.log(e)},handleActiveChange:function(e){console.log(e)}}};return s({render:e,staticRenderFns:t},r)}()}},i=l,h=r("2877"),d=Object(h["a"])(i,n,a,!1,null,null,null);t["default"]=d.exports},"44a4":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},a=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"content element-doc"},[r("h2",{attrs:{id:"jie-shao"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#jie-shao"}},[e._v("$")]),e._v(" 介绍")]),r("p",[e._v("ColorPicker 基于vue和canvas的颜色选择器。")]),r("h2",{attrs:{id:"an-zhuang"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#an-zhuang"}},[e._v("$")]),e._v(" 安装")]),r("h3",{attrs:{id:"npm-an-zhuang"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#npm-an-zhuang"}},[e._v("$")]),e._v(" npm 安装")]),r("p",[e._v("推荐使用npm安装，它能更好地和"),r("a",{attrs:{href:"https://webpack.js.org/"}},[e._v("webpack")]),e._v("打包工具配合使用。而且可以更好的和 es6配合使用。并且支持按需引入")]),r("pre",[r("code",{staticClass:"language-shell"},[e._v("npm i zm-color-picker -S\n# or \nyarn add zm-color-picker\n")])]),r("h3",{attrs:{id:"yin-ru"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#yin-ru"}},[e._v("$")]),e._v(" 引入")]),r("p",[e._v("在 main.js 中写入以下内容：")]),r("pre",[r("code",{staticClass:"language-javascript"},[e._v("import Vue from 'vue';\nimport ZmColorPicker from 'zm-color-picker';\nimport \"zm-color-picker/lib/zm-color-picker.css\";\n\nVue.use(ZmColorPicker);\n")])]),r("h3",{attrs:{id:"zui-xin-ban-ben"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#zui-xin-ban-ben"}},[e._v("$")]),e._v(" 最新版本")]),r("p",[r("a",{attrs:{href:"https://www.npmjs.com/package/zm-color-picker"}},[r("img",{attrs:{src:"https://img.shields.io/npm/v/zm-color-picker",alt:"NPM version"}})])])])}],o=r("2877"),c={},s=Object(o["a"])(c,n,a,!1,null,null,null);t["default"]=s.exports},"4de4":function(e,t,r){"use strict";var n=r("23e7"),a=r("b727").filter,o=r("1dde"),c=r("ae40"),s=o("filter"),l=c("filter");n({target:"Array",proto:!0,forced:!s||!l},{filter:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},dbb4:function(e,t,r){var n=r("23e7"),a=r("83ab"),o=r("56ef"),c=r("fc6a"),s=r("06cf"),l=r("8418");n({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(e){var t,r,n=c(e),a=s.f,i=o(n),h={},d=0;while(i.length>d)r=a(n,t=i[d++]),void 0!==r&&l(h,t,r);return h}})},ef23:function(e,t,r){var n={"./demo.md":"2df4","./guide.md":"44a4"};function a(e){var t=o(e);return r(t)}function o(e){if(!r.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}a.keys=function(){return Object.keys(n)},a.resolve=o,e.exports=a,a.id="ef23"}}]);
//# sourceMappingURL=chunk-1c463758.2b6d4774.js.map