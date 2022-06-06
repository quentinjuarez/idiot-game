<template>
  <master-layout pageTitle="Rejoindre un salon">
    <ion-card v-if="!partyName">
      <ion-item>
        <ion-label position="stacked">Nom du salon</ion-label>
        <ion-input
          v-model="name"
          v-on:keyup.enter="handleCreateParty"
          type="text"
          required
          placeholder="Entre le nom du salon"
        ></ion-input>
      </ion-item>

      <div class="button">
        <ion-button
          mode="ios"
          @click="handleCreateParty()"
          color="secondary"
          :disabled="!validName"
          >Commencer</ion-button
        >
      </div>
    </ion-card>

    <div v-else class="error">
      <ion-label>
        {{ "Lien invalide" }}
      </ion-label>
    </div>

    <template v-slot:footer>
      <div class="new-game">
        <ion-button mode="ios" @click="quitParty()" fill="clear">
          Quitter le salon
        </ion-button>
      </div>
    </template>
  </master-layout>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "share",
  components: {},
  data() {
    return {
      game: {},
      allPlayers: {},
    };
  },
  computed: {},
  async mounted() {
    const { id } = this.$route.params;
    if (!id) return;
    const { data, success } = await this.joinParty(id);
    if (!success) return;
    const { game, players } = data;
    this.game = game;
    this.allPlayers = players;
  },
  methods: {
    quitParty() {},
    ...mapActions("game", ["joinParty"]),
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

.error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
