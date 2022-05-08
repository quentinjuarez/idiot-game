<template>
  <master-layout pageTitle="Nouvelle Partie">
    <Rules />
    <Settings />
    <div class="new-game">
      <ion-button mode="ios" @click="startNewGame()"
        >Commencer une partie</ion-button
      >
    </div>
  </master-layout>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Rules from "../components/Rules";
import Settings from "../components/Settings";
export default {
  name: "new",
  components: {
    Rules,
    Settings,
  },
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
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
