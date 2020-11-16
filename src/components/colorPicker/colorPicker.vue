<template>
  <div class="zm-color-picker">
    <div @click="visible = !visible" class="zm-color-picker__trigger">
      <span
        class="zm-color-picker__color"
        :style="{background: `#${colorHex}`}"></span>
    </div>
    <transition name="fade">
      <div v-show="visible" ref="zm-color-dropdown" class="zm-color-dropdown">
        <div class="zm-color-picker__panel">
          <canvas
            ref="canvas"
            :width="colorPickerWidth"
            :height="colorPickerHeight"
          ></canvas>
          <div id="circleSelect" class="zm-color-picker__select" @mousedown="circleDown"></div>
          <div class="zm-color-picker__bar">
            <canvas ref="barCanvas" width="10px" :height="colorPickerHeight"></canvas>
            <div
              ref="move"
              class="zm-move"
              style="background-color:rgba(255,0,0,1)"
              @mousedown="barDown"
            ></div>
          </div>
        </div>
        <alpha-slider v-if="showAlpha" :r="colorR" :g="colorG" :b="colorB" :alpha.sync="alpha" @on-change="renderPreview" />
        <color-predefine v-if="predefine.length > 0" :predefine="predefine" @on-predefine="handlePredefine"></color-predefine>
        <div class="zm-color-picker_footer">
          <div class="zm-color-picker__value">
            <label v-if="format==='rgb' || format==='rgba'" class="zm-label">
              <span v-if="format==='rgb'">rgb&nbsp;</span>
              <span v-else-if="format==='rgba'">rgba&nbsp;</span>
              <input type="text" v-model="colorR" class="zm-input" @keydown="handleColorRGB($event, 'colorR')" />
              <input type="text" v-model="colorG" class="zm-input" @keydown="handleColorRGB($event, 'colorG')" />
              <input type="text" v-model="colorB" class="zm-input" @keydown="handleColorRGB($event, 'colorB')" />
              <input v-if="format==='rgba'" type="text" v-model="alpha" class="zm-input" @keydown="handleColorAlpha" />
            </label>
            <label v-if="format==='hex'" class="zm-label">#&nbsp;<input type="text" v-model="colorHex" class="zm-input zm-input__hex" @keydown="handleColorHex" /></label>
            <canvas
              ref="canvas-preview"
              class="zm-color-picker_preview"
              width="22px"
              height="22px"
            ></canvas>
          </div>
          <div>
            <button class="zm-button zm-button--text" @click="hidden">取消</button>
            <button class="zm-button" @click="handleSubmit">确定</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/babel">
