/**
 * 规范提交格式
 * eg: git commit -m "feat: add README.md" -> 注意：feat: add 之间需要有空格
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2, 
      'always', 
      [
        'build', // 影响构建系统，CI 配置或外部依赖项的更改
        'chore', // 构建过程或辅助工具的变动
        'ci', // 自动化流程配置修改
        'docs', // 文档更新
        'feat', // 新功能
        'fix', // 修复 Bug
        'fixed', // 这个是自定义的 enum ，为 fix 别名
        'perf', // 性能优化
        'refactor', // 既不修正错误也不增加功能的代码更改
        'style', // 不会影响代码含义的更改（空格，格式，缺少分号等）
        'test', // 添加缺失的测试或更正现有的测试
        'release', // 发布版本提交
      ]
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72]
  }
}