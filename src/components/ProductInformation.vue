
<template>
  <div>
    <ApolloQuery
      :query="require('@/graphql/ProductBySlug.gql')"
      :variables="{locale: this.$store.getters.language, currency: 'EUR', where: whereStatement}"
    >
      <template slot-scope="{ result: { data, loading } }">
        <div v-if="loading">{{ $t('common.loading') }}</div>
        <v-container 
          v-else-if="data.products != null" 
          grid-list-md 
          text-xs-center>
          <v-layout 
            row 
            wrap>
            <v-flex xs12>
              <v-card flat = "true">
                <v-flex xs12>
                  <div><h2>{{ data.products.results[0].masterData.current.name }}</h2></div>
                  <div>
                    <v-img
                      v-if="data.products.results[0].masterData.current.masterVariant.images[0] !=null"
                      :src="data.products.results[0].masterData.current.masterVariant.images[0].url"
                      width="350"
                      height="350"
                      contain
                    />
                  </div>
                  <div>
                    {{ data.products.results[0].masterData.current.description }}
                  </div>
                </v-flex> 
                <v-flex xs6>
                  EUR: {{ formatPrice(data.products.results[0].masterData.current.masterVariant.price.value.centAmount) }}
                </v-flex>
                <v-flex xs6>
                  <ApolloMutation
                    v-if="cartId == null"
                    :mutation="require('@/graphql/CreateCart.gql')"
                    :variables="{locale: 'EN', cart:{currency:'EUR',lineItems:{productId: data.products.results[0].id,quantity: 1}}}"
                    @done="onCartCreated"
                  >
                    <template slot-scope="{ mutate, loading, error }">
               
                      <v-btn 
                        :disabled="loading" 
                        color="success" 
                        @click="mutate()">
                        {{ $t('component.productInfo.add') }}
                      </v-btn>
                      <p v-if="error">{{ $t('common.error') + error }}</p>
               
                    </template>
                  </ApolloMutation>
                  <ApolloMutation
                    v-else
                    :mutation="require('@/graphql/UpdateProductsInCart.gql')"
                    :variables="{locale: 'EN', cartId:cartId, version:version, actions: [{addLineItem: {productId: data.products.results[0].id, quantity: 1}}]}"
                    @done="onCartUpdated"
                  >
                    <template slot-scope="{ mutate, loading, error }">
                
                      <v-btn 
                        :disabled="loading" 
                        color="success" 
                        @click="mutate()">
                        {{ $t('component.productInfo.add') }}
                      </v-btn>
                      <p v-if="error">{{ $t('common.error') + error }}</p>
                
                    </template>
                  </ApolloMutation>
                </v-flex>
                <div
                  v-for="attribute in data.products.results[0].masterData.current.masterVariant.attributeList"
                  :key="attribute.name"
                >
                  <b>{{ attribute.name }}</b> : {{ attribute.value }} {{ attribute.lvalue }} {{ attribute.label }} {{ attribute.booleanValue }}
                </div>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
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
