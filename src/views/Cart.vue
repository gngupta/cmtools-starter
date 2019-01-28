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
            <v-layout class="layout-str-ckout">
              <v-flex xs6>
                <v-btn 
                  flat 
                  icon 
                  depressed 
                  light 
                  class="Back-to-store">Back to store</v-btn>
              </v-flex>
              <v-flex xs6>
                <v-btn 
                  color="success" 
                  class="Rectangle-Copy-5"
                  @click="checkout()">{{ $t('view.cart.checkout') }}
                </v-btn>
              </v-flex>
            </v-layout>
            
          </section>
          <section v-else>
            {{ $t('view.cart.empty') }}
          </section>
        </section>
      </div>
      <optional-footer/>
    </v-container>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import cartdetails from "@/components/Cartdetails.vue";
import optionalFooter from "@/components/OptionalFooter.vue";

export default {
  name: "Home",
  components: {
    cartdetails,
    Footer,
    optionalFooter
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

.Rectangle-Copy-5 {
  width: 171px;
  height: 42px;
  border-radius: 3px;
  box-shadow: 0 2px 0 0 #db5a00;
  background-color: #ff6a00;
}

.Back-to-store {
  width: 94px;
  height: 19px;
  font-family: Roboto;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #1f77fa;
  padding-top: 12px;
}

.layout-str-ckout {
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>


