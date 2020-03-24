import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Myheader from '../src/components/MyHeader'
import Myfooter from '../src/components/MyFooter'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.config.productionTip = false
Vue.component("my-header",Myheader)
Vue.component("my-footer",Myfooter)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
