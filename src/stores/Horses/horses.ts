import type { Horse } from "@/core/models/Horse/horse.model";
import type { Module } from "vuex";
import type { RootState } from "..";
import { generateRandomHorses } from "@/utils/HorseGenerator/horseGenerator";


export interface HorsesState {
    allHorses: Horse[]
}


export const horses: Module<HorsesState, RootState> = {
    namespaced: true,

    state: (): HorsesState => ({
        allHorses: [] as Horse[]
    }),

    getters: {
        getRaceHorses(state) {
            return state.allHorses.slice(0, 10)
        }
    },
    mutations: {
        SET_HORSES(state, payload: Horse[]) {
            state.allHorses = payload
        },

        RESET_HORSES(state) {
            state.allHorses = []
        }
    },

    actions: {
        generateHorses({ commit }, count: number = 20) {
            const horses = generateRandomHorses(count)
            commit('SET_HORSES', horses)
        },

        resetHorses({ commit }) {
            commit('RESET_HORSES')
        }
    }


}