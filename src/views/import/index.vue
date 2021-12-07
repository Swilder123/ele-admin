<template>
  <div class="">
    <UploadExcel :onSuccess="uploadExcelSuccess" :beforeUpload="beforeUpload" />
  </div>
</template>

<script setup>
import {} from 'vue'
import UploadExcel from '@/components/UploadExcel/index.vue'
import { addUserByExcel } from '@/api/user-manage.js'
import { USER_RELATION } from '@/common/common.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils/xlsx.js'

const router = useRouter()
const i18n = useI18n()

// UploadExcel 传来的data
const uploadExcelSuccess = async ({ headers, bodys }) => {
  // console.log('headers-->', headers)
  // console.log('bodys-->', bodys)
  const data = generateExcelData(bodys)
  // console.log('------>', data)
  // 插入
  await addUserByExcel(data)
  ElMessage.success(bodys.length + i18n.t('msg.excel.importSuccess'))
  // 跳传到用户列表
  router.push({ path: '/user/manage' })
}

const beforeUpload = () => {
  return { type: 'excel', doUpload: true } // 可以定制子组件是否终止上传以及上传的文件类型
}

// 格式化excel
const generateExcelData = (arr) => {
  const arr_ = []
  arr.forEach((item) => {
    const obj = {}
    Object.keys(USER_RELATION).forEach((key) => {
      if (USER_RELATION[key] === 'openTime') {
        obj[USER_RELATION[key]] = formatDate(item[key])
      } else {
        obj[USER_RELATION[key]] = item[key]
      }
    })
    arr_.push(obj)
  })
  return arr_
}
</script>

<style lang="scss" scoped></style>
