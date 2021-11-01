import Vue from 'vue'
import App from './App.vue'
import store from "./store/index";
import router from "./router";
import Toasted from 'vue-toasted';
import '@/assets/css/base.scss'

Vue.use(Toasted);
Vue.config.productionTip = false;

import Message from './views/uiComponent/message/index'
Vue.prototype.$message = Message

Vue.prototype.$deepCopy = function(data){
  data = JSON.stringify(data).length>1?data:{}
  return JSON.parse(JSON.stringify(data))
}

const vue=new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');




export default vue;