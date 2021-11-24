export const passwordValidate = () => {
  return (rule, value, callback) => {
    // 要return返回函数
    // 获取到输入的值做验证 至少是6位
    // console.log(value)
    if (value.length < 6) {
      callback(new Error('密码至少是6位')) // no
    } else {
      callback() // ok
    }
  }
}
