<template>
  <v-footer
    dark
    padless>
    <v-card
      flat
      tile
      class="indigo lighten-1 white--text text-center"
      style="width: 100%">
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon.id"
          :disabled="!icon.src"
          class="mx-4 white--text"
          icon
          @click="routeToMyProfile(icon.src)">
          <v-icon size="24px">
            {{ icon.mdi }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="white--text pt-0">
        Hallo! My name is Volodymyr. I put here few links to some of my profiles on social networks! You can like my photo ;)
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Volodymyr Bondarenko</strong> — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  components: {
  },
  data: () => ({
    icons: [
      {
        src: 'https://github.com/hopeless-vov',
        mdi: 'mdi-github',
      },
      {
        src: '',
        mdi: 'mdi-facebook'
      },
      {
        src: '',
        mdi: 'mdi-twitter'
      },
      {
        src: 'https://www.linkedin.com/in/volodymyr-bondarenko-2b11b31ba/',
        mdi: 'mdi-linkedin'
      },
      {
        src: 'https://www.instagram.com/vov._bndrnk/',
        mdi: 'mdi-instagram'
      },
    ],
  }),
  methods: {
    routeToMyProfile(link) {
      window.open(link)
    },
  },
};
</script>
