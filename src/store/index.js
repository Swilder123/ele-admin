import { createStore } from 'vuex'
import user from './modules/user.js' // 引入user.js文件，然后注册到modules中
import getters from './modules/getters'
import app from './modules/app.js'
import theme from './modules/theme.js'
import tag from './modules/tag.js'
import roleAndPermission from './modules/role&permission.js'
import userPermission from './modules/userPermission.js'

export default createStore({
  getters,
  modules: {
    user,
    app,
    theme,
    tag,
    roleAndPermission,
    userPermission
  }
})
