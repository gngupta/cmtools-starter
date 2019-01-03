<template>
  <div id="container">
    <b-container>
      <Header :show-cart="true"/>
      <div id="body">
        <vue-markdown :source = "title" />
        <vue-markdown :source = "text" />
        <b-img 
          :src="image1" 
          fluid
          rounded
        />
        <b-img 
          :src="image2" 
          fluid
          rounded
        />
      </div>
      <Footer/>
    </b-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

import VueMarkdown from 'vue-markdown'
import HomePageCMSclient, {HomePageCMS} from '@/content/HomePage.js'


export default {
  name: "Home",
  components: {
    Header,
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
