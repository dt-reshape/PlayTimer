<template>
  <div>
    <v-card width="500">
      <v-card-title>Sign In</v-card-title>
      <v-card-text>
        <v-text-field
            label="Username"
            v-model="username"
            prepend-icon="mdi-email"
            required
            :error-messages="usernameErrors"
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
        ></v-text-field>

        <v-text-field
            label="Password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' :'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            required
            :error-messages="passwordErrors"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn  @click="handleSubmit" color="info">Sign In</v-btn>
        <v-spacer></v-spacer>
        <slot/>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {required} from "vuelidate/lib/validators"

export default {
  data() {
    return {
      showPassword: false,
      username: '',
      password: '',
    }
  },
  validations: {
    username: {required},
    password: {required},
  },
  methods: {
    ...mapActions({
      login: "main/login"
    }),
    handleSubmit() {
      this.login({
        login: this.username,
        password: this.password,
      })
    }
  },
  computed: {
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Required.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Required.')
      return errors
    },
  }
}
</script>

<style scoped>

</style>
