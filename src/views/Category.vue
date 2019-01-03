<template>
  <div id="container">
    <b-container>
      <Header :show-cart="true"/>
      <div id="body">
        <ProductListing :slug="categorySlug"/>
      </div>
      <Footer/>
    </b-container>
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
