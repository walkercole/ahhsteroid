<template>
  <layout>
    <div class="home">
      <Landing/>
      <particles-bg type="tadpole" :canvas="{backgroundColor:'#181818'}" :bg="true"/>
    </div>
  </layout>
</template>

<script>
// @ is an alias to /src
import Landing from '@/components/Landing.vue'
import { ParticlesBg } from 'particles-bg-vue'
import layout from '@/layouts/Default.vue'

export default {
  name: 'home',
  components: {
    Landing,
    ParticlesBg,
    layout
  },
  created () {
    this.$vuetify.theme.dark = true
  },
}
</script>

<!-- Style Overrides for Vuetify to allow animated background -->
<style lang="scss" scoped>
.theme--dark.v-application {
    background: none;
    color: #FFFFFF;
}
::v-deep .v-content {
  padding: 46px 0px 0px !important;
}
</style>
