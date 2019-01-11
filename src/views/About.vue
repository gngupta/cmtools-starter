<template>
  <div id="container">
    <v-container>
      <div id="body">
        <CMSContent :content-id = "aboutId" />
      </div>

    </v-container>
  </div>
</template>


<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import CMSContent from '@/components/CMSContent.vue'


export default {
  name: "About",
  components: {
    Header,
    CMSContent,
    Footer
  },
  data: function() {
    return {
      aboutId: process.env.VUE_APP_CMS_ABOUT_PAGE_ID
    }
  }
};
</script>