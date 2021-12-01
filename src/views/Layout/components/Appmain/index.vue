<template>
  <div class="app-main">
    <!-- 二级路由显示容器 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router' // 返回当前路由
import { useStore } from 'vuex'
import { isNoTag } from '@/utils/tag.js'
import { getTitle as getTitle_, watchLang } from '@/utils/i18n.js'

// 获取title
const getTitle = (to) => {
  // 判断 to.meta不存在那就没title  to.meta.title存在但不一定有title
  if (!to.meta || !to.meta.title) {
    // 如果不存在title
    const tmp = to.path.splite('/')
    return tmp[tmp.length - 1] // 拿到tmp的最后一项
  } else {
    // 如果存在title 以path的最后一项作为title
    return getTitle_(to.meta.title)
  }
}

// 监听当前路由变化 ----> 增加tag 到指定位置
const route = useRoute()
const store = useStore()
watch(
  route,
  (to, from) => {
    if (isNoTag(to.path)) {
      return true
    }
    // console.log(to, '>>>>>>>>>>>>')
    // 路由变化增加一个 合法的 tag 到 vuex

    const { path, fullPath, meta, name, params, query } = to // 从to里面解构需要的属性
    store.commit('tag/addTagViewList', {
      path,
      fullPath,
      meta,
      name,
      params,
      query,
      title: getTitle(to)
    })
  },
  {
    immediate: true // 立即执行
  }
)

// 当国际化切换
// 第一种方法
// watchLang(() => {
//   // 重新更新 vuex 中的title 的值
//   store.getters.tagViewList.forEach((route, index) => {
//     store.commit('tag/changeTitle', {
//       index: index, // 索引
//       route: { ...route, title: getTitle(route) } // 其他属性正常覆盖 title经过国际化处理
//     })
//   })
// })

// 第二种方法
watchLang(() => {
  // 重新更新 vuex 中的title 的值
  const tmpArr = []
  store.getters.tagViewList.forEach((route, index) => {
    tmpArr.push({ ...route, title: getTitle(route) }) // 不能使用 getTitle_(route.title)
  })
  store.commit('tag/changeTitle', tmpArr)
})
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
