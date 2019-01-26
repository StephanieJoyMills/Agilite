

<template>
  <v-app dark>
      <link href="https://cdn.jsdelivr.net/npm/@typopro/web-bebas-neue@3.7.5/TypoPRO-BebasNeue-Bold.min.css" rel="stylesheet">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-left>
          <v-flex xs12 sm8 md4>
            <v-card class="login" style="margin-bottom: 40px; text-align: center;">
                <span style="font-family: TypoPRO Bebas Neue; font-size: 40px; text-align: center;">Sticking to it </span>
            </v-card>
            <v-card class="elevation-12 login">
              <!-- <v-toolbar dark color="primary">
                <v-toolbar-title>Login </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar> -->
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Email" type="text" v-model="input.username"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" v-model="input.password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-on:click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
            <v-card class="login" style="margin-top: 40px; text-align: center; font-weight: 600" >
                <span style="font-family: Roboto; font-size: 18px">Register | Forgot Password? </span>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout align-center>
            <v-flex md4>
                <v-card class="login">
                    <span style="font-family: TypoPRO Bebas Neue; font-size: 40px;"> Build Fast.Document Faster. </span>
                </v-card>
                <v-card class="login trans" style="margin-top: 15px;">
                    <span> Make you brainstorming and design sessions last with advanced image recogniation and digital manipulation </span>
                </v-card>
            </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>



<script>
    export default {
        name: 'Login',
        data() {
              return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                if(this.input.username != "" && this.input.password != "") {
                    if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "secure" });
                    } else {
                        console.log("The username and / or password is incorrect");
                    }
                } else {
                    console.log("A username and password must be present");
                }
            }
        }
    }
</script>

<style>
.trans {
    background-color: none;
}

.login {
    padding: 20px;
    width: 500px;
    margin-left: 100px;
}
#app {
    width: 100%;
}

.container {
  background: linear-gradient(
    to right, 
    #ff9e2c 0%, 
    #ff9e2c 50%, 
    #b6701e 50%, 
    #b6701e 100%
  );
}
</style>
