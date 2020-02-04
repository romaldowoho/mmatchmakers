import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import iView from "view-design";
import "view-design/dist/styles/iview.css";
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "mmatchmakers-542c1.firebaseapp.com",
  databaseURL: "https://mmatchmakers-542c1.firebaseio.com",
  projectId: "mmatchmakers-542c1",
  storageBucket: "mmatchmakers-542c1.appspot.com",
  messagingSenderId: "394077873027",
  appId: "1:394077873027:web:fc072f3de4e526c1ea8cb6",
  measurementId: "G-M4J18ZFZ8X"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.firestore();

Vue.use(iView);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
