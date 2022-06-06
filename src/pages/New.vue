<template>
  <master-layout pageTitle="Nouvelle Partie">
    <Rules />
    <Settings v-if="false" />
    <div class="new-game">
      <ion-button mode="ios" @click="startNewGame()">
        Partie Local
      </ion-button>
      <ion-button mode="ios" @click="createParty()">
        Créer un salon
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
      if (!this.params.players) {
        this.startGame();
        this.nextPlayer();
        return this.$router.push({ path: "/game" });
      }
      this.resetGame();
      return this.$router.push({ path: "/players" });
    },
    createParty() {
      this.resetPlayersAllScores();
      this.initParty();
      return this.$router.push({ path: "/party" });
    },
    ...mapActions("game", ["startGame", "resetGame", "initParty"]),
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
