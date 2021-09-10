<template>
  <v-container fill-height style="align-items: normal" fluid class="pa-0 ma-0">
    <v-autocomplete
        clearable
        hide-details
        item-text="name"
        item-value="API"
        v-on:input="handleSearch"
        solo
        dense
        v-model="searchTitle"
        color="white"
        hide-no-data
        hide-selected
        placeholder="Start typing to Search"
        prepend-icon="mdi-magnify"
        return-object
    ></v-autocomplete>
    <v-row>
      <v-col v-for="game in gamesList" md="3" :key="game.id">
        <v-card class="mx-auto my-12" tile width="350px" height="350px">
          <v-img
              height="200"
              :src="game.background_image"
          ></v-img>
          <v-card-title align="center">
            {{ game.name }}
          </v-card-title>

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
              <v-card-title class="red">
                {{ game.name }}
              </v-card-title>

                <v-card-text>
              {{ gamesDetails.description_raw }}
              </v-card-text>

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
        </v-card>
      </v-col>
    </v-row>
    <v-container>
      <v-pagination
          v-model="page"
          :length="totalPages"
          :total-visible="7"
          color="red"
          @input="handlePageChange"
      ></v-pagination>
    </v-container>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Games",
  data() {
    return {
      dialog: [],
      totalPages: 15,
      gamesList: [],
      gamesDetails: [],
      gameId: 1,
      searchResult: [],
      searchTitle: "",
      page: 1,
    }
  },
  methods: {
    ...mapActions({
      getGamesList: 'main/getGamesList',
      getGamesDetails: 'main/getGamesDetails',
      searchGame: 'main/searchGame',
    }),
    handlePageChange(value) {
      this.page = value;
      this.gamesList = this.getGamesList(this.page)
    },
    handleGameId(id) {
      this.gameId = id
      this.gamesDetails = this.getGamesDetails(this.gameId)
    },
    handleSearch: function (event) {
      this.searchTitle = event.target.value
    }
  },
  async mounted() {
    this.gamesList = await this.getGamesList(this.page)
    this.gamesDetails = await this.getGamesDetails(this.gameId)
    this.search = await this.searchGame(this.searchTitle)
  },
}
</script>

<style scoped>

</style>
