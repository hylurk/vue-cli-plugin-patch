const proxy = {
  'GET /getData': (req, res) => {
    return res.json({
      status: 0,
      message: 'success',
      data: {
        msg: 'Hello'
      }
    })
  },
  'POST /postData': (req, res) => {
    return res.json({
      status: 0,
      message: 'success',
      data: {
        msg: '发送成功'
      }
    })
  }
}

module.exports = proxy
