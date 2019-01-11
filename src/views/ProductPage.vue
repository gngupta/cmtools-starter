<template>
  <div id="container">
    <v-container>
      <div id="body">
        <ProductInformation :slug = "productSlug" />
      </div>
      
    </v-container>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ProductInformation from '@/components/ProductInformation.vue'

export default {
  name:"Productpage",
  components:{
    Header,
    ProductInformation,
    Footer
  },
  props:{
    productSlug:{
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>
