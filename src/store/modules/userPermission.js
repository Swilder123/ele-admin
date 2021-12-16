import { PublicRoutes, PrivateRoutes } from '@/router/index.js'

export default {
  namespaced: true,
  state: {
    // 用户的所有路由表 public + private
    routes: PublicRoutes
  },
  mutations: {
    setPrivateRoutes: (state, newPrivateRoutes) => {
      state.routes = [...PublicRoutes, ...newPrivateRoutes]
    }
  },
  actions: {
    filterPrivateRoutes: ({ commit }, menus) => {
      const routes_ = []
      // 过滤.....
      menus.forEach((name) => {
        routes_.push(...PrivateRoutes.filter((item) => item.name === name))
      })

      // 匹配不存在的路由 统一的加载 /404
      // routes_.push({ path: '/:pathMatch(.*)*', redirect: '/404' })
      // console.log('---->', routes_)

      commit('setPrivateRoutes', routes_)
      return routes_
    }
  }
}
