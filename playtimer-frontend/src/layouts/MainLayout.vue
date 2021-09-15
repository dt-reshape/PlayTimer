<template>
  <v-app>
    <AppHeader></AppHeader>
    <v-main>
      <router-view></router-view>
    </v-main>
    <AppFooter></AppFooter>
  </v-app>
</template>

<script>
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'MainLayout',
  data: () => ({
    items: [],
  }),
  methods: {
    ...mapMutations({}),
  },
  computed: {
    ...mapGetters({}),

  },
  components: {
    AppFooter,
    AppHeader,
  },
  mounted() {

  },
  updated() {
  }
}
</script>
