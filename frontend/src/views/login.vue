

<template>
  <v-app light>
    <link
      href="https://cdn.jsdelivr.net/npm/@typopro/web-bebas-neue@3.7.5/TypoPRO-BebasNeue-Bold.min.css"
      rel="stylesheet"
    >
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-left>
          <v-flex xs12 sm8 md4>
            <img src="../assets/agilite-logo.svg"></img>
            <span
              style="margin-left: 10px; margin-bottom: 10px; position: absolute; font-family: Futura; color: #303030; font-size: 70px; text-align: center;"
            >Agilite</span>
            
              <!-- <v-toolbar dark color="primary">
                <v-toolbar-title>Login </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>-->
              <v-card-text>
                <v-form >
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
                </v-form>
              </v-card-text>
              <v-card-actions style=" margin-bottom: 220px; ">
                <v-spacer></v-spacer>
                <v-btn text-color=white color="#004B91" v-on:click="login()">Login</v-btn>
              </v-card-actions>
          
            <!-- <v-card class="login" style="margin-top: 40px; text-align: center; font-weight: 600">
              <span style="font-family: Roboto; font-size: 18px">Register | Forgot Password?</span>
            </v-card>-->
          </v-flex>
        </v-layout>
        <v-layout align-center>
          <v-flex md4>
            <!-- <v-card class="login">
              <span
                style="font-family: TypoPRO Bebas Neue; font-size: 40px;"
              >Build Fast.Document Faster.</span>
            </v-card>
            <v-card class="login trans" style="margin-top: 15px;">
              <span>Make your brainstorming and design sessions last with advanced image recognition and digital manipulation</span>
            </v-card>-->
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
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
      if (this.input.username != "" && this.input.password != "") {
    
        if (
          this.input.username == this.$parent.mockAccount.username &&
          this.input.password == this.$parent.mockAccount.password
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
.trans {
  background-color: none;
}

.login {
  background-color: white;
  padding: 20px;
  width: 500px;
  margin-left: 5px;
  margin-bottom: 250px;
}
#app {
  width: 100%;
}
img {
  width:34%;
  margin-left: 85px;
  margin-bottom: 40px;
  align-content: center;
}

div.v-btn__content {
  font-family: "futura";
  color: white;
  padding-left: 100px;
  padding-right: 100px;
}

div.v-card__actions {
  width: 80%;
  margin-left: 100px;
}

button {
  margin-bottom: 500px;
}

.container {
  background-image: url("../assets/login-bg@2x.jpg");
  background-size: cover;
  /* background-size: cover, */
  /* linear-gradient(s
      to right,
      #303030 0%,
      #303030 50%,
      #abdcff 50%,
      #0f64c3 51%,
      #09396b 90%
    ); */
}
</style>
