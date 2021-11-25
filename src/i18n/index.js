// 实现中英文切换的逻辑   在 main 中引入

import { createI18n } from 'vue-i18n'
import zh from './lang/zh.js' // 导入语言包
import en from './lang/en.js' // 导入语言包
import store from '@/store/index.js'

// 1.定义数据源
const messages = {
  en: {
    msg: {
      ...en
    }
  },
  zh: {
    msg: {
      ...zh
    }
  }
}

// 2.定义语言的类型
const locale = store.getters.language || 'en'

// 3.初始化 i18n
const i18n = createI18n({
  legacy: false, // 固定写法  // 配合vue3.2 compostion API
  globalInjection: true, // 全局注册一个 t 函数    通过 t() 获取对应的数据
  locale,
  messages
})

export default i18n
