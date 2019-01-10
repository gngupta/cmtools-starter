import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
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
      path: '/:locale/category/:categoryID/:categorySlug',
      name: 'category',
      component: () => import( './views/Category.vue'),
      props: true
    },
    {
      path: '/:locale/product/:productID/:productSlug',
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
    },
    {
      path: '/testpage',
      name: 'testpage',
      component: () => import( './views/TestPage.vue'),
      props: true
    }
  ]
})
