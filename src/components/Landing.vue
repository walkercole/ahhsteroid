<template>
  <v-app id="inspire">
      <v-container>
        <v-row>
            <img class="mx-auto" src="../assets/ahhsteroid-logo2.png">
        </v-row>
        <v-row>
          <v-chip
            class="ma-2 mx-auto"
            color="deep-purple accent-2"
          >
            Near Earth Object API app to observe nearby asteroids 
          </v-chip>
        </v-row>
        <v-row class="mt-12">
          <v-col
            cols="12"
            sm="4"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <v-card @click="$router.push({name: 'search'})">
                <v-img
                  height="268px"
                  src="https://cdn.pixabay.com/photo/2016/09/03/19/35/griffith-observatory-1642514_960_720.jpg"
                >

                  <v-card-title class="white--text mt-8">
                    <img class="mx-auto" src="../assets/daily.png">
                  </v-card-title>
                </v-img>
              </v-card>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="4"
          >
            <v-sheet
              min-height="268"
              rounded="lg"
            >
              <v-card @click="$router.push({name: 'about'})">
                <v-img
                  height="268px"
                  src="https://cdn.pixabay.com/photo/2017/01/31/13/40/dark-2024127_960_720.png"
                >

                  <v-card-title class="white--text mt-8">
                    <img class="mx-auto" src="../assets/hazardous.png">
                  </v-card-title>
                </v-img>
              </v-card>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="4"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <v-card @click="$router.push({name: 'observations'})">
                <v-img
                  height="268px"
                  src="https://cdn.pixabay.com/photo/2020/09/05/19/38/landscape-5547401__340.png"
                >

                  <v-card-title class="white--text mt-8">
                    <v-card-title class="white--text mt-n2 mx-auto">
                      <img class="mx-auto" src="../assets/observations.png">
                    </v-card-title>
                  </v-card-title>
                </v-img>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
  </v-app>
</template>

<script>
  export default {
    data: () => ({

    })
  }
</script>

