import { HORSE_COLORS, HORSE_NAMES } from "@/core/constants/horses.constant"
import type { Horse } from "@/core/models/Horse/horse.model"

const rngDefault = () => Math.random()

function pickUniqueColors(count: number, rng = rngDefault) {
  const colors = HORSE_COLORS.slice()
  for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[colors[i], colors[j]] = [colors[j], colors[i]]
  }
  return colors.slice(0, count)
}

export function generateRandomHorses(count = 20, rng = rngDefault):Horse[] {
  const chosen = pickUniqueColors(count, rng) 
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: HORSE_NAMES[Math.floor(rng() * HORSE_NAMES.length)],
    color: chosen[i],
    condition: Math.floor(rng() * 100) + 1,
  }))
}
