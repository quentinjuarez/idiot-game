<template>
  <div>
    <div v-if="shared">{{ link }}</div>
    <ion-button v-else @click="shareResults">Partager</ion-button>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "share-button",
  computed: {
    link() {
      const url = new URL(document.location.href);
      return `${url.origin}/share/${this.shared}`;
    },
    ...mapGetters("game", ["shared"]),
  },
  methods: {
    ...mapActions("game", ["shareResults"]),
  },
};
</script>
<style lang="scss">
.disabled {
  cursor: disabled;
}
</style>
