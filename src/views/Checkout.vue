<template>
  <div id="container">
    <b-container>
      <Header :show-cart="false" />
      <div id="body">
        <cartdetails />
        <Address @addressSaved="handleAfterCall"/>
      </div>
      <Footer/>
    </b-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import cartdetails from "@/components/Cartdetails.vue";
import Address from "@/components/Address.vue";

export default {
  name: "Checkout",
  components: {
    Header,
    cartdetails,
    Address,
    Footer
  },
  methods: {
    handleAfterCall() {
      this.$router.push({ path: "payment" });
    }
  }
};
</script>

<style>
</style>
