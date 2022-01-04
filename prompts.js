module.exports = [
  {
    name: 'type',
    type: 'list',
    message: 'Choice your app type:',
    choices: [
      { name: 'SPA（单页面应用）', value: 'spa' },
      { name: 'MPA（多页面应用）', value: 'mpa' }
    ],
    default: 'spa'
  }
]
