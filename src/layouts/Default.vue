<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase" @click="$router.push({name: 'home'})">
        <span class="cursor">AHH</span>
        <span class="font-weight-light cursor">STEROID</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <v-content>
        <slot />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Default',
  created () {
    this.$vuetify.theme.dark = true // easy integration for app wide darkmode or can be used by component for individual styled views
  },
};
</script>
<style>
  .cursor:hover {
    cursor: pointer;
  }
</style>

