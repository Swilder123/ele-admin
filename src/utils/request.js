import axios from 'axios'
import { ElMessage } from 'element-plus'
import { inCheckTimeOut } from './auth.js'
// 导入store
import store from '@/store/index.js' // router useRote useRouter

// 封装token
const server = axios.create({
  // 后台代理+ cros

  timeout: 5000,
  baseURL: '/api'
})

// 请求拦截 封装token
server.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      if (!inCheckTimeOut()) {
        // 过期执行推出
        store.dispatch('user/logout')
        // 不应该请求
        return Promise.reject(new Error('token 过期'))
      }
      // 如果存在token 不存在 不封装
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }

    // 在这里请求之前做些什么
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 错误处理 服务区返错误 消息提醒
server.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const { success, data, message } = response.data
    if (success) {
      return data
    } else {
      ElMessage({
        type: 'error',
        message: message
      })
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // token失效 单点登录 后台会返回特定的状态码   执行退出
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // 过期执行推出
      store.dispatch('user/logout')
    }

    // 服务器没有返回数据或者是服务器未知错误
    ElMessage({
      type: 'error',
      message: error.message
    })
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 封装好的token

// 导出一个对象
export default server
