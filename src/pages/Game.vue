<template>
  <master-layout :pageTitle="pageTitle" :menu="true">
    <Loading :open="loading" @close="closeLoading" :text="loadingText" />
    <Alert :open="alert" @choice="alertEndRound" />
    <div v-if="neverPlayed" class="new-player">
      <NewPlayer @cancel="alert = true" />
    </div>
    <div v-else class="wrapper">
      <div class="dice">
        <div class="name">{{ name }}</div>
        <Dice
          :stopRoll="lastPlayer.failed"
          @roll="handleRoll"
          @fetching="fetching = $event"
        />
        <div>{{ score }}</div>
      </div>
    </div>
    <template v-slot:footer>
      <div v-if="!neverPlayed" class="next-player">
        <ion-button mode="ios" @click="handleNextPlayer()" :disabled="fetching"
          >Joueur suivant</ion-button
        >
        <a
          v-if="round === 0 && !params.players"
          @click="alert = true"
          class="link"
        >
          Tous les joueurs ont fini</a
        >
      </div>
    </template>
  </master-layout>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import NewPlayer from "../components/NewPlayer";
import Dice from "../components/Dice";
import Loading from "../components/Loading";
import Alert from "../components/Alert";

export default {
  components: {
    NewPlayer,
    Dice,
    Loading,
    Alert,
  },
  data() {
    return {
      fetching: false,
      loading: false,
      alert: false,
    };
  },
  computed: {
    neverPlayed() {
      return this.lastPlayer?.name === "";
    },
    name() {
      return this.lastPlayer?.name.toUpperCase();
    },
    pageTitle() {
      return `Partie - Round ${this.round + 1}`;
    },
    score() {
      return `${this.lastPlayer?.score} (${this.lastPlayer?.maxScore.sum()})`;
    },
    finalScores() {
      return this.allPlayers.map((player) => {
        return player.maxScore.max();
      });
    },
    loser() {
      const argmin = this.finalScores.indexOf(Math.min(...this.finalScores));
      return this.allPlayers[argmin];
    },
    loadingText() {
      return `Round ${this.round + 1} <br>` + "Au tour de " + this.name;
    },
    ...mapGetters("game", ["started", "round", "params"]),
    ...mapGetters("players", ["lastPlayer", "allPlayers"]),
  },
  mounted() {
    if (!this.started || this.allPlayers.length === 0) {
      return this.$router.push({ path: "/new" });
    }

    if (this.ended) return this.$router.push({ path: "/results" });
  },
  methods: {
    handleRoll(result) {
      const payload = {
        id: this.lastPlayer.id,
        score: result,
        failed: result === 1,
        round: this.round,
      };

      this.updateScore(payload);
    },
    handleNextPlayer() {
      this.hasPlayed(this.lastPlayer.id);
      if (this.round === 0 && !this.params.players) return this.nextPlayer();

      this.loading = true;
      if (this.lastPlayer === undefined) return this.handleEndRound();
    },
    alertEndRound(e) {
      if (e) {
        this.handleEndRound();
      }
      this.alert = false;
    },
    handleEndRound() {
      this.resetPlayersScore();
      if (this.round === 2) {
        this.loading = false;
        this.endGame();
        return this.$router.push({ path: "/results" });
      }
      this.nextRound();
    },
    closeLoading() {
      this.loading = false;
    },
    ...mapActions("players", [
      "nextPlayer",
      "updateScore",
      "hasPlayed",
      "resetPlayersScore",
    ]),
    ...mapActions("game", ["nextRound", "endGame"]),
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.dice {
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

.name {
  font-size: 1rem;
}

.new-player {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.next-player {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  a {
    margin-top: 1rem;
  }
}

.loser {
  margin: 1rem 0;
}

.link {
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
