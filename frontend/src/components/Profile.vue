<template>
  <v-app>
    <navigation/>
    <v-container fill-height fluid grid-list-xl>
      <v-layout justify-center wrap>
        <v-flex md3></v-flex>
        <v-flex xs12 md8>
          <span style=" line-height: 80px; font-family: Futura; font-size: 40px;">Edit your profile</span>
          <v-card light style=" margin-top: 40px">
            <v-form>
              <v-container py-0>
                <v-layout wrap>
                  <v-flex xs12 md4>
                    <v-text-field label="Company"/>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-text-field class="purple-input" label="User Name"/>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-text-field label="Email Address" class="purple-input"/>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field label="First Name" class="purple-input"/>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field label="Last Name" class="purple-input"/>
                  </v-flex>
                  <v-flex xs12 md12>
                    <v-text-field label="Adress" class="purple-input"/>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-text-field label="City" class="purple-input"/>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-text-field label="Country" class="purple-input"/>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-text-field class="purple-input" label="About me" type="number"/>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea class="purple-input" label="About Me"/>
                  </v-flex>
                  <v-flex xs12 text-xs-right>
                    <v-btn class="mx-0 font-weight-light" color="#004B91" dark>Update Profile</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Navigation from "./Navigation";
export default {
  name: "Profile",
  components: {
    navigation: Navigation
  }
};
</script>