<template>
  <master-layout pageTitle="Résultats">
    <ion-card>
      <ion-list>
        <ion-list-header>
          <ion-label>{{ losersTitle }}</ion-label>
        </ion-list-header>
        <ion-item class="loser" v-for="loser in losers" :key="loser.id">
          <ion-label>{{ loser.name }}</ion-label>
          <ion-badge slot="end">{{ loser.maxScore.max() }}</ion-badge>
        </ion-item>
      </ion-list>
    </ion-card>
    <ion-card>
      <ion-list>
        <ion-list-header>
          <ion-label>Tous les joueurs</ion-label>
        </ion-list-header>
        <ion-item v-for="player in allPlayers" :key="player.id">
          <ion-label>{{ player.name }}</ion-label>
          <ion-badge slot="end">{{ player.maxScore.max() }}</ion-badge>
        </ion-item>
      </ion-list>
    </ion-card>

    <template v-slot:footer>
      <div class="new-game">
        <ion-button mode="ios" @click="newGame()">
          Nouvelle partie
        </ion-button>
      </div>
    </template>
  </master-layout>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.indexesOf = function(val) {
  var indices = [];
  for (var i = 0; i < this.length; i++) {
    if (this[i] === val) indices.push(i);
  }
  return indices;
};

export default {
  name: "results",
  computed: {
    finalScores() {
      return this.allPlayers.map((player) => {
        return player.maxScore.max();
      });
    },
    losersTitle() {
      return this.losers.length > 1 ? "Les Perdants" : "Le Perdant";
    },
    losers() {
      const argmin = this.finalScores.indexesOf(Math.min(...this.finalScores));
      return this.allPlayers.filter((player, index) => argmin.includes(index));
    },
    winners() {
      const argmax = this.finalScores.indexesOf(Math.max(...this.finalScores));
      return this.allPlayers.filter((player, index) => argmax.includes(index));
    },
    ...mapGetters("players", ["allPlayers"]),
    ...mapGetters("game", ["ended"]),
  },
  mounted() {
    if (!this.ended) return this.$router.push({ path: "/new" });
  },
  methods: {
    newGame() {
      this.resetPlayers();
      this.resetGame();
      if (this.allPlayers.length > 0) return;
      return this.$router.push({ path: "/new" });
    },
    ...mapActions("game", ["resetGame"]),
    ...mapActions("players", ["resetPlayers"]),
  },
};
</script>
<style lang="scss" scoped>
.new-game {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
