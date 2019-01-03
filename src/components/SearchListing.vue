<template>
  <ais-index
    :app-id="algolia.appId"
    :api-key="algolia.apiKey"
    index-name="products"
    auto-search = "false">
    <div class="main_cont">
      <div class="shift_left">
        <h3> Color</h3>
        <ais-refinement-list attribute-name="color"/>
        <h3> Categories </h3>
        <ais-refinement-list attribute-name="categories"/>
      </div>
      <div class="shift_right">
        <ais-input placeholder="Find products..."/>
        <ais-results-per-page-selector :options="[20, 50, 100]" />
        <ais-stats>
          <template slot-scope="{ totalResults, processingTime, query, resultStart, resultEnd }">
            Showing {{ resultStart }} - {{ resultEnd }} of {{ totalResults }} results. Your query: <b>{{ query }}</b> took {{ processingTime }}ms
          </template>
        </ais-stats>
        <ais-results>
          <ais-menu attribute="categories" />
          <template slot-scope="{ result }">
            <SearchResult 
              :product = "result" 
              :key="result.id" />
          </template>
        </ais-results>
        <ais-pagination 
          :padding="3" 
          :class-names="{
            'ais-pagination': 's_pagination',
            'ais-pagination__item': 's_page',
            'ais-pagination__item--active': 's_active',
          }"
          @page-change="onPageChange" />
        <ais-no-results>
          <template slot-scope="props">
            No products found for <i>{{ props.query }}</i>.
          </template>
        </ais-no-results>
      </div>
    </div>
  </ais-index>
</template>

<script>
import SearchResult from '@/components/SearchResult';

export default {
  name: "SearchListing",
  components: {
    SearchResult
  },
  data: function() {
    return {
      algolia: {
        appId: process.env.VUE_APP_AIS_APP_ID,
        apiKey: process.env.VUE_APP_AIS_API_KEY
      }
    }
  },
  methods: {
    onPageChange() {
      const x_axis_initial = 0;
      const y_axis_initial = 0;
      window.scrollTo(x_axis_initial, y_axis_initial);
    }
  }
}
</script>

<style scoped>
    .shift_left {
    color: darkslategrey;
    float: left;
    padding: 10px;
    width: 23%;
    margin-right: 2%;
    border: 1px solid green;
    }

    .shift_right {
    float: left;
    color: blue;
    width: 75%;
    border: 2px solid black;
    }

    .main_cont {
      padding-top: 15px;
    }

    .s_pagination {
    display: flex;
    width: 167px;
    margin: 0 auto;
    padding: 0;
    list-style: none;
    justify-content: space-around;
    }
</style>
