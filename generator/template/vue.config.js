module.exports = {
  pages: {
    index: {
      entry: 'src/pages/index/index.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page'
    },
    other: {
      entry: 'src/pages/another/index.ts',
      template: 'public/index.html',
      filename: 'another.html',
      title: 'Another Page'
    }
  }
}
