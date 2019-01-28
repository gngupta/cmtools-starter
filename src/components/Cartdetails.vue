<template>
  <div>
    <section>
      <v-layout>
        <v-flex xs6>
          <v-card-text class="Heading-large-Copy-8">{{ $t('component.cartDetails.myCart') }}</v-card-text>
        </v-flex>
        <v-flex>
          <v-btn 
            flat 
            icon 
            depressed 
            light 
            class="Go-to-checkout">Go to Checkout</v-btn>
        </v-flex>
      </v-layout>
    </section>
    <section 
      v-if="this.$store.getters.cart.lineItems.length != 0" 
      class="sec-bg-color">
      <v-card-text class="Heading-large-Copy-9">
        {{ getCartProductCount }} Products total {{ formatPrice(this.$store.getters.cart.totalPrice.centAmount) }}
      </v-card-text>

      <v-container
        fluid
        grid-list-lg
      >
        <v-layout 
          v-for="line in cartdetails.lineItems" 
          :key="line.id"
          row 
          justify-space-between
          class="prod-info-style">
          <v-flex xs4>
            <img
              v-if="line.variant.images[0] != null"
              :src="line.variant.images[0].url"
              width="50px"
              height="50px"
            >
          </v-flex>
          <v-flex xs6>
            <v-layout>
              {{ line.name }}
            </v-layout>
            <v-layout>
              <v-flex xs6>
                <v-text-field
                  v-model="line.quantity"
                  :disabled="cartItem.status === 'PENDING'"
                  :rules="[rules.required, rules.counter]"
                  type="number"
                  label="Quantity"
                  @change="updateCart(line)"   
                />
                <p v-if="cartItem.status === 'ERROR'">An error occured: {{ errorMessage }}</p>
              </v-flex>
              <v-flex xs6>
                {{ line.totalPrice.currencyCode }} {{ formatPrice(line.totalPrice.centAmount) }}
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs2>
            <v-btn
              :disabled="cartItem.status === 'PENDING'"
              flat
              icon
              depressed
              light
              class="btn-shift-top" 

              @click="removeCart(line)">
              X
            </v-btn>
            <p v-if="cartItem.status === StatusEnum.ERROR">An error occured: {{ cartItem.error }}</p>
          </v-flex>
        </v-layout>
      </v-container> 

      <v-layout>
        <v-card-text class="Heading-large-Copy-11">
          Order Summary
        </v-card-text>
      </v-layout>
      <v-layout>
        <v-flex 
          id="flex-shipping"
          xs6>
          Shipping
        </v-flex>
        <v-flex 
          id="flex-shipping-amount"
          xs6>
          6.99
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex 
          id="flex-tax"
          xs6>
          Tax
        </v-flex>
        <v-flex 
          id="flex-tax-amount"
          xs6>
          6.99
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex 
          id="flex-subtotal"
          xs6>
          Subtotal
        </v-flex>
        <v-flex 
          id="flex-subtotal-amount"
          xs6>
          6.99
        </v-flex>
      </v-layout>
      <hr>
      <v-layout class="layout-space">
        <v-flex 
          xs6 
          class="flex-total">
          Total
        </v-flex>
        <v-flex 
          xs6 
          class="flex-total-cost">
          &euro;  {{ formatPrice(this.$store.getters.cart.totalPrice.centAmount) }}
        </v-flex>
      </v-layout>

    </section>
    <section v-else>{{ $t('component.cartDetails.emptyCart') }}</section>
  </div>
</template>

<script>
import priceMixin from "@/mixins/priceMixin";
import cart from '@/dao/cart-dao';
import Status from '@/misc/status';

export default {
  name: "Cartdetails",
  mixins: [priceMixin],
  data() {
    const MAX_QUANTITY = 20;

    return {
      StatusEnum: Object.assign({}, Status()),
      cartItem: {
        status: null,
        error: ''
      },
      cartLineItems: this.$store.getters.cart.lineItems,
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value < MAX_QUANTITY || 'Max quantity is 20',
      }
    }
  },
  
  computed: {
    cartdetails() {
      return this.$store.getters.cart;
    },
    cartId() {
      return this.$store.getters.cart.id;
    },
    language() {
      return this.$store.getters.language;
    },
    version() {
      return this.$store.getters.cart.version;
    },
    getCartProductCount() {
      return this.cartLineItems.length;
    }
   
  },
  methods: {
    updateItemInCart(data) {
      this.$store.commit("setCart", data.data.updateMyCart);
    },
    updateCart(line) {
      //parameters
      let params = {
        locale: this.language, 
        cartId: this.cartId, 
        version: this.version, 
        actions: [{
          changeLineItemQuantity: {
            lineItemId: line.id, 
            quantity: Number(line.quantity)
          }
        }]
      }

      //updates the lineitem
      this.updateCartQuery(line, params);
    },
    removeCart(line) {
      //parameters
      let params = {
        locale: this.language, 
        cartId: this.cartId, 
        version: this.version, 
        actions: [{
          removeLineItem: {
            lineItemId: line.id
          }
        }]
      }

      //removes the lineitem
      this.updateCartQuery(line, params)
    },
    updateCartQuery(line, params) {
      this.cartItem.status = this.StatusEnum.PENDING;

      //updates the items in a cart (in this case 1 line item)
      cart('update', params, this).then((data) => {
        //changes the status to OK and updates the Store
        this.cartItem.status = this.StatusEnum.OK;
        this.updateItemInCart(data);

      }).catch((/*err*/) => {
        //shows the error on the UI
        this.cartItem.error = 'While updating your cart something went wrong.';
        this.cartItem.status = this.StatusEnum.ERROR;

      });
    }
  }
}
</script>


<style>
.cart ul li {
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

.invalid input {
  border: 1px solid red;
  background-color: rgb(248, 180, 180);
}

.invalid label {
  color: red;
}

.invalid {
  color: red;
}

.Go-to-checkout {
  font-family: Roboto;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ff6a00 !important;
  padding-top: 13px;
  padding-left: 50px;
}

.Heading-large-Copy-8 {
  width: 113px;
  height: 33px;
  font-family: NotoSerif;
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #373a46;
}

.Heading-large-Copy-9 {
  font-family: NotoSerif;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  color: #373a46;
  margin-left: -75px;
  margin-top: 22px;
  margin-bottom: 5px;
  padding-top: 31px;
}

.sec-bg-color {
  background-color: #f4f5f6;
  margin-left: -16px;
  margin-right: -16px;
}

.prod-info-style {
  background-color: white;
  padding-bottom: 15px;
  padding-top: 15px;
  margin: 0 3px 10px 3px !important;
}

.btn-shift-top {
  margin-top: -15px;
}

.Heading-large-Copy-11 {
  font-family: NotoSerif;
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #373a46;
  margin-left: -80px;
}

.layout-space {
  padding-bottom: 40px;
}

.flex-total {
  font-size: large;
  font-weight: 700;
  padding-top: 6px;
  margin-left: -15px;
}

.flex-total-cost {
  font-size: 22px;
  color: blue;
  font-weight: 700;
}

#flex-shipping {
  margin-left: -10px;
}

#flex-shipping-amount {
  padding-left: 20px;
}

#flex-tax {
  margin-left: -25px;
}

#flex-tax-amount {
  padding-left: 50px;
}

#flex-subtotal {
  margin-left: -10px;
}

#flex-subtotal-amount {
  padding-left: 20px;
}

</style>
