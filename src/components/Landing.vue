<template>
  <v-app id="inspire">
    <!-- <v-main class="black img-bg lighten-3"> -->
      <v-container>
        <v-row>
            <img class="mx-auto" src="../assets/ahhsteroid-logo2.png">
        </v-row>
        <v-row>
          <v-chip
            class="ma-2 mx-auto"
            color="deep-purple accent-2"
          >
            Near Earth Object API app to monitor nearby asteroids 
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
              <v-card>
                <v-img
                  height="268px"
                  src="https://cdn.pixabay.com/photo/2018/08/13/17/20/shooting-star-3603455__340.jpg"
                >

                  <v-card-title class="white--text mt-8">
                    <v-avatar size="56">
                      <img
                        alt="user"
                        src="https://cdn.pixabay.com/photo/2012/10/26/02/38/asteroid-63125__340.jpg"
                      >
                    </v-avatar>
                    <img class="mx-auto" src="../assets/searchall.png">
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
              <v-card>
                <v-img
                  height="268px"
                  src="https://cdn.pixabay.com/photo/2017/01/31/13/40/dark-2024127_960_720.png"
                >

                  <v-card-title class="white--text mt-8">
                    <v-avatar size="56">
                      <img
                        alt="user"
                        src="https://cdn.pixabay.com/photo/2012/10/26/02/38/asteroid-63125__340.jpg"
                      >
                    </v-avatar>
                    <img class="mx-auto" src="../assets/allfatal.png">
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
              <v-card>
                <v-img
                  height="268px"
                  src="https://cdn.pixabay.com/photo/2020/09/05/19/38/landscape-5547401__340.png"
                >

                  <v-card-title class="white--text mt-8">
                    <v-avatar size="56">
                      <img
                        alt="user"
                        src="https://cdn.pixabay.com/photo/2012/10/26/02/38/asteroid-63125__340.jpg"
                      >
                    </v-avatar>
                    <p class="ml-5">
                      Information
                    </p>
                  </v-card-title>
                </v-img>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    <!-- </v-main> -->
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      links: [

      ],
    })
  }
</script>

