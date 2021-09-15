<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <SignIn v-if="!isLogin">
        <v-btn @click="changeType" text>Sign Up</v-btn>
      </SignIn>
      <SignUp v-else>
        <v-btn @click="changeType" text>Sign In</v-btn>
      </SignUp>
    </v-row>
  </v-container>
</template>

<script>
import SignIn from "@/components/User/SignIn";
import SignUp from "@/components/User/SignUp";

export default {
  name: "LoginView.vue",
  data() {
    return {
      isLogin: false
    }
  },
  methods: {
    changeType() {
      this.isLogin = !this.isLogin
    }
  },
  components: {
    SignIn,
    SignUp
  }
}
</script>

<style scoped>

</style>
