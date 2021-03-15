<template>
  <layout>
    <v-container class="mx-auto">
      <div :loading="loading">
        <h3> {{ info }} </h3>
      </div>
      <v-row>
        <div class="display-1">
          Daily Observer <v-icon color="deep-purple accent-1">mdi-comment-edit-outline</v-icon>
        </div>
      </v-row>
      <v-row>
        <!-- START DATE PICKER -->
        <v-spacer></v-spacer>
        <v-col cols="2">
          <v-menu
            ref="startMenu"
            v-model="startMenu"
            :close-on-content-click="false"
            :return-value.sync="startDate"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="startDate"
                label="Choose a day to observe"
                readonly
                color="deep-purple accent-1"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="startDate" no-title scrollable color="deep-purple accent-2">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="startMenu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.startMenu.save(startDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          </v-col>
          <v-col cols="1">
            <v-btn
              class="mt-2"
              fab
              dark
              small
              color="deep-purple accent-2"
              @click="searchAtmo()"
            >
              <v-icon dark>
                mdi-magnify
              </v-icon>
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      <v-row>
        <v-data-table
        :headers="headers"
        :loading="loading"
        loading-text="Loading... Please wait"
        :items="list"
        :items-per-page="8"
        :expanded.sync="expanded"
        show-expand
        class="elevation-1 mx-auto"
        >
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              Write observations for {{ item.name }} :
              <v-text-field
                v-model="item.description"
                @change="updateStore(item.description, item.id, item.name)"
                counter
                maxlength="280"
                ></v-text-field>
            </td> 
          </template>

        </v-data-table>

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
import baseApiUrl from '../config'
import key from '../config'
import axios from 'axios'

export default {
  name: 'search',
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
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      startMenu: false,
      endMenu: false,
      asteroids: [],
      list: [],
      expanded: [],
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Absolute Magnitude',
          align: 'start',
          sortable: true,
          value: 'absolute_magnitude_h',
        },
        {
          text: 'Close Approach Date',
          align: 'start',
          sortable: true,
          value: 'close_approach_data[0].close_approach_date_full',
        },
        {
          text: 'Diameter (meters)',
          align: 'start',
          sortable: true,
          value: 'estimated_diameter.meters.estimated_diameter_max',
        },
        {
          text: 'Orbit Graph (link)',
          align: 'start',
          sortable: false,
          value: 'nasa_jpl_url',
        },
      ],
    }
  },
  mounted () {
    this.searchAtmo()
  },
  created () {
    this.$vuetify.theme.dark = true
  },
  methods: {
    updateStore(description, id, name){
      this.$store.commit('addObservation', { id: id, name: name, description: description})
    },
    searchAtmo(){
      this.loading = true
      axios
        .get(baseApiUrl.service.baseURL + 'api_key='+`${key.service.api_key}` + '&' + 'start_date='+`${this.startDate}` + '&' + 'end_date='+`${this.startDate}`)
        .then(response => {
          this.asteroids = response.data.near_earth_objects
          this.list = []
          for (var key in this.asteroids) {
            this.list = this.asteroids[key]
          }
        })
        .catch(error => {
          console.error(error)
          this.errMsg = error
          this.errored = true
          this.snackbar = true
        })
        .finally(() => this.loading = false)
        }
  }
}
</script>
