import i18n from '@/i18n/index.js'

export const passwordValidate = () => {
  return (rule, value, callback) => {
    // 要return返回函数
    // 获取到输入的值做验证 至少是6位
    // console.log(value)
    if (value.length < 6) {
      callback(new Error(i18n.global.t('msg.login.passwordRule'))) // no
    } else {
      callback() // ok
    }
  }
}

export const usernameValidate = () => {
  return (rule, value, callback) => {
    if (value.length <= 0) {
      callback(new Error(i18n.global.t('msg.login.usernameRule')))
    } else {
      callback()
    }
  }
}
