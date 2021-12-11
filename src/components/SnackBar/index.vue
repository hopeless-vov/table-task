<template>
  <v-snackbar
    v-model="snackbar.stateSnack"
    :timeout="snackbar.timeout">
    {{ snackbar.text }}
    <template v-slot:action="{ attrs }">
      <v-btn
        color="blue"
        text
        v-bind="attrs"
        @click="closeSnackBar" >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
import {
  mapState,
  mapMutations,
} from 'vuex';
export default {
  name: 'SnackBar',
  data: () => {
    return {
    };
  },
  computed: {
    ...mapState(['snackbar']),
  },
  methods: {
    ...mapMutations(['closeSnackBar']),
  },
};
</script>
<style lang="scss">
.price {
  height: 100%;
  padding: 50px 15px 30px 15px;
  display: grid;
  justify-content: center;
  align-content: start;
  gap: 20px;
  .cost {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  }
}
</style>
