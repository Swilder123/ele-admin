// 用户鉴权 路由守卫
import router from './router/index.js'
import store from './store/index.js'

const whiteRouter = ['/login']
//  进入每一个路由都会执行 这个钩子
router.beforeEach((to, from, next) => {
  /*
  用户鉴权
    当用户登录时(没有token)，只能进入login页面。
    用户登录后，token未过期之前，不允许进入login页面
  */
  // 登录
  console.log('-->', store.getters.token)
  if (store.getters.token) {
    console.log('11111111111')
    console.log(to)
    if (to.path === '/login') {
      console.log('xxxxx')
      // 不允许
      next('/')
    } else {
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
