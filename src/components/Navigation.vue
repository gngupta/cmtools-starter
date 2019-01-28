<template>
  <VList dense>
    Menu
    <div 
      v-if="categories.status === StatusEnum.PENDING" 
      class="loading apollo">
      Loading the menu...
    </div>
    <section v-else-if="categories.status = StatusEnum.OK">
      
      <router-link :to="{ name: 'home'}">Home</router-link>
      
      <section 
        v-for="topCategory in categories.result"
        :key="topCategory.id"
        @click="clickOnCategory(topCategory.id)"
      >
        <b>{{ topCategory.name }}</b>
        <section v-if="isMenuOpen(topCategory)">
          <section 
            v-for="category in topCategory.children" 
            :key="category.id"
          >
            
            {{ category.name }}
            <section 
              v-for="subcategory in category.children" 
              :key="subcategory.id"
            >
              <router-link :to="{ name: 'category', params: { categorySlug: subcategory.slug, locale: getLocale, categoryID: subcategory.id } }"><i> {{ subcategory.name }} </i></router-link>
            </section>
          </section>
        </section>
      </section>
    </section>
  </VList>
</template>

<script>
import category from '@/dao/category-dao';
import Status from '@/misc/status';

export default {
  data() {
    return {
      StatusEnum: Object.assign({}, Status()),
      categories: {
        result: null,
        status: null,
        error: ''
      },
      openCategoryMenu: '',
      someCategoryWasClicked: false,
    };
  },
  computed: {
    getLocale() {
      return this.$store.getters.locale
    }
  },
  beforeMount() {
    this.load();
  },
  methods: {
    isMenuOpen({ id }) {
      return this.someCategoryWasClicked && this.openCategoryMenu === id;
    },
    clickOnCategory(id) {
      
      this.openCategoryMenu = id;
      this.someCategoryWasClicked = true;
    },
    onMenuLoaded(data) {
      const categoryItems = Array.isArray(data.data.categories.results)
        ? data.data.categories.results
        : [];
      this.$store.dispatch("setCategories", categoryItems);
    },
    load() {
      this.categories.status = this.StatusEnum.PENDING;

      //parameters
      let params = {
        locale: this.$store.getters.language 
      }

      category('getAll', params, this).then((data) => {
        //load the results in
        this.onMenuLoaded(data);
        this.categories.result = data.data.categories.results;
        this.categories.status = this.StatusEnum.OK;

      }).catch((/*err*/) => {
        //show the error message
        this.categories.error = 'Something went wrong while trying to get all the Categories.';
        this.categories.status = this.StatusEnum.ERROR;

      });
    }
  }
}
</script>
