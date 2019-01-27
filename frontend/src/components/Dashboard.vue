<template>
  <v-app>
    <navigation/>

    <v-content style="padding: 20px; margin-left: 400px">
      <span class="head">Recent Boards</span>
      <v-container fluid>
        <v-layout row wrap>
          <v-card>
            <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Crypto Brainstorm</h3>
              </div>
            </v-card-title>
          </v-card>
          <v-card>
            <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Sprint Retro #3</h3>
              </div>
            </v-card-title>
          </v-card>
        </v-layout>
      </v-container>

      <span class="head">My Boards</span>
      <v-container fluid>
        <v-layout row wrap>
          <v-card @click.native="selectItem()">
            <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
            <v-card-title primary-title @_click="selectItem()">
              <div>
                <h3 class="headline mb-0">Sprint Planning Rough Draft</h3>
              </div>
            </v-card-title>
          </v-card>
          <v-card>
            <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">AngelEth - Investor Persona</h3>
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
  name: "Dashboard",
  data: () => ({
    projects: ["Uber for coffee", "Twitter for slack"]
  }),
  components: {
    navigation: Navigation
  },
  methods: {
    selectItem() {
      this.$router.push("/board");
    }
  }
};
</script>

<style scoped>
.head {
  font-family: futura;
  font-size: 45px;
}
.v-card {
  margin: 20px;
  width: 400px;
}
</style>