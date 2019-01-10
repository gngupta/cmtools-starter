<template>
  <v-flex>
    <v-card>
      <v-layout row>
        <v-flex xs7>
          <v-card-title primary-title>
            <router-link
              :to="{ name: 'product', params: { productSlug: product.masterData.current.slug, locale: this.$store.getters.locale, productID: product.id } }"
            >
              <div>
                <div class="headline">{{ product.masterData.current.name }}</div>
                <div>{{ formatPrice(product.masterData.current.masterVariant.price.value.centAmount) }}</div>
              </div>
            </router-link>
          </v-card-title>
        </v-flex>
        <v-flex xs5>
          <v-img
            v-if="product.masterData.current.masterVariant.images[0] != null"
            :src="product.masterData.current.masterVariant.images[0].url"
            width="150"
            height="150"
            contain
          />
        </v-flex>
      </v-layout>
      <v-divider light/>
      <v-card-actions class="pa-3">
        Rate this product
        <v-spacer/>
        <v-icon>star_border</v-icon>
        <v-icon>star_border</v-icon>
        <v-icon>star_border</v-icon>
        <v-icon>star_border</v-icon>
        <v-icon>star_border</v-icon>
      </v-card-actions>
    </v-card>
   
  </v-flex>
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

</style>
