import { createClient } from 'contentful';
import Vue from 'vue'

const CMS_SPACE = process.env.VUE_APP_CMS_SPACE;
const CMS_TOKEN = process.env.VUE_APP_CMS_TOKEN;

const config = {
  space: CMS_SPACE,
  accessToken: CMS_TOKEN
}

export default function createContentClient(){
  return createClient(config) ;
}

Vue.mixin({
  beforeCreate(){
    const options = this.$options;
    if ( options.content ){
      this.$content = options.content;
    }else if ( options.parent && options.parent.$content ){
      this.$content = options.parent.$content;
    }
  }
})
