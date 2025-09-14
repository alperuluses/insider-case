import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/utils/HorseGenerator/horseGenerator', () => ({
    generateRandomHorses: vi.fn((count: number = 20) =>
        Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            name: `Horse ${i + 1}`,
            color: 'red',
            condition: 50,
        } as Horse))
    ),
}))

import { horses as horsesModule, type HorsesState } from '@/stores/Horses/horses'
import { generateRandomHorses } from '@/utils/HorseGenerator/horseGenerator'
import type { Horse } from '@/core/models/Horse/horse.model'

beforeEach(() => vi.clearAllMocks())

describe('horses Vuex module', () => {
    // --- MUTATION ---
    it('SET_HORSES: state’i payload ile günceller', () => {
        const state: HorsesState = { allHorses: [] as Horse[] }
        const payload = [{ id: 1, name: 'H1', color: 'red', condition: 60 }] as Horse[]

        horsesModule.mutations!.SET_HORSES!(state as HorsesState, payload)

        expect(state.allHorses).toEqual(payload)
    })

    // --- GETTER ---
    it('getRaceHorses: ilk 10 atı döndürür', () => {
        const state: HorsesState = {
            allHorses: Array.from({ length: 12 }, (_, i) => ({ id: i + 1 } as Horse)),
        }

        const result = (horsesModule.getters!.getRaceHorses as any)(
            state,
            {},
            {} /* rootState */,
            {} /* rootGetters */
        )

        expect(result).toHaveLength(10)
        expect(result[0].id).toBe(1)
        expect(result[9].id).toBe(10)
    })

    // --- ACTION ---
    it('generateHorses: generateRandomHorses çağırır ve SET_HORSES commit eder', async () => {
        const commit = vi.fn()

        await (horsesModule.actions!.generateHorses as any)({ commit }, 12)

        expect(generateRandomHorses).toHaveBeenCalledWith(12)
        expect(commit).toHaveBeenCalledWith('SET_HORSES', expect.any(Array))

        const payload = commit.mock.calls[0][1]
        expect(payload).toHaveLength(12)
        expect(payload[0]).toMatchObject({ id: 1, name: 'Horse 1' })
    })

    it('generateHorses: count verilmezse varsayılan 20 üretir', async () => {
        const commit = vi.fn()

        await (horsesModule.actions!.generateHorses as any)({ commit })

        const payload = commit.mock.calls[0][1]
        expect(payload).toHaveLength(20)
    })
})
