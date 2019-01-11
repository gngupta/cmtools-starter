<template>
  <div id="container">
    <v-container>
      <div id="body">
        <ProductListing :slug="categorySlug"/>
      </div>
      
    </v-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ProductListing from "@/components/ProductListing.vue";

export default {
  name: "Category",
  components: {
    Header,
    ProductListing,
    Footer
  },
  props: {
    categorySlug: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
</style>
