import Vue from 'vue'
import App from './App.vue'
Vue.config.debug = true
//交互数据
import vueResource from "vue-resource"
Vue.use(vueResource)
// 使用路由
import VueRouter from "vue-router"
Vue.use(VueRouter)
// 加载路由
import routes from "./routes"
const router = new VueRouter(routes)
let vm=new Vue({
	router,
	render: h => h(App)
}).$mount("#app")
