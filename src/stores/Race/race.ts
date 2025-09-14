import type { RaceState } from "@/core/models/Race/race.model";
import type { Module } from "vuex";
import type { Horse } from "@/core/models/Horse/horse.model";
import type { RootState } from "..";

export const race: Module<RaceState, RootState> = {
    namespaced: true,
    // TODO: Statüleri type enum yap running | paused | finished | waitingNextRound
    state: (): RaceState => ({
        currentRound: 0,
        isRunning: false,
        isWaitingNextRound: false,
        isRoundsFinished: false,
        results: {}
    }),

    getters: {
        currentRound: (state) => state.currentRound,
        isRunning: (state) => state.isRunning,
        resultsByRound: (state) => (roundId: number) => state.results[roundId] || [],
        allResults: (state) => Object.keys(state.results).map((roundId) => ({
            roundId: Number(roundId),
            horses: state.results[Number(roundId)]
        }))

    },

    mutations: {
        SET_RUNNING(state, payload: boolean) {
            state.isRunning = payload
        },
        NEXT_ROUND(state) {
            state.currentRound++
        },
        SET_RESULTS(state, payload: { roundId: number, horses: Horse[] }) {
            state.results[payload.roundId] = payload.horses
        },
        SET_ALL_ROUNDS_FINISHED(state, payload: boolean) {
            state.isRoundsFinished = payload
        },
        WAITING_NEXT_ROUND(state, payload: boolean) {
            state.isWaitingNextRound = payload
        },
        RESET_RACE(state) {
            state.currentRound = 0
            state.isRunning = false
            state.isWaitingNextRound = false
            state.isRoundsFinished = false
            state.results = {}
        }
    },

    actions: {
        startRace({ commit }) {
            commit("SET_RUNNING", true)
            commit("NEXT_ROUND")
        },
        finishRound({ commit }, payload: { roundId: number, horses: Horse[] }) {
            commit("SET_RESULTS", payload)
            const isLastRound = payload.roundId >= 6
            //alert(`Round ${payload.roundId} finished!`)
            if (!isLastRound) {
                commit("WAITING_NEXT_ROUND", true)
                commit("SET_RUNNING", false)
                setTimeout(() => {
                    commit("NEXT_ROUND")
                    commit("WAITING_NEXT_ROUND", false)
                    commit("SET_RUNNING", true)
                }, 3000)
            } else {
                commit("SET_ALL_ROUNDS_FINISHED", true)
                //alert("All rounds finished!")
            }
        },
        pauseRace({ commit }) {
            commit("SET_RUNNING", false)
        },
        toggleRace({ state, commit }) {
            commit("SET_RUNNING", !state.isRunning)
        },
        resetRace({ commit }) {
            commit("RESET_RACE")
        }
    }
}