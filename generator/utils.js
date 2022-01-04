const fs = require('fs')

/**
 * 删除文件或文件夹
 * @param { string } path 要删除的文件或文件夹路径
 */
const rm = path => {
  if (fs.existsSync(path)) {
    if (fs.statSync(path).isDirectory()) {
      let files = []
      files = fs.readdirSync(path)
      files.forEach(file => {
        const curPath = `${path}/${file}`
        if (fs.statSync(curPath).isDirectory()) {
          rm(curPath)
        } else {
          fs.unlinkSync(curPath) // 删除文件，但不能删除文件夹
        }
      })
      fs.rmdirSync(path) // 删除空文件夹
    } else {
      fs.rmSync(path, { force: true })
    }
  }
}

module.exports = {
  rm
}
