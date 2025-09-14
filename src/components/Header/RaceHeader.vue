<script setup lang="ts">
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

const store = useStore()

const isRaceRunning = computed(() => store.state.race.isRunning)
const currentRound = computed(() => store.state.race.currentRound)
const isWaitingNextRound = computed(() => store.state.race.isWaitingNextRound)
const isRoundsFinished = computed(() => store.state.race.isRoundsFinished)

async function onGenerate() {
  await store.dispatch('resetAll')
  store.dispatch('horses/generateHorses')
  store.dispatch('schedule/generateSchedule')
}

function startRace() {
  store.dispatch('race/startRace')
}

function toggleRace() {
  if (currentRound.value === 0 && !isRaceRunning.value) {
    startRace()
  } else {
    store.dispatch('race/toggleRace')
  }
}

async function resetRace() {
  await store.dispatch('resetAll')
  onGenerate()
}

onMounted(() => {
  onGenerate()
})
</script>

<template>
  <header class="header">
    <h1 class="logo"><img src="../../assets/images/horse-race-logo.png" alt="" srcset=""></h1>
    <div class="header-actions">
      <button class="btn btn-secondary" v-on:click="onGenerate">Generate Program</button>
      <button class="btn " :class="isWaitingNextRound || isRoundsFinished ? 'btn-disabled' : 'btn-primary'"
        @click="toggleRace" :disabled="isWaitingNextRound">
       <!-- TODO: STATSLARI TYPE ENUM YAP -->
        <template v-if="currentRound === 0 && !isRaceRunning">START</template>
        <template v-else-if="isWaitingNextRound">WAITING..</template>
        <template v-else-if="isRaceRunning">PAUSE</template>
        <template v-else>RESUME</template>
      </button>
      <button class="btn btn-secondary" @click="resetRace">RESET</button>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '../../assets/styles/variables' as *;
@use '../../assets/styles/buttons';

// HEADER
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1rem;
  height: 10%;
  flex-direction: row;

  .logo {
    width: 180px;
    filter: drop-shadow(1px 1px 3px black);
    font-size: 1.5rem;
    font-weight: 700;
  }

  .header-actions {
    display: flex;
    gap: 0.75rem;
  }
}
</style>
