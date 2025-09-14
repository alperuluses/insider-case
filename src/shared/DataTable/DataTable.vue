<script setup lang="ts">
defineProps<{ items: any[] }>()
</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <slot name="header" />
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in items" :key="index">
                <slot name="row" :item="item" :index="index" />
            </tr>
        </tbody>
    </table>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 10px;

    th,
    td {
        padding: 0.4rem;
        text-align: left;
        border-bottom: 1px solid $border;
    }

    th {
        font-weight: 600;
        color: $text;
    }
}
</style>
