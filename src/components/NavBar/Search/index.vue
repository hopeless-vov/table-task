<template>
  <div
    class="custom-search d-flex align-center">
    <v-text-field
      @input="filter"
      placeholder="Search"
      style="height: 40px;"
      :class="showSearch"/>
      <v-btn
        icon
        @click="changeSearchStatus">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
  </div>
</template>
<script>
import {
  mapMutations,
} from 'vuex';
  export default {
    name: 'Search',
    data() {
      return {
        searchStatus: false,
      }
    },
    computed: {
      showSearch() {
        return this.searchStatus ? 'show' : 'hide';
      },
    },
    methods: {
      ...mapMutations(['setFilter']),
      changeSearchStatus() {
        this.searchStatus = !this.searchStatus;
      },
      filter(e) {
        this.setFilter(e);
      },
    },
  }
</script>
<style lang="scss">
  .show {
    width: 200px;
    transition: 1s;
  }
  .hide {
    width: 0px;
    transition: 1s;
  }
</style>
