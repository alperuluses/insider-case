<script setup lang="ts">
import type { Horse } from '@/core/models/Horse/horse.model';
import type { RootState } from '@/stores';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore<RootState>()
const allHorses = computed<Horse[]>(() => store.state.horses.allHorses)
</script>

<template>
    <aside class="card horse-list">
        <h2 class="horse-list-title">Horse List</h2>
        <ul class="list">
            <li v-for="horse in allHorses" class="list-item">
                <span class="color-dot" :class="horse.color">
                    <img src="../../assets/images/horse-head.png" alt="" srcset="">
                </span>
                <div class="horse-attributes">
                    <span class="name">{{ horse.name }}</span>
                    <div class="horse-condition">
                        <span class="condition-bar" :style="{ width: horse.condition + '%' }"></span>
                    </div>
                    <span class="condition">Condition: {{ horse.condition }}%</span>
                </div>
            </li>
        </ul>
    </aside>
</template>


<style scoped lang="scss">
@use "sass:color";
@use "@/assets/styles/variables" as *;

.horse-list {
    max-height: 80vh;
    background-color: $card-bg;
    color: white;
    border-radius: 10px;
    text-align: center;

    .horse-list-title {
        text-align: center;
        margin-top: 10px;
    }

    .search {
        width: 30%;
        padding: 0.5rem;
        border: 1px solid $border;
        border-radius: 0.5rem;
        margin-bottom: 0.75rem;
    }

    .list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        overflow: auto;
        max-height: 80%;
        margin: 20px;

        .list-item {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.4rem 0;
            font-size: 0.9rem;
            background-color: $card-item-bg;
            color: white;
            padding: 25px;
            border-radius: 5px;
            gap: 10px;
            width: 250px;

            .horse-attributes {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;
                width: 100px;
                word-break: break-word;
                max-height: 30%;

                .horse-condition {
                    width: 100%;
                    background-color: #1d163c;
                    border-radius: 10px;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    height: 15px;

                    .condition-bar {
                        font-weight: 600;
                        background-color: #b374f9;
                        height: 100%;
                        border-radius: 10px;
                        width: 80%;
                        display: inline-block;
                        text-align: center;
                    }

                }

                .condition {
                    align-self: start;
                    color: #8c88af;
                }
            }

            .color-dot {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                margin-right: 0.4rem;
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    width: 70%;
                    filter: drop-shadow(0px 3px 2px gray);
                }
            }

            .name {
                flex: 1;
                margin-left: 0.4rem;
            }


        }

        @media (max-width: 480px) {
            flex-direction: row;
        }
    }

    @media (max-width: 480px) {
        max-height: 30%;
    }
}
</style>