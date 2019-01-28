import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import store from './store/store'
import createContentClient from '@/services/contentful'
import BootstrapVue from 'bootstrap-vue'
import InstantSearch from 'vue-instantsearch'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate'
import { ajaxClient, apolloClient} from './services/comtools-provider'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(InstantSearch);
Vue.use(Vuetify)

new Vue({
  router,
  ajax: ajaxClient(),
  content: createContentClient(),
  store,
  i18n,
  apolloProvider: apolloClient(),
  render: h => h(App)
}).$mount('#app')
