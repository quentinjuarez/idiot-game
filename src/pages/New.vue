<template>
  <master-layout pageTitle="Jeu du Con">
    <div class="new-game">
      <ion-button mode="ios" @click="startNewGame()">Nouvelle partie</ion-button>
    </div>
  </master-layout>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("game", ["started"]),
  },
  mounted() {
    this.resetPlayers();
    this.resetGame();
  },
  methods: {
    startNewGame() {
      this.startGame();
      this.nextPlayer();
      return this.$router.push({ path: "/game" });
    },
    ...mapActions("game", ["startGame", "resetGame"]),
    ...mapActions("players", ["nextPlayer", "resetPlayers"]),
  },
};
</script>
<style>
.new-game {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
