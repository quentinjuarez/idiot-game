<template>
  <master-layout pageTitle="Partage">
    <div v-if="allPlayers.length">
      <ion-card>
        <ion-list>
          <ion-list-header>
            {{ losersTitle }}
          </ion-list-header>
          <ion-item class="loser" v-for="loser in losers" :key="loser.id">
            <ion-label>{{ loser.name }}</ion-label>
            <ion-badge color="secondary" slot="end">{{
              loser.maxScore.sum()
            }}</ion-badge>
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
            <ion-badge color="secondary" slot="end">{{
              player.maxScore.sum()
            }}</ion-badge>
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
            <ion-badge color="secondary" slot="end">
              {{ maxActions }}</ion-badge
            >
          </ion-item>
        </ion-list>
      </ion-card>
    </div>

    <div v-else class="error">
      <ion-label>
        {{ "Lien invalide" }}
      </ion-label>
    </div>

    <template v-slot:footer>
      <div class="new-game">
        <ion-button mode="ios" @click="newGame()">
          Nouvelle partie
        </ion-button>
      </div>
    </template>
    <Stats
      :open="stats"
      @close="stats = false"
      :index="selected"
      :players="allPlayers"
    />
  </master-layout>
</template>
<script>
import { mapActions } from "vuex";
import Stats from "../components/Stats";

export default {
  name: "share",
  components: {
    Stats,
  },
  data() {
    return {
      stats: false,
      selected: 0,
      game: {},
      allPlayers: [],
    };
  },
  computed: {
    finalScores() {
      if (!this.allPlayers.length) return [];
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
      if (!this.allPlayers.length) return [];
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
  },
  async mounted() {
    const { id } = this.$route.params;
    if (!id) return;
    const { data, success } = await this.getResults(id);
    if (!success) return;
    const { game, players } = data;
    this.game = game;
    this.allPlayers = players;
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
    ...mapActions("game", ["resetGame", "rePlay", "getResults"]),
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

.error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
