import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";
import * as IonComponents from "@ionic/vue";

/* Theme variables */
import "./theme/variables.css";

import MasterLayout from "./components/MasterLayout.vue";

import store from "./store/index";

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.indexesOf = function(val) {
  var indices = [];
  for (var i = 0; i < this.length; i++) {
    if (this[i] === val) indices.push(i);
  }
  return indices;
};

Array.prototype.sum = function() {
  return this.reduce((a, b) => a + b, 0);
};

const app = createApp(App)
  .use(IonicVue)
  .use(router);

Object.keys(IonComponents).forEach((key) => {
  if (/^Ion[A-Z]\w+$/.test(key)) {
    app.component(key, IonComponents[key]);
  }
});
app.component("master-layout", MasterLayout);
app.use(store);

router.isReady().then(() => {
  app.mount("#app");
});
