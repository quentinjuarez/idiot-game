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
          <ion-toggle v-model="users" slot="end"></ion-toggle>
        </ion-item>
        {{ legend }}
      </ion-card-content>
    </ion-card>
  </div>
</template>
<script>
export default {
  name: "settings",
  data() {
    return {
      users: false,
    };
  },
  computed: {
    legend() {
      return this.users
        ? "Un par un. Vous devrez indiquer quand tous les joueurs ont joué au moins une fois."
        : "Avant le début de la partie.";
    },
  },
};
</script>
<style lang=""></style>
