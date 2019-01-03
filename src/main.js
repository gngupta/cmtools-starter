import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import store from './store/store'
import createProvider from './services/apollo'
import createAjaxClient from './services/ajax'
import createContentClient from '@/services/contentful'
import BootstrapVue from 'bootstrap-vue'
import { createAuthMiddlewareForAnonymousSessionFlow } from '@commercetools/sdk-middleware-auth/dist/commercetools-sdk-middleware-auth.cjs';
import settings from '@/config/settings';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import InstantSearch from 'vue-instantsearch'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate'

const authMiddleware = createAuthMiddlewareForAnonymousSessionFlow(settings.ct.auth);

function addAuthHeader(request) {
  return new Promise(success => authMiddleware(requestWithAuth => success(requestWithAuth))(request));
}

const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || `https://api.commercetools.com/${settings.ct.auth.projectKey}/graphql`;
const link = setContext(request => addAuthHeader(request)).concat(new HttpLink({ uri: httpEndpoint }));

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(InstantSearch);

new Vue({
  router,
  ajax: createAjaxClient(authMiddleware),
  content: createContentClient(),
  store,
  i18n,
  apolloProvider: createProvider(link),
  render: h => h(App)
}).$mount('#app')
