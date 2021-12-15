import { getAllPermissions } from '@/api/permission.js'
import { getAllRole, getPermissionByRoleId } from '@/api/role.js'
import { getItem, setItem } from '@/utils/storage.js'
import { ROLE, PERMISSION, PERMISSION_ } from '@/common/common.js'

const state = {
  /*
    roles:[
      {
        id:
        title:
        descpritions:
        permossion:[{id:1,title:'用户列表'},{}...]
      }
    ]
  */
  roles: getItem(ROLE) || [],
  permissions: getItem(PERMISSION) || [],
  permissions_: getItem(PERMISSION_) || []
}

// 将权限的id 转化为title
/* eslint-disable */
const permissionIdToTitle = (id_arr, per_arr) => {
  // id_arr:[1,1-1,1-2]
  // console.log('id_arr', id_arr, 'per', per_arr)
  const res = []
  id_arr.forEach((id) => {
    per_arr.forEach((per) => {
      if (per.id === id) {
        res.push({ id: id, title: per.permissionName })
      }
      if (per.children.length > 0) {
        per.children.forEach((c_per) => {
          if (c_per.id === id) {
            res.push({ id: id, title: c_per.permissionName })
          }
        })
      }
    })
  })
  return res
}
/* eslint-disable */

const mutations = {
  initRoles: (state, roles) => {
    state.roles = roles
    setItem(ROLE, state.roles)
  },
  initPermissions: (state, permissions) => {
    state.permissions = permissions
    setItem(PERMISSION, permissions)

    const temArr = []
    permissions.forEach((item) => {
      temArr.push({ id: item.id, title: item.permissionName })
      if (item.children && item.children.length > 0) {
        item.children.forEach((childrenItem) => {
          temArr.push({
            id: childrenItem.id,
            title: childrenItem.permissionName
          })
        })
      }
    })
    // console.log(temArr)
    state.permissions_ = temArr
    setItem(PERMISSION_, temArr)
  },
  updatePermissonToRole: (state, { roleId, permissionArray }) => {
    state.roles.forEach((role) => {
      if (role.id === roleId) {
        role.permissions = permissionIdToTitle(
          permissionArray,
          state.permissions
        )
      }
    })
    // setItem(ROLE, state.roles)
  }
}
const actions = {
  // 初始化角色
  initRoles: async ({ commit, state }) => {
    let roleList = state.roles
    if (Array.isArray(roleList) && roleList.length <= 0) {
      roleList = await getAllRole()
      commit('initRoles', roleList)
    }
    // 请求每一个角色对应的权限
    roleList.forEach(async (role) => {
      const res = await getPermissionByRoleId(role.id)
      commit('updatePermissonToRole', {
        roleId: role.id,
        permissionArray: res
      })
    })
  },
  // 初始化权限
  initPermissions: async ({ commit, state }) => {
    let permissionList = state.permissions
    if (Array.isArray(permissionList) && permissionList.length <= 0) {
      permissionList = await getAllPermissions()
    }
    commit('initPermissions', permissionList)
  },
  // 清除权限和角色的相关缓存
  clearRoleAndPermission: ({ commit }) => {
    // console.log('logout')
    commit('initRoles', [])
    commit('initPermissions', [])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
