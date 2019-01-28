<template>
  <div>
    <h2>{{ $t('component.cartDetails.myCart') }}</h2>
    <section v-if="this.$store.getters.cart.id != null">
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout 
          v-for="line in cartdetails.lineItems" 
          :key="line.id"
          row 
          justify-space-between>
          <v-flex xs2>
            <img
              v-if="line.variant.images[0] != null"
              :src="line.variant.images[0].url"
              width="50px"
              height="50px"
            >
          </v-flex>
          <v-flex xs2>
            <ApolloMutation
              :mutation="require('@/graphql/UpdateProductsInCart.gql')"
              :variables="{locale: language, cartId:cartId, version:version, actions: [{changeLineItemQuantity: {lineItemId: line.id, quantity: Number(line.quantity)}}]}"
              @done="updateItemInCart"
            >
              <template slot-scope="{ mutate, loading, error }">
                <v-text-field
                  v-model="line.quantity"
                  :disabled="loading"
                  :rules="[rules.required, rules.counter]"
                  type="number"
                  label="Quantity"
                  @change="mutate()"   
                />
                <p v-if="error">An error occured: {{ error }}</p>
              </template>
            </ApolloMutation>
          </v-flex>
          <v-flex xs2>
            {{ line.name }}
          </v-flex>
          <v-flex xs2>
            <ApolloMutation
              :mutation="require('@/graphql/UpdateProductsInCart.gql')"
              :variables="{locale: language, cartId:cartId, version:version, actions: [{removeLineItem: {lineItemId: line.id}}]}"
              @done="updateItemInCart"
            >
              <template slot-scope="{ mutate, loading, error }">
                <v-btn
                  :disabled="loading" 
                  @click="mutate()">
                  {{ $t('component.cartDetails.delete') }}
                </v-btn>
                <p v-if="error">An error occured: {{ error }}</p>
                
              </template>
            </ApolloMutation>
          </v-flex>
          <v-flex xs2>
            {{ line.totalPrice.currencyCode }} {{ formatPrice(line.totalPrice.centAmount) }}
          </v-flex>
        </v-layout>
      </v-container> 



    </section>
    <section v-else>{{ $t('component.cartDetails.emptyCart') }}</section>
  </div>
</template>

<script>
import priceMixin from "@/mixins/priceMixin";

export default {
  name: "Cartdetails",
  mixins: [priceMixin],
  data() {
    return{
      cartLineItems : this.$store.getters.cart.lineItems,
      rules:{
        required: value => !!value || 'Required.',
        counter: value => value < 20 || 'Max quantity is 20',
      }
    }
  },
  
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
    updateItemInCart(data) {
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

.invalid input {
  border: 1px solid red;
  background-color: rgb(248, 180, 180);
}
.invalid label {
  color: red;
}

.invalid {
  color : red;
}
</style>
