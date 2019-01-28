<template>
  
  <v-container>
    <v-layout 
      row 
      wrap>
      <v-flex xs12>
        <v-alert
          :value="orderSubmit.status === StatusEnum.ERROR"
          type="error"
          transition="scale-transition"
        >
          {{ orderSubmit.error }}
        </v-alert>
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
          :disabled="orderSubmit.status === StatusEnum.PENDING"
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
import orders from "@/dao/order-dao";
import Status from '@/misc/status';

export default {
  name: "Orderconfirmation",
  mixins: [priceMixin],
  data() {
    return {
      StatusEnum: Object.assign({}, Status()),
      orderSubmit: {
        status: null,
        error: ''
      }
    }
  },
  computed: {
    cartdetails() {
      return this.$store.getters.cart;
    }
  },
  methods: {
    convert() {
      this.orderSubmit.status = this.StatusEnum.PENDING;

      //create parameters for the call
      const params = {
        id: this.$store.getters.cart.id,
        version: this.$store.getters.cart.version
      }

      //execute POST request
      orders('convertCart', params).then((/*result*/) => {
        //empty cart & push user to homepage
        this.orderSubmit.status = this.StatusEnum.OK;
        this.$store.commit("setCart", {});
        this.$router.push("/");

      }).catch((/*err*/) => {
        this.orderSubmit.error = 'Some technical error happened.';
        this.orderSubmit.status = this.StatusEnum.ERROR;

      });
    }
  }
};
</script>


