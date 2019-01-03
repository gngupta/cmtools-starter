<template>
  <div class="product-wrapper">
    <router-link
      :to="{ name: 'product', params: { productSlug: product.masterData.current.slug } }"
    >
      <div class="product">
        <h5>{{ product.masterData.current.name }}</h5>
        <img
          v-if="product.masterData.current.masterVariant.images[0] != null"
          :src="product.masterData.current.masterVariant.images[0].url"
          width="150"
          height="150"
        >
        <div>EUR: {{ formatPrice(product.masterData.current.masterVariant.price.value.centAmount) }}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
import priceMixin from "@/mixins/priceMixin";

export default {
  name: "Productsummmary",
  mixins: [priceMixin],
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
.product-wrapper {
  padding: 1rem;
  float: left;
}
.product {
  padding: 1rem;
  float: left;
  position: relative;
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0px 0px 0px 1px #eee;
  border-radius: 4px;
}
</style>
