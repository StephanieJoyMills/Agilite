import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      items: {
        stop: [],
        start: [],
        continue: [],
      },
      nextId: 1,
    },
    mutations: {
      addItem(state, item) {
        state.items.stop.push(Object.assign(item, { id: state.nextId }));
        state.nextId += 1;
      },
      updateItems(state, { items, id}) {
          state.items[id] = items;
      },
    },
  });