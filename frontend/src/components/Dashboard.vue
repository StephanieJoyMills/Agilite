<template>
  <v-app>
    <navigation/>

    <v-content style="padding: 20px; margin-left: 400px">
      <span class="head">Recent Boards</span>
      <v-container fluid>
        <v-layout row wrap>
          <v-card>
            <v-img
              src="https://bitcoinist.com/wp-content/uploads/2017/12/ss-crypto-future.jpg"
              aspect-ratio="2.75"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Crypto Brainstorm</h3>
              </div>
            </v-card-title>
          </v-card>
          <v-card>
            <v-img
              src="https://agiledigest.com/wp-content/uploads/2018/02/SailBoat_Web_1.jpg"
              aspect-ratio="2.75"
            ></v-img>

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
            <v-img
              src="https://madebymany-v2-next.s3.amazonaws.com/uploads/blog/featured_image/1248/large_MxM_sprint_planning.jpg"
              aspect-ratio="2.75"
            ></v-img>
            <v-card-title primary-title @_click="selectItem()">
              <div>
                <h3 class="headline mb-0">Sprint Planning Rough Draft</h3>
              </div>
            </v-card-title>
          </v-card>
          <v-card>
            <v-img
              src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/01/Screenshot-38-e1516267765988.png?auto=format&q=60&fit=max&w=930"
              aspect-ratio="2.75"
            ></v-img>

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
    projects: ["AngelEth", "Delta Hacks"],
    homeActive: false,
    templateActive: false,
    profileActive: false
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