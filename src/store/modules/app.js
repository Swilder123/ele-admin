import { LANGUAGE } from '@/common/common.js'
import { getItem, setItem } from '@/utils/storage.js' // 到入进行本地存储

const state = {
  sideBarOpened: true,
  language: getItem(LANGUAGE) || ''
}

const mutations = {
  toggleSideBar(state) {
    state.sideBarOpened = !state.sideBarOpened
  },
  // 中英文语言
  setLanguage(state, lang) {
    setItem(LANGUAGE, lang)
    state.language = lang
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
