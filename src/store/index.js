import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: false,
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    setIsAuthenticated({ commit }, isAuthenticated) {
      commit('setIsAuthenticated', isAuthenticated);
    },
  }
});