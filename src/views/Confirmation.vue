<template>
  <div id="container">
    <b-container>
      <Header :show-cart="false"/>
      <div id="body">
        <OrderConfirmation/>
      </div>
      <Footer/>
    </b-container>
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