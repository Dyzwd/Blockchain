import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 设置文件./src路径为 @
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src')
      }
    ]
  },
  server:{
    proxy:{
      "^/api":{
        target:"http://localhost:5174", //目标源，目标服务器，真实服务器
        changeOrigin:true,  //支持跨域
        rewrite:(path) => path.replace(/^\/api/,""),  //重写真实路径，替换/api
      }
    }
  }
})
