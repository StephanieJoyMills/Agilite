<template>
    <v-app>
        <div class="card">
            <h3 class="card-header" style="padding: 10px; font-size: 40px">{{title}}</h3>
            <div class="card-body">
                <draggable v-model="draggables" :options="{ group: 'default' }">
                    <div v-for="item in items" :key="item.id">
                        <item :item="item"></item>
                    </div>
                </draggable>
            </div>
            <v-layout align-end fill-height>
                <div class="card-footer text-muted" style="margin: 20px; font-weight: 600;">
                    {{itemCount}}
                </div>
            </v-layout>
        </div>
    </v-app>
</template>

<script>
    import TaskLaneItem from './TaskLaneItem';
    import Draggable from 'vuedraggable';

    export default {
        name: 'TaskLane',
        props: ['items', 'title', 'id'],
        components: {
            item: TaskLaneItem,
            draggable: Draggable,
        },
        computed: {
            itemCount() {
                if (!this.items) return '';
                if (this.items.length === 1) return '1 task';
                return `${this.items.length} tasks`;
            },
            draggables: {
                get() {
                    return this.items;
                },
                set(items) {
                    this.$store.commit('updateItems', {
                        items,
                        id: this.id,
                    });
                },
            },
        },
    };
</script>

<style>
    .card-body>* {
        min-height: 50px;
        height: fill;
        margin: 30px;
    }
</style>