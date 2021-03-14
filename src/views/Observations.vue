<template>
  <layout justify-center>
    <div :loading="loading">
      <h3> {{ info }} </h3>
    </div>
    <v-layout row justify-center>
      <!-- START DATE PICKER -->
      <!-- <h1 class="v-heading text-h3 text-sm-h3 mb-4"> Observations </h1> -->
      <img class="mx-auto mt-n12" src="../assets/observations.png">
      <!-- <v-btn @click="searchAtmo();" /> -->
    </v-layout>

    <v-snackbar
      v-model="snackbar"
    >
      {{ errMsg }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item
          v-else
          :key="item.title"
        >
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.id"></v-list-item-title>
            <v-list-item-subtitle v-html="item.description"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

  </layout>
</template>
<script>
import layout from '../layouts/Default.vue'
import baseApiUrl from '../config'
import key from '../config'

export default {
  name: 'observations',
  components: {
    layout
  },
  data() {
    return {
      loading: true,
      errored: false,
      errMsg: '',
      snackbar: false,
      info: null,
      headers: [
        {
          text: 'id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {
          text: 'title',
          align: 'start',
          sortable: false,
          value: 'description',
        },
      ]
    //   items: []
    }
  },
  mounted () {
      this.getItems()
  },
  computed: {
      items: {
        get () {
            return this.$store.state.observation
        }
      }
  },
  created () {
    this.$vuetify.theme.dark = true
    console.log(baseApiUrl)
    console.log(key)
  },
  methods: {
    getItems() {
        console.log(this.$store.state.observation)
    },
    updateStore(value, id){
      this.$store.commit('addObservation', { id: id, description: value})
      console.log(value, id)
    },
  }
}
</script>
