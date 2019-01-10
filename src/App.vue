<template>
  <VApp>
    <Toolbar @toggleNavBar="toggleNavBar"/>
    <VContent>
      <router-view/>
    </VContent>
    <VNavigationDrawer
      v-model="drawer"
      app
      light
    >
      <Navigation/>
    </VNavigationDrawer>
    <VFooter>
      <Footer/>
    </VFooter>
  </VApp>
</template>


<script>
import Navigation from "@/components/Navigation";
import Toolbar from "@/components/Toolbar";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Navigation,
    Toolbar,
    Footer
  },
  data(){
    return{
      drawer: false
    }
  },
  computed: {
    cartitems() {
      const ZERO_ITEMS = 0;
      if(this.$store.getters.cart.lineItems != null){
        return this.$store.getters.cart.lineItems.length;
      } else{
        return ZERO_ITEMS;
      }
    }
  },
  methods:{
    toggleNavBar() {
      this.drawer = !this.drawer;
    }
  }
}
</script>

<style>

</style>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
