<template>
  <v-app>
    <v-main>
      <login-view/>
    </v-main>
  </v-app>
</template>

<script>
import LoginView from '@/views/LoginView'
export default {
name: "LoginLayout.vue",
  components: {LoginView}
}
</script>

<style scoped>

</style>
