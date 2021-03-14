<template>
  <layout justify-center>
    <div :loading="loading">
      <h3> {{ info }} </h3>
    </div>
    <v-layout row justify-center>
      <!-- START DATE PICKER -->
      <v-flex xs3 class="pr-4">
        <v-menu
          ref="startMenu"
          v-model="startMenu"
          :close-on-content-click="false"
          :return-value.sync="startDate"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="startDate"
              label="Choose a start date"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="startDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="startMenu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.startMenu.save(startDate)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <!-- END DATE PICKER -->
      <v-flex xs3 class="pl-4">
        <v-menu
          ref="endMenu"
          v-model="endMenu"
          :close-on-content-click="false"
          :return-value.sync="endDate"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="endDate"
              label="Choose an end date"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="endDate" :min="startDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="endMenu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.endMenu.save(endDate)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-btn @click="searchAtmo();" />
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
    <v-data-table
    :headers="headers"
    :items="list"
    :items-per-page="8"
    class="elevation-1"
  ></v-data-table>

  </layout>
</template>

<script>
import layout from '../layouts/Default.vue'
import baseApiUrl from '../config'
import key from '../config'
import axios from 'axios'

export default {
  name: 'about',
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
    console.log(baseApiUrl)
    console.log(key)
  },
  methods: {
    searchAtmo(){
      console.log(this.startDate, this.endDate)
      axios
        // .get(baseApiUrl.service.baseURL, {api_key: key.service.api_key, start_date: this.startDate, end_date: this.endDate})
        .get(baseApiUrl.service.baseURL + 'api_key='+`${key.service.api_key}` + '&' + 'start_date='+`${this.startDate}` + '&' + 'end_date='+`${this.endDate}`)
        .then(response => {
          console.log(response.data.near_earth_objects)
          this.asteroids = response.data.near_earth_objects
          console.log(this.asteroids)
          for (var key in this.asteroids) {
            this.list = this.asteroids[key]
            console.log(this.list)
          }
          console.log(this.asteroids)
          // this.info = response.data
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
