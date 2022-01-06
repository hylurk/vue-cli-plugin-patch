const fs = require('fs')
const { EOL } = require('os')
const { rm } = require('./utils')

module.exports = (api, options, allPresets) => {
  let mockDevDependencies = {}
  let mockScripts = {}
  const fileType = allPresets.plugins['@vue/cli-plugin-typescript'] ? 'ts' : 'js'
  if (options.mock) {
    mockDevDependencies = {
      'mocker-api': '^2.9.4',
      'axios': '^0.24.0'
    }
    mockScripts = {
      'serve:mock': 'vue-cli-service serve & npm run mock',
      'mock': `mocker ./mock/index.${fileType} --host localhost --port 9000`
    }
  }
  // 修改 package.json
  api.extendPackage({
    scripts: {
      ...mockScripts
    },
    dependencies: {
      'normalize.css': '^8.0.1'
    },
    devDependencies: {
      '@commitlint/cli': '^16.0.1',
      '@commitlint/config-conventional': '^16.0.0',
      'lint-staged': '^12.1.4',
      ...mockDevDependencies
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
  rm(api.resolve('src/api'))
  rm(api.resolve('mock'))
  // 模板文件注入
  if (options.type === 'spa') {
    api.render({
      './commitlint.config.js': './template/commitlint.config.js'
    })
  } else if (options.type === 'mpa') {
    rm(api.resolve('src/pages')) // 修改二次运行命令无法覆盖问题
    let pagesFile = {}
    if (fileType === 'ts') {
      pagesFile = {
        './src/pages/index/index.ts': './template/src/pages/ts/index/index.ts',
        './src/pages/index/index.vue': './template/src/pages/ts/index/index.vue',
        './src/pages/another/index.ts': './template/src/pages/ts/another/index.ts',
        './src/pages/another/index.vue': './template/src/pages/ts/another/index.vue'
      }
    } else {
      pagesFile = {
        './src/pages/index/index.js': './template/src/pages/js/index/index.js',
        './src/pages/index/index.vue': './template/src/pages/js/index/index.vue',
        './src/pages/another/index.js': './template/src/pages/js/another/index.js',
        './src/pages/another/index.vue': './template/src/pages/js/another/index.vue'
      }
    }
    api.render({
      './commitlint.config.js': './template/commitlint.config.js',
      './vue.config.js': './template/vue.config.js',
      ...pagesFile
    })
    
  }
  if (options.mock) {
    if (fileType === 'ts') {
      api.render({
        './mock/index.ts': './template/mock/index.ts',
        './src/api/index.ts': './template/src/api/index.ts',
        './src/api/request.ts': './template/src/api/request.ts'
      })
    } else {
      api.render({
        './mock/index.js': './template/mock/index.js',
        './src/api/index.js': './template/src/api/index.js',
        './src/api/request.js': './template/src/api/request.js'
      })
    }
  }
  // 注入完成
  api.afterInvoke(() => {
    if (options.type === 'spa') {
      // 修改入口 js/ts 文件
      const fileMain = fs.readFileSync(api.resolve(api.entryFile), { encoding: 'utf-8' })
      const lines = fileMain.split(/\r?\n/g)
      lines.unshift('import \'normalize.css\'') // 引入 normalize.css
      fs.writeFileSync(api.resolve(api.entryFile), lines.join(EOL), { encoding: 'utf-8' })
    } else if (options.type === 'mpa') {
      // 删除多余单页面文件
      rm(api.resolve('src/App.vue'))
      rm(api.resolve('src/main.ts'))
      rm(api.resolve('src/main.js'))
      rm(api.resolve('src/views'))
      rm(api.resolve('src/router'))
      rm(api.resolve('src/store'))
      if (fileType === 'ts') {
        // 修改 vue.config.js 页面 entry
        const fileConfig = fs.readFileSync(api.resolve('vue.config.js'), { encoding: 'utf-8' })
        const lines = fileConfig.split(/\r?\n/g)
        const newLines = lines.map(item => {
          if (item.match(/entry/)) {
            item = item.replace(/js/, 'ts')
          }
          return item
        })
        fs.writeFileSync(api.resolve('vue.config.js'), newLines.join(EOL), { encoding: 'utf-8' })
      }
    }
    // 移除 favicon
    rm(api.resolve('public/favicon.ico'))
  })
}
