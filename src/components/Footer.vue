<template>
  <div id="footer">
    <div id="title"><vue-markdown :source = "title" /></div>
    <div id="text"><vue-markdown :source = "text"/> </div>
  </div>
</template>

<script>
import FooterModel, {Footer} from '@/content/Footer.js'
import VueMarkdown from 'vue-markdown'

export default {
  name: "Footer",
  components:{
    VueMarkdown
  },
  data(){
    return{
      title: '',
      text: '',
      footerId: process.env.VUE_APP_CMS_FOOTER_ID
    }
  },
  created: function () {
    this.getContent();
  },
  
  methods:{
    async getContent(){
      let footerData = new Footer();
      footerData = await FooterModel.get(this.$content, this.footerId, this.$store.getters.locale);
      this.title = footerData.title
      this.text = footerData.text
    }
  },
} 

</script>

<style>
</style>
