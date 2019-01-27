<template>
<v-app>
    <navigation />
<v-content style="padding: 20px; margin-left: 400px">
            <span class="head">Templates</span>
            <v-container fluid>
                <v-layout row wrap>
                    <v-card v-on:click="board_retro()">
                        <img src="../assets/retro.svg" height="225"></img>
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">Sprint Retrospective</h3>
                            </div>
                        </v-card-title>
                    </v-card>
                    <v-card>
                        <img src="../assets/persona.svg" height="225"></img>

                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">Persona Map</h3>
                            </div>
                        </v-card-title>
                    </v-card>
                    <v-card>
                        <img src="../assets/sprint.svg" height="225"></img>

                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">Sprint Planning</h3>
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
    name: 'Templates',
    components: {
        navigation: Navigation,
    },
    methods: {
        board_retro() {
            this.$router.push("/image");
        },
    }
};
</script>

<style scoped>
.head {
    font-family: TypoPRO Bebas Neue; 
    font-size: 45px;
}
.img {
    height: 100px;  
}
.v-card {
  margin: 20px;
  width: 400px;
}
</style>
