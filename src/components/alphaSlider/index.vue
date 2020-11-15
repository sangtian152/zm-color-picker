<template>
  <div class="zm-color-alpha-slider">
    <div
      @click="handleClick"
      ref="bar"
      class="zm-color-alpha-slider__bar"
      :style="{'background': background}"></div>
    <div
      ref="thumb"
      class="zm-color-alpha-slider__thumb"
      :style="{
        left: thumbLeft + 'px',
        top: thumbTop + 'px'
      }"></div>
  </div>
</template>
<script type="text/babel">
import draggable from '@/utils/draggable';
export default {
  name: "AlphaSlider",
  props: {
    r: [Number, String],
    g: [Number, String],
    b: [Number, String],
    alpha: Number,
  },
  data(){
    return {
      thumbLeft: 0,
      thumbTop: 0,
      color:{},
    }
  },
  computed:{
    background() {
      const { r, g, b } = this;
      return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgb(${r}, ${g}, ${b}) 100%)`;
    }
  },
  mounted(){
    const { bar, thumb } = this.$refs;

    const dragConfig = {
      drag: (event) => {
        this.handleDrag(event);
      },
      end: (event) => {
        this.handleDrag(event);
      }
    };

    draggable(bar, dragConfig);
    draggable(thumb, dragConfig);
    this.getThumbLeft()
  },
  methods:{
    handleClick(event) {
      const thumb = this.$refs.thumb;
      const target = event.target;

      if (target !== thumb) {
        this.handleDrag(event);
      }
    },

    handleDrag(event) {
      const rect = this.$el.getBoundingClientRect();
      const { thumb } = this.$refs;
      let left = event.clientX - rect.left;
      left = Math.max(thumb.offsetWidth / 2, left);
      left = Math.min(left, rect.width - thumb.offsetWidth / 2);
      this.$emit('update:alpha', Number(((left - thumb.offsetWidth / 2) / (rect.width - thumb.offsetWidth)).toFixed(2)));
      this.$nextTick(()=>{
        this.getThumbLeft()
      })
    },
    getThumbLeft() {
      const el = this.$el;
      const { alpha }  = this;
      if (!el) return 0;
      const thumb = this.$refs.thumb;
      this.thumbLeft = Number((alpha * (el.offsetWidth - thumb.offsetWidth / 2)).toFixed(2));
    },
  }
}
</script>
<style>

</style>