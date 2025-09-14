<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import type { RootState } from '@/stores'
import ProgramTable from './ProgramTable.vue'
import ResultsTable from './ResultsTable.vue'

//Başka yerde kullanmayacağım için burada tanımladım
type Tab = 'program' | 'results'

const store = useStore<RootState>()

const schedules = computed(() => store.getters['schedule/getRounds'])
const allResults = computed(() => store.getters['race/allResults'])


const activeTab = ref<Tab>('program')

const programCount = computed(() => schedules.value?.length ?? 0)
const resultsCount = computed(() => allResults.value?.length ?? 0)

function setTab(tab: Tab) {
    activeTab.value = tab
}
</script>

<template>
    <aside class="results-wrapper">
        <!-- Tabs -->
        <div class="tabs" role="tablist" aria-label="Race tables">
            <button class="tab" role="tab" :aria-selected="activeTab === 'program'"
                :tabindex="activeTab === 'program' ? 0 : -1" :class="{ 'tab--active': activeTab === 'program' }"
                @click="setTab('program')" type="button">
                Program <span class="badge">{{ programCount }}</span>
            </button>

            <button class="tab" role="tab" :aria-selected="activeTab === 'results'"
                :tabindex="activeTab === 'results' ? 0 : -1" :class="{ 'tab--active': activeTab === 'results' }"
                @click="setTab('results')" type="button">
                Results <span class="badge">{{ resultsCount }}</span>
            </button>
        </div>

        <!-- Panels -->
        <div class="program-tables" role="tabpanel" aria-labelledby="program-tab" v-show="activeTab === 'program'">
            <ProgramTable v-for="round in schedules" :key="round.id" :round-id="round.id" :distance="round.distance"
                :horses="round.participatingHorses" />
        </div>

        <div class="results-tables" role="tabpanel" aria-labelledby="results-tab" v-show="activeTab === 'results'">
            <ResultsTable :results="allResults" />
        </div>
    </aside>
</template>

<style scoped lang="scss">
.results-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-height: 25%;

    @media (max-width: 480px) {
        max-height: 50%;
    }
}

.tabs {
    display: inline-flex;
    gap: .5rem;
    background: rgba(255, 255, 255, .06);
    padding: .375rem;
    border-radius: .75rem;
    align-self: flex-start;
    width: 100%
}

.tab {
    border: 0;
    background: transparent;
    padding: .5rem .75rem;
    border-radius: .5rem;
    color: #cfd3dc;
    cursor: pointer;
    font-weight: 600;
    transition: background .2s ease, color .2s ease;
    width: 50%;

    &--active {
        background: rgba(255, 255, 255, .16);
        color: #fff;
    }

    .badge {
        margin-left: .5rem;
        font-size: .75rem;
        opacity: .85;
    }
}

.program-tables,
.results-tables {
    max-height: 350px;
    overflow: auto;
}
</style>
