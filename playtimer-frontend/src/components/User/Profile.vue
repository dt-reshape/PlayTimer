<template>
  <v-container fill-height style="align-items: normal" fluid class="pa-0 ma-0">
    <v-col md="10" fill-height>
      <v-container class="pa-16">
        <v-row justify="center" class="row-left">
          <v-col md="6" style="flex-direction: row">
            <v-row justify="space-between">
              <v-card color="red" height="160" width="160" align="center">
                <v-card-subtitle class="justify-center" style="font-size: 300%; margin-top: 20%; color: black">{{ numberOfGames }}</v-card-subtitle>
                <v-card-title class="justify-center">Games</v-card-title>
              </v-card>
              <v-card color="blue" height="160" width="160" align="center">
                <v-card-subtitle class="justify-center" style="font-size: 300%; margin-top: 20%; color: black">{{ hoursPlayed }}</v-card-subtitle>
                <v-card-title class="justify-center">Hours</v-card-title>
              </v-card>
              <v-card color="green" height="160" width="160" align="center">
                <v-card-subtitle class="justify-center" style="font-size: 300%; margin-top: 20%; color: black">{{~~(hoursPlayed/24)}}</v-card-subtitle>
                <v-card-title class="justify-center">Days</v-card-title>
              </v-card>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="row-left">
          <v-col md="12">
            <calendar-heatmap
                :values="calendar.map(day => {
                  return {
                    count: day.count,
                    date: moment(day.date).format('YYYY-MM-DD')
                  }
                })"
                :end-date="dateNow"
                tooltip-unit="hours"
                :range-color="['#f0f0f0', '#9be9a8', '#40c463', '#30a14e', '#216e39']"
                :max="10"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-card width="100%">
            <v-card-title>
              Last Tracked
            </v-card-title>
            <v-list>
              <template v-for="(track, index) in lastGames">
                <v-divider
                    :key="index"
                    v-if="index === 0"
                ></v-divider>
                <v-list-item
                    :key="track.title"
                >

                  <p>You spend {{track.hours > 1 ? track.hours + ' hours' : 1 +' hour'}} on {{gamesName[index] ? gamesName[index].name : ''}}</p>
                  <v-list-item-content align="right">
                    <p>{{moment(track.date).format('YYYY-MM-DD')}}</p>
                  </v-list-item-content>
                </v-list-item>
                <v-divider :key="track.id" v-if="index + 1 < lastGames.length"></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-row>
      </v-container>
    </v-col>
    <v-col md="2" class="pl-12" style="background-color: #efefef">
      <v-row style="flex-direction: column">
        <v-card flat style="background-color: #efefef">
          <v-card-title class="text-capitalize text-h5 text-center" align="center">{{ login }}</v-card-title>
          <v-img
              contain
              :src="profilePic"
              height="200"
              width="200">
          </v-img>
        </v-card>

        <v-card-title>Achievements: {{subscriptions.length}}</v-card-title>
        <v-card style="background-color: white" v-if="!subscriptions.length">
          <v-card-title>No achievements.</v-card-title>
        </v-card>
        <v-toolbar
            v-else
            dense
            rounded
            flat
        >
          <v-avatar
              v-for="sub in subscriptions"
              color="yellow"
              size="36"
              :key="sub.id"
          >
            <span class="white--text text-h5">{{ sub.login }}</span>
          </v-avatar>
        </v-toolbar>
        <v-card-title>Subscriptions: {{achievements.length}}</v-card-title>
        <v-card style="background-color: white" v-if="!achievements.length">
          <v-card-title>No subscriptions.</v-card-title>
        </v-card>
        <v-toolbar
            v-else
            dense
            rounded
            flat
        >
          <v-avatar
              v-for="achievement in achievements"
              color="yellow"
              size="36"
              :key="achievement.id"
          >
            <span class="white--text text-h5">{{ achievement.name }}</span>
          </v-avatar>
        </v-toolbar>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";
import {CalendarHeatmap} from 'vue-calendar-heatmap'
import moment from "moment/moment";

export default {
  name: "Profile",
  props: {
    id: {
      type: String,
      default: localStorage.getItem('id')
    }
  },
  components: {
    CalendarHeatmap
  },
  methods: {
    ...mapActions({
      getUserData: 'main/getUserData',
      getUserCalendar: 'main/getUserCalendar',
      getUserStatistics: 'main/getUserStatistics',
      getLastUserGames: 'main/getLastUserGames',
      getGamesDetails: 'main/getGamesDetails',
    }),
  },
  data() {
    return {
      moment,
      subscriptions: [],
      lastGames: [],
      achievements: [],
      numberOfGames: 0,
      hoursPlayed: 0,
      achievementsCount: 0,
      friendsCount: 0,
      login: null,
      calendar: [],
      profilePic: null,
      dateNow: moment().format('YYYY-MM-DD'),
      gamesName: [],
    };
  },
  async mounted() {
    ({login: this.login, profilePic: this.profilePic, achievements: this.achievements, friends: this.subscriptions} = await this.getUserData(this.id))
    this.calendar = await this.getUserCalendar({
      id: this.id,
      fromDate: moment().subtract(1, 'year').subtract(1, 'month').format('YYYY-MM-DD'),
      dateNow: this.dateNow
    });
    ({hours: this.hoursPlayed, games: this.numberOfGames} = await this.getUserStatistics(this.id))
    this.lastGames = await this.getLastUserGames(this.id)
    for(let game of this.lastGames) {
      this.gamesName.push(await this.getGamesDetails(game.apiIdent))
    }
  },
}

</script>

<style scoped>
.row-left {
  padding: 30px;
}
</style>
