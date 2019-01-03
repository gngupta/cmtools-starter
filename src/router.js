import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import( './views/About.vue')
    },
    {
      path: '/category/:categorySlug',
      name: 'category',
      component: () => import( './views/Category.vue'),
      props: true
    },
    {
      path: '/product/:productSlug',
      name: 'product',
      component: () => import( './views/ProductPage.vue'),
      props: true
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import( './views/Cart.vue'),
      props: true
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import( './views/Checkout.vue'),
      props: true
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import( './views/Payment.vue'),
      props: true
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: () => import( './views/Confirmation.vue'),
      props: true
    },
    {
      path: '/search',
      name: 'search',
      component: () => import( './views/Search.vue'),
      props: true
    }
  ]
})
