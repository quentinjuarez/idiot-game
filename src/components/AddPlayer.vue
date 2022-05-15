<template>
  <div class="wrapper">
    <ion-card>
      <ion-item>
        <ion-label position="stacked">Nom</ion-label>
        <ion-input
          autofocus="true"
          autocapitalize="on"
          ref="input"
          v-model="name"
          v-on:keyup.enter="addPlayer"
          type="text"
          placeholder="Entre ton nom"
        ></ion-input>
      </ion-item>

      <div class="button">
        <ion-button
          mode="ios"
          @click="addPlayer()"
          color="secondary"
          :disabled="name === ''"
          >Ajouter</ion-button
        >
      </div>
    </ion-card>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "add-player",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    addPlayer() {
      if (!this.name) return;
      this.newPlayer(this.name);
      this.name = "";
      const { input } = this.$refs;
      input.$el.setFocus();
    },
    ...mapActions("players", ["newPlayer"]),
  },
};
</script>
<style lang="scss" scoped>
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

.link {
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
