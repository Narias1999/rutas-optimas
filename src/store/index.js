import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeRole: localStorage.getItem('role') || null,
  },
  mutations: {
    setRole(state, payload) {
      localStorage.setItem('role', payload);
      state.activeRole = payload;
    },
  },
  getters: {
    authenticated(state) {
      return state.activeRole;
    }
  },
  actions: {
  },
});
