<template lang="">
  <ion-modal
    mode="ios"
    ref="modal"
    :is-open="open"
    :swipe-to-close="true"
    :presenting-element="$parent.$refs.ionRouterOutlet"
    @didDismiss="$emit('close')"
  >
    <ion-page>
      <ion-header translucent mode="ios">
        <ion-toolbar>
          <ion-title>Statistiques</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="dismissModal()">Fermer</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-card v-for="round in [1, 2, 3]" :key="round">
          <ion-list>
            <ion-list-header>Round {{ round }}</ion-list-header>
            <ion-item v-for="action in actions[round - 1]" :key="action">
              <ion-label>{{ action }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-card>
      </ion-content>
    </ion-page>
  </ion-modal>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "stats",
  props: {
    open: { type: Boolean, default: false },
    index: { type: Number, required: true },
  },
  methods: {
    dismissModal() {
      this.$emit("close");
    },
  },
  computed: {
    actions() {
      return this.allPlayers[this.index].actions;
    },
    ...mapGetters("players", ["allPlayers"]),
  },
};
</script>
<style lang=""></style>
