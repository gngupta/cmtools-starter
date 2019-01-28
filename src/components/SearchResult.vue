<template>
  <v-flex>
    <v-card>
      <v-layout row>
        <v-flex xs4>
          <v-card-title primary-title>
            <router-link
              :to="{ name: 'product', params: { productSlug: product.slug, locale: this.$store.getters.locale, productID: product.id } }"
            >
              <div>
                <div class="headline">{{ product.name }}</div>
                <div>{{ getFirstPrice(product.prices) }}</div>
              </div>
            </router-link>
          </v-card-title>
        </v-flex>
        <v-flex xs8>
          <v-img
            v-if="product.images != null"
            :src="product.images"
            width="150"
            height="150"
            contain
          />
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
import priceMixin from '@/mixins/priceMixin';

export default {
  name: "SearchResult",
  mixins:[priceMixin],
  props: {
    product:{
      type: Object,
      required: true
    }
  },
  methods: {
    getFirstPrice(pricesString) {
      const firstElement = 0;
      const secondElement = 1
      let prices = pricesString.split(";");
      let price = prices[firstElement].split(" ");
      return price[firstElement] + " " + this.formatPrice(price[secondElement]);
    },
    
  }
    
}
</script>

<style scoped>

.search-result-wrapper {
  padding: 1rem;
  width: 50%;
  margin: auto;
}

.search-result {
  text-align: left;
  cursor: pointer;
  background: #fff;
  box-shadow: 0 0 0 1px #eee;
  border-radius: 4px;
}

a:hover {
  text-decoration: none;
}
</style>
