<template>
<v-app>
    <div class="board">
        <v-layout row wrap>
            <v-flex md4>
                <task-lane id="todo" title="To-Do" :items="todoItems"></task-lane>
            </v-flex>
            <v-flex md4>
                <task-lane id="inProgress" title="In progress" :items="inProgressItems"></task-lane>
            </v-flex>
            <v-flex md4>
                <task-lane id="done" title="Done" :items="doneItems"></task-lane>
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
        todoItems: s => s.items.todo,
        inProgressItems: s => s.items.inProgress,
        doneItems: s => s.items.done,
    }), 
};
</script>