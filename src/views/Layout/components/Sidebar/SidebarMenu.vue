<template>
  <!-- 菜单 -->
  <el-menu
    :background-color="store.getters.cssVar.menuBg"
    :text-color="store.getters.cssVar.menuText"
    :active-text-color="store.getters.cssVar.mennActiveText"
    :unique-opened="true"
    :default-active="activePath"
    :router="true"
    :collapse="!store.getters.sideBarOpen"
  >
    <!-- 一级二级菜单的展示 -->
    <SidebarItem v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { filterRouter, generateMenus } from '@/utils/router.js'
import { computed } from 'vue'
import SidebarItem from './SidebarItem.vue'
import { useStore } from 'vuex'
const store = useStore()

const router = useRouter()
// console.log(router.getRoutes()) // 获取路由 原始的
// console.log(filterRouter(router.getRoutes())) // 去重 过滤后的
// console.log(generateMenus(filterRouter(router.getRoutes()))) // 格式化后的

// 因为以后路由要变化，所以用计算属性
const routes = computed(() => {
  const filterRoutes = filterRouter(router.getRoutes())
  return generateMenus(filterRoutes)
})

const route = useRoute()
// console.log(route)
// 以后激活的路由变化
const activePath = computed(() => {
  const { path } = route
  return path
})
// console.log(routes.value)
</script>

<style lang="scss" scoped></style>