import ColorPredefine from "../colorPredefine"
import AlphaSlider from "../alphaSlider"
import { testColor } from "@/utils/utils"
export default {
  name: "ZmColorPicker",
  components: {
    ColorPredefine,
    AlphaSlider
  },
  props: {
    value:{
      type: String,
      default: "#ff0000"
    },
    colorFormat:{
      type: String,
      default: "hex"
    },
    predefine:{
      type: Array,
      default:() => {
        return ['#ff4500', '#ff8c00', '#ffd700'];
      }
    },
    showAlpha: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      visible: false,
      colorR: "255",
      colorG: "0",
      colorB: "0",
      alpha: 1,
      colorH: "0",
      colorS: "1",
      colorL: "0.5",
      colorHex: "ff0000",
      nowY: "", //点击颜色条时的y坐标
      flag: false, //决定圆形颜色选择器什么时候可以移动
      selectflag: false, //决定
      downX: "", //点击渲染板上的圆形选择器时的X坐标
      downY: "", //点击渲染板上的圆形选择器时的Y坐标
      circleTop: "", //mousedown发生时，circleSelect当时的上边距
      circleLeft: "", //mousedown发生时，circleSelect当时的左边距
      moveTop: 0, //圆形颜色选择器top值
      bgcolor: "", //圆形颜色选择器发生变化时的背景色
      colorPickerWidth: 260,
      colorPickerHeight: 184,
      timer: null,
    };
  },
  computed:{
    format(){
      if(this.showAlpha) {
        return 'rgba'
      } else {
        const formats = ["hex", "rgb", "rgba"];
        const { colorFormat } = this;
        return formats.indexOf(colorFormat) ? colorFormat : "hex";
      }
    },
  },
  watch:{
    visible(value) {
      if(value) {
        document.addEventListener("mousedown", this.handleClose);
      }
    }
  },
  mounted() {
    this.init();
    document.addEventListener("mouseup", this.handleMouseup);
    document.addEventListener("mousemove", this.handleMousemove);
  },
  beforeDestoryed() {
    document.removeEventListener("mouseup", this.handleMouseup);
    document.removeEventListener("mousemove", this.handleMousemove);
  },
  methods: {
    init() {
      this.move = this.$refs.move;
      this.show = this.$refs['canvas-preview'];
      const bar = this.$refs.barCanvas;
      this.circleSelect = document.getElementById("circleSelect");
      const { colorPickerHeight } = this;
      const linearHeight = colorPickerHeight - 2;
      //颜色棒的渐变
      const context2 = bar.getContext("2d");
      const grd2 = context2.createLinearGradient(0, 2, 0, linearHeight);
      grd2.addColorStop(0, "rgb(255,0,0)");
      grd2.addColorStop(1 / 6, "rgb(255,255,0)");
      grd2.addColorStop(1 / 3, "rgb(0,255,0)");
      grd2.addColorStop(1 / 2, "rgb(0,255,255)");
      grd2.addColorStop(2 / 3, "rgb(0,0,255)");
      grd2.addColorStop(5 / 6, "rgb(255,0,255)");
      grd2.addColorStop(1, "rgb(255,0,0)");
      context2.fillStyle = grd2;
      context2.fillRect(0, 0, 10, colorPickerHeight);
      // 格式化颜色
      const { value } = this;
      const colorFormat = testColor(value);
      if (colorFormat === "hex") {
        this.hex2rgb(value)
      } else if (colorFormat === "rgb") {
        const rgb = this.splitRGB(value);
        this.colorR = rgb[0];
        this.colorG = rgb[1];
        this.colorB = rgb[2];
        this.colorHex = this.rgb2hex(...rgb)
      }
      const { colorR, colorB, colorG } = this;
      //将rgb转换为Hsl
      this.rgb2hsl(colorR, colorG, colorB)
      //初始设置画布颜色
      this.renderByRGB(colorR, colorG, colorB)
    },
    render(color) {
      const { colorPickerWidth, colorPickerHeight } = this;
      const linearWidth = colorPickerWidth - 2;
      const linearHeight = colorPickerHeight - 2;
      const context1 = this.$refs.canvas.getContext("2d");
      const grd1 = context1.createLinearGradient(2, 2, linearWidth, 2); //水平渐变
      grd1.addColorStop(0, "rgba(255,255,255,1)");
      grd1.addColorStop(1, color);
      context1.fillStyle = grd1;
      context1.fillRect(0, 0, colorPickerWidth, colorPickerHeight);
      const grd3 = context1.createLinearGradient(2, 2, 2, linearHeight); //垂直渐变
      grd3.addColorStop(0, "rgba(0, 0, 0, 0)");
      grd3.addColorStop(1, "rgba(0, 0, 0, 1)");
      context1.fillStyle = grd3;
      context1.fillRect(0, 0, colorPickerWidth, colorPickerHeight);
    },
    //通过渲染板上圆形选择器移动而产生的拾色，右下角展示板渲染，各个值的显示变化
    pickRenderShow() {
      const context1 = this.$refs.canvas.getContext("2d");
      //渲染板上的圆形择色器
      let circleCenterY = this.circleSelect.offsetTop + 5; //选择器半径的改动以及myCanvas外边距和宽度高度的改动，这里的数值也要做相应改动
      let circleCenterX = this.circleSelect.offsetLeft + 5;
      var imageData = context1.getImageData(circleCenterX, circleCenterY, 1, 1); //用来到达渲染板上圆形选择器中心点位置，然后取宽高各为一像素的像素点
      this.colorR = imageData.data[0];
      this.colorG = imageData.data[1];
      this.colorB = imageData.data[2];
      const { colorR, colorG, colorB } = this;
      //根据渲染板上圆形择色器的rgb，转为16进制，将值填入右边一栏
      this.colorHex = this.rgb2hex(colorR, colorG, colorB);
      //将rgb转换为Hsl
      this.rgb2hsl(colorR, colorG, colorB)
      //使右边颜色展示板能够随左边圆形择色器的改变而改变
      this.renderPreview(this.alpha)
    },
    splitRGB(color){
      let rgb = color.replace(/^rgb\(/i, '');
      rgb = rgb.replace(/\)$/i, '');
      rgb = rgb.replace(/\s+/g,"");
      return rgb.split(',')
    },
    //根据输入获得的RGB转为HSL
    rgb2hsl(r, g, b) {
      let H, S, L;
      (r = r / 255), (g = g / 255), (b = b / 255);
      let max = Math.max(r, g, b);
      let min = Math.min(r, g, b);
      L = (max + min) / 2;
      if (max == min) {
        H = 0;
        S = 0;
      } else {
        let d = max - min;
        S = L > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            H = 60 * ((g - b) / d + (g < b ? 6 : 0));
            break;
          case g:
            H = 60 * ((b - r) / d + 2);
            break;
          case b:
            H = 60 * ((r - g) / d + 4);
            break;
        }
      }
      this.colorH = Math.round(H);
      this.colorS = Number(S.toFixed(2));
      this.colorL = Number(L.toFixed(2));
    },
    //根据输入获得的RGB转为十六进制
    rgb2hex(r, g, b) {
      let hexR = Number(r).toString(16);
      let hexG = Number(g).toString(16);
      let hexB = Number(b).toString(16);
      if (hexR.length === 1) {
        hexR = "0" + hexR;
      }
      if (hexG.length === 1) {
        hexG = "0" + hexG;
      }
      if (hexB.length === 1) {
        hexB = "0" + hexB;
      }
      const strHex = hexR + hexG + hexB;
      // this.colorHex = strHex;
      return strHex;
    },
    //根据输入HSL转为RGB，再将rgb转为十六进制
    hsl2rgb(h, s, l) {
      h = h / 360;
      let r1, g1, b1;
      function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }
      if (s == 0) {
        r1 = g1 = b1 = l;
        this.colorR = Math.round(r1 * 255);
        this.colorG = Math.round(g1 * 255);
        this.colorB = Math.round(b1 * 255);
      } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r1 = hue2rgb(p, q, h + 1 / 3);
        g1 = hue2rgb(p, q, h);
        b1 = hue2rgb(p, q, h - 1 / 3);
        this.colorR = Math.round(r1 * 255);
        this.colorG = Math.round(g1 * 255);
        this.colorB = Math.round(b1 * 255);
      }
      this.colorHex = this.rgb2hex(
        Math.round(r1 * 255),
        Math.round(g1 * 255),
        Math.round(b1 * 255)
      );
    },
    hex2rgb(color) {
      // 16进制颜色值的正则
      const reg = /^([0-9a-f]{3}|[0-9a-f]{6})$/;
      // 把颜色值变成小写
      color = color.toLowerCase();
      if (reg.test(color)) {
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff
        if (color.length === 3) {
          let colorNew = "";
          for (let i = 0; i < 3; i += 1) {
            colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
          }
          color = colorNew;
        }
        // 处理六位的颜色值，转为RGB
        const colorChange = [];
        for (var i = 0; i < 6; i += 2) {
          colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
        }
        this.colorR = colorChange[0];
        this.colorG = colorChange[1];
        this.colorB = colorChange[2];
        return "RGB(" + colorChange.join(",") + ")";
      } else {
        return color;
      }
    },
    barDown() {
      this.flag = true;
      this.selectflag = false;
      this.moveTop = this.move.offsetTop;
      this.nowY = event.clientY;
    },
    circleDown(event) {
      this.selectflag = true;
      this.flag = false;
      this.downX = event.clientX;
      this.downY = event.clientY;
      this.circleTop = this.circleSelect.offsetTop;
      this.circleLeft = this.circleSelect.offsetLeft;
    },
    barMove(event) {
      event.preventDefault();
      const { colorPickerHeight } = this;
      const moveY = event.clientY;
      this.dis = moveY - this.nowY;
      this.finalTop = this.moveTop + this.dis;
      if (colorPickerHeight - 9 >= this.finalTop && this.finalTop >= -7) {
        const context2 = this.$refs.barCanvas.getContext("2d");
        //这里将603的=去掉是因为，当colorH为600时，getimgData会从bar最低端下部分取1像素高的颜色值，也就是说取的是白色，那么取色板上的颜色与颜色棒上的红色是不一样的
        this.move.style.top = this.finalTop + "px";
        this.colorH = this.finalTop + this.move.offsetHeight / 2;
        this.finalTop + this.move.offsetHeight / 2; //colorH对应的是圆点中心的offsetTop，颜色棒和myCanvas外边距和高度的改动，这里的数值也要做相应改动
        const imgData = context2.getImageData(0, this.colorH, 1, 1);
        //将rgb转为16进制
        const { data } = imgData;
        const strHex = this.rgb2hex(data[0], data[1], data[2]);
        this.bgcolor = `#${strHex}`;
        this.render(this.bgcolor); //渲染主色板
        this.move.style.backgroundColor = this.bgcolor;
        this.pickRenderShow(); //颜色棒上的圆形选择器移动时，也能改变input的value值，即RGB和Hsl
      }
    },
    circleMove(event) {
      event.preventDefault();
      const moveX = event.clientX;
      const moveY = event.clientY;
      const circleNowL = moveX - this.downX + this.circleLeft;
      const circleNowT = moveY - this.downY + this.circleTop;
      if (circleNowL >= -4 && circleNowL <= this.colorPickerWidth - 6) {
        //选择器半径的改动以及myCanvas外边距和宽度高度的改动，这里的数值也要做相应改动
        this.circleSelect.style.left = circleNowL + "px";
      }
      if (circleNowT >= -4 && circleNowT <= this.colorPickerHeight - 6) {
        //选择器半径的改动以及myCanvas外边距和宽度高度的改动，这里的数值也要做相应改动
        this.circleSelect.style.top = circleNowT + "px";
      }
      this.pickRenderShow();
    },
    handleMousemove(event) {
      if(this.disabled){
        return false;
      }
      if (this.flag) {
        this.barMove(event);
      } else if (this.selectflag) {
        this.circleMove(event);
      }
    },
    handleMouseup() {
      this.flag = false;
      this.selectflag = false;
    },
    handleColorAlpha(event){
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        const { target } = event
        const value = Number(target.value);
        if (!isNaN(value)) {
          if (value > 1) {
            this.alpha = 1
          } else if(value < 0) {
            this.alpha  = 0
          }
        } else {
          this.alpha  = 0
        }
        this.renderPreview(this.alpha)
      }, 200)
    },
    handleColorRGB(event, key) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        const { target } = event
        const value = Number(target.value);
        if (!isNaN(value)) {
          if (value > 255) {
            this[key]  = 255
          } else if(value < 0) {
            this[key]  = 0
          }
        } else {
          this[key]  = 0
        }
        const inputNum = [];
        //setTimeout方法暂定，这是为了在键盘按下后，能够更新rgb，获得最新值，从而改变HSL的值，不然键盘按下的一瞬间，获得的数据是上一次的数据；
        const keys = ["colorR", "colorG", "colorB"];
        for (let i = 0; i < 3; i++) {
          let key = keys[i];
          inputNum.push(this[key]);
        }
        //利用延迟而获得的最新数值，来改变HSL和十六进制
        if (inputNum[0] <= 255 && inputNum[1] <= 255 && inputNum[2] <= 255) {
          this.colorHex = this.rgb2hex(inputNum[0], inputNum[1], inputNum[2]);
          this.rgb2hsl(...inputNum);
          this.renderByRGB(inputNum[0], inputNum[1], inputNum[2]);
        } else {
          return;
        }
      }, 200);
    },
    renderByRGB(r, g, b){
      const { colorPickerHeight } = this;
      //利用返回的HSL中的H值，按照比列来确定move的位置
      const moveCurrentH = ((colorPickerHeight - 4) * this.colorH) / 360 - 7;
      this.move.style.top = moveCurrentH + "px";
      const context2 = this.$refs.barCanvas.getContext("2d");
      const imgData = context2.getImageData(0, moveCurrentH + 8, 1, 1);
      //将rgb转为16进制,变化move的背景色
      const { data } = imgData;
      const strHex = this.rgb2hex(data[0], data[1], data[2]);
      this.bgcolor = `#${strHex}`;
      this.move.style.backgroundColor = this.bgcolor;
      //渲染主色板
      this.render(this.bgcolor);
      //RGB改变时同时改变渲染板上圆形择色器的位置,根据HSV的原理好定位
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const V = Number((max / 255).toFixed(2));
      const S = Number(((max - min) / max).toFixed(2));
      const circleL = S * this.colorPickerWidth - 6;
      const circleT = (1 - V) * this.colorPickerHeight - 4;
      this.circleSelect.style.top = circleT + "px";
      this.circleSelect.style.left = circleL + "px";
      //渲染板上圆形择色器的位置改变时，改变展示板的颜色
      this.renderPreview(this.alpha)
    },
    renderPreview(alpha){
      //alpha改变时，改变展示板的颜色
      const { colorR, colorB, colorG } = this;
      let color;
      if (this.showAlpha) {
        color = `rgba(${colorR},${colorG},${colorB},${alpha})`
      } else {
        color = `rgb(${colorR},${colorG},${colorB})`
      }
      this.handleFillRect(this.show, color)
    },
    handleColorH(e){
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        const { value } = e.target;
        if (value > 1) {
          this.colorH = 1;
        } else if (value < 0) {
          this.colorH = 0;
        }
        this.handleColorHLS('colorH', value)
      }, 200)
    },
    handleColorS(e){
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        const { value } = e.target;
        if (value > 1) {
          this.colorS = 1;
        } else if (value < 0) {
          this.colorS = 0;
        }
        this.handleColorHLS('colorS', value)
      }, 200)
    },
    handleColorL(e){
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        const { value } = e.target;
        if (value > 1) {
          this.colorL = 1;
        } else if (value < 0) {
          this.colorL = 0;
        }
        this.handleColorHLS('colorL', value)
      }, 200)
    },
    handleColorHLS(type, value) {
      if(isNaN(Number(value))) {
        this[type] = 0;
      }
      const inputHSL = [];
      const keys = ["colorH", "colorS", "colorL"];
      for (let i = 0; i < 3; i++) {
        let key = keys[i];
        inputHSL.push(this[key]);
      }
      if (
        inputHSL[0] >= 0 &&
        inputHSL[0] <= 360 &&
        inputHSL[1] <= 1 &&
        inputHSL[1] >= 0 &&
        inputHSL[2] <= 1 &&
        inputHSL[2] >= 0
      ) {
        this.hsl2rgb(
          Number(inputHSL[0]),
          Number(inputHSL[1]),
          Number(inputHSL[2])
        );
        const { colorR, colorB, colorG } = this;
        this.renderByRGB(colorR, colorB, colorG)
      } else {
        return;
      }
    },
    handleColorHex(){
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.hex2rgb(this.colorHex);
        const { colorR, colorB, colorG } = this;
        this.rgb2hsl(colorR, colorG, colorB);
        this.renderByRGB(colorR, colorG, colorB);
      })
    },
    handlePredefine(color){
      this.colorHex = color.replace(/^#+/,'');
      this.handleColorHex()
    },
    handleFillRect(canvas, color){
      const type = testColor(color);
      if(type==="hexn") {
        color = `#${color}`
      } else if (type === false) {
        return
      }
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, 50, 50);
      context.fillStyle = color;
      context.fillRect(0, 0, 50, 50);
    },
    getColor(colorFormat){
      let color = "";
      const { colorR, colorB, colorG } = this;
      if (colorFormat === "rgba") {
        color = `rgba(${colorR},${colorG},${colorB}, ${this.alpha})`;
      } else if (colorFormat === "hex") {
        color = this.colorHex;
      } else if (colorFormat === "rgb") {
        color = `rgb(${colorR},${colorG},${colorB})`;
      }
      return color;
    },
    handleClose(e){
      const ele = this.$refs["zm-color-dropdown"]
      if (ele.contains(e.target)) {
        return false;
      }
      this.hidden();
      document.removeEventListener("mousedown", this.handleClose);
    },
    hidden(){
      this.init()
      this.visible = false;
    },
    handleSubmit(){
      const { format } = this;
      const color = this.getColor(format)
      this.$emit("update:value", color)
      this.$emit("change", color)
    }
  }
};
</script>
<style lang="scss" scoped>


</style>
