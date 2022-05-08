<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title mode="ios">{{ pageTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="mobile-aspect">
        <slot> </slot>
      </div>
    </ion-content>
    <ion-footer>
      <slot name="footer"></slot>
    </ion-footer>
  </ion-page>
</template>
<script>
export default {
  props: ["pageTitle"],
  computed: {
    bgImage() {
      return "background-image: url('./assets/mesh-gradient.png');";
    },
  },
};
</script>
<style lang="scss" scoped>
ion-toolbar {
  --background: var(--ion-color-primary);
  --color: var(--ion-color-primary-contrast);
}

.mobile-aspect {
  max-width: 500px;
  margin: 0 auto;
  height: 100%;
}
</style>
