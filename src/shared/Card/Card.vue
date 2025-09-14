<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
    <div class="card text-center">
        <h2 v-if="title" class="card-title">{{ title }}</h2>
        <slot />
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.card {
    background: $card-bg;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    margin-bottom: 10px;

    .card-title {
        font-weight: 600;
        margin-bottom: 0.75rem;
    }
}
</style>
