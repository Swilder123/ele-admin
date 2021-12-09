// 请求 user-manage 的数据
import axios from '@/utils/request.js'

// 获取所有的权限列表
export const getArrPermissions = () => {
  return axios.request({
    url: '/permission/list',
    method: 'GET'
  })
}
