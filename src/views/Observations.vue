<template>
  <layout>
    <v-container class="mx-auto">
      <div :loading="loading">
        <h3> {{ info }} </h3>
      </div>
      <v-row class="mb-8">
        <div class="display-1">
          My Observations <v-icon color="deep-purple accent-1">mdi-magnify</v-icon>
        </div>
      </v-row>
      <v-row v-if="items.length > 0">
        <v-col
          cols="6"
          v-for="(item, index) in items"
          :key="index">
          <v-card
            class="mx-auto"
            color="deep-purple accent-2"
            dark
            max-width="400"

            >
            <v-card-title>
              <v-icon
                large
                left
              >
                mdi-comment-edit-outline
              </v-icon>
              <span class="title font-weight-light">{{ item.name }}</span>
            </v-card-title>

            <v-card-text class="headline font-weight-bold">
              {{ item.description }}
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    alt=""
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Walker Cole</v-list-item-title>
                </v-list-item-content>

                <v-row
                  align="center"
                  justify="end"
                >
                  <v-badge
                    bordered
                    class="black--text"
                    color="purple"
                    icon="mdi-magnify"
                    overlap
                  >
                    <v-btn
                      class="black--text"
                      color="white"
                      depressed
                    >
                      more info
                    </v-btn>
                  </v-badge>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="6" class="mx-auto">
          <v-card class="text-center pa-4">
          No Observations made, explore the daily observer or the hazardous asteroids and take some notes!
          </v-card>
        </v-col>
      </v-row>
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
    </v-container>
  </layout>
</template>
<script>
import layout from '../layouts/Default.vue'

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
    }
  },
  mounted () {
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
  },
  methods: {
    updateStore(value, id){
      this.$store.commit('addObservation', { id: id, description: value})
    },
  }
}
</script>
