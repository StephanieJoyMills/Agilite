<template>
    <v-card class="add-item">
        <v-form>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12 sm6 md6 >
                        <v-text-field label="Something to add to the backlog" v-model="itemText"></v-text-field>
                    </v-flex>
                    <v-flex m-3>
                        <v-btn color="primary" v-on:click="submitForm()">Submit</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
export default {
  name: 'NewItemForm',
  data() {
    return {
      itemText: '',
    };
  },
  methods: {
    submitForm() {
      if (this.itemText) {
        this.$store.commit('stopItem', {
          text: this.itemText,
        });

        this.itemText = '';
      }
    },
  },
};
</script>

<style>

</style>