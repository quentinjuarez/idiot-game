<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title mode="ios">{{ pageTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot> </slot>
    </ion-content>
    <ion-footer>
        <slot name="footerdata"></slot>
    </ion-footer>
  </ion-page>
</template>
<script>
export default {
  props: ["pageTitle"],
  
};
</script>
<style scoped>
ion-toolbar{
    --background: var(--ion-color-primary);
    --color: var(--ion-color-primary-contrast)
}
</style>