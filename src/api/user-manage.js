// 请求 user-manage 的数据
import axios from '@/utils/request.js'

// 获取用户列表数据  post--->data:{}   get--->params:{}
export const getUser = (data) => {
  return axios.request({
    url: '/user-manage/list',
    method: 'GET',
    params: data
  })
}

// excel 批量插入
export const addUserByExcel = (data) => {
  return axios.request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}

// 获取所有的数据
export const getAllUser = () => {
  return axios.request({
    url: '/user-manage/all-list',
    method: 'GET'
  })
}

// 删除用户
export const deleteUserById = (id) => {
  return axios.request({
    url: `/user-manage/detele/${id}`,
    method: 'GET'
  })
}
