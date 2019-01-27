<template>
    <v-app>
        <v-navigation-drawer app="true">
            <v-list>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>circle</v-icon>
                    </v-list-tile-action>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Home</v-list-tile-title>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>account_circle</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Profile</v-list-tile-title>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Templates</v-list-tile-title>
                </v-list-tile>

                <v-list-tile>
                </v-list-tile>
                <v-list-tile>
                </v-list-tile>
                <v-list-tile>
                </v-list-tile>
                <v-list-tile>
                </v-list-tile>
                <v-list-tile>
                </v-list-tile>
                <v-list-tile>
                </v-list-tile>
                <v-list-tile>
                </v-list-tile>
                <v-list-tile>
                </v-list-tile>
                <v-list-tile>
                </v-list-tile>
                <v-list-tile>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>event</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Projects</v-list-tile-title>

                </v-list-tile>

                <v-list>
                    <v-list-tile v-for="project in projects" @click="">
                        <v-list-tile-title v-text="project"></v-list-tile-title>
                    </v-list-tile>
                </v-list>

            </v-list>
        </v-navigation-drawer>

        <v-content style="padding: 20px; margin-left: 400px">
            <span class="head">Recent Boards</span>
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

            <span class="head">My Designs</span>
            <v-container fluid>
                <v-layout row wrap>
                    <v-card @click.native="selectItem()">
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
                        <v-card-title primary-title @_click="selectItem()">
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
    export default {
        data: () => ({
            projects: [
                'Uber for coffee',
                'Twitter for slack'
            ],
        }),
        methods: {
            selectItem() {
                this.$router.push('/board')
            }
        }
    }
</script>

<style scoped>
.head {
    font-family: TypoPRO Bebas Neue; 
    font-size: 45px;
    
}
.v-card {
    margin: 20px;
    width: 400px;
}
</style>