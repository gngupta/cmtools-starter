<template>
  <div id="container">
    <b-container>
      <div id="body">
        <SearchListing />
      </div>
      <Footer/>
    </b-container>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SearchListing from '@/components/SearchListing.vue'

export default {
  components: {
    Header,
    Footer,
    SearchListing
  }
}
</script>

<style>

</style>
