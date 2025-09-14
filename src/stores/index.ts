import { createStore } from "vuex"
import { horses, type HorsesState } from "./Horses/horses"
import { race } from "./Race/race"
import type { RaceState } from "@/core/models/Race/race.model"
import type { ScheduleState } from "@/core/models/Schedule/schedule.model"
import { schedule } from "./Schedule/schedule"

export interface RootState {
    horses: HorsesState,
    schedule: ScheduleState,
    race: RaceState
}

export const store = createStore<RootState>({
    modules: {
        horses,
        schedule,
        race
    },
    actions: {
        async resetAll({ dispatch }) {
            await dispatch("horses/resetHorses")
            await dispatch("race/resetRace")
            await dispatch("schedule/resetSchedule")
        }
    }
})