import axios from 'axios'
import { colorMap, colorTables } from '@/common/common.js'
import color from 'css-color-function' // 基于主色填充不同程度的白色
import rgbHex from 'rgb-hex' // 转化成16进制
/*
  生成最终的样式
*/
export const generateNewStyle = async (primary) => {
  if (!primary) return // 如果不存在主色，下面的就不用执行
  // primary 源自于组件中的原始样式 color.value 然后更新
  // 1.获取所有的element样式 》》https://unpkg.com/element-plus@1.2.0-beta.3/dist/index.css    @1.2.0-beta.3版本号
  const originalStyle = await getOriginalStyle()

  // 2.分析原始样式 找出需要替换的颜色 做标记
  let newStyle = getStyleTemplate(originalStyle)
  // console.log(newStyle)

  // 3.根据主色生成对应的情景色
  const newColors = generateColors(primary)
  // console.log(newColors)

  // 4.在newStyle的模板中将标记都替换成生成的色值
  Object.keys(newColors).forEach((key) => {
    newStyle = newStyle.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + newColors[key]
    )
  })
  return newStyle
}

// 一种方法 version
// const getOriginalStyle = async () => {
//   // 利用这个方法去请求接口来获取element的样式
//   const version = require('element-plus/package.json').version // element-plus/package.json 拿到版本号
//   const url = `https://unpkg.com/element-plus@${version}/dist/index.css` // 地址
//   const { data } = await axios.get(url) // 利用 data 来解构结果里面的数据
//   return data
// }
// 二种方法 固定element-plus
const getOriginalStyle = async () => {
  const url = `http://localhost:8080/element-plus.css`
  const { data } = await axios.get(url) // 利用 data 来解构结果里面的数据
  return data
}

const getStyleTemplate = (Style) => {
  // key 就是 colorMap 中的每一项颜色
  // 循环遍历 colorMap 数组的每一项
  Object.keys(colorMap).forEach((key) => {
    const value = colorMap[key] // 从每一项的颜色中取出value shade-1
    Style = Style.replace(new RegExp(key, 'gi'), value) // 替换
  })
  return Style
}

export const generateColors = (primary) => {
  // 根据主色 生成对应的情景色
  const colors = {
    primary
  }
  Object.keys(colorTables).forEach((key) => {
    // 将主色应用到color 函数中
    const value = colorTables[key].replace(new RegExp(/primary/g), primary)
    // 生成 16进制的颜色 color('#cccccc' tint(10%))
    colors[key] = '#' + rgbHex(color.convert(value))
  })

  return colors // 拿到所有的colors 然后在进行替换
}

/*
  将生成的样式写入到head标签中
*/
export const writeStyleToHearTag = (newStyle) => {
  // 生成一个style的标记
  const style = document.createElement('style')
  // 把内容写进去
  style.innerHTML = newStyle
  // 插入到head
  document.head.appendChild(style)
}
