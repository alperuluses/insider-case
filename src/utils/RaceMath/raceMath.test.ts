// raceMath.test.ts  (veya .spec.ts)
import { describe, it, expect } from 'vitest'
import { calcDuration } from '@/utils/RaceMath/raceMath'

describe('raceMath', () => {
    it('calcDuration: 100/condition hesabı', () => {
        expect(calcDuration(100)).toBe(1) // condition 100 ise süre 1 olmalı
        expect(calcDuration(50)).toBe(2)
        expect(calcDuration(25)).toBe(4)
    })

    it('calcDuration: condition büyüdükçe süre azalır', () => {
        const slow = calcDuration(40)
        const fast = calcDuration(80)
        expect(fast).toBeLessThan(slow)
    })

    it('calcDuration: ondalıklarda yakın değer', () => {
        expect(calcDuration(33)).toBeCloseTo(3.0303, 3)
    })
})
