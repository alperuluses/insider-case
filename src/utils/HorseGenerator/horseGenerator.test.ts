import { describe, it, expect } from 'vitest'

import { generateRandomHorses } from '@/utils/HorseGenerator/horseGenerator' // örnek
import { HORSE_COLORS, HORSE_NAMES } from '@/core/constants/horses.constant'


describe('generateRandomHorses', () => {
    it('varsayılan olarak 20 at üretir', () => {
        const list = generateRandomHorses()
        expect(list).toHaveLength(20)
    })

    it('her atın alanları geçerli aralık/formatta', () => {
        const list = generateRandomHorses(8)
        for (const h of list) {
            expect(typeof h.name).toBe('string')
            expect(HORSE_NAMES).toContain(h.name)

            expect(typeof h.color).toBe('string')
            expect(HORSE_COLORS).toContain(h.color) // palet içinden seçilmiş olmalı

            expect(Number.isInteger(h.condition)).toBe(true)
            expect(h.condition).toBeGreaterThanOrEqual(1)
            expect(h.condition).toBeLessThanOrEqual(100)
        }
    })

})