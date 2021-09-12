<template>
  <v-container fill-height style="align-items: normal" fluid class="pa-0 ma-0">
    <v-row dense>
      <v-col cols="12">
        <v-card
            color="white"
            v-for="releases in releasesList"
            :key="releases.id"
            class="d-flex justify-space-between align-baseline"
        >
          <v-card-title class="text-h5">
            {{releases.name}}
          </v-card-title>
          <v-card-title>Release date:{{releases.released}}</v-card-title>
          <v-card-actions>
            <v-btn color="red">
              Open
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import moment from "moment/moment";

export default {
  name: "Releases",
  data() {
    return {
      startDate: moment.format('YYYY-MM-DD'),
      endDate: moment.add(1, 'month').format('YYYY-MM-DD')
    }
  },
  methods: {
    ...mapActions({
      getReleasesList: 'main/loadReleasesList'
    }),
  },
  async mounted() {
    await this.getReleasesList(this.endDate,this.startDate)
  },
  computed: {
    ...mapGetters({
      releasesList: 'main/getReleasesList',
      releasesCount: 'main/getReleasesCount',
    }),
  }
}
</script>

<style scoped>

</style>