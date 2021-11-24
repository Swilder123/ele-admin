// 自定义提示文件
//  git cz选择的   git cz 代替了 git commit
module.exports = {
  // 可选类型
  types: [
    { value: 'feat', name: 'feat:     新功能' },
    { value: 'fix', name: 'fix:      修复' },
    { value: 'docs', name: 'docs:     文档变更' },
    { value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
    {
      value: 'refactor',
      name: 'refactor: 重构(既不是增加feature，也不是修复bug)'
    },
    { value: 'perf', name: 'perf:     性能优化' },
    { value: 'test', name: 'test:     增加测试' },
    { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
    { value: 'revert', name: 'revert:   回退' },
    { value: 'build', name: 'build:    打包' }
  ],
  // 消息步骤
  messages: {
    type: '请选择提交类型:',
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细描述(可选):',
    footer: '请输入要关闭的issue(可选):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
  },
  // 跳过问题
  skipQuestions: ['body', 'footer'],
  // subject文字长度默认是72
  subjectLimit: 72
}

/*
`commitizen` ，它提供了一个 `git cz` 的指令用于代替 `git commit`，简单一句话介绍它：
> 换句话说：当你使用 `commitizen` 进行代码提交（git commit）时，`commitizen` 会提交你在提交时填写所有必需的提交字段！
1. 全局安装`Commitizen`
   ```js
   npm install -g commitizen@4.2.4
   ```
2. 安装并配置 `cz-customizable` 插件
  1. 使用 `npm` 下载 `cz-customizable`
    ```node
    npm i cz-customizable@6.3.0 --save-dev
    ```
  2. 添加以下配置到 `package.json ` 中
    ```json
    ...
      "config": {
        "commitizen": {
          "path": "node_modules/cz-customizable"
        }
      }
    ```
*/
