<template>
  <div>
    <div v-if="products.status === StatusEnum.PENDING">
      {{ $t('common.loading') }}
    </div>
    <div 
      v-else-if="products.status === StatusEnum.OK"
      class="listing-wrapper" 
    >
      <v-container>
        <v-layout 
          row 
          wrap
        >
          <div class="header-bg text-xs-left">
            <!-- Category and description -->
            <v-flex xs12>
              <h2 class="header-font">{{ category.name }}</h2>
              <p>{{ products.result.count + $t('component.productInfo.productsFound') }}</p>
            </v-flex>
            <!-- Filters -->
            <v-flex xs12> 
              <h4 class="header-font">Popular filters</h4>
              <v-layout 
                row
                class="filter-box-wrapper"
              >
                <div class="filter-box text-font">
                  L
                </div>
                <div class="filter-box text-font">
                  White
                </div>
                <div class="filter-box text-font">
                  Long Sleeves
                </div>
              </v-layout>
              <!--filter logos -->
              <v-layout
                row
                class="filter-box-wrapper"
              >
                <img 
                  src="http://www.stickpng.com/assets/images/5a1ed8e24ac6b00ff574e302.png" 
                  class="filter-img"
                >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Moncler_Logo.svg/1200px-Moncler_Logo.svg.png" 
                  class="filter-img"
                >
                <img
                  src="https://m.media-amazon.com/images/S/aplus-media/vc/833a1d6f-26bf-480f-bac1-d08d541ea483._SR970,300_.png"
                  class="filter-img"
                >
              </v-layout>
            </v-flex>
          </div>
          <div class="spacer-1"/>
          <!-- Products -->
          <v-flex xs12>
            <v-btn class="text-font">ALL FILTERS</v-btn>
            <v-btn class="text-font">SORT THE LIST</v-btn>
          </v-flex>
          <div class="spacer-1"/>
          <v-flex 
            xs12
          >
            <v-layout 
              column
            >
              <ProductSummary
                v-for="product in products.result.results"
                :product="product"
                :key="product.id"
              />
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div v-else>
      <v-alert
        :value="products.status === StatusEnum.ERROR"
        type="error"
        transition="scale-transition"
      >
        {{ products.error }}
      </v-alert>
    </div>
  </div>
</template>

<script>
import ProductSummary from "@/components/ProductSummary";
import product from '@/dao/product-dao';
import Status from '@/misc/status';

export default {
  name: "ProductListing",
  components: {
    ProductSummary
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      StatusEnum: Object.assign({}, Status()),
      products: {
        result: null,
        status: null,
        error: ''
      },
      category: null
    };
  },

  computed: {
    id() {
      return this.categoryBySlug(this.slug).id;
    },
    whereStatement() {
      return 'masterData(current(categories(id="' + this.id + '")))';
    },

    categoryDataLoaded() {
      return (this.id != null)
    },
  },
  watch: {
    $route() {
      this.load();
    }
  },
  beforeMount() {
    this.load();
  },

  methods: {
    categoryBySlug(slug) {
      let categories = this.$store.getters.categories;
      if (categories.hasOwnProperty(slug)) {
        this.category = categories[slug];

        return this.category;
      }
    },

    load() {
      if(this.categoryDataLoaded) {
        //changing the status to pending
        this.products.status = this.StatusEnum.PENDING;

        let params = {
          locale: this.$store.getters.language, 
          currency: 'EUR', 
          where: this.whereStatement
        }

        product('getListing', params, this).then((data) => { 
          //load in the received data
          this.products.result = data.data.products; 
          this.products.status = this.StatusEnum.OK;

        }).catch((/*err*/) => {
          //show an error message
          this.products.error = 'Some technical problems happened.';
          this.products.status = this.StatusEnum.ERROR;
        });
      }
    }
  }
};
</script>

<style>

.listing-wrapper {
  width: 100%;
}

.header-bg {
  background-color: #fff;
  width: 100%;
  padding: 5px 16px;
}

.spacer-1 {
  margin-bottom: 20px;
  width: 1px;
}

.filter-box {
  background-color: #f1f7ff;
  margin: 2px;
  padding: 7px 16px;
  color: #1f77fa;
}

.filter-box-wrapper {
  margin: 0 !important;
}

.filter-img {
  max-height: 32px;
  margin: 10px 20px 10px 0;
}

.breadcrumbs {
  color: #1f77fa !important;
  padding-bottom: 16px;
}

a:hover {
  color: #1f77fa !important;
  text-decoration: none;
}

.header-font {
  font-family: NotoSerif;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #373a46;
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
