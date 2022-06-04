<template>
  <div class="center">
    <div v-if="shared" class="link">
      <input
        :value="link"
        ref="clone"
        readonly
        mode="ios"
        @focus="$event.target.select()"
      />
      <ion-button @click="copy" mode="ios">Copier</ion-button>
    </div>
    <ion-button v-else @click="shareResults" mode="ios">Partager</ion-button>
    <Loading :open="open" text="Copié !" @close="open = false" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loading from "../components/Loading";

export default {
  name: "share-button",
  components: {
    Loading,
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    link() {
      const url = new URL(document.location.href);
      return `${url.origin}/share/${this.shared}`;
    },
    ...mapGetters("game", ["shared"]),
  },
  methods: {
    copy() {
      this.$refs.clone.focus();
      document.execCommand("copy");
      this.open = true;
    },
    ...mapActions("game", ["shareResults"]),
  },
};
</script>
<style lang="scss">
.disabled {
  cursor: disabled;
}
</style>

<style lang="scss" scoped="true">
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.link {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5em;
}

input {
  color: var(--ion-text);
  background-color: var(--ion-card-background);
  border: none;
  border-radius: 4px;
  outline: none;
  width: 100%;
  padding: 8px 8px;
  margin-right: 8px;
}
input:focus {
  outline: 1px solid var(--ion-color-primary);
}
</style>
