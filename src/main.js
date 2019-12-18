import Vue from 'vue'
import App from './App.vue'
import {store} from './store/store'
import './assets/csm-styles.scss'
import 'codemirror/lib/codemirror.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
