<template>
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
                <v-list-tile-title v-on:click="home()">Home</v-list-tile-title>
            </v-list-tile>

            <v-list-tile>
                <v-list-tile-action>
                    <v-icon>account_circle</v-icon>
                </v-list-tile-action>
                <v-list-tile-title v-on:click="profile()">Profile</v-list-tile-title>
            </v-list-tile>

            <v-list-tile>
                <v-list-tile-action>
                    <v-icon>dashboard</v-icon>
                </v-list-tile-action>
                <v-list-tile-title v-on:click="templates()">Templates</v-list-tile-title>
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
</template>


<script>
    export default {
        name: 'Navigation',
        data: () => ({
            projects: [
                'Uber for coffee',
                'Twitter for slack'
            ],
        }),
        methods: {
            home() {
                this.$router.push('/dashboard')
            },
            templates() {
                this.$router.push('/templates')
            },
            profile() {
                this.$router.push('/profile')
            }      
        }
    };
</script>