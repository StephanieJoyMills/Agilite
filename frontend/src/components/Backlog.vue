<template>
<v-app>
    <div class="backlog-view">
    <new-item></new-item>

    <v-card>
        <v-card-text v-for="item in items" :key="item.id">{{item.text}}</v-card-text>
    </v-card>
  </div>
</v-app>
</template>

<script>
import { mapState } from 'vuex';
import NewItemForm from './NewItemForm';

export default {
  name: 'Backlog',
  components: {
    'new-item': NewItemForm,
  },
  computed: mapState({
    items: s => [...s.items.stop, ...s.items.start, ...s.items.continue]
  }),

};
</script>