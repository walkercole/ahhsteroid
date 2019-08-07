<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
const default_layout = "default"

export default {
  computed: {
    layout() {
      return(this.$route.meta.layout || default_layout) + '-layout'
    }
  }
}
</script>

