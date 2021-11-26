<template>
  <el-dropdown
    v-bind="$attrs"
    class="theme"
    trigger="click"
    @command="showSelectColor"
  >
    <!-- 图标 -->
    <div>
      <el-tooltip :content="$t('msg.theme.themeChange')">
        <svg-icon iconName="change-theme"></svg-icon>
      </el-tooltip>
    </div>
    <!-- 下拉选项 -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>{{
          $t('msg.theme.themeColorChange')
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 弹出的模态框 -->
  <SelectColor
    :showDialogVariable="showDialogVariable"
    @closeDialog="hideSelectColor"
  />
    <!-- @closeDialog="hideSelectColor"  监听触发 -->
</template>

<script setup>
import SelectColor from './components/selectColor.vue'
import { ref } from 'vue'

const showDialogVariable = ref(false) // 默认 false 不展开

const showSelectColor = () => {
  showDialogVariable.value = true
} // 控制模态框是否打开的开关

const hideSelectColor = () => {
  showDialogVariable.value = false
} // 控制模态框是否打开的开关
</script>

<style lang="scss" scoped></style>
