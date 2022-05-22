<template>
  <master-layout pageTitle="Nouvelle Partie">
    <Rules />
    <Settings />
    <div class="new-game">
      <ion-button mode="ios" @click="startNewGame()">
        Commencer une partie
      </ion-button>
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
    ...mapGetters("game", ["started", "params", "ended"]),
  },
  mounted() {
    if (this.ended) return this.$router.push({ path: "/results" });
    if (this.started) return this.$router.push({ path: "/game" });
  },
  methods: {
    startNewGame() {
      this.resetPlayersAllScores();
      this.resetGame();
      this.startGame();
      if (!this.params.players) {
        this.nextPlayer();
        return this.$router.push({ path: "/game" });
      }
      return this.$router.push({ path: "/players" });
    },
    ...mapActions("game", ["startGame", "resetGame"]),
    ...mapActions("players", ["nextPlayer", "resetPlayersAllScores"]),
  },
};
</script>
<style>
.new-game {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}
</style>
