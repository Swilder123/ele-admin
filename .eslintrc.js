// ESLint 配置文件遵循 commonJS 的导出规则，所导出的对象就是 ESLint 的配置对象
// 文档：https://eslint.bootcss.com/docs/user-guide/configuring
module.exports = {
  // 表示 .eslintrc.js文件所在的目录为根目录，下面定义的ESLint规则 '将被限制到该目录下'
  // 这也是为什么.eslintrc.js 这个文件推荐放在项目根目录下的原因
  root: true,
  // env 表示启用 ESLint 检测的环境
  env: {
    // 在 node 环境下启动 ESLint 检测
    node: true
  },
  // ESLint 中基础配置需要继承的配置 许多大厂定义了多种eslint配置的规则，
  // create项目时候 选择了standard ，所以当前的 eslint 是基于@vue/standard规范进行代码格式化校验的
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  // 解析器
  parserOptions: {
    parser: 'babel-eslint'
  },
  /*
    线上：production  需要检测 --》npm run build --> console 移除
    线下：devlopment   不需要  --》npm run serve --> console 输出数据

    * 错误级别分为三种：
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  */
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: 'off',
    'space-before-function-paren': 'off'
  }
}
/*                      代码检测工具 ESLint
在我们去创建项目的时候，脚手架工具已经帮助我们安装了 `ESLint` 代码检测工具。

首先 `ESLint` 是 `2013年6月` 创建的一个开源项目，它的目标非常简单，只有一个，那就是 **提供一个插件化的 `javascript` 代码检测工具** ，说白了就是做 **代码格式检测使用的**

在咱们当前的项目中，包含一个 `.eslintrc.js` 文件，这个文件就是 `eslint` 的配置文件。

随着大家对代码格式的规范性越来越重视，`eslint` 也逐渐被更多的人所接收，同时也有很多大厂在原有的 `eslint` 规则基础之上进行了一些延伸。

我们在创建项目时，就进行过这样的选择：
```js
? Pick a linter / formatter config:
  ESLint with error prevention only // 仅包含错误的 ESLint
  ESLint + Airbnb config // Airbnb 的 ESLint 延伸规则
  ESLint + Standard config // 标准的 ESLint 规则 （选择）
```
*/

/*                       Prettier 自动格式化代码
目的：使用 Prettier 可以再保存代码的时候自动按照 ESlint 的规范格式化代码，从而提高开发效率

点击 [这里](https://www.prettier.cn/) 进入 `prettier` 中文官网！

**`prettier` 是什么？**

1. 一个代码格式化工具
2. 开箱即用
3. 可以直接集成到 `VSCode` 之中
4. 在保存时，让代码直接符合 `ESLint` 标准（需要通过一些简单配置）

                    

        ESLint 与 Prettier 配合解决代码格式问题
配置 vscode 借助 `prettier` 可以在保存代码时，让我们的代码直接符合 `ESLint` 标准

1. 在 `VSCode` 中安装 `prettier` 插件（搜索 `prettier`），这个插件可以帮助我们在配置 `prettier` 的时候获得提示

2. 在项目中新建 `.prettierrc` 文件，该文件为 `perttier` 默认配置文件

3. 在该文件中写入如下配置：

   ```json
   {
     // 不尾随分号
     "semi": false,
     // 使用单引号代替所有的双引号
     "singleQuote": true,
     // 多行逗号分割的语法中，最后一行不加逗号
     "trailingComma": "none"
   }
4. 打开 `VSCode` 《设置面板》
5. 在设置中，搜索 `save` ，勾选 `Format On Save`
   因为要保存代码要自动格式化代码，所以需要勾选，表示保存代码的时候将使用 prettier 格式化代码

*/
