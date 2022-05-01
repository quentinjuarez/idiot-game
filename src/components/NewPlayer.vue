<template>
  <div class="wrapper">
    <ion-card>
      <ion-item>
        <ion-label position="stacked">Nom</ion-label>
        <ion-input
          v-model="name"
          v-on:keyup.enter="setName"
          type="text"
          placeholder="Entre ton nom"
        ></ion-input>
      </ion-item>

      <div class="button">
        <ion-button mode="ios" @click="setName()">Commencer</ion-button>
      </div>
    </ion-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "new-player",
  data() {
    return {
      name: "",
    };
  },
  computed: {
    ...mapGetters("players", ["lastPlayer"]),
  },
  methods: {
    setName() {
      if (!this.name) return;
      const payload = {
        id: this.lastPlayer.id,
        name: this.name,
      };

      this.updateName(payload);
    },
    ...mapActions("players", ["updateName"]),
  },
};
</script>
<style scoped>
.wrapper {
  width: 100%;
}
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
