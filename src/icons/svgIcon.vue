<!-- 把svg配成的全局组件 -->
<template>
  <svg aria-hidden="true" :class="getClassName">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  iconName: {
    type: String, // 字符串类型
    require: true // 必填
  },
  className: {
    type: String
  }
})

const iconName = computed(() => {
  return `#icon-${props.iconName}`
})

const getClassName = computed(() => {
  if (props.className) {
    // 如果传了className ==> defaultSvgClass sideClass
    return `defaultSvgClass ${props.className}`
  } else {
    // 如果没传className ==> defaultSvgClass sideClass
    return `defaultSvgClass`
  }
})
</script>
<style lang="scss" scoped>
.defaultSvgClass {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: -0.15em;
  overflow: hidden;
  margin-right: 10px;
}
</style>
