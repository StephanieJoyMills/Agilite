<template>
<v-app>
    <div class="board">
        <v-layout row wrap>
            <v-flex md4>
                <v-card class="agile"> 
                    <task-lane id="stop" title="Stop" :items="todoItems"></task-lane>
                </v-card>
            </v-flex>
            <v-flex md4>
                <v-card class="agile">
                <task-lane id="start" title="Start" :items="inProgressItems"></task-lane>
                </v-card>
            </v-flex>
            <v-flex md4>
                <v-card class="agile">
                <task-lane id="continue" title="Continue" :items="doneItems"></task-lane>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</v-app>
</template>

<script>
import { mapState } from 'vuex';
import TaskLane from './TaskLane';

export default {
    name: 'RetroBoard',
    components: {
        'task-lane': TaskLane,
    },
    computed: mapState({
        stopItems: s => s.items.stop,
        startItems: s => s.items.start,
        continueItems: s => s.items.continue,
    }), 
};
</script>

<style>
.agile {
    padding: 30px;
}
</style>