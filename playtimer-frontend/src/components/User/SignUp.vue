<template>
  <div>
    <v-card width="500">
      <v-card-title>Sign Up</v-card-title>
      <v-card-text>
        <v-text-field
            label="E-Mail"
            v-model="email"
            prepend-icon="mdi-email"
            required
            :error-messages="emailErrors"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
            label="Username"
            v-model="username"
            prepend-icon="mdi-account"
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
        <v-text-field
            label="Repeat password"
            v-model="confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            required
            :error-messages="confirmPasswordErrors"
            @input="$v.confirmPassword.$touch()"
            @blur="$v.confirmPassword.$touch()"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="handleSubmit" color="info">Sign Up</v-btn>
        <v-spacer></v-spacer>
        <slot/>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {required, minLength, maxLength, sameAs, email} from "vuelidate/lib/validators"

export default {
  data() {
    return {
      showPassword: false,
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    }
  },
  validations: {
    email: {required, email},
    username: {required, minLength: minLength(3), maxLength: maxLength(16)},
    password: {required, minLength: minLength(8), maxLength: maxLength(50)},
    confirmPassword: {required, sameAsPassword: sameAs('password')},
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('Required.')
      !this.$v.email.email && errors.push('Enter e-mail.')
      return errors
    },
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Required.')
      !this.$v.username.minLength && errors.push('Username is too short.')
      !this.$v.username.maxLength && errors.push('Username is too long.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Required.')
      !this.$v.password.minLength && errors.push('Password is too short.')
      !this.$v.password.maxLength && errors.push('Password is too long.')
      return errors
    },
    confirmPasswordErrors () {
      const errors = []
      if (!this.$v.confirmPassword.$dirty) return errors
      !this.$v.confirmPassword.required && errors.push('Required.')
      !this.$v.confirmPassword.sameAsPassword && errors.push('Please make sure your passwords match.')
      return errors
    },
  },
  methods: {
    ...mapActions({
      signUp: "main/signUp"
    }),
    handleSubmit() {
      this.$v.$touch()
      this.signUp({
        email: this.email,
        login: this.username,
        password: this.password,
        registrationDate: new Date()
      })
    }
  },
  mounted() {

  },
}
</script>
<style scoped>

</style>
