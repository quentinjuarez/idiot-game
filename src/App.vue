<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
});
</script>
<style lang="scss">
.inanimate-loading {
  --spinner-color: transparent;
  --max-width: 500px !important;
  --width: 80% !important;
  --height: 80vh !important;

  font-size: 2rem;
  text-align: center;
}
</style>
