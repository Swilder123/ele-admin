<template>
  <div>
    <el-dialog
      :title="$t('msg.role.assignPermissions')"
      :model-value="isShowDialog"
      @close="close"
    >
      <el-tree
        ref="tree"
        :props="defaultProps"
        :data="PermissionList"
        node-key="id"
        :show-checkbox="true"
        :check-strictly="true"
      />
      <template #footer>
        <el-button @click="close">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button @click="confirm" type="primary">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { getAllPermissions } from '@/api/permission.js'
import { getPermissionByRoleId, updatePermissionByRoleId } from '@/api/role.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

const props = defineProps({
  isShowDialog: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const emits = defineEmits('close')
// 关闭模态
const close = () => {
  emits('close')
}

// 确认事件
const i18n = useI18n()
const store = useStore()
const confirm = async () => {
  const checkedArr = tree.value.getCheckedKeys()
  // console.log(checkedArr)
  // 修改该角色的权限
  await updatePermissionByRoleId({
    roleId: props.roleId,
    permissions: checkedArr
  })
  // 更新vuex中 该角色的权限
  store.commit('roleAndPermission/updatePermissonToRole', {
    roleId: props.roleId,
    permissionArray: checkedArr
  })

  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  // 关闭dialog
  emits('close')
}

// 展开树形控件
const defaultProps = ref({
  label: 'permissionName',
  children: 'children'
})

// 请求所有的权限列表数据
const PermissionList = ref([])
const tree = ref(null)
const getAllPermissions_ = async () => {
  const res = await getAllPermissions()
  PermissionList.value = res
  // console.log('permisson', res)
}
getAllPermissions_()

// 请求改角色的默认权限
// const rolePermissionList = ref([])
const getPermissionByRoleId_ = async () => {
  const res = await getPermissionByRoleId(props.roleId)
  // rolePermissionList.value = res
  tree.value.setCheckedKeys(res)
  // console.log('role', res)
}
getPermissionByRoleId_()
</script>

<style lang="scss" scoped></style>
