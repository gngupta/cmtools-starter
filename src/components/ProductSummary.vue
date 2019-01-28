<template>
  <v-flex xs12>
    <v-card class="product-card">
      <v-layout
        class="no-margin"
        row
      >
        <v-flex xs4>
          <router-link
            :to="routeProductPage"
          >
            <v-img
              v-if="product.masterData.current.masterVariant.images[0] != null"
              :src="product.masterData.current.masterVariant.images[0].url"
              class="product-img"
            />
            <v-img 
              v-else
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png"
              class="product-img"
            />
          </router-link>
        </v-flex>
        <v-flex 
          xs8
          class="text-xs-left"
        >
          <router-link
            :to="routeProductPage"
          >
            <h5 class="text-font">{{ product.masterData.current.name }}</h5>
          </router-link>
          <v-layout 
            row
            class="no-margin"
          >
            <!-- TODO: replace with working review stars (this is a placeholder) -->
            <v-icon class="star-icon">star_border</v-icon>
            <v-icon class="star-icon">star_border</v-icon>
            <v-icon class="star-icon">star_border</v-icon>
            <v-icon class="star-icon">star_border</v-icon>
            <v-icon class="star-icon">star_border</v-icon>
            <a href="#">&nbsp;99</a>
          </v-layout>
          <!-- TODO: print product attributes here -->
          <p class="text-font">Green - XXXXL - Jeans - Gucci</p>
          <v-layout 
            row
            wrap
            class="no-margin"
          >
            <v-flex 
              xs6
              class="money-wrapper text-font"
            >
              &euro; {{ formatPrice(product.masterData.current.masterVariant.price.value.centAmount) }}
            </v-flex>
            <v-flex 
              xs6
            >
              <v-btn 
                :disabled="addProduct.status === StatusEnum.PENDING" 
                class="cart-button"
                @click="updateCart(cartId != null)"
              >
                <v-icon>fa-cart-plus</v-icon>
              </v-btn>
              <p v-if="addProduct.status === StatusEnum.ERROR">{{ addProduct.error }}</p>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
import priceMixin from "@/mixins/priceMixin";
import cartHandler from '@/handlers/cart-handler';
import Status from '@/misc/status';

export default {
  name: "Productsummmary",
  mixins: [priceMixin],
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      StatusEnum: Object.assign({}, Status()),
      CartHandler: Object.assign({}, cartHandler()),
      addProduct: {
        status: null,
        error: ''
      },
      routeProductPage: { 
        name: 'product', 
        params: { 
          productSlug: this.product.masterData.current.slug, 
          locale: this.$store.getters.locale, 
          productID: this.product.id 
        } 
      }
    }
  },
  computed: {
    cartId() {
      return this.$store.getters.cart.id;
    }
  },
  methods: {
    updateCart(cartExists) {
      this.addProduct.status = this.StatusEnum.PENDING;

      this.CartHandler.addProduct(cartExists, this.product.id, this).then(() => {
        //if it succeeded
        this.addProduct.status = this.StatusEnum.OK;

      }).catch((/*err*/) => {
        //if it failed
        this.addProduct.error = 'A technical problem has occurred.';
        this.addProduct.status = this.StatusEnum.ERROR;
      });
    }
  }
};
</script>

<style>
.product-card {
  padding: 12px 16px;
  margin: 0 16px 8px;
}

.no-margin {
  margin: 0 !important;
}

.product-img {
  max-width: 150px;
  max-height: 150px;
  margin-right: 12px;
}

.star-icon {
  font-size: 16px !important;
}

.money-wrapper {
  color: #1f77fa;
}

.cart-button {
  padding: 0 !important;
  min-width: 52px;
  background-color: #ff6a00 !important;
  color: #fff !important;
}

.text-font {
  font-family: Roboto;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.19;
  letter-spacing: normal;
}

</style>