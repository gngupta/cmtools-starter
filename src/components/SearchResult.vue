<template>
  <div class="search-result-wrapper">
    <router-link :to="{ name: 'product', params: { productSlug: product.slug } }">
      <div class="search-result">
        <table cellspacing="0">
          <tr>
            <td rowspan="2">
              <img 
                v-if="product.images !=null"
                :src= "product.images" 
                width="50" 
                height="50" 
              >
            </td>
            <td>{{ product.name }}</td>
          </tr>
          <tr>
            <td>
              {{ getFirstPrice(product.prices) }}
            </td>
          </tr>
        </table>
      </div>
    </router-link>
  </div>
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
    
<style>
</style>

<style scoped>
    .search-result-wrapper {
        padding: 1rem;
        width: 50%;
        margin: auto;
    }

    .search-result {
        text-align: left;
        cursor: pointer;
        background: #ffffff;
        box-shadow: 0px 0px 0px 1px #eee;
        border-radius: 4px;
    }

    a:hover {
        text-decoration: none;
    }
</style>
