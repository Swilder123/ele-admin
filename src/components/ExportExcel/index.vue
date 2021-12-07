<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="dialogShow"
    @close="close"
    width="30%"
  >
    <el-input
      :model-value="filename"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>

    <!-- 选择下载的页码 -->
    <slot></slot>

    <template #footer>
      <el-button @click="close">{{ $t('msg.excel.close') }}</el-button>
      <el-button type="primary" @click="exportExcel">{{
        $t('msg.excel.confirm')
      }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { exportJsonToExcel } from '@/utils/Export2Excel.js'
import { ElMessage } from 'element-plus'

const props = defineProps({
  dialogShow: {
    type: Boolean,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  header: {
    type: Array,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: '下载成功'
  }
})

const emit = defineEmits(['closeDialog'])
const close = () => {
  emit('closeDialog')
}

// 导出业务执行

const exportExcel = () => {
  // 1.文件名不选的话应该是默认值 filename 中英文切换
  // 2.导出全部excel 数据 || 导出 当前页  -->exportData
  // console.log(props.exportData)
  // 3.将服务器返回的用户数据 --> 转化成excel 数据

  // 4.解析excel数据 并且下载该文件
  exportJsonToExcel({
    header: props.header, // Object.keys(USER_RELATION),
    data: props.data,
    filename: props.filename,
    merges: true,
    autoWidth: true,
    bookType: 'xlsx'
  }).then((res) => {
    // 6.提示消息
    ElMessage.success(props.message)
  })

  // 5.关闭dialog
  close()
}
</script>

<style lang="scss" scoped></style>
