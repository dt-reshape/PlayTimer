<template>
  <v-app-bar app color="white">
    <v-img
        @click="logoRouteLink"
        onmouseover="this.style.cursor = 'pointer'"
        contain
        :aspect-ratio="16/9"
        :src="require('@/assets/logo.png')"
        class="mx-1"
        max-width="203"
        max-height="64"
    ></v-img>
    <v-spacer></v-spacer>
    <v-btn class="mr-2" to="/profile" text large rounded>Profile</v-btn>
    <v-btn class="mr-2" to="/games" text large rounded>Games</v-btn>
    <v-btn class="mr-2" to="/releases" text large rounded>Releases</v-btn>
    <v-btn class="mr-2" @click="logOut" text large rounded>LogOut</v-btn>
  </v-app-bar>
</template>

<script>
import {mapMutations} from "vuex";
import {mapActions} from "vuex";


export default {
  name: 'AppHeader',
  data() {
    return {}
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({
      logout: "main/logout"
    }),
    logOut() {
      this.logout({})
    },
    logoRouteLink() {
      this.$router.push('/profile');
    }
  },

  computed: {}
}

</script>

<style scoped>

</style>
