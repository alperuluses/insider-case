<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useStore } from 'vuex'
import type { RootState } from '@/stores'
import { calcDuration, getRoundDuration, sortByFinishOrder } from '@/utils/RaceMath/raceMath'
import type { Horse } from '@/core/models/Horse/horse.model'
import type { Round } from '@/core/models/Race/race.model'

const tracker = ref(0)

const store = useStore<RootState>()

const currentRound = computed<number>(() => store.state.race.currentRound)
const isRaceRunning = computed<boolean>(() => store.state.race.isRunning)
const isWaitingNextRound = computed<boolean>(() => store.state.race.isWaitingNextRound)
const isRoundsFinished = computed<boolean>(() => store.state.race.isRoundsFinished)

const stages = computed<Horse[]>(() =>
    store.getters['schedule/getHorsesOfRound'](currentRound.value) as Horse[]
)

const currentSchedule = computed<Round>(() =>
    store.getters['schedule/getScheduleByRound']
        ? store.getters['schedule/getScheduleByRound'](currentRound.value)
        : null
)

// ---- TIMER STATE ----
let timerId: ReturnType<typeof setTimeout> | null = null
let remaining: number = 0
let pauseStart: number = 0

function startTimer(totalSeconds: number, horses: Horse[]) {
    // baştan timer başlat
    remaining = totalSeconds * 1000
    pauseStart = Date.now()
    timerId = setTimeout(() => {
        finishRound(horses)
    }, remaining)
}

function pauseTimer() {
    if (!timerId) return
    clearTimeout(timerId)
    timerId = null
    // ne kadar süre geçtiyse kalan süreden düş
    remaining -= Date.now() - pauseStart
}

function resumeTimer(horses: Horse[]) {
    if (timerId || remaining <= 0) return
    pauseStart = Date.now()
    timerId = setTimeout(() => {
        finishRound(horses)
    }, remaining)
}

function finishRound(horses: Horse[]) {
    timerId = null
    store.dispatch('race/finishRound', {
        roundId: currentRound.value,
        horses: sortByFinishOrder(horses)
    })
}

function hardCancel() {
    if (timerId) clearTimeout(timerId)
    timerId = null
    remaining = 0
}

// round değiştiğinde yeni timer başlatıyorum
watch(stages, (horses: Horse[]) => {
    if (currentRound.value === 0) return
    if (!horses.length) return
    const maxDuration = getRoundDuration(horses)
    tracker.value++
    if (timerId) clearTimeout(timerId)
    startTimer(maxDuration, horses)
})

// pause/resume toggle 
watch(isRaceRunning, (running: boolean) => {
    const horses = stages.value
    if (!horses.length) return
    if (running) {
        resumeTimer(horses)
    } else {
        pauseTimer()
    }
})

watch(currentRound, (n) => {
    if (n === 0) hardCancel()
})

onBeforeUnmount(() => {
    if (timerId) clearTimeout(timerId)
})
</script>

<template>
    <section class="race-track card" :key="tracker">
        <div v-for="(stage, index) in stages" :key="stage.id" class="lanes">
            <div class="lane">
                <div class="lane-number">{{ index + 1 }}</div>
                <div class="horse" :class="{ paused: !isRaceRunning }"
                    :style="{ animationDuration: calcDuration(stage.condition) + 's' }">
                    <span class="horse-number" :style="{ backgroundColor: stage.color }">{{ index + 1 }}</span>
                </div>
            </div>
        </div>

        <div v-if="currentRound !== 0" class="lap-info">
            {{ currentRound }}st Lap –
            {{ currentSchedule?.distance ?? '-' }}
        </div>
        <div v-if="!isRaceRunning || currentRound === 0 || isRoundsFinished" class="race-track-overlay">
            <!-- TODO: STATSLARI TYPE ENUM YAP -->
            <template v-if="currentRound === 0">
                Press START to begin
            </template>
            <template v-if="isRoundsFinished">
                All Rounds Finished!
            </template>
            <template v-if="isWaitingNextRound">
                Next round starting in 3...
            </template>
            <template v-else-if="currentRound !== 0 && !isRaceRunning">
                Race PAUSED
            </template>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use "sass:color";
@use "@/assets/styles/variables" as *;

.race-track {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 24%;
    gap: 10px;
    border-right: 4px solid red;
    position: relative;

    .race-track-overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        background-color: #808080b0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        text-shadow: 1px 1px 10px black;
    }

    .lanes {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        .lane {
            display: flex;
            align-items: center;
            position: relative;
            background: rgb(76 175 80);
            border-radius: 0.5rem;
            height: 60px;
            padding-left: 2rem;

            .lane-number {
                position: absolute;
                left: 0.5rem;
                font-weight: 600;
                rotate: -90deg;
            }

            .horse {
                width: 70px;
                height: 42px;
                background: url('@/assets/images/horse.png') no-repeat center/contain;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                animation-name: run;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
                background-size: 70px;

                &.paused {
                    animation-play-state: paused;
                }

                .horse-number {
                    width: 10px;
                    height: 12px;
                    position: absolute;
                    left: 41%;
                    top: 31%;
                    font-size: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-shadow: 1px 2px black;
                }
            }

        }

        @media (max-width: 480px) {
            height: 6%;
        }

    }

    .lap-info {
        text-align: center;
        margin-top: 1rem;
        font-weight: 600;
    }

    //mobile 
    @media (max-width: 480px) {
        max-height: 30%;
        min-height: 30%;
    }
}

@keyframes run {
    from {
        left: 0;
    }

    to {
        left: calc(100% - 60px);
    }
}
</style>
