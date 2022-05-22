<template>
  <master-layout pageTitle="Résultats">
    <ion-card>
      <ion-list>
        <ion-list-header>
          {{ losersTitle }}
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
          Tous les joueurs
        </ion-list-header>
        <ion-item
          v-for="(player, index) in allPlayers"
          :key="player.id"
          button
          @click="openStats(index)"
          detail
        >
          <ion-label>{{ player.name }}</ion-label>
          <ion-badge slot="end">{{ player.maxScore.max() }}</ion-badge>
        </ion-item>
      </ion-list>
    </ion-card>
    <ion-card>
      <ion-list>
        <ion-list-header>
          Statistiques
        </ion-list-header>
        <ion-item
          class="loser"
          v-for="player in playerMaxActions"
          :key="player.id"
        >
          <ion-label>
            <ion-text color="medium">Le plus de lancer</ion-text>
            <h4>{{ player.name }}</h4>
          </ion-label>
          <ion-badge slot="end"> {{ maxActions }}</ion-badge>
        </ion-item>
      </ion-list>
    </ion-card>

    <template v-slot:footer>
      <div class="new-game">
        <ion-button mode="ios" @click="newGame()">
          Nouvelle partie
        </ion-button>
        <ion-button mode="ios" @click="replayGame()">
          Rejouer
        </ion-button>
      </div>
    </template>
    <Stats :open="stats" @close="stats = false" :index="selected" />
  </master-layout>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Stats from "../components/Stats";

export default {
  name: "results",
  components: {
    Stats,
  },
  data() {
    return {
      stats: false,
      selected: 0,
    };
  },
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
    allActions() {
      return this.allPlayers.map((player) => {
        return player.actions;
      });
    },
    totalActions() {
      return this.allActions.map((actions) =>
        actions.map((action) => action.length).reduce((a, b) => (a = a + b))
      );
    },
    maxActions() {
      return Math.max(...this.totalActions);
    },
    playerMaxActions() {
      const indexes = this.totalActions.indexesOf(
        Math.max(...this.totalActions)
      );
      return this.allPlayers.filter((player, index) => indexes.includes(index));
    },
    ...mapGetters("players", ["allPlayers"]),
    ...mapGetters("game", ["ended"]),
  },
  mounted() {
    if (!this.ended) return this.$router.push({ path: "/new" });
  },
  methods: {
    newGame() {
      this.resetPlayersAllScores();
      this.resetGame();
      return this.$router.push({ path: "/new" });
    },
    replayGame() {
      this.resetPlayersAllScores();
      this.rePlay();
      return this.$router.push({ path: "/game" });
    },
    openStats(index) {
      this.selected = index;
      this.stats = true;
    },
    ...mapActions("game", ["resetGame", "rePlay"]),
    ...mapActions("players", ["resetPlayers", "resetPlayersAllScores"]),
  },
};
</script>
<style lang="scss" scoped>
.new-game {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
:root {
  --ion-safe-area-top: 20px !important;
  --ion-safe-area-bottom: 22px !important;
}
</style>
