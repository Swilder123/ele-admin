<template>
  <div
    class="app-wrapper"
    :class="store.getters.sideBarOpen ? '' : 'hideSidebar'"
  >
    <!-- 左边 -->
    <Sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: store.getters.cssVar.menuBg }"
    />
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

import { useStore } from 'vuex'
const store = useStore()
</script>

<style lang="scss" scoped>
@import '~@/styles/common.scss';
@import '~@/styles/variables.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
// .sidebar-container {
//   width: $sideBarWidth;
//   height: 100vh;
// }

.fixed-header {
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 10;
  border-bottom: 1px solid #ccc;
  width: calc(100% - #{$sideBarWidth}); // 用来动态计算宽度的
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$sideBarhideWidth});
  transition: width 0.28s;

}
</style>
