import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
import '@/assets/less/index.less'
//引入router
import router from '@/router'
app.use(router)
//引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)
//引入pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)

app.mount('#app')
