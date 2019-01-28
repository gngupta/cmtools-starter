<template>
  <div id="container">
    <v-container>
      <v-layout 
        row 
        wrap>
        <v-flex xs12>
          <span class="Heading-large">{{ $t('view.payment') }}</span>
        </v-flex>
        <v-flex xs12>
          {{ $t('view.paymentText') }}
        </v-flex>
        <v-flex xs12>
          <div>{{ $t('component.orderPayment.defaultPayment') }}</div>
          
          <v-btn 
            color="success" 
            @click="payOrder()"
          >
            {{ $t('component.orderPayment.payOrder') }}
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import CartDetails from "@/components/Cartdetails.vue";


export default {
  name: "About",
  components: {
    CartDetails,
    Footer
  },
  methods: {
    payOrder() {
      this.$router.push("/confirmation");
    }
  }
}
</script>
