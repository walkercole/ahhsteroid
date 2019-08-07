<template>
  <layout>
    <div class="home">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
  </layout>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import layout from '../layouts/Default.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    layout
  },
  created () {
    this.$vuetify.theme.dark = true
  },
}
</script>
