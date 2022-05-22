<template>
  <master-layout pageTitle="Participants">
    <div class="form">
      <AddPlayer />
    </div>
    <div class="players" v-if="allPlayers.length">
      <ion-card>
        <ion-list>
          <ion-list-header>
            <ion-label>Tous les joueurs</ion-label>
            <ion-button size="small" @click="resetPlayers">
              Supprimer
            </ion-button>
          </ion-list-header>
          <ion-item v-for="player in allPlayers" :key="player.id">
            <ion-label>{{ player.name }}</ion-label>
            <ion-icon
              slot="end"
              name="close"
              class="delete"
              @click="deletePlayer(player.id)"
            ></ion-icon>
          </ion-item>
        </ion-list>
      </ion-card>
    </div>
    <template v-slot:footer>
      <div class="start">
        <ion-button mode="ios" fill="clear" @click="cancelNewGame"
          >Annuler</ion-button
        >
        <ion-button
          mode="ios"
          @click="startNewGame"
          :disabled="!allPlayers.length"
          >Commencer</ion-button
        >
      </div>
    </template>
  </master-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddPlayer from "../components/AddPlayer";

export default {
  name: "players",
  components: {
    AddPlayer,
  },
  computed: {
    ...mapGetters("players", ["allPlayers"]),
  },
  methods: {
    startNewGame() {
      this.startGame();
      return this.$router.push({ path: "/game" });
    },
    cancelNewGame() {
      return this.$router.push({ path: "/new" });
    },
    ...mapActions("players", ["deletePlayer", "resetPlayers"]),
    ...mapActions("game", ["startGame"]),
  },
};
</script>
<style lang="scss" scoped>
.start {
  margin: 1rem 0;
  gap: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}
.delete {
  cursor: pointer;
  &:hover {
    color: var(--ion-color-danger);
  }
}
</style>
