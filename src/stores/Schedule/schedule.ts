import type { Round } from "@/core/models/Race/race.model"
import type { Module } from "vuex"
import type { RootState } from ".."
import type { ScheduleState } from "@/core/models/Schedule/schedule.model"

//Başka yerde kullanılacak olursa constant içerisine alınır
const ROUND_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200]


export const schedule: Module<ScheduleState, RootState> = {
    namespaced: true,

    state: (): ScheduleState => ({
        schedule: [] as Round[]
    }),

    getters: {
        getRounds: (state) => state.schedule,
        getScheduleByRound: (state) => (roundId: number) => state.schedule.find(r => r.id === roundId),
        getHorsesOfRound: state => (roundId: number) => {
            const round = state.schedule.find(r => r.id === roundId)
            return round ? round.participatingHorses : []
        }
    },

    mutations: {
        SET_SCHEDULE(state, payload: Round[]) {
            state.schedule = payload
        },
        RESET_SCHEDULE(state) {
            state.schedule = []
        }
    },

    actions: {
        generateSchedule({ commit }) {
            const allHorses = this.state.horses.allHorses
            const rounds: Round[] = ROUND_DISTANCES.map((distance, index) => ({
                id: index + 1,
                distance,
                participatingHorses: allHorses.sort(() => Math.random() - 0.5).slice(0, 10)
            }))
            commit("SET_SCHEDULE", rounds)
        },
        resetSchedule({ commit }) {
            commit("RESET_SCHEDULE")
        }

    }
}