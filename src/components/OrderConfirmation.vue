<template>
  
  <v-container>
    <v-layout 
      row 
      wrap>
      <v-flex xs12>
        {{ $t('component.orderConfirmation.title') }}
      </v-flex>
      <v-flex xs6>
        <b>{{ $t('component.orderConfirmation.orderDetails') }}</b>
        <v-flex 
          v-for="line in cartdetails.lineItems" 
          :key="line.id"
          xs6 
        >
          {{ line.name }} {{ line.quantity }}{{ line.totalPrice.currencyCode }} {{ formatPrice(line.totalPrice.centAmount) }}
        </v-flex>
      </v-flex>
      <v-flex xs6>
        <b>{{ $t('component.orderConfirmation.shippingDetails') }}</b>
        <div>{{ cartdetails.shippingAddress.firstName }} {{ cartdetails.shippingAddress.lastName }}</div>
        <div>{{ cartdetails.shippingAddress.streetName }} {{ cartdetails.shippingAddress.streetNumber }}</div>
        <div>{{ cartdetails.shippingAddress.postalCode }} {{ cartdetails.shippingAddress.city }} {{ cartdetails.shippingAddress.country }}</div>
      </v-flex>
      <v-flex xs12>
        <v-btn
          color="success"
          @click="convert()"
        >
          {{ $t('component.orderConfirmation.convertToOrder') }}
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import priceMixin from "@/mixins/priceMixin";
export default {
  name: "Orderconfirmation",
  mixins: [priceMixin],
  computed: {
    cartdetails() {
      return this.$store.getters.cart;
    }
  },
  methods: {
    convert() {
      const request = {
        uri: "/me/orders",
        method: "POST",
        body: {
          id: this.$store.getters.cart.id,
          version: this.$store.getters.cart.version
        }
      };
      this.$ajax.execute(request).then(response => response);
      this.$store.commit("setCart", {});
      this.$router.push("/");
    }
  },

  
};
</script>

<style>
</style>

