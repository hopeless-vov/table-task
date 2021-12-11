<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :page.sync="page"
      :items-per-page="limit"
      hide-default-footer
      class="elevation-1"
      @click:row="showDetails($event)"
      @page-count="pageCount = $event">
      <template #[`item.hits`]="{ item }">
        {{ numberFormat(item.hits) }}
      </template>
      <template #[`item.files`]="{ item }">
        {{ getFileLength(item.files) }}
      </template>
      <template #[`item.time`]="{ item }">
        {{ timeFormat(item.time) }}
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Table',
    components: {
    },
    props: {
      headers: {
        type: Array,
        default: () => [],
      },
      items: {
        type: Array,
        default: () => [],
      },
      limit: {
        type: Number,
        default: () => 10,
      },
    },
    data() {
      return {
        page: 1,
        pageCount: 0,
      }
    },
    methods: {
      numberFormat(number) {
        const formated = new Intl.NumberFormat().format(number);
        return formated;
      },
      getFileLength(files) {
        return files?.length;
      },
      showDetails(row) {
        this.$emit('tableInfo', row);
      },
      timeFormat(time) {
        return time ? time.split('T')[0] : '';
      },
    },
  }
</script>
<style lang="scss">
  .v-data-table {
    &__wrapper {
      tr {
        cursor: pointer;
      }
    }
  }
</style>
