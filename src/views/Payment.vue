<template>
  <div id="container">
    <b-container>
      <Header :show-cart="false"/>
      <div id="body">
        <b-container>
          <b-row>
            <b-col>{{ $t('view.payment') }}</b-col>
          </b-row>
          <b-row>
            <b-col> {{ $t('view.paymentText') }}</b-col>
          </b-row>
          <b-row>
            <b-col>{{ $t('component.orderPayment.defaultPayment') }}</b-col>
          </b-row>
          <b-row>
            <b-col><b-button @click="payOrder()">{{ $t('component.orderPayment.payOrder') }}</b-button></b-col>
          </b-row>
        </b-container>
        
      </div>
      <Footer/>
    </b-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import CartDetails from "@/components/Cartdetails.vue";


export default {
  name: "About",
  components: {
    Header,
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

<style>

</style>
