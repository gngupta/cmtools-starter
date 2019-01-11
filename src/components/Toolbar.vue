<template>
  <VToolbar 
    dense 
    fixed
    app
  >
    <VToolbarSideIcon @click.stop="toggleNavBar()" />
    <v-toolbar-title>WunderTech</v-toolbar-title>
    <VSpacer />
    <v-btn 
      icon 
      to="/search">
      <v-icon>search</v-icon>
    </v-btn>
      
    <v-btn icon>
      <v-icon>face</v-icon>
    </v-btn>
      
    <v-btn 
      to="/cart" 
      icon>
      <v-badge color="green">
        <span slot="badge">{{ cartitems }}</span>
        <v-icon>shopping_cart</v-icon>
      </v-badge>
    </v-btn>
     
    <VBtn 
      to="/testpage"
      icon>
      <v-icon>info</v-icon>
    </VBtn>
  </VToolbar>
</template>

<script>
export default {
  name: "Toolbar",
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
  methods: {
    toggleNavBar() {
      this.$emit('toggleNavBar');
    }
  }
  
}
</script>

<style>

</style>
