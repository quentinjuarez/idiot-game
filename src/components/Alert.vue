<template lang="">
  <div></div>
</template>
<script>
import { alertController } from "@ionic/vue";

export default {
  name: "alert",
  props: {
    open: { type: Boolean, default: false },
  },
  methods: {
    async presentAlertConfirm() {
      const alert = await alertController.create({
        mode: "ios",
        header: "Êtes vous sûr ?",
        message: "Vous ne pourrez plus ajouter de joueur",
        buttons: [
          {
            text: "Annuler",
            role: "cancel",
            cssClass: "secondary",
            id: "cancel-button",
            handler: () => {
              this.$emit("choice", false);
            },
          },
          {
            text: "Continuer",
            id: "confirm-button",
            handler: () => {
              this.$emit("choice", true);
            },
          },
        ],
      });
      return alert.present();
    },
  },
  watch: {
    open() {
      if (this.open) return this.presentAlertConfirm();
    },
  },
};
</script>
<style lang="scss" scoped></style>
