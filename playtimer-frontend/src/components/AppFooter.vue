<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-text class="py-2 white--text text-center">
        <strong>PlayTimer</strong> © 2021 - {{ new Date().getFullYear() }}
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: 'AppFooter',
  data() {
    return {}
  },
  methods: {
    ...mapMutations({})
  },
}
</script>

<style scoped>

</style>