import Vue from 'vue'
import Vuex from 'vuex'
import main from './main'
import VueCalendarHeatmap from 'vue-calendar-heatmap'

Vue.use(Vuex)
Vue.use(VueCalendarHeatmap)

export default new Vuex.Store({
    modules: {
        main
    }
})