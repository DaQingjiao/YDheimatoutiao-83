module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [ // 配置按需引入组件
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
