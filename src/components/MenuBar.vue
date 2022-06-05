<template lang="">
  <ion-menu side="start" content-id="main-content" ref="menu">
    <ion-header>
      <ion-toolbar translucent>
        <ion-title>Les joueurs</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="space-between">
        <ion-list>
          <ion-item v-for="player in allPlayers" :key="player.id">
            <ion-label>{{ player.name }}</ion-label>
            <ion-badge color="secondary" slot="end">{{
              player.maxScore.sum()
            }}</ion-badge>
          </ion-item>
        </ion-list>

        <ion-menu-toggle class="quit">
          <ion-button mode="ios" fill="clear" @click="abortGame">
            Quitter la partie
          </ion-button>
        </ion-menu-toggle>
      </div>
    </ion-content>
  </ion-menu>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "menu-bar",
  computed: {
    ...mapGetters("players", ["allPlayers"]),
  },
  methods: {
    abortGame() {
      this.resetGame(true);
      this.$router.push({ path: "/new" });
    },
    ...mapActions("game", ["resetGame"]),
  },
};
</script>
<style lang="scss" scoped>
.space-between {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.quit {
  padding: 20px;
  display: flex;
  justify-content: center;
}
</style>
