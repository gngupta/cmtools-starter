<template>
  <div id="contentPage">
    <div id="title"><vue-markdown :source = "title" /></div>
    <div id="text"><vue-markdown :source = "text" /></div>
  </div>
</template>

<script>
import PageContent, {ContentPage} from '@/content/ContentPage.js'
import VueMarkdown from 'vue-markdown'

export default {
  name: "CMSContent",
  components:{
    VueMarkdown
  },
  props:{
    contentId: {
      type: String,
      required: true
    }
  },
  data(){
    return{
      title: '',
      text: ''
    }
  },
  created: function () {
    this.getContent();
  },
  methods:{
    async getContent(){
      let cmsData = new ContentPage();
      cmsData = await PageContent.get(this.$content, this.contentId, this.$store.getters.locale);
      this.title = cmsData.title
      this.text = cmsData.mainText
    }
  }
}
</script>

<style>

</style>
