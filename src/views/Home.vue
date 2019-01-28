<template>
  <div id="container">
    <v-container>
     
      <div id="body">
        <vue-markdown :source = "title" />
        <vue-markdown :source = "text" />
        <VCarousel 
          :hide-controls="true"
          transition="fade">
          <VCarouselItem :src="image1"/>
          <VCarouselItem :src="image2"/>
        </VCarousel>
      </div>
     
    </v-container>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";

import VueMarkdown from 'vue-markdown'
import HomePageCMSclient, {HomePageCMS} from '@/content/HomePage.js'


export default {
  name: "Home",
  components: {
    Footer,
    VueMarkdown
  },
  data() {
    return {
      title: '',
      text: '',
      image1: '',
      image2: ''
    };
  },
  created: function () {
    this.getContent();
  },

  methods:{
    async getContent(){
      let homePageData = new HomePageCMS();
      homePageData = await HomePageCMSclient.get(this.$content, this.$locale);
      
      this.title = homePageData.title;
      this.text = homePageData.text;
      this.image1 = homePageData.image1;
      this.image2 = homePageData.image2;
    }
  }
}
</script>
