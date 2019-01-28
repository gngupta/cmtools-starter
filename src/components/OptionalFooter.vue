<template>
  <v-app>
    <v-content class="light_bg">
      <v-container
        fluid
        grid-list-lg
      >
        <div class="footer-main">
          <div class="robot_background_image"/>
          <v-layout
            row 
            justify-space-between
          >
            <v-btn
              slot="activator"
              color="primary"
              block
              dark
              class="stretch"
            >BACK TO TOP</v-btn>
          </v-layout>
          <v-parallax
            dark
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            class= "stretch imageAdjust"
          >
            <v-layout
              row 
              justify-space-between
            >
              <v-flex xs12>
                <b-btn
                  color="primary"
                  class="btn-service"
                >Service and Support</b-btn>
              </v-flex>
            </v-layout>
          </v-parallax>
        </div>
        <v-layout
          row 
          justify-space-between
        >
          <v-flex xs12>
            <v-card-title class="logo txt_letUsHelp">
              <div id="text">Let us help you </div>
            </v-card-title>
          </v-flex>

        </v-layout>
        <v-layout
          row 
          justify-space-between
        >

          <v-navigation-drawer
            floating
            permanent
            stateless
            value="true"
            class="nav_itemAlignment"
          >
            <v-list>
              <v-list-tile
                v-for="item in items"
                :key="item.title"
                ripple
                @click="goToItemRouter"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

              </v-list-tile>
            </v-list>
          </v-navigation-drawer>

        </v-layout>

        <v-layout
          row 
          justify-space-between
          class="branch_location"
        >
          <v-flex xs12>
            <v-card-title>
              <div class="icon-container"><v-icon 
                large 
                color="blue darken-2">language</v-icon></div>
              <div class="icon-text"><v-card-text class="text-left">DUTCH</v-card-text></div>
            </v-card-title>

            <v-card-title>
              <div class="icon-container"><v-icon 
                large 
                color="blue darken-2">room</v-icon></div>
              <div class="icon-text"><v-card-text class="text-left">NETHERLANDS(NEDERLAND)</v-card-text></div>
            </v-card-title>

          </v-flex>

        </v-layout>


      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      items: [
        { title: 'Get to know us', icon: 'keyboard_arrow_right' },
        { title: 'All our products', icon: 'keyboard_arrow_right' },
        { title: 'Read our blog', icon:'keyboard_arrow_right'}
      ]
    }
  },
  methods: {
    goToItemRouter() {
      console.log('This Method is a placeholder at the moment.');
    }
  }
}
</script>
<style>
.logo {
  letter-spacing: 2px;
  font-size: large;
  justify-content: start;
}

.stretch {
  margin: 10px -24px 0;
}

.imageAdjust {
  height: auto !important;
  max-height: 100px;
  overflow: hidden;
  margin-top: 0;
  margin-right: -32px;
  margin-left: -32px;
}

.btn-service {
  float: right;
  margin: 35px 0;
  background: #fff;
  color: #333;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ccc;
  font-size: 0.8rem;
  padding: 0.375rem 1.2rem !important;
  text-transform: uppercase;
}

.txt_letUsHelp {
  object-fit: contain;
  font-family: NotoSerif;
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #373a46;
  padding-bottom: 25px;
}

.nav_itemAlignment {
  width: 100% !important;
  padding-left: 15px;
  z-index: 0;
}

.branch_location {
  padding: 20px 0;
}

.branch_location .v-card__title {
  padding: 5px 16px !important;
}

.icon-container i {
  font-size: 30px !important;
  margin-right: 10px;
}

.icon-text .v-card__text {
  padding: 8px 0 0 !important;
  font-size: 0.8rem;
  color: blue;
}

.robot_background_image {
  background: url(../assets/images/bitmap.png) no-repeat;
  height: 188px;
  top: -42px;
  position: absolute;
  z-index: 1;
  left: -20px;
  width: 135px;
}

.footer-main {
  position: relative;
}
</style>