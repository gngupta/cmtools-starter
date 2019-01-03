<template>
  <div>
    <b-container>
      <b-row>
        <b-col>{{ $t('component.orderConfirmation.title') }}</b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-row><b-col><b>{{ $t('component.orderConfirmation.orderDetails') }}</b></b-col></b-row>
          <b-row 
            v-for="line in cartdetails.lineItems" 
            :key="line.id"
          >
            <b-col>{{ line.name }}</b-col>
            <b-col>{{ line.quantity }}</b-col>
            <b-col>{{ line.totalPrice.currencyCode }} {{ formatPrice(line.totalPrice.centAmount) }}</b-col>
          </b-row>
        </b-col>
        <b-col>
          <b-row><b-col><b>{{ $t('component.orderConfirmation.shippingDetails') }}</b></b-col></b-row>
          <b-row>
            <b-col>{{ cartdetails.shippingAddress.firstName }} {{ cartdetails.shippingAddress.lastName }}</b-col>
          </b-row>
          <b-row>
            <b-col>{{ cartdetails.shippingAddress.streetName }} {{ cartdetails.shippingAddress.streetNumber }}</b-col>
          </b-row>
          <b-row>
            <b-col>{{ cartdetails.shippingAddress.postalCode }} {{ cartdetails.shippingAddress.city }} {{ cartdetails.shippingAddress.country }}</b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-button @click="convert()">{{ $t('component.orderConfirmation.convertToOrder') }}</b-button>
    </b-container>
  </div>
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
