<template>
<v-navigation-drawer app="true" dark class="grey darken-4">
  <v-list>
    <img src="../assets/agilite-logo-white.svg"></img>
    <span style="margin-left: 70px; margin-bottom: 50px; font-family: Futura; font-weight:100; color: white; font-size: 50px; text-align: center;">Agilite</span>
    <v-list-tile class='topMenu menu' v-on:mouseover="homeActive = !active" v-bind:class="{ active: homeActive}">
      <v-list-tile-action>
        <v-icon>home</v-icon>
      </v-list-tile-action>
      <v-list-tile-title class="menuText" v-on:click="home()">Home</v-list-tile-title>
    </v-list-tile>

    <v-list-tile class="menu">
      <v-list-tile-action>
        <v-icon>account_circle</v-icon>
      </v-list-tile-action>
      <v-list-tile-title class="menuText" v-on:click="profile()">Profile</v-list-tile-title>
    </v-list-tile>

    <v-list-tile class="menu">
      <v-list-tile-action>
        <v-icon>dashboard</v-icon>
      </v-list-tile-action>
      <v-list-tile-title class="menuText" v-on:click="templates()">Templates</v-list-tile-title>
    </v-list-tile>

    <v-list-tile></v-list-tile>
    <v-list-tile></v-list-tile>

    <v-list-tile class="menu topMenu">
      <v-list-tile-action>
        <v-icon class="projIcon">event</v-icon>
      </v-list-tile-action>
      <v-list-tile-title class="proj">Projects</v-list-tile-title>
    </v-list-tile>
    <div class="fake-hr justify-center"></div>

    <v-list class=" menu">
      <v-list-tile v-for="project in projects">
        <v-list-tile-title v-text="project"></v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-list>

</v-navigation-drawer>
</template>


<script>
export default {
  name: "Navigation",
  data: () => ({
    projects: ["AngelEth", "Delta Hacks"],
    active: true
  }),
  methods: {

    home() {
      this.homeActive = true;
      this.$router.push("/dashboard");
    },
    templates() {
      this.$router.push("/templates");
    },
    profile() {
      this.$router.push("/profile");
    }
  }
};
</script>

<style scoped>
.v-navigation-drawer {
  background-color: red;
}

img {
  width: 20%;
  margin-left: 110px;
  margin-top: 20px;
  margin-bottom: -10px;
  align-content: center;
}

.topMenu {
  margin-top: 50px;
}

.fake-hr {
  width: 60%;
  height: 0.6px;
  margin-left: 40px;
  background-color: rgba(255, 255, 255, 0.2);
}

.projIcon {
  width: 200%;
  margin-left: -30px;
}

.proj {
  font-size: 20px;
  margin-left: -20px;
}

.menu {
  margin-left: 60px;
}

.menuText {
  font-family: futura;
  font-weight: 200;
  font-size: 16px;
}

.homeActive {
  color: purple;
  background-color: red;
}
</style>
