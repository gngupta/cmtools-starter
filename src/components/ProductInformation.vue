
<template>
  <div>
    <ApolloQuery
      :query="require('@/graphql/ProductBySlug.gql')"
      :variables="{locale: this.$store.getters.language, currency: 'EUR', where: whereStatement}"
    >
      <template slot-scope="{ result: { data, loading } }">
        <div v-if="loading">{{ $t('common.loading') }}</div>
        <b-container v-else-if="data.products != null">
          <b-row>
            <b-col>
              <h2>{{ data.products.results[0].masterData.current.name }}</h2>
            </b-col>
          </b-row>
          <b-row>
            <b-col>{{ data.products.results[0].masterData.current.description }}</b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-img
                v-if="data.products.results[0].masterData.current.masterVariant.images[0] !=null"
                :src="data.products.results[0].masterData.current.masterVariant.images[0].url"
                width="350"
                height="350"
              />
            </b-col>
            <b-col>
              <div
                v-for="attribute in data.products.results[0].masterData.current.masterVariant.attributeList"
                :key="attribute.name"
              >
                <b>{{ attribute.name }}</b>
                : {{ attribute.value }} {{ attribute.lvalue }} {{ attribute.label }} {{ attribute.booleanValue }}
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div>EUR: {{ formatPrice(data.products.results[0].masterData.current.masterVariant.price.value.centAmount) }}</div>
            </b-col>
            <ApolloMutation
              v-if="cartId == null"
              :mutation="require('@/graphql/CreateCart.gql')"
              :variables="{locale: 'EN', cart:{currency:'EUR',lineItems:{productId: data.products.results[0].id,quantity: 1}}}"
              @done="onCartCreated"
            >
              <template slot-scope="{ mutate, loading, error }">
                <b-col>
                  <b-button 
                    :disabled="loading" 
                    @click="mutate()">
                    {{ $t('component.productInfo.create') }}
                  </b-button>
                  <p v-if="error">{{ $t('common.error') + error }}</p>
                </b-col>
              </template>
            </ApolloMutation>
            <ApolloMutation
              v-else
              :mutation="require('@/graphql/UpdateProductsInCart.gql')"
              :variables="{locale: 'EN', cartId:cartId, version:version, actions: [{addLineItem: {productId: data.products.results[0].id, quantity: 1}}]}"
              @done="onCartUpdated"
            >
              <template slot-scope="{ mutate, loading, error }">
                <b-col>
                  <b-button 
                    :disabled="loading" 
                    @click="mutate()">
                    {{ $t('component.productInfo.add') }}
                  </b-button>
                  <p v-if="error">{{ $t('common.error') + error }}</p>
                </b-col>
              </template>
            </ApolloMutation>
          </b-row>
        </b-container>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import priceMixin from "@/mixins/priceMixin";

export default {
  name: "Productinformation",
  mixins: [priceMixin],
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  computed: {
    whereStatement() {
      return 'masterData(current(slug(en="' + this.slug + '")))';
    },
    cartId() {
      return this.$store.getters.cart.id;
    },
    version() {
      return this.$store.getters.cart.version;
    }
  },
  methods: {
    onCartCreated(data) {
      this.$store.commit("setCart", data.data.createMyCart);
    },
    onCartUpdated(data) {
      this.$store.commit("setCart", data.data.updateMyCart);
    }
  },
  
};
</script>

<style>
</style>
