import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import * as firebase from "firebase";
import "./plugins/ant-design-vue.js";
import "./assets/styles/index.css";
Vue.config.productionTip = false;


firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
  // eslint-disable-next-line prettier/prettier
}).$mount("#app");