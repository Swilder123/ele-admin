import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

// 引入样式的主入口文件
import './styles/index.scss'

// 加载svg 的处理
import initSvgIcon from './icons/index.js'

// 用户鉴权
import './permissio.js'

const app = createApp(App)
installElementPlus(app)
initSvgIcon(app)
app.use(store).use(router).mount('#app')
/* eslint-disable */

// 入口main.js(导入模块：js模块) -->webpack   出口js/app.js 文件

// 【css，文件，字体，svg】 -->loader -->对应的js模块   -->webpack

//不需要配置，直接使用，因为项目环境已经直接配置了常见的loader

/*
  svg 导入后
    1.是由file-loader 变成一个/img/user.8d030327.svg js模块
    2.可以按照img方式加载
      缺点：
      file-loader 转化的js模块不能动态修改一个图片的颜色
      不利于封装一个全局组件

*/

/* 查看webpack的默认配置 ？？
  vue inspect 查看默认的webpack配置
  vue inspect --rules 查看所有的loader
  vue inspect --rule svg

  如何配置webpack
    1.项目根目录创建 vue.config.js
    2.修改webpack的配置
    a) 禁用file-loader 对某个目录下svg的解析
    b) 下载loader
    npm install -D svg-sprite-loader  //  -D保存在devlopment 依赖中配置





*/
/* eslint-enablwe*/
