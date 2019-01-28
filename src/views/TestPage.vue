<template>
  <div>
    <!-- <v-container>
    <v-layout v-layout align-center justify-start row fill-height>
      <div class="item elevation-5">element 1</div>
      <div class="item elevation-5">element 2</div>
      <div class="item elevation-5">element 3</div>
    </v-layout>
  </v-container> -->
    <v-container
      fluid
      grid-list-lg
    >
      <v-layout 
        row 
        wrap>
        <v-flex xs12>
          <v-card flat = "true">
            <v-card-text>Blazer Sun68 cream</v-card-text>
            <v-spacer/>
            <div>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              (42 reviews)
            </div>
            <v-flex xs12>
              <v-img
                src="https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081414_1_medium.jpg"
                width="350"
                height="350"
                
              />
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "TestPage",
}
</script>
