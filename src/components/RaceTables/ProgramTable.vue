<script setup lang="ts">
import type { Horse } from '@/core/models/Horse/horse.model';
import Card from '@/shared/Card/Card.vue';
import DataTable from '@/shared/DataTable/DataTable.vue';


defineProps<{
    roundId: number
    distance: number
    horses: Horse[]
}>()
</script>

<template>
    <Card :title="`Round ${roundId} – ${distance}m`">
        <DataTable :items="horses">
            <template #header>
                <th>Condition</th>
                <th>Name</th>
            </template>

            <template #row="{ item }">
                <td>{{ item.condition }}</td>
                <td>{{ item.name }}</td>
            </template>
        </DataTable>
    </Card>
</template>
