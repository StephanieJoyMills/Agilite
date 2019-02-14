<template>
  <v-app>
    <div>
      <p v-if="isConnected">We're connected to the server!</p>
      <p>Message from server: "{{socketMessage}}"</p>
      <button @click="pingServer()">Ping Server</button>
    </div>
    <div class="board">
      <v-layout row wrap>
        <v-flex md4>
          <v-card class="agile">
            <task-lane id="stop" title="Stop" :items="stopItems"></task-lane>
          </v-card>
        </v-flex>
        <v-flex md4>
          <v-card class="agile">
            <task-lane id="start" title="Start" :items="startItems"></task-lane>
          </v-card>
        </v-flex>
        <v-flex md4>
          <v-card class="agile">
            <task-lane id="continue" title="Continue" :items="continueItems"></task-lane>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import TaskLane from "./TaskLane";

export default {
  name: "RetroBoard",
  components: {
    "task-lane": TaskLane
  },
  computed: mapState({
    stopItems: s => s.items.stop,
    startItems: s => s.items.start,
    continueItems: s => s.items.continue
  }),
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },

    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data;
    }
  },
  methods: {
    pingServer() {
      // Send the "pingServer" event to the server.
      this.$socket.emit("pingServer", "PING!");
    }
  }
};
</script>

<style>
.agile {
  padding: 30px;
}
</style>