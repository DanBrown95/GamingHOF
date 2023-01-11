import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: false
  },
  mutations: {
    login(state, success) {
      state.isLoggedIn = success;
    },
    logout(state) {
      state.isLoggedIn = false;
    }
  },
  actions: {
    login({ commit }) {
      // TODO: verify user, and set the user object.
      commit("login", true);
    },
    logout({ commit }) {
      commit("logout");
    }
  }
});