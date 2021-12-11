import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    spinner: false,
    packages: [],
    filter: '',
    snackbar: {
      stateSnack: false,
      text: null,
      timeout: 3000,
    },
  },
  mutations: {
    setSpinner(state, payload) {
      state.spinner = payload;
    },
    setPackages(state, payload) {
      state.packages = payload;
    },
    setFilter(state, payload) {
      state.filter = payload;
    },
    setSnackBar(state, {
      text,
      stateSnack,
      timeout = 3000,
    }) {
      state.snackbar = {
        stateSnack,
        timeout,
        text,
      };
    },
    closeSnackBar(state) {
      state.snackbar.stateSnack = false;
    },
  },
  actions: {
    async getAllPackages({ commit }) {
      try {
        const { data } = await axios.get('https://data.jsdelivr.com/v1/stats/packages');
        commit('setPackages', data);
      } catch (err) {
        console.log('getAllPackages', err);
      }
    },
  },
  getters: {
    filteredPackages: (state) => {
      const { packages, filter } = state;
      const filteredPackages = packages.filter(el => el.name.toLowerCase().includes(filter.toLowerCase()));
      return filteredPackages;
    },
  },
  modules: {
  }
})
