<template>
  <div>
    <!-- logo -->
    <div class="logo-container">
      <el-avatar :src="logo" shape="square" />
      <h1 class="logo-title" v-if="store.getters.sideBarOpen">element-admin</h1>
    </div>
    <!-- 滚动的组件 -->
    <el-scrollbar>
      <SidebarMenu />
    </el-scrollbar>
  </div>
</template>

<script setup>
import logo from '@/assets/logo.png'
import SidebarMenu from './SidebarMenu.vue'
import { useStore } from 'vuex'

const store = useStore()
</script>

<style lang="scss" scoped>
.logo-container {
  height: 44px;
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  :deep(.el-avatar) {
    --el-avatar-background-color: none;
  }

  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
