// 集中暴露vuex 各个模块需要暴露的属性和方法
import variables from '@/styles/variables.scss'
import { generateColors } from '@/utils/theme.js'

export default {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  cssVar: (state) => {
    // 本地颜色修改
    return {
      ...variables,
      ...generateColors(state.theme.myColor) // 覆盖上面的
    }
  },
  sideBarOpen: (state) => state.app.sideBarOpened,
  language: (state) => state.app.language, // 中英文的
  theme_color: (state) => state.theme.myColor, // 背景色的
  tagViewList: (state) => state.tag.tagViewList
}
