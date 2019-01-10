<template>
  <div id="container">
    <v-container>
      <div id="body">
        <OrderConfirmation/>
      </div>
    </v-container>
  </div>
</template>


<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import CartDetails from "@/components/Cartdetails.vue";
import OrderConfirmation from "@/components/OrderConfirmation.vue";

export default {
  name: "About",
  components: {
    Header,
    CartDetails,
    OrderConfirmation,
    Footer
  }
};
</script>