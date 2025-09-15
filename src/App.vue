<script setup lang="ts">
import RaceHeader from './components/Header/RaceHeader.vue'
import RaceTrack from './components/Race/RaceTrack.vue'
import RaceHorseList from './components/Horse/RaceHorseList.vue'
import RaceTableWrapper from './components/RaceTables/RaceTableWrapper.vue'
</script>

<template>
  <div class="app">
    <!-- HEADER -->
    <RaceHeader />

    <main class="main">
      <!-- HORSE LIST -->
      <RaceHorseList />

      <!-- RACE TRACK -->
      <RaceTrack />

      <!-- PROGRAM & RESULTS -->
      <RaceTableWrapper />
    </main>
  </div>

</template>

<style scoped lang="scss">
@use "sass:string";
@use "sass:color";
@use './assets/styles/variables' as *;

.app {
  font-family: "Inter", sans-serif;
  background: #251d44;
  color: #2b2b2b;
  padding: 1rem;
  min-width: 100%;
  height: 100vh;
  color: white;
}

// MAIN LAYOUT
.main {
  display: grid;
  grid-template-columns: 350px 1fr 280px;
  gap: 1rem;
  height: 80vh;


  //mobilede overflow
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    height: 90%;
    overflow: auto;
  }
}
</style>
