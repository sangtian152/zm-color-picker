## Demo 演示案例

### 基础用法

<br />

::: demo
```html
<template>
  <div style="height: 420px; text-align:center;">
    <zm-color-picker v-model="colorValue"></zm-color-picker>
  </div>
</template>
<script>
    export default {
      data(){
        return {
          colorValue: 'rgb(255, 166, 0)',
        } 
      },
      created(){
      }, 
      methods:{
        handleClear(){
          this.$Message.success("画布已清空")
        },
        handleDone(data){
          console.log(data)
        }
      }  
    }
</script>
```
:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| color     | 签名颜色   | String  |  —   |   #000000   |
| line-width    | 线条宽度   | Number  |  —   |  3  |
| canvasWidth    | 画布宽度   | Number  |  —   |  —  |
| canvasHeight   | 画布高度   | Number  |  —   |  —  |
| bgColor    | 画布背景色   | String  |  —   |  #f7f7f7  |
| imgBgColor    | 生成图片背景色   | String  |  —   |  tranparent  |
| crop    | 是否裁剪图片   | Boolean  |  —   |  true  |
| footer    | 是否显示底部   | Boolean  |  —   |  false  |
| before-done    | 签名完成前调用，如果返回false会阻止默认签名完成事件   | Function  |  —   |  canvas  |

### Events

| 事件名      | 说明    | 返回值      |
|---------- |-------- |---------- |
| orientationchange | 移动设备旋转事件 | orientation  |
| on-clear | 清空画布事件  |  —   |
| on-done | 完成签名事件，返回签名生成的图片 | data:image/png;base64  |

### Methods

| 事件名      | 说明    | 返回值      |
|---------- |-------- |---------- |
| clear | 清空画布  |  —   |
| done | 完成签名 |  —   |
