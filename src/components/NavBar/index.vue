<template>
  <div>
    <v-app-bar
      color="indigo lighten-1"
      dense
      dark >
      <v-toolbar-title>Table Test</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <Search />
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
import Search from './Search';
  export default {
    name: 'NavBar',
    components: {
      Search,
    },
  }
</script>
