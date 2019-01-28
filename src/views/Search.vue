<template>
  <div id="container">
    <b-container>
      <div id="body">
        <SearchListing />
      </div>
    </b-container>
  </div>
</template>

<script>
import SearchListing from '@/components/SearchListing.vue'

export default {
  components: {
    SearchListing
  }
}
</script>
