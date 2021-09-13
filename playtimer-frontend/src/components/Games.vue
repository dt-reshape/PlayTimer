<template>
  <v-container fluid>
    <v-text-field
        class="ma-5"
        clearable
        hide-details
        solo
        dense
        v-model="searchTitle"
        color="white"
        hide-no-data
        hide-selected
        placeholder="Start typing to Search"
        prepend-icon="mdi-magnify"
        return-object
    ></v-text-field>
    <v-row v-if="gamesList.length">
      <v-col v-for="game in gamesList" md="3" :key="game.id">
        <v-card class="mx-auto my-12" tile width="350px" height="350px">
          <v-img
              height="200"
              :src="game.background_image"
          ></v-img>
          <v-card-title align="center">
            {{ game.name }}
          </v-card-title>
          <v-card-actions class="pa-0" style="justify-content: space-between;">
            <v-dialog
                v-model="dialog[game.id]"
                width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    tile
                    color="red"
                    v-bind="attrs"
                    v-on="on"
                    class="black--text"
                    @click="handleGameId(game.id)"
                >Open
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="red justify-center">
                  {{ game.name }}
                </v-card-title>
                <v-img :src="game.background_image"/>
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
                <h3 style="padding-left: 1%">
                  {{gamesDetails.metacritic ? "Metacritic Score: " + gamesDetails.metacritic : ''}}
                </h3>

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
            <TimeTrack :key="game.id" :game="game">
            </TimeTrack>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row style="min-height: 90%" v-else align="center" justify="center">
      <h1>No games found</h1>
    </v-row>
    <v-container>
      <v-pagination
          v-model="page"
          :length="totalPages"
          :total-visible="10"
          color="red"
          @input="handlePageChange"
      ></v-pagination>
    </v-container>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Track from "@/components/Track";

export default {
  name: "Games",
  data() {
    return {
      dialog: [],
      gamesDetails: [],
      currentGame: {},
      gameId: 1,
      searchResult: [],
      searchTitle: "",
      page: 1,
      trackDialog: [],
    }
  },
  components: {
    TimeTrack: Track
  },
  methods: {
    ...mapActions({
      getGamesList: 'main/loadGamesList',
      getGamesDetails: 'main/getGamesDetails',
    }),
    async handlePageChange(value) {
      this.page = value;
      await this.getGamesList({page: this.page, search: this.searchTitle})
    },
    async handleGameId(id) {
      this.gameId = id
      this.gamesDetails = await this.getGamesDetails(this.gameId)
    },
    handleSearch: function (event) {
      this.searchTitle = event.target.value

    },
    trackClick(id) {
      this.trackDialog[id] = !this.trackDialog[id];
    }
  },
  async mounted() {
    await this.getGamesList({page: this.page, search: ''})
    this.gamesDetails = await this.getGamesDetails(this.gameId)
  },
  watch: {
    searchTitle(value) {
      console.log(value)
      this.page = 1;
      this.getGamesList({search: value, page: this.page})
    }
  },
  computed: {
    ...mapGetters({
      gamesList: 'main/getGamesList',
      gamesCount: 'main/getGamesCount',
    }),
    totalPages() {
      return (~~(this.gamesCount / 8) + (this.gamesCount % 8 == 0 ? 0 : 1))
    },
    track: {
      set(value) {
        this.trackDialog = value
      },
      get() {
        return this.trackDialog
      }
    }
  },
}
</script>

<style scoped>

</style>
