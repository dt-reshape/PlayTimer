<template>
  <v-container fluid>
    <h1 style="text-align:center">Game releases in the next 30 days</h1>
    <v-simple-table
    >
      <template v-slot:default>
        <tbody>
        <tr
            v-for="release in releasesList"
            :key="release.id"
        >
          <td class="">{{ release.name }}</td>

          <td class="text-center">Release date:{{ release.released }}</td>

          <td class="text-center">
            <v-dialog
                v-model="dialog[release.id]"
                width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    tile
                    color="red"
                    v-bind="attrs"
                    v-on="on"
                    class="black--text"
                    @click="handleGameId(release.id)"
                >Open
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="red justify-center">
                  {{ release.name }}
                </v-card-title>
                <v-img :src="release.background_image"/>
                <h3 style="padding-left: 1%">
                  Description:
                </h3>
                <v-card-text>
                  {{ gamesDetails.description_raw }}
                </v-card-text>
                <h3 style="padding-left: 1%">
                  Developers:
                </h3>
                <li v-for="developer in gamesDetails.developers" md="3" :key="developer.id" style="padding-left: 2%">
                  {{ developer.name }}
                </li>
                <h3 style="padding-left: 1%">
                  Genres:
                </h3>
                <li v-for="genre in gamesDetails.genres" md="3" :key="genre.id" style="padding-left: 2%">
                  {{ genre.name }}
                </li>
                <h3 style="padding-left: 1%">
                  Platforms:
                </h3>
                <li v-for="plaform in gamesDetails.platforms" md="3" :key="plaform.id" style="padding-left: 2%">
                  {{ plaform.platform.name }}
                </li>
                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="red"
                      text
                      @click="dialog = []">
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-pagination
        v-model="page"
        :length="totalPages"
        :total-visible="10"
        color="red"
        @input="handlePageChange"
    ></v-pagination>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import moment from "moment/moment";

export default {
  name: "Releases",
  data() {
    return {
      moment: moment,
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().add(1, 'month').format('YYYY-MM-DD'),
      page: 1,
      dialog: [],
      gamesDetails: [],
    }
  },
  methods: {
    ...mapActions({
      getReleasesList: 'main/loadReleasesList',
      getGamesDetails: 'main/getGamesDetails',
    }),
    async handlePageChange(value) {
      this.page = value;
      await this.getReleasesList({page: this.page, endDate: this.endDate, startDate: this.startDate})
    },
    async handleGameId(id) {
      this.gameId = id
      this.gamesDetails = await this.getGamesDetails(this.gameId)
    },
  },
  async mounted() {
    await this.getReleasesList({page: this.page, endDate: this.endDate, startDate: this.startDate})
    this.gamesDetails = await this.getGamesDetails(this.gameId)
  },
  computed: {
    ...mapGetters({
      releasesList: 'main/getReleasesList',
      releasesCount: 'main/getReleasesCount',
    }),
    totalPages() {
      return (~~(this.releasesCount / 20) + (this.releasesCount % 20 == 0 ? 0 : 1))
    },
  }
}
</script>

<style scoped>

</style>
