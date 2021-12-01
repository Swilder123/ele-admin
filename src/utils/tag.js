const isNoTagArr = ['/login', '/404', '/401', '/import']

export const isNoTag = (path) => {
  return isNoTagArr.includes(path) // 数组中是否包含某一项
}
