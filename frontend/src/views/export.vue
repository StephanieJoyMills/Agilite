<template>
<v-app>
<v-content style="padding: 20px; margin-left: 400px">
            <span class="head">Export</span>
            <v-container fluid>
                <v-layout row wrap>
                    <v-card>
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">Export agile data in CSV form</h3>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary">Export</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-layout>
            </v-container>
        </v-content>
</v-app>
</template>

<script>
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
