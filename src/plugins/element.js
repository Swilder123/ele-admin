import ElementPlus from 'element-plus'
import '../styles/element-variables.scss' // 样式
// import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn' // 语言包

export default (app) => {
  // app.use 使用一个插件 app.components()注册一个全局组件
  app.use(ElementPlus, { locale })
}
