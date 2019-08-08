<template>
  <v-container>
    <v-layout
      justify-center
      row
      wrap
    >
      <v-flex xs4>
        <v-card flat>
          <v-card-title primary-title>
            <h4>Login</h4>
          </v-card-title>
          <v-form class="pa-4">
            <v-text-field v-model="username" name="Username" label="Username"></v-text-field>
            <v-text-field v-model="pass" name="Password" label="Password" type="password"></v-text-field>
            <v-card-actions>
              <v-btn primary large block @click="submitLogin()">Login</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    username: '',
    pass: ''
  }),
  methods: {
    submitLogin() {
      this.$router.push({ name: 'about' })
    }
  }
};
</script>
