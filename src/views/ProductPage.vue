<template>
  <div id="container">
    <v-container>
      <div id="body">
        <ProductInformation 
          :slug="productSlug" 
          :productid="productID" />
      </div>
    </v-container>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import ProductInformation from '@/components/ProductInformation.vue'

export default {
  name:"Productpage",
  components:{
    ProductInformation,
    Footer
  },
  props:{
    productSlug:{
      type: String,
      required: true
    },
    productID: {
      type: String,
      required: true
    }
  }
}
</script>

