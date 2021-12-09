import Vue from 'vue'
import App from './App'
import store from './store'
import './common/common.scss'
Vue.prototype.$store = store
Vue.config.productionTip = false
// import { getDicts } from "./config/request";
// Vue.prototype.getDicts = getDicts

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
