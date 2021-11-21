<template>
  <div class="app-wrapper">
    <!-- 左边 -->
    <Sidebar
    class="sidebar-container"
    :style="{ backgroundColor: variables.menuBg }" />
    <!-- 右边 -->
    <div class="main-container">
      <div class="fixed-header">
        <Navbar />
      </div>
      <Appmain />
    </div>
  </div>
</template>
<script setup>
import Sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar/index.vue'
import Appmain from './components/Appmain/index.vue'

import variables from '@/styles/variables.scss'
</script>
<style lang="scss" scoped>
@import '~@/styles/common.scss';
@import '~@/styles/variables.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .sidebar-container {
    width: $sideBarWidth;
    height: 100vh;
  }
  .main-container {
    .fixed-header {
      position: fixed;
      top: 0px;
      right: 0px;
      z-index: 10;
      width: calc(100% - #{sideBarWidth}); // 用来动态计算宽度的
    }
  }
}
</style>
