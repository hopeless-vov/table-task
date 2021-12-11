<template>
  <div
    class="main-wrapper mt-10 mb-10">
    <Table
      :headers="headers"
      :items="filteredPackages"
      @tableInfo="tableInfo"/>
    <TableInfoDialog
      :modal="modal"
      :limit="10"
      :rowDetails="rowDetails"
      @closeTableDialog="closeTableDialog"/>
  </div>
</template>

<script>
import {
  mapMutations,
  mapGetters,
  mapActions,
} from 'vuex';
import { HTTP } from '@/plugins/http-common';
import Table from '../../components/Table';
import TableInfoDialog from '../../components/Dialog';
  export default {
    name: 'Home',
    components: {
      Table,
      TableInfoDialog,
    },
    data() {
      return {
        headers: [
          {
            text: 'Package',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          {
            text: 'Package Type',
            value: 'type',
            sortable: false,
          },
          {
            text: 'Hits',
            value: 'hits',
            sortable: false,
          },
        ],
        modal: false,
        rowDetails: null,
      }
    },
    async created() {
      this.setSpinner(true);
      await this.getAllPackages();
      this.setSpinner(false);
    },
    computed: {
      ...mapGetters(['filteredPackages']),
    },
    methods: {
      ...mapMutations(['setSpinner', 'setSnackBar']),
      ...mapActions(['getAllPackages']),
      async tableInfo(row) {
        const { name, type } = row;
        this.setSpinner(true);
        try {
          const { data } = await HTTP.get(`${type}/${name}`);
          this.modal = true;
          this.rowDetails = {
            latestVersion: data.tags.length ? data.tags.latest : data.versions[0],
            versions: data.versions,
            ...row,
          };
        } catch(err) {
          this.setSnackBar({
            text: 'Somethings went wrong, try to get info from another row',
            stateSnack: true,
          });
          console.log('getVersions', err);
        } finally {
          this.setSpinner(false);
        }
      },
      closeTableDialog() {
        this.modal = false;
        this.rowDetails = null;
      }
    },
  }
</script>
<style lang="scss">
  .main-wrapper {
    max-width: 828px;
    width: 100%;
    margin: 0px auto;
  }
</style>
