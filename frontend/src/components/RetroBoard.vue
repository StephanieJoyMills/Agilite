<template>
<v-app>
    <div class="board">
        <v-layout row wrap>
            <v-flex md4>
                <task-lane id="start" title="Start" :items="todoItems"></task-lane>
            </v-flex>
            <v-flex md4>
                <task-lane id="stop" title="Stop" :items="inProgressItems"></task-lane>
            </v-flex>
            <v-flex md4>
                <task-lane id="continue" title="Continue" :items="doneItems"></task-lane>
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
        startItems: s => s.items.start,
        stopItems: s => s.items.stop,
        continueItems: s => s.items.continue,
    }), 
};
</script>