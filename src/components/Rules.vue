<template lang="">
  <div>
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle>Jeu du con</ion-card-subtitle>
        <ion-card-title>Les règles</ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <ion-item v-for="(rule, index) in rules" :key="index">
          <ion-badge slot="start">{{ index + 1 }}</ion-badge>
          <ion-label>
            {{ rule.text }}
          </ion-label>
        </ion-item>
      </ion-card-content>
    </ion-card>
  </div>
</template>
<script>
export default {
  name: "rules",
  data() {
    return {
      rules: [
        {
          text: "Tous les joueurs vont à tour de rôle jeter un dé.",
        },
        {
          text:
            "Le but est de faire un score maximale en enchaînant les lancers.",
        },
        {
          text: "Attention, si vous tombez sur 1, votre score devient nul.",
        },
        {
          text:
            "Vous avez 3 rounds pour ne pas avoir le plus petit score, auquel cas vous serez le perdant.",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
/deep/ .sc-ion-label-md-h {
  white-space: normal;
}
</style>
