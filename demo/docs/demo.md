## Demo 演示案例

### 基础用法

<br />

::: demo
```html
<template>
  <div style="height: 200px; text-align:center;">
    <zm-color-picker v-model="colorValue" @change="handleChange" @active-change="handleActiveChange"></zm-color-picker>
  </div>
</template>
<script>
    export default {
      data(){
        return {
          colorValue: 'rgb(255, 166, 0)',
        } 
      },
      watch:{
        colorValue(value){
          console.log(value)
        }
      },
      created(){
      }, 
      methods:{
        handleChange(data){
          console.log(data)
        },
        handleActiveChange(data){
          console.log(data)
        },
      }  
    }
</script>
```
:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| v-model     | 绑定值   | String  |  —   |   ——   |
| disabled    | 是否禁用   | Boolean  |  —   |  false  |
| show-alpha    | 是否支持透明度选择   | Boolean  |  —   |  false  |
| color-format   | 写入 v-model 的颜色的格式   | String  |  hex / rgb   |  hex（show-alpha 为 false）/ rgb（show-alpha 为 true）  |
| predefine    | 预定义颜色   | Array  |  —   |  ——  |

### Events

| 事件名      | 说明    | 返回值      |
|---------- |-------- |---------- |
| change | 当绑定值变化时触发 | 当前值  |

### Methods

| 事件名      | 说明    | 返回值      |
|---------- |-------- |---------- |
| clear | 清空画布  |  —   |
| done | 完成签名 |  —   |

### Slot

| 参数      | 说明    |
|---------- |-------- |
| reference | 触发 colorPicker 显示的 HTML 元素  |