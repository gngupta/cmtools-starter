<template>
  <v-container 
    fluid
    grid-list-lg
    class="bodyColor">
    <v-layout
      row 
      justify-space-between
    >
      <v-flex xs12>
        <v-card-title class="logo-footer whiteColor">
          <div id="text"><vue-markdown :source = "text"/> </div>
        </v-card-title>
      </v-flex>
    </v-layout>
    <hr>
    <v-layout class="whiteColor icons">
      <v-flex xs6>
        <v-card-text>
          Conditions of Use
        </v-card-text>
      </v-flex>
      <v-flex xs6>
        <v-card-text>
          Privacy Notice
        </v-card-text>
      </v-flex>
    </v-layout>
    <v-layout class="license">
      <v-flex>
        <v-card-text>&copy;2019, Wundertech, a Wunderman commerce concept</v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
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
.bodyColor {
  background-color: #373a46;
}

.logo-footer {
  letter-spacing: 2px;
  font-size: large;
  justify-content: space-around;
}

.whiteColor {
  color: #fff;
}

.icons {
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1px;
}

.license {
  font-family: NotoSerif;
  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #bfc4ca;
}
</style>
