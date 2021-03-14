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
    <div>What is the absolute magnitude of our sun? An asteroid's absolute magnitude is the visual magnitude an observer would record if the asteroid were placed 1 Astronomical Unit (au) away, and 1 au from the Sun and at a zero phase angle.</div>
    <!-- <v-card v-for="asteroid in asteroids" :key="asteroid.id">
      <v-card-text v-for="cluster in asteroid" :key="cluster.id" class="my-2">
        <div>{{ cluster.id }} {{ cluster.name }} {{ cluster.is_potentially_hazardous_asteroid }} {{ cluster.absolute_magnitude_h }} {{ cluster.nasa_jpl_url }}  {{ cluster.estimated_diameter.meters.estimated_diameter_max }} </div>
      </v-card-text>
    </v-card> -->
    <div v-for="asteroid in asteroids" :key="asteroid.id">
      <v-card width="400" v-for="cluster in asteroid" :key="cluster.id">
        <v-img
          height="200px"
          src="https://cdn.pixabay.com/photo/2016/05/01/21/20/earth-1365995_960_720.jpg"
        >

          <v-card-title class="white--text mt-8">
            <v-avatar size="56">
              <img
                alt="user"
                src="https://cdn.pixabay.com/photo/2012/10/26/02/38/asteroid-63125__340.jpg"
              >
            </v-avatar>
            <p class="ml-5">
              {{ cluster.name }}
            </p>
          </v-card-title>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            Stats
          </div>

          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>Potentially Fatal:</strong>
                </div>
                <div>{{ cluster.is_potentially_hazardous_asteroid }}</div>
              </div>
            </v-timeline-item>
            <v-timeline-item
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>Absolute Magnitude:</strong>
                </div>
                <div>{{ cluster.absolute_magnitude_h }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </div>

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
      asteroids: []
    }
  },
  mounted () {

  },
  created () {
    this.$vuetify.theme.dark = true
    console.log(baseApiUrl)
    console.log(key)
  },
  methods: {
    searchAtmo(){
      console.log(this.startDate, this.endDate)

      this.$store.commit('increment')
      this.$store.commit('addObservation', { id: '1', description: 'whoa asteroids'})
      console.log(this.$store.state.count)

      axios
        // .get(baseApiUrl.service.baseURL, {api_key: key.service.api_key, start_date: this.startDate, end_date: this.endDate})
        .get(baseApiUrl.service.baseURL + 'api_key='+`${key.service.api_key}` + '&' + 'start_date='+`${this.startDate}` + '&' + 'end_date='+`${this.endDate}`)
        .then(response => {
          console.log(response.data.near_earth_objects)
          this.asteroids = response.data.near_earth_objects
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
