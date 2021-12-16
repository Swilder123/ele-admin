<template>
  <div>
    <el-dialog
      :model-value="isShowRoleDialog"
      :title="$t('msg.excel.roleDialogTitle')"
      @close="close"
    >
      <el-checkbox-group v-model="checkList">
        <el-checkbox
          v-for="role in allRoles"
          :label="role.title"
          :key="role.id"
        ></el-checkbox>
      </el-checkbox-group>

      <template #footer>
        <el-button @click="confirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
        <el-button @click="close">{{ $t('msg.universal.cancel') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'
import { getRolesByUserid, updateRole } from '@/api/user-manage.js'
import { getAllRole } from '@/api/role.js'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const store = useStore()

const props = defineProps({
  isShowRoleDialog: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['close', 'update'])
const close = () => {
  emits('close')
}

const i18n = useI18n()
const confirm = async () => {
  // console.log(checkList.value)
  // 修改用户角色
  const roles = checkList.value.map((title) =>
    allRoles.value.find((role) => role.title === title)
  )
  // console.log(roles)
  const data = {
    userId: props.userId,
    roles: roles
  }
  await updateRole(data)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  // 关闭dialog
  emits('update')
  emits('close')
}

// 该用户的默认角色
const checkList = ref([])
const getRole = async () => {
  const res = await getRolesByUserid(props.userId)
  // console.log(res)
  checkList.value = res.role.map((item) => item.title)
}

// 所有角色
const allRoles = ref(store.state.roleAndPermission.roles)
// console.log(allRoles.value)
const getAllRoles = async () => {
  const res = await getAllRole()
  allRoles.value = res
}

watch(
  () => props.userId,
  () => {
    // console.log('userId',props.userId)
    // 获取用户的角色
    getRole()
    // if (Array.isArray(allRoles.value) && allRoles.value.length <= 0) {
    // 请求接口
    getAllRoles()
    // }
  }
)
</script>

<style lang="scss" scoped></style>
