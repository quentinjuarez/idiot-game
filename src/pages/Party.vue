<template>
  <master-layout pageTitle="Création du salon">
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
    <ion-card v-else>
      <ion-item>
        <ion-label position="stacked">Code</ion-label>
        <ion-input v-model="partyCode" type="text" readonly></ion-input>
      </ion-item>
      <ShareParty />
    </ion-card>
    <template v-slot:footer>
      <div class="start">
        <ion-button mode="ios" fill="clear" @click="cancelParty"
          >Annuler</ion-button
        >
      </div>
    </template>
  </master-layout>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import ShareParty from "../components/ShareParty";

export default {
  name: "party",
  components: {
    ShareParty,
  },
  data() {
    return { name };
  },
  mounted() {
    if (!this.isParty) return this.$router.push({ path: "/new" });
  },
  computed: {
    validName() {
      return this.name && this.name.length > 3;
    },
    ...mapGetters("game", ["isParty", "partyName", "partyCode"]),
  },
  methods: {
    handleCreateParty() {
      if (!this.validName) return;
      this.createParty(this.name);
    },
    cancelParty() {
      this.resetGame();
      return this.$router.push({ path: "/new" });
    },
    ...mapActions("game", ["createParty", "resetGame"]),
  },
};
</script>
<style lang="scss" scoped>
.button {
  width: 90%;
  display: flex;
  justify-content: center;
  margin: 0.5rem auto;
}
ion-item {
  width: 100%;
}
</style>
