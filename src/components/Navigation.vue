<template>
  <VList dense>
    Menu
    <ApolloQuery
      :query="require('@/graphql/Categories.gql')"
      :variables="{locale: this.$store.getters.language }"
      @result="onMenuLoaded"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <div 
          v-if="loading" 
          class="loading apollo">
          Loading the menu...
        </div>
        <section v-else>
      
          <router-link :to="{ name: 'home'}">Home</router-link>
      
          <section 
            v-for="topCategory in data.categories.results"
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
      </template>
    </ApolloQuery>
  </VList>
</template>

<script>
export default {
  data() {
    return {
      openCategoryMenu: '',
      someCategoryWasClicked: false,
    };
  },
  computed: {
    getLocale() {
      return this.$store.getters.locale
    }
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
    }
  }
}
</script>

<style>

</style>
