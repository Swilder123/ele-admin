<template>
  <div class="upload-excel-container">
    <!-- 文件上传 -->
    <div class="btn-upload">
      <el-button type="primary" @click="handleUpload">{{
        $t('msg.uploadExcel.upload')
      }}</el-button>
      <!-- 文件上传的隐藏域 -->
      <input
        type="file"
        ref="tagUploadInput"
        class="upload-excel-input"
        :accept="accept[type]"
        @change="handleChange"
      />
    </div>
    <!-- 拖拽上传 -->
    <div
      class="drop"
      @drop.prevent.stop="onDrop"
      @dragenter.prevent.stop="onDropEnter"
      @dragover.prevent.stop="onDropEnter"
    >
      <i class="el-icon-upload"></i>
      {{ $t('msg.uploadExcel.drop') }}
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { ElMessage } from 'element-plus'
import { isExcel, isJs, readFileAsExcel } from '@/utils/xlsx.js'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  beforeUpload: {
    type: Function,
    required: true
  },
  onSuccess: Function // 只是指定类型
})

const type = ref('')

// 组件没有挂载，渲染之前执行
const { type: fileType, doUpload } = props.beforeUpload()
if (fileType) {
  type.value = fileType
} else {
  ElMessage.error('必须设定对应的文件')
}

const accept = ref({ excel: '.xlsx,.xls', js: '.js', txt: '.txt' })
// console.log(accept.value[type.value])

// input 文件上传业务
const tagUploadInput = ref(null)
// 点击了文件上传按钮
const handleUpload = () => {
  // 触发input 的点击事件
  tagUploadInput.value.click()
}

// 选择了文件触发的事件
const handleChange = (e) => {
  // 获取到文件
  const files = e.target.files // 拿到所有的文件
  // console.log(files)
  const rawFile = files[0] // 拿到单个文件
  if (!rawFile) {
    return false
  }

  // 上传
  upload(rawFile)
  // 插件 解析 excel 文件的表格数据 --> data
  // props.onSuccess('解析完的数据')
}

// 执行上传 如果存在beforeUpload 而且beforeUpload 返回true 才执行读取操作。 如果没有beforeUpload 直接执行读取操作
const upload = (rawFile) => {
  if (doUpload) {
    // 读取文件
    readFile(rawFile)
  } else {
    ElMessage.error('取消文件读取操作')
  }
}

// 读取文件在这里执行
const readFile = (rawFile) => {
  // console.log('开始读取……')
  // 1.创建读取对象
  const reader = new FileReader()
  // 2.读取完毕回调
  reader.onload = (event) => {
    // 2-1-1 获取读取完毕后的文件内容（excel文件格式）
    const data = event.target.result

    if (type.value === 'excel') {
      const result = readFileAsExcel(data)
      generateData(result)
    } else if (type.value === 'js') {
      // 其他类型文件……
      console.log('解析js文件')
    }
    // 2-2 解析完毕后 调用 onSuccess()
  }
  // 3.异步读取
  reader.readAsArrayBuffer(rawFile)
}

// 通知解析完毕
const generateData = (result) => {
  props.onSuccess(result)
}

// 拖拽上传业务
const i18n = useI18n()
// 释放后会 触发
const onDrop = (e) => {
  // 获取文件的内容
  const files = e.dataTransfer.files
  if (files.length <= 0) {
    ElMessage.error('必须拖拽一个有效的文件')
    return false
  }
  const rawFile = files[0]
  if (!checkFileTye(rawFile)) {
    return false
  }
  upload(rawFile)
}

// 验证文件类型
const checkFileTye = (rawFile) => {
  if (type.value === 'excel') {
    if (!isExcel(rawFile)) {
      ElMessage.error(
        rawFile.name + ':' + i18n.t('msg.excel.noExcelFile') + '!'
      )
      return false
    } else {
      return true
    }
  } else if (type.value === 'js') {
    if (!isJs(rawFile)) {
      ElMessage.error(rawFile.name + ' :不是一个js文件 !')
      return false
    } else {
      return true
    }
  }
}

// 将一个文件移动在 可释放区域内 就触发
const onDropEnter = (e) => {
  // 在新位置生成源项的副本
  e.dataTransfer.dropEffect = 'copy'
}
</script>

<style lang="scss" scoped>
.upload-excel-container {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .upload-excel-input {
    display: none;
    z-index: -1000;
  }

  .btn-upload,
  .drop {
    border: 1px dashed #ddd;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }

  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: inline;
    }
  }
}
</style>
