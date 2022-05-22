<template>
  <ion-page>
    <MenuBar />
    <ion-header>
      <ion-toolbar>
        <ion-buttons v-if="menu" slot="start" mode="ios">
          <ion-menu-button color="dark"></ion-menu-button>
        </ion-buttons>
        <ion-title mode="ios">{{ pageTitle }}</ion-title>
        <ion-text slot="end" color="medium">0.1.2</ion-text>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="mobile-aspect" id="main-content">
        <slot></slot>
      </div>
    </ion-content>
    <ion-footer>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </ion-footer>
  </ion-page>
</template>
<script>
import MenuBar from "./MenuBar";

export default {
  name: "master-layout",
  components: {
    MenuBar,
  },
  props: {
    pageTitle: {
      type: String,
      default: "",
    },
    menu: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
ion-toolbar {
  padding: 0 1rem;
  // --background: var(--ion-color-primary);
  // --color: var(--ion-color-primary-contrast);
}

ion-footer {
  --background: var(--ion-toolbar-background);
  // --color: var(--ion-color-primary-contrast);
}

.mobile-aspect {
  max-width: 500px;
  margin: 0 auto;
  height: 98%;
}

.footer {
  max-width: 500px;
  margin: 0 auto;
}
</style>
