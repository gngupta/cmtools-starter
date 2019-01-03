<template>
  <div>
    <span 
      v-if="this.$store.getters.language !='DE'"
      @click="switchLocale('de-DE')" 
    >
      DE
    </span>
    <span 
      v-else
      class="selected">
      <b>DE</b>
    </span>
    |
    <span 
      v-if="this.$store.getters.language !='EN'"
      @click="switchLocale('en-US')" 
    >
      EN
    </span>
    <span 
      v-else
      class="selected"
    >
      <b>EN</b>
    </span>
  </div>
</template>

<script>
import { loadLanguageAsync } from '@/i18n'

export default {
  methods:{
    switchLocale(locale) {
      this.$store.commit("SET_LOCALE", locale)
      loadLanguageAsync(this.$store.getters.language);
      this.$router.push({ path: "/" });//It should also update the cart because it's stored in the store
    }
  }
};
</script>

<style scoped>
.selected{
  font-weight: bold;
}
</style>
