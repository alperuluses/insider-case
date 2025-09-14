import type { Horse } from "@/core/models/Horse/horse.model"

export const calcDuration = (condition: number): number => {
    return 100 / condition
}

export const getRoundDuration = (horses: Horse[]): number => {
    const maxDuration = Math.max(...horses.map(h => calcDuration(h.condition)))
    return maxDuration
}

export const sortByFinishOrder = (horses: Horse[]): Horse[] => {
    return [...horses].sort((a, b) => b.condition - a.condition)
}