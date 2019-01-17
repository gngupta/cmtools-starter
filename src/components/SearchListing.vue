<template>
  <ais-index
    :app-id="algolia.appId"
    :api-key="algolia.apiKey"
    index-name="products"
    auto-search = "false">
    <v-container 
      grid-list-md 
      text-xs-center>
      <v-layout 
        row 
        wrap>
        <v-flex xs12>
          <ais-input 
            placeholder="Find products..." 
            autofocus
          />
          <ais-results-per-page-selector :options="[20, 50, 100]" />
          <ais-stats>
            <template slot-scope="{ totalResults, processingTime, query, resultStart, resultEnd }">
              <div>Showing {{ resultStart }} - {{ resultEnd }} of {{ totalResults }} results.</div>
              <div>Your query: <b>{{ query }}</b> took {{ processingTime }}ms</div>
            </template>
          </ais-stats>
        </v-flex>
        <v-flex xs12>
          <h3> Color</h3>
          <ais-refinement-list attribute-name="color" />
        </v-flex>
        <v-flex xs12>
          <ais-pagination 
            :padding="3" 
            :class-names="{
              'ais-pagination': 's_pagination',
              'ais-pagination__item': 's_page',
              'ais-pagination__item--active': 's_active',
            }"
            @page-change="onPageChange" />
          
          <ais-results>
            <ais-menu attribute="categories" />
            <template slot-scope="{ result }">
              <SearchResult 
                :product = "result" 
                :key="result.id" />
            </template>
            <ais-pagination 
              :padding="3" 
              :class-names="{
                'ais-pagination': 's_pagination',
                'ais-pagination__item': 's_page',
                'ais-pagination__item--active': 's_active',
              }"
              @page-change="onPageChange" />
          </ais-results>
          <ais-no-results>
            <template slot-scope="props">
              No products found for <i>{{ props.query }}</i>.
            </template>
          </ais-no-results>
          
        </v-flex>
      </v-layout>
    </v-container>
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

<style >
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

    .ais-refinement-list{
      display: inline-block
    }

    .ais-refinement-list__item { display: inline-block; font-size: 12px; }
</style>
