<script setup lang="ts">
import type { Horse } from '@/core/models/Horse/horse.model';
import Card from '@/shared/Card/Card.vue';
import DataTable from '@/shared/DataTable/DataTable.vue';
import goldIcon from '@/assets/images/gold-medal.png'
import silverIcon from '@/assets/images/silver-medal.png'
import bronzeIcon from '@/assets/images/bronze-medal.png'

interface RoundResult {
    roundId: number
    horses: Horse[]
}

defineProps<{ results: RoundResult[] }>()

const medalIcons = [goldIcon, silverIcon, bronzeIcon]
const medalLabels = ['1st place', '2nd place', '3rd place']
</script>

<template>
    <div class="text-center" v-if="results.length <= 0"><span>WAITING FOR RESULTS</span></div>
    <Card v-for="round in results" :key="round.roundId" :title="`Round ${round.roundId} Results`">
        <DataTable :items="round.horses">
            <template #header>
                <th>Position</th>
                <th>Name</th>
            </template>

            <template #row="{ item, index }">
                <td class="d-flex justify-center">
                    <img v-if="index < 3" :src="medalIcons[index]" :alt="medalLabels[index]"
                        class="medal-icon medal-glow" :class="`glow-${index + 1}`" />
                    <span v-if="index >= 3">{{ index + 1 }}</span>
                </td>
                <td>{{ item.name }}</td>
            </template>
        </DataTable>
    </Card>
</template>

<style>
.medal-icon {
    width: 30px;
}

.medal-glow {
    animation: glowPulse 1.8s ease-in-out infinite alternate;
    will-change: transform, filter;
}
</style>
