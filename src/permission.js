// 用户鉴权 路由守卫
import router from './router/index.js'
import store from './store/index.js'

const whiteRouter = ['/login']
//  进入每一个路由都会执行 这个钩子
router.beforeEach(async (to, from, next) => {
  // if (to.matched.length === 0) {
  //   next('/404')
  // }

  /*
  用户鉴权
    当用户登录时(没有token)，只能进入login页面。
    用户登录后，token未过期之前，不允许进入login页面
  */
  // 登录
  // console.log('-->', store.gentters.token)
  if (store.getters.token) {
    if (to.path === '/login') {
      // 不允许
      next('/')
    } else {
      // console.log('@@@@@@@@@@@@@@@@@@@')
      // 登录成功 跳转到首页
      if (!store.getters.hasUserInfo) {
        // 判断所有用户的信息 就去发送axios
        const {
          permission: { menus }
        } = await store.dispatch('user/getUserInfo')
        // 1.获取该用户的所有权限
        // console.log('用户的权限', menus)
        // const menus_ = ['articleCreate', 'roleList']
        // 2.根据权限比对私有路由 获取该用户能访问的路由
        const filterRoutes = await store.dispatch(
          'userPermission/filterPrivateRoutes',
          menus
        )
        // console.log('@@@@@@@@@@@', filterRoutes)
        // 3.将过滤后的该用户的私有路由 动态添加到路由表中

        // router.addRoute()

        filterRoutes.forEach((activeRoute) => {
          router.addRoute(activeRoute)
        })
        // 4.执行跳转 到首页
      }
      // 首次登录后 跳转到首页
      next()
    }
    // 未登录
  } else {
    if (whiteRouter.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
