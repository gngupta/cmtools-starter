<template>
  <section class="top-bar cf">
    <div id="header">
      <b-container>
        <b-row>
          <b-col>{{ $t('common.storeName') }}</b-col>
          <b-col>
            <LanguageSwitch/>
            <Minicart v-if="showCart"/>
            <span v-else>&nbsp;</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <Menu/>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </section>
</template>

<script>
import Menu from "@/components/Menu";
import LanguageSwitch from "@/components/LanguageSwitch";
import Minicart from "@/components/MiniCart";

export default {
  name: "Header",
  components: {
    Menu,
    LanguageSwitch,
    Minicart
  },
  props: {
    showCart: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped>
.header-container {
  margin: auto;
  width: 100vh;
  background: #272727;
  color: #fff;
}

.top-bar {
  background: #272727;
  color: #fff;
  margin: 5px;
  padding: 10px;
}
</style>
