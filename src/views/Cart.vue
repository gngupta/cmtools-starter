<template>
  <div id="container">
    <v-container>
      
      <div id="body">
        <section v-if="this.$store.getters.cart.id == null">
          {{ $t('view.cart.notAvailable') }}
        </section>
        <section v-else>
          <cartdetails/>
          <section v-if="this.$store.getters.cart.lineItems.length != 0">
            <v-btn 
              color="success" 
              @click="checkout()">{{ $t('view.cart.checkout') }}</v-btn>
          </section>
          <section v-else>
            {{ $t('view.cart.empty') }}
          </section>
        </section>
      </div>
      
    </v-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import cartdetails from "@/components/Cartdetails.vue";

export default {
  name: "Home",
  components: {
    Header,
    cartdetails,
    Footer
  },
  methods: {
    checkout() {
      this.$router.push({ path: "checkout" });
    }
  }
};
</script>
<style scoped>
.cart-btn {
  display: block;
  float: left;
  font-weight: 600;
  padding: 5px 0;
  text-align: center;
  transition: 0.3s;
  width: 122px;
}

.checkout {
  background: #c83b3b;
  border: 1px solid transparent;
  color: #fff;
}
.checkout:hover {
  background: #e9944f;
  color: #fff;
}
</style>


