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
        <ion-button
          mode="ios"
          @click="setName()"
          color="secondary"
          :disabled="name === ''"
          >Commencer</ion-button
        >
      </div>
      <div class="button" v-if="allPlayers.length > 1">
        <a @click="handleCancel" class="link">Annuler</a>
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
    ...mapGetters("players", ["lastPlayer", "allPlayers"]),
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
    handleCancel() {
      this.deleteUser(this.lastPlayer.id);
      this.$emit("cancel");
    },
    ...mapActions("players", ["updateName", "deleteUser"]),
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
