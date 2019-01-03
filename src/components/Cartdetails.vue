<template>
  <div>
    <h2>{{ $t('component.cartDetails.myCart') }}</h2>
    <section v-if="this.$store.getters.cart.id != null">
      <div class="cart">
        <b-container>
          <b-row 
            v-for="line in cartdetails.lineItems" 
            :key="line.id"
          >
            <b-col>
              <img
                v-if="line.variant.images[0] != null"
                :src="line.variant.images[0].url"
                width="50px"
                height="50px"
              >
            </b-col>
            <b-col cols="7">{{ line.name }}</b-col>
            <b-col>{{ line.quantity }}</b-col>
            <ApolloMutation
              :mutation="require('@/graphql/UpdateProductsInCart.gql')"
              :variables="{locale: language, cartId:cartId, version:version, actions: [{removeLineItem: {lineItemId: line.id}}]}"
              @done="deleteItem"
            >
              <template slot-scope="{ mutate, loading, error }">
                <b-col>
                  <b-button 
                    :disabled="loading" 
                    @click="mutate()">
                    {{ $t('component.cartDetails.delete') }}
                  </b-button>
                  <p v-if="error">An error occured: {{ error }}</p>
                </b-col>
              </template>
            </ApolloMutation>
          
            <b-col cols="2">{{ line.totalPrice.currencyCode }} {{ formatPrice(line.totalPrice.centAmount) }}</b-col>
          </b-row>
          <b-row>
            <b-col cols="10">
              Total
            </b-col>
            <b-col>
              {{ cartdetails.totalPrice.currencyCode }} {{ formatPrice(cartdetails.totalPrice.centAmount) }} 
            </b-col>
          </b-row>
        </b-container>
      </div>
    </section>
    <section v-else>{{ $t('component.cartDetails.emptyCart') }}</section>
  </div>
</template>

<script>
import priceMixin from "@/mixins/priceMixin";
export default {
  name: "Cartdetails",
  mixins: [priceMixin],
  computed: {
    cartdetails() {
      return this.$store.getters.cart;
    },
    cartId() {
      return this.$store.getters.cart.id;
    },
    language() {
      return this.$store.getters.language;
    },
    version() {
      return this.$store.getters.cart.version;
    },
   
  },
  methods: {
    deleteItem(data) {
      this.$store.commit("setCart", data.data.updateMyCart);
    }
  }
};
</script>


<style>
.cart ul li {
  border-bottom: 1px solid #ddd;
  margin-bottom: 12px;
  padding-bottom: 12px;
}

/* Button Styles */
.ul-reset {
  list-style: none;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
}
</style>
