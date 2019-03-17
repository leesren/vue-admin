import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import app from "./modules/app";
import errorLog from "./modules/errorLog";
import permission from "./modules/permission";
import tagsView from "./modules/tagsView";
import user from "./modules/user";
import getters from "./getters";
import { EnumsData } from "../utils";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  // vue 状态持久化
  key: EnumsData.USER_PERSIST_KEY,
  storage: window.localStorage,
  reducer: state => ({ user: state.user }) // only save navigation module
});

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user
  },
  plugins: [vuexLocal.plugin],
  getters
});

export default store;
