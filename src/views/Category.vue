<template>
  <div 
    id="container" 
    class="bg-wrapper"
  >
    <v-container class="no-padding">
      <ProductListing :slug="categorySlug"/>
    
      <optional-footer/>
    </v-container>
  </div>
</template>

<script>
import ProductListing from "@/components/ProductListing.vue";
import OptionalFooter from "@/components/OptionalFooter.vue";

export default {
  name: "Category",
  components: {
    ProductListing,
    OptionalFooter
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

.bg-wrapper {
  background-color: #f6f4f4 !important;
  height: 100%;
}

.no-padding {
  padding: 0;
}

</style>