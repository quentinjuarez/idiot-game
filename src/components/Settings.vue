<template>
  <div>
    <ion-card>
      <ion-card-header>
        <ion-card-title>Les paramètres</ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <ion-item>
          <ion-label>
            Choix des joueurs
          </ion-label>
          <ion-toggle
            v-model="players"
            slot="end"
            color="secondary"
            class="disabled"
          ></ion-toggle>
        </ion-item>
        {{ legend }}
      </ion-card-content>
    </ion-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "settings",
  computed: {
    legend() {
      return this.players
        ? "Avant le début de la partie."
        : "Un par un. Vous devrez indiquer quand tous les joueurs ont joué au moins une fois.";
    },
    players: {
      get() {
        return this.params.players;
      },
      set(e) {
        return this.updateParams({ key: "players", value: e });
      },
    },
    ...mapGetters("game", ["params"]),
  },
  methods: {
    ...mapActions("game", ["updateParams"]),
  },
};
</script>
<style lang="scss">
.disabled {
  cursor: disabled;
}
</style>
