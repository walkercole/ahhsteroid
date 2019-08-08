<template>
  <layout>
    <div class="home">
      <Login/>
    </div>
  </layout>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import layout from '@/layouts/Default.vue'

export default {
  name: 'home',
  components: {
    Login,
    layout
  },
  created () {
    this.$vuetify.theme.dark = true
  },
}
</script>
