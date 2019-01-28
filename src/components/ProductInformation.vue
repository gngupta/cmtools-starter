
<template>
  <div>
    <div v-if="product.status === StatusEnum.PENDING">
      {{ $t('common.loading') }}
    </div>
    <v-container 
      v-else-if="product.status === StatusEnum.OK"
      grid-list-md 
      text-xs-center>
      <v-layout 
        row 
        wrap>
        <v-flex xs12>
          <v-card :flat="true">
            <v-flex xs12>
              <div><h2>{{ product.result.masterData.current.name }}</h2></div>
              <div>
                <v-img
                  v-if="product.result.masterData.current.masterVariant.images[0] !=null"
                  :src="product.result.masterData.current.masterVariant.images[0].url"
                  width="350"
                  height="350"
                  contain
                />
              </div>
              <div>
                {{ product.result.masterData.current.description }}
              </div>
            </v-flex> 
            <v-flex xs6>
              EUR: {{ formatPrice(product.result.masterData.current.masterVariant.price.value.centAmount) }}
            </v-flex>
            <v-flex xs6>
              <v-btn 
                :disabled="addProduct.status === StatusEnum.PENDING" 
                color="success" 
                @click="updateCart(cartId != null)">
                {{ $t('component.productInfo.add') }}
              </v-btn>
              <p v-if="addProduct.status === StatusEnum.ERROR">{{ addProduct.error }}</p>
            </v-flex>
            <div
              v-for="attribute in product.result.masterData.current.masterVariant.attributeList"
              :key="attribute.name"
            >
              <b>{{ attribute.name }}</b> : {{ attribute.value }} {{ attribute.lvalue }} {{ attribute.label }} {{ attribute.booleanValue }}
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <div v-else>
      <v-alert
        :value="product.status === StatusEnum.ERROR"
        type="error"
        transition="scale-transition"
      >
        {{ product.error }}
      </v-alert>
    </div>
  </div>
</template>

<script>
import priceMixin from "@/mixins/priceMixin";
import product from '@/dao/product-dao';
import cartHandler from '@/handlers/cart-handler';
import Status from '@/misc/status';

export default {
  name: "Productinformation",
  mixins: [priceMixin],
  props: {
    slug: {
      type: String,
      required: true
    },
    productid: {
      type: String,
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
      product: {
        result: null,
        status: null,
        error: ''
      }

    };
  },
  computed: {
    cartId() {
      return this.$store.getters.cart.id;
    }
  },
  beforeMount() {
    this.load();
  },
  methods: {

    load() {
      this.product.status = this.StatusEnum.PENDING;

      let params = {
        productId: this.productid,
        locale: this.$store.getters.language, 
        currency: 'EUR'
      }

      product('getInformation', params, this).then((data) => { 
        //load in the productinformation
        this.product.result = data.data.product;
        this.product.status = this.StatusEnum.OK;

      }).catch((/*err*/) => {
        //show error message
        this.product.error = 'A technical problem has occurred.';
        this.product.status = this.StatusEnum.ERROR;

      });
    },

    updateCart(cartExists) {
      this.addProduct.status = this.StatusEnum.PENDING;

      this.CartHandler.addProduct(cartExists, this.productid, this).then(() => {
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

