<template>
  <ApolloQuery
    v-if="categoryDataLoaded"
    :query="require('@/graphql/ProductListing.gql')"
    :variables="{locale: this.$store.getters.language, currency: 'EUR', where: whereStatement}"
  >
    <template slot-scope="{ result: { data, loading } }">
      <div v-if="loading">{{ $t('common.loading') }}</div>
      <div 
        v-else-if="data.products != null"
        class="wrapper" 
      >
        {{ data.products.count + $t('component.productInfo.productsFound') }} 
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout 
            row 
            wrap
          >
            <ProductSummary
              v-for="product in data.products.results"
              :product="product"
              :key="product.id"
            />
          </v-layout>
        </v-container>
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
import ProductSummary from "@/components/ProductSummary";

export default {
  name: "ProductListing",
  components: {
    ProductSummary
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      products: {}
    };
  },
  computed: {
    id() {
      return this.categoryIdBySlug(this.slug);
    },
    whereStatement() {
      return 'masterData(current(categories(id="' + this.id + '")))';
    },
    categoryDataLoaded() {
      if (this.id != null) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    categoryIdBySlug(slug) {
      let categories = this.$store.getters.categories;
      if (categories.hasOwnProperty(slug)) {
        var value = categories[slug];

        return value.id;
      }
    }
  }
};
</script>

<style>
.wrapper {
  width: 100%;
}

.product-grid {
  width: 100%;
  margin: 2rem auto;
}

.product-grid__wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
