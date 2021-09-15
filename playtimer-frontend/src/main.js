import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from 'axios'
import moment from 'moment'

Vue.use(Vuelidate)
Vue.config.productionTip = false
Vue.$axios = axios

new Vue({
    vuetify,
    store,
    router,
    moment,
    render: h => h(App)
}).$mount('#app')
