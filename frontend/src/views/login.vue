<template>
  <v-app light>
    <link
      href="https://cdn.jsdelivr.net/npm/@typopro/web-bebas-neue@3.7.5/TypoPRO-BebasNeue-Bold.min.css"
      rel="stylesheet">
      <b-modal id="sign-up" title="Sign up">
        <v-form>
            <v-text-field
              prepend-icon="person"
              name="firstName"
              label="First name"
              type="text"
              v-model="register.firstName"
            ></v-text-field>
            <v-text-field
              prepend-icon="person"
              name="lastName"
              label="Last name"
              type="text"
              v-model="register.lastName"
            ></v-text-field>
            <v-text-field
              prepend-icon="person"
              name="login"
              label="Email"
              type="text"
              v-model="register.email"
            ></v-text-field>
            <v-text-field
              id="signUpPassword"
              prepend-icon="lock"
              name="signUpPassword"
              label="Password"
              v-model="register.password"
              type="password"
            ></v-text-field>
            <v-text-field
              id="passwordConf"
              prepend-icon="lock"
              name="passwordConf"
              label="Confirm password"
              v-model="register.passwordConf"
              type="password"
            ></v-text-field>
          </v-form>
          <div slot="modal-footer" style="width: 100%">
            <div class="signup-button">
              <p class="error-msg">{{ signUpError }}</p>
              <v-btn color="#004B91" v-on:click="signup()" dark>Sign up</v-btn>
            </div>
         </div>
      </b-modal>
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
                    v-model="credentials.email"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    v-model="credentials.password"
                    type="password"
                  ></v-text-field>
                  <div class="login-button">
                    <p class="error-msg">{{ loginError }}</p>
                    <v-spacer></v-spacer>
                    <v-btn color="#004B91" v-on:click="login()" dark>Login</v-btn>
                  </div>
              </v-form>
            </div>
            <div class="text-center">
              <span class="other-login" v-b-modal.sign-up>Register</span>
              <span class="other-login"> | Forgot password?</span>
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
      credentials: {
        "email": "",
        "password": ""
      },
      register: {
        firstName: "",
        lastName: "",
        email: "",
        passwordConf: "",
        password: ""
      },
      loginError: '',
      signUpError: ''
    };
  },
  methods: {
    login() {
      const { email, password } = this.credentials;
      let token;
      if (email !== "" || password !== "") {
        if (email && password) {
          axios.post('http://localhost:3000/login', this.credentials).then((response) =>{
            token = response.data.token;
            console.log(token);
            this.$emit("authenticated", true);
            this.$router.replace({ name: "dashboard" });
          })
          .catch(function (error) {
              console.log(error);
          });
        } else {
          this.loginError = "The username and / or password is incorrect";
        }
      } else {
        this.loginError = "A username and password must be present";
      }
    },
    signup() {
      const { email, password, passwordConf, firstName, lastName } = this.register;
      if(email !== "" || password !== "" || passwordConf !== "") {
        if(firstName === "" || lastName == "") {
          this.signUpError = "Please enter your first/last name.";
        }
        if(password === passwordConf) {
          axios.post('http://localhost:3000/signup', this.register).then((response) => {
            console.log(response);
            this.$emit("authenticated", true);
            this.$router.replace({ name: "dashboard" });
          })
          .catch(function (error) {
              console.log(error);
          });
        } else {
          this.signUpError = "Please make sure your passwords match.";
        }
      } else {
        this.signUpError = "A username and password must be present.";
      }
    }
  }
};
</script>

<style scoped>

.error-msg {
  color: red;
  margin-bottom: 20px;
}

.login-button {
  text-align: center;
  display: block;
}

.slogan {
  color: white;
  margin-top: 15%;
  padding: 30px;
}

.other-login {
  font-family: Roboto;
  font-size: 18px;
}

.other-login:hover {
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

</style>
