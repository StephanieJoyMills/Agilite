<template>
  <v-app>
    <navigation/>
    <v-content style="padding: 20px; margin-left: 400px">
      <span class="head">Templates</span>
      <v-container fluid>
        <v-layout row wrap>
          <v-card>
            <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
              </div>
            </v-card-title>
          </v-card>
          <v-card>
            <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
              </div>
            </v-card-title>
          </v-card>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from "./Navigation";
export default {
  name: "Templates",
  components: {
    navigation: Navigation
  }
};
</script>

<style scoped>
.head {
  font-family: Futura;
  font-size: 45px;
}
.v-card {
  margin: 20px;
  width: 400px;
}
</style>
