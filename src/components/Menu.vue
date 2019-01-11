<template>
  <div id="menu">
    <ApolloQuery
      :query="require('@/graphql/Categories.gql')"
      :variables="{locale: this.$store.getters.language }"
      @result="onMenuLoaded"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <div 
          v-if="loading" 
          class="loading apollo">
          {{ $t('component.menu.loading') }}
        </div>
        <section v-else>
          <b-button 
            class="btn btn-secondary" 
            to="/">
            {{ $t('component.menu.home') }}
          </b-button>
          <b-dropdown
            v-for="topCategory in data.categories.results"
            :key="topCategory.id"
            :text="topCategory.name"
          >
            <section 
              v-for="category in topCategory.children" 
              :key="category.id"
            >
              <b-dropdown-item :to="{ name: 'category', params: { categorySlug: category.slug, locale: this.$store.getters.locale, categoryID: category.id} }">
                <b>{{ category.name }}</b>
                <b-dropdown-item
                  v-for="subcategory in category.children"
                  :key="subcategory.id"
                  :to="{ name: 'category', params: { categorySlug: subcategory.slug, locale: this.$store.getters.locale, categoryID: subcategory.id } }"
                >{{ subcategory.name }}</b-dropdown-item>
              </b-dropdown-item>
              <b-dropdown-divider/>
            </section>
          </b-dropdown>
          <b-button 
            class="btn btn-secondary" 
            to="/search"
          >
            {{ $t('component.menu.search') }}
          </b-button>
          <b-button 
            class="btn btn-secondary" 
            to="/cart"
          >
            {{ $t('component.menu.cart') }}
          </b-button>
          <b-button 
            class="btn btn-secondary" 
            to="/about">
            {{ $t('component.menu.about') }}
          </b-button>
        </section>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
  methods: {
    onMenuLoaded(data) {
      const categoryItems = Array.isArray(data.data.categories.results)
        ? data.data.categories.results
        : [];
      this.$store.dispatch("setCategories", categoryItems);
    }
  }
};
</script>

<style scoped>
</style>
