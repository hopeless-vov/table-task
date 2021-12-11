<template>
  <v-dialog
    v-model="modal"
    persistent
    transition="dialog-bottom-transition"
    max-width="780"
    class="main-dialog">
    <template>
      <v-card>
        <v-toolbar
          color="indigo lighten-1"
          dark>
          Table Info
          <v-spacer></v-spacer>
          <div
            v-html="badge"
            class="d-flex mr-5"/>
          {{ rowName }}
        </v-toolbar>
        <v-card-text>
          <v-select
            v-model="version"
            :items="versions"
            append-outer-icon="mdi-form-select"
            menu-props="auto"
            hide-details
            label="Choose Version"
            single-line
            @input="getFiles(rowDetails)"/>
          <div
            class="mt-10">
            <InfoTable
              :headers="headers"
              :items="files"
              :limit="4"/>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            text
            @click="closeModal">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import {
  mapMutations,
} from 'vuex';
import { HTTP } from '@/plugins/http-common';
import InfoTable from '../Table';
  export default {
    name: 'Dialog',
    components: {
      InfoTable,
    },
    props: {
      rowDetails: {
        type: Object,
        default: () => null,
      },
      modal: {
        type: Boolean,
        default: () => false,
      },
    },
    data() {
      return {
        version: '',
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
            text: 'Files Includes',
            value: 'files',
            sortable: false,
          },
          {
            text: 'Size',
            value: 'size',
            sortable: false,
          },
          {
            text: 'Time',
            value: 'time',
            sortable: false,
          },
        ],
        files: [],
        badge: '',
      }
    },
    watch: {
      modal() {
        if (this.modal) {
          this.version = this.rowDetails?.latestVersion;
          this.getFiles(this.rowDetails);
        }
      },
    },
    computed: {
      rowName() {
        return this.rowDetails?.name;
      },
      versions() {
        return this.rowDetails?.versions;
      },
    },
    methods: {
      ...mapMutations(['setSpinner', 'setSnackBar']),
      async getFiles(row) {
        this.setSpinner(true);
        if (row) {
          try {
            const { name, type } = row;
            const { data } = await HTTP.get(`${type}/${name}@${this.version}`);
            if (!this.badge) {
              this.getBadge(type, name);
            }
            this.files = data.files;
          } catch (err) {
            console.log('getFiles', err);
          } finally {
            this.setSpinner(false);
          }
        }
      },
      async getBadge(type, name) {
        try {
          const badge = await HTTP.get(`${type}/${name}/badge?style=rounded`);
          this.badge = badge.data;
        } catch(err) {
          console.log('getBadge', err);
        }
      },
      closeModal() {
        this.files = [];
        this.badge = '';
        this.$emit('closeTableDialog');
      },
    },
  }
</script>
