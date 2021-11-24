import { createStore } from 'vuex'
import user from './modules/user.js' // 引入user.js文件，然后注册到modules中
import getters from './modules/getters'
import app from './modules/app.js'

export default createStore({
  getters,
  modules: {
    user,
    app
  }
})
