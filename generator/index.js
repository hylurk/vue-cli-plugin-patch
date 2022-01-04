const fs = require('fs')
const { EOL } = require('os')
const { rm } = require('./utils')

module.exports = (api, options, allPresets) => {
  // 修改 package.json
  api.extendPackage({
    dependencies: {
      'normalize.css': '^8.0.1'
    },
    devDependencies: {
      '@commitlint/cli': '^16.0.1',
      '@commitlint/config-conventional': '^16.0.0',
      'lint-staged': '^12.1.4'
    },
    gitHooks: {
      'pre-commit': 'lint-staged',
      'commit-msg': 'npx --no-install commitlint --edit "$1"'
    },
    'lint-staged': {
      '*.{js,ts,vue}': [
        'vue-cli-service lint',
        'git add'
      ]
    }
  })
  rm(api.resolve('commitlint.config.js'))
  // 模板文件注入
  if (options.type === 'spa') {
    api.render({
      './commitlint.config.js': './template/commitlint.config.js'
    })
  } else if (options.type === 'mpa') {
    rm(api.resolve('src/pages')) // 修改二次运行命令无法覆盖问题
    api.render('./template')
  }
  // 注入完成
  api.afterInvoke(() => {
    if (options.type === 'spa') {
      // 修改入口 js/ts 文件
      const contentMain = fs.readFileSync(api.resolve(api.entryFile), { encoding: 'utf-8' })
      const lines = contentMain.split(/\r?\n/g)
      lines.unshift('import \'normalize.css\'') // 引入 normalize.css
      fs.writeFileSync(api.resolve(api.entryFile), lines.join(EOL), { encoding: 'utf-8' })
    } else if (options.type === 'mpa') {
      // 删除多余单页面文件
      rm(api.resolve('src/App.vue'))
      rm(api.resolve('src/main.ts'))
      rm(api.resolve('src/views'))
      rm(api.resolve('src/router'))
      rm(api.resolve('src/store'))
    }
    // 移除 favicon
    rm(api.resolve('public/favicon.ico'))
  })
}
