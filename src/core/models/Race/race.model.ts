import type { Horse } from "../Horse/horse.model"

export interface Round {
  id: number
  distance: number
  participatingHorses: Horse[]
  results?: Horse[]
}

export interface RaceSchedule {
  rounds: Round[]
}

export interface RaceState {
  currentRound: number
  isRunning: boolean
  isWaitingNextRound: boolean
  isRoundsFinished: boolean
  results: Record<number, Horse[]>
}