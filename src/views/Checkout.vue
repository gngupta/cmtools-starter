<template>
  <div id="container">
    <v-container>
      <div id="body"> {{ $t('view.checkout') }}
        <cartdetails/>
        <Address @addressSaved="handleAfterCall"/>
      </div>
    </v-container>
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
