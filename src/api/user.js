// import axios from 'axios'
import axios from '@/utils/request.js' // 引入request.js
//  定义user相关的网络请求
export const login = (data) => {
  // axios 的请求 promise
  return axios.request({
    // request 请求
    url: '/sys/login', // 配置代理服务器在vue.config.js中
    method: 'POST',
    data
  })
}

// 获取用户数据
export const getUserInfo = () => {
  return axios.request({
    url: '/sys/profile',
    method: 'GET'
  })
}
