<template>
  <div class="">
    <v-btn @click="dialog = !dialog"
           tile
    >
      Track
    </v-btn>

    <v-overlay :value="dialog">
      <v-card width="500px" light>
        <v-card-title class="red justify-center">{{ game.name }}</v-card-title>
        <v-form>
          <v-row>
            <v-col cols="8">
              <h2 style="margin-top: 6%; margin-left: 5% ">Time spend:</h2>
            </v-col>
            <v-col cols="4">
              <v-text-field
                  v-model="hours"
                  required
                  :error-messages="hoursErrors"
                  @input="$v.hours.$touch()"
                  @blur="$v.hours.$touch()"
                  label="Enter time here"
                  suffix="h"
                  style=" margin-right: 10% ">
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <h2 style="margin-top: 6%; margin-left: 5% ">On date:</h2>
            </v-col>
            <v-col cols="4">
              <v-text-field disabled :value="moment().format('YYYY-MM-DD')" style=" margin-right: 10% ">
              </v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-card-actions style="justify-content: space-between">
          <v-btn @click="onClick">
            Cancel
          </v-btn>
          <v-btn
              @click="handleTrack"
          >
            Track
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
import moment from 'moment/moment'
import {decimal, required} from "vuelidate/lib/validators"
import {mapActions} from "vuex";

export default {
  name: "Track.vue",
  props: ['game'],
  data() {
    return {
      moment: moment,
      dialog: false,
      hours: '',
    }
  },
  validations: {
    hours: {decimal, required},
  },
  methods: {
    ...mapActions({
      getGame: "main/getGame",
      track: "main/track"
    }),
    onClick() {
      this.dialog = false
    },
    async handleTrack() {
      this.$v.$touch()
      const game = await this.getGame(this.game.id)
      await this.track({
        userId: +localStorage.getItem('id'),
        gameId: game,
        hours: +this.hours,
        date: new Date()
      })
    }
  },
  computed: {
    hoursErrors() {
      const errors = []
      if (!this.$v.hours.$dirty) return errors
      !this.$v.hours.required && errors.push('Required.')
      !this.$v.hours.decimal && errors.push('Enter the number.')
      return errors
    },
  }
}
</script>

<style scoped>

</style>
