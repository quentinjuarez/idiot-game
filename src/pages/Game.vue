<template>
  <master-layout v-if="!end" :pageTitle="pageTitle">
    <div v-if="neverPlayed" class="new-player">
      <NewPlayer />
    </div>
    <div v-else class="wrapper">
      <div class="dice">
        <div>{{ name }}</div>
        <Dice :stopRoll="failed" @roll="handleRoll" />
        <div>{{ score }}</div>
      </div>
    </div>
    <template v-slot:footer>
      <div v-if="!neverPlayed" class="next-player">
        <ion-button mode="ios" @click="handleNextPlayer()"
          >Joueur suivant</ion-button
        >
        <a v-if="round === 0" @click="handleEndRound()"
          >Tous les joueurs ont fini</a
        >
      </div>
    </template>
  </master-layout>
  <master-layout v-else pageTitle="Resultats">
    <div class="device">
      <ion-card>
        <ion-item class="loser">
          <ion-label>
            <ion-card-title>Le Perdant</ion-card-title>
          </ion-label>
          {{ loser.name }}
        </ion-item>
      </ion-card>
      <ion-card>
        <ion-list>
          <ion-list-header>
            <ion-label>Tous les joueurs</ion-label>
          </ion-list-header>
          <ion-item v-for="player in allPlayers" :key="player.id">
            <ion-label>{{ player.name }}</ion-label>
            <ion-note slot="end">{{ player.maxScore.max() }}</ion-note>
          </ion-item>
        </ion-list>
      </ion-card>
    </div>
    <template v-slot:footer>
      <div class="next-player">
        <ion-button mode="ios" @click="endGame()">Terminer</ion-button>
      </div>
    </template>
  </master-layout>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import NewPlayer from "../components/NewPlayer";
import Dice from "../components/Dice";

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

export default {
  components: {
    NewPlayer,
    Dice,
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
      return `${this.lastPlayer?.score} (${this.lastPlayer?.maxScore.max()})`;
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
    ...mapGetters("game", ["started", "round"]),
    ...mapGetters("players", ["lastPlayer", "allPlayers"]),
  },
  data() {
    return {
      failed: false,
      end: false,
    };
  },
  mounted() {
    if (!this.started || this.allPlayers.length === 0) {
      return this.$router.push({ path: "/new" });
    }
  },
  methods: {
    handleRoll(result) {
      if (result === 1) this.failed = true;
      const payload = {
        id: this.lastPlayer.id,
        score: result,
        failed: this.failed,
        round: this.round,
      };

      this.updateScore(payload);
    },
    handleNextPlayer() {
      this.hasPlayed(this.lastPlayer.id);
      this.failed = false;
      if (this.round === 0) return this.nextPlayer();

      if (this.lastPlayer === undefined) return this.handleEndRound();
    },
    handleEndRound() {
      this.failed = false;
      this.resetPlayersScore();
      if (this.round === 2) {
        return (this.end = true);
      }
      this.nextRound();
    },
    endGame() {
      return this.$router.push({ path: "/new" });
    },
    ...mapActions("players", [
      "nextPlayer",
      "updateScore",
      "hasPlayed",
      "resetPlayersScore",
    ]),
    ...mapActions("game", ["nextRound"]),
  },
};
</script>
<style lang="scss" scoped>
.device {
  max-width: 400px;
  margin: 0 auto;
}
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
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
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
</style>
