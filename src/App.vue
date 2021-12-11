<template>
  <v-app>
    <NavBar />
    <SnackBar />
    <v-main>
      <router-view/>
    </v-main>
    <Footer />
    <v-row
      v-if="spinner"
      justify="center"
      align="center"
      class="spinner-container">
      <v-progress-circular
        indeterminate
        :size="50"
        color="primary" />
    </v-row>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import SnackBar from './components/SnackBar';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
export default {
  name: 'App',
  components: {
    NavBar,
    Footer,
    SnackBar,
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapState(['spinner']),
  },
};
</script>
<style lang="scss">
  .spinner-container {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    right: 0;
    left:0;
  }
</style>
