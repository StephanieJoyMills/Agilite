<template>
  <v-app light>
    <link
      href="https://cdn.jsdelivr.net/npm/@typopro/web-bebas-neue@3.7.5/TypoPRO-BebasNeue-Bold.min.css"
      rel="stylesheet">
      <b-row>
          <b-col cols="4">
            <div class="sign-in-form">
              <b-row class="full-logo">
                <b-col>
                    <img class="logo" src="../assets/agilite-logo.svg"></img>
                </b-col>
                <b-col>
                    <span class="agilite-name">Agilite</span>
                </b-col>
              </b-row>
              <v-form>
                  <v-text-field
                    prepend-icon="person"
                    name="login"
                    label="Email"
                    type="text"
                    v-model="input.username"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    v-model="input.password"
                    type="password"
                  ></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#004B91" v-on:click="login()" dark>Login</v-btn>
                  </v-card-actions>
                </v-form>
            </div>
            <div class="text-center">
              <span class="credentials-info">Register</span>
              <span class="credentials-info"> | Forgot password?</span>
            </div>
          </b-col>
          <b-col cols="8" class="bg_img">
              <div class="slogan">
                  <h1>Build fast.</h1>
                  <h1>Document faster.</h1>
                  <p style="width: 285px">Digitalizing your agile brainstorming sessions with advanced image recognition so you can <b>sprint</b> faster.</p>
              </div>
          </b-col>
      </b-row>
  </v-app>
</template>

<script>
const axios = require("axios");
export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      if (this.input.username !== "" || this.input.password !== "") {
        if (
          this.input.username === this.$parent.mockAccount.username &&
          this.input.password === this.$parent.mockAccount.password
        ) {
          this.$emit("authenticated", true);
          this.$router.replace({ name: "dashboard" });
        } else {
          console.log("The username and / or password is incorrect");
        }
      } else {
        console.log("A username and password must be present");
      }
    }
  }
};
</script>

<style scoped >
div.v-card__text {
  margin-left: 85px;
  padding-right: 0px;
}

.slogan {
  color: white;
  margin-top: 15%;
  padding: 30px;
}
.trans {
  background-color: none;
}

.credentials-info {
  font-family: Roboto;
  font-size: 18px;
}

.credentials-info:hover {
  cursor: pointer;
  color: blue;
}

.text-center {
  text-align: center;
}

.bg_img {
  background-image: url("../assets/bg_pic2.jpg");
  background-size: cover;
  height: -webkit-fill-available;
}

.agilite-name {
  font-family: Futura;
  font-size: 70px;
}

.logo {
  height: 100px;
  padding-left: 30px;
}

.full-logo {
  margin-bottom: 40px;
}

.sign-in-form {
  padding: 40px;
}

.login {
  background-color: white;
  font-weight: 600;
  padding: 20px;
  width: 500px;
  margin-left: 5px;
  margin-bottom: 250px;
  margin-top: 40px;
  text-align: center;
}
#app {
  width: 100%;
}

div.v-btn__content {
  font-family: "futura";
  color: white;
  padding-left: 100px;
  padding-right: 100px;
}

div.v-card__actions {
  padding: 0;
}

button {
  margin-bottom: 500px;
}

</style>
