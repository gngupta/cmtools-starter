<template>
  <div 
    class="dropdowns" 
    @mouseover="showMiniCart()" 
    @mouseleave="hideMiniCart()"
  >
    <div class="cart-dropdown-btn">
      <a 
        href="#" 
        class="showCart"
      >
        <span>{{ $t('component.cartDetails.myCart') }}</span>
        <div
          v-if="this.$store.getters.cart.totalPrice != null"
        >
          {{ $t('common.total') + ": " + formatPrice(cartdetails.totalPrice.centAmount) }}
        </div>
      </a>
    </div>
    <div 
      v-if="isMiniCartOpen()"
      class="minicart-content" 
    >
      <div v-if="cartdetails.lineItems.length != 0">
        <ul class="ul-reset">
          <li 
            v-for = "line in cartdetails.lineItems" 
            :key="line.id"
          >
            <div class="cart-prod-wrapper cf">
              <div class="cart-image-wrapper">
                <div class="cart-image">
                  <img 
                    v-if="line.variant.images[0] !=null" 
                    :src= "line.variant.images[0].url" 
                    width="50px" 
                    height="50px"
                  >
                </div>
              </div>
              <div class="cart-details">
                <div class="cart-name">{{ line.name }}</div>
                <div class="cart-price">{{ line.totalPrice.currencyCode }} {{ formatPrice(line.totalPrice.centAmount) }}</div>
              </div>
              <div class="cart-qty">
                <div class="cart-qty-name">QTY:</div>
                <div class="cart-qty-value">{{ line.quantity }}</div>
              </div>
            </div>
          </li> 
        </ul>
        <div class="cart-btns-wrapper">
          <router-link :to="{ name: 'cart'}">
            <span class="cart-btn view-cart">{{ $t('component.cartDetails.viewCart') }}</span>
          </router-link>
          <router-link :to="{ name: 'checkout'}">
            <span class="cart-btn checkout" >{{ $t('view.cart.checkout') }}</span>
          </router-link>
        </div>
      </div>
      <div v-else>{{ $t('component.cartDetails.noCartYet') }}</div>
    </div>
  </div>
</template>

<script>
import priceMixin from "@/mixins/priceMixin";
import cartMixin from "@/mixins/cartMixin";

export default {
  name: "Minicart",
  mixins: [priceMixin, cartMixin],
  data() {
    return {
      miniCartOpen: false
    };
  },
  computed: {
    cartdetails() {
      return this.$store.getters.cart;
    }
  },
  methods: {
    showMiniCart() {
      this.miniCartOpen = true;
    },
    hideMiniCart() {
      this.miniCartOpen = false;
    },
    isMiniCartOpen() {
      return this.miniCartOpen;
    }
  },

};
</script>

<style scoped>
.dropdowns {
  position: relative;
}

.minicart-content {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-top-color: transparent;
  color: #333;
  padding: 12px;
  position: absolute;
  right: 0;
  top: 44px;
  z-index: 1000;
}

.minicart-content ul li {
  border-bottom: 1px solid #ddd;
  margin-bottom: 12px;
  padding-bottom: 12px;
}

/* Button Styles */
.ul-reset {
  list-style: none;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
}

.cart-dropdown-btn a {
  background: #338fe0;
  color: #fff;
  float: right;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  padding: 10px 14px;
}

.cart-image-wrapper {
  display: table;
  float: left;
  margin-right: 20px;
}

.cart-image {
  display: table-cell;
  height: 50px;
  vertical-align: middle;
}

.cart-details {
  float: left;
  margin-right: 10px;
  width: 146px;
}

.cart-name {
  margin-bottom: 10px;
}

.cart-price {
  font-weight: 600;
  font-size: 12px;
}

/* Cart Dropdown Quantity */
.cart-qty {
  float: left;
  text-align: center;
  width: 30px;
}

.cart-qty-name {
  font-size: 8px;
}

.cart-qty-value {
  font-weight: 600;
}

.cart-btn {
  display: block;
  float: left;
  font-weight: 600;
  padding: 5px 0;
  text-align: center;
  transition: 0.3s;
  width: 122px;
}

.cart-prod-wrapper {
  border: 1px;
}

.view-cart {
  border: 1px solid #bbb;
  color: #444;
  margin-right: 12px;
}

.view-cart:hover {
  background: #ddd;
  color: #444;
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

/** For IE 6/7 only - Include this rule to trigger hasLayout and contain floats. **/
.cf {
  *zoom: 1;
}
</style>
