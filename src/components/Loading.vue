<template lang="">
  <div></div>
</template>
<script>
import { loadingController } from "@ionic/vue";

export default {
  name: "loading",
  props: {
    timeout: { type: Number, default: 2000 },
    text: { type: String, default: "Au tour de" },
    open: { type: Boolean, default: false },
  },
  data() {
    return {
      localOpen: false,
    };
  },
  methods: {
    async presentLoading() {
      this.localOpen = true;
      const loading = await loadingController.create({
        cssClass: "inanimate-loading",
        message: this.text,
        duration: this.timeout,
        spinner: null,
        translucent: true,
        animated: false,
      });

      await loading.present();

      setTimeout(function() {
        loading.dismiss();
        this.localOpen = false;
      }, this.timeout);

      this.localOpen = false;
    },
  },
  watch: {
    open() {
      if (this.open) return this.presentLoading();
    },
    localOpen() {
      if (!this.localOpen) return this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped></style>
