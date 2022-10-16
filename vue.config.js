const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  // 配置devServer实现代理转发以及跨域的功能
  devServer:{

  }
})
