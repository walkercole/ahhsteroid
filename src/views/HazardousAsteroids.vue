<template>
  <layout>
    <v-container class="mx-auto">
        <v-row class="mb-6">
          <div class="display-1">
            Hazardous Asteroids <v-icon color="deep-purple accent-1">mdi-telescope</v-icon>
          </div>
        </v-row>
        <v-row class="mb-2">
          <v-chip
            class="ma-2 mx-auto"
            color="deep-purple accent-2"
          >
            Get started by selecting a date range within 7 days. 
          </v-chip>
        </v-row>
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
                color="deep-purple accent-1"
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
                color="deep-purple accent-1"
              ></v-text-field>
            </template>

            <v-date-picker v-model="endDate" :min="startDate"  no-title  title="End Date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="endMenu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.endMenu.save(endDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
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

      <v-row>
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="deep-purple accent-1"
          class="mx-auto"
        ></v-progress-circular>
      </v-row>
      <v-row class="mx-5 mt-12" v-for="asteroid in asteroids" :key="asteroid.id">

        <v-col cols="4" v-for="cluster in asteroid" v-if="cluster.is_potentially_hazardous_asteroid" :key="cluster.id">
          
          <v-card width="400" >
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
              <v-row>
                <v-dialog
                  v-model="dialog"
                  :retain-focus="false"
                  persistent
                  max-width="600px"
                >
                  <template v-slot:activator="{ on, attrs }"
                  >
                    <v-btn
                      color="deep-purple accent-2"
                      class="mx-auto mt-4"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Write Observation
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Observation Log</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                          >
                            <v-text-field
                              :label="`Write your observation for ${cluster.name}*`"
                              v-model="cluster.description"
                              color="deep-purple accent-1"
                              maxlength="280"
                              counter
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="updateStore(cluster.description, cluster.id, cluster.name)"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
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
                  color="deep-purple accent-2"
                >
                  <div>
                    <div class="font-weight-normal">
                      <strong>Close Approach Date:</strong>
                    </div>
                    <div>{{ cluster.close_approach_data[0].close_approach_date_full }}</div>
                  </div>
                </v-timeline-item>
                <v-timeline-item
                  small
                  color="deep-purple accent-2"
                >
                  <div>
                    <div class="font-weight-normal">
                      <strong>Potentially Hazardous:</strong>
                    </div>
                    <div>{{ cluster.is_potentially_hazardous_asteroid }}</div>
                  </div>
                </v-timeline-item>
                <v-timeline-item
                  small
                  color="deep-purple accent-2"
                >
                  <div>
                    <div class="font-weight-normal">
                      <strong>Absolute Magnitude:</strong>
                    </div>
                    <div>{{ cluster.absolute_magnitude_h }}</div>
                  </div>
                </v-timeline-item>
                <v-timeline-item
                  small
                  color="deep-purple accent-2"
                >
                  <div>
                    <div class="font-weight-normal">
                      <strong>Miss Distance:</strong>
                    </div>
                    <div>{{ Number(cluster.close_approach_data[0].miss_distance.miles).toLocaleString() }} miles</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>

      </v-row>
    </v-container>
  </layout>
</template>

<script>
import layout from '../layouts/Default.vue'
import baseApiUrl from '../config'
import key from '../config'
import axios from 'axios'

export default {
  name: 'hazardous-asteroids',
  components: {
    layout
  },
  data() {
    return {
      loading: true,
      errored: false,
      errMsg: '',
      snackbar: false,
      dialog: false,
      info: null,
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      startMenu: false,
      endMenu: false,
      asteroids: []
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
      this.dialog = false
    },
    searchAtmo(){
      console.log(this.startDate, this.endDate)
      this.loading = true
      axios
        .get(baseApiUrl.service.baseURL + 'api_key='+`${key.service.api_key}` + '&' + 'start_date='+`${this.startDate}` + '&' + 'end_date='+`${this.endDate}`)
        .then(response => {
          this.asteroids = response.data.near_earth_objects
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
