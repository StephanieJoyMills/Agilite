<template>
    <v-flex xs12>
        <v-card color="blue-grey darken-2" class="white--text">
            <v-card-title primary-title>
                <div>
                    <span>{{item.text}}</span>
                </div>
            </v-card-title>
        </v-card>
    </v-flex>
    <!-- <div class="card task-lane-item">
        <div class="card-block">
            <h5 class="card-title">
                <span class="text-muted">#{{item.id}}</span>
                {{item.text}}
            </h5>
        </div>
    </div> -->
</template>

<script>
    export default {
        name: 'TaskLaneItem',
        props: ['item'],
    };
</script>

<style>
    .v-card {
        width: 300px;
    }
</style>