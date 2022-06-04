<template lang="">
  <ion-menu side="start" content-id="main-content">
    <ion-header>
      <ion-toolbar translucent>
        <ion-title>Les joueurs</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="player in allPlayers" :key="player.id">
          <ion-label>{{ player.name }}</ion-label>
          <ion-badge color="secondary" slot="end">{{
            player.maxScore.sum()
          }}</ion-badge>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "menu-bar",
  computed: {
    ...mapGetters("players", ["allPlayers"]),
  },
};
</script>
<style lang=""></style>
