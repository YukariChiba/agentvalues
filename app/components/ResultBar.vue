<template>
    <div class="py-2">
        <!-- Label Row -->
        <div
            class="d-flex justify-space-between text-caption text-medium-emphasis mb-2 px-1"
        >
            <div
                class="d-flex align-center"
                :class="{ 'font-weight-bold': isLeft }"
                :style="{ color: isLeft ? activeColor : '' }"
            >
                <v-icon
                    :icon="currentAxisDescr?.lefticon"
                    size="large"
                    class="mr-2"
                />
                {{ currentAxisDescr?.left }}
            </div>

            <div class="font-weight-bold text-grey-darken-1">
                {{ stats.id }} ({{ currentAxisDescr?.title || "Unknown" }})
            </div>

            <div
                class="d-flex align-center"
                :class="{ 'font-weight-bold': isRight }"
                :style="{ color: isRight ? activeColor : '' }"
            >
                {{ currentAxisDescr?.right }}
                <v-icon
                    :icon="currentAxisDescr?.righticon"
                    size="large"
                    class="ml-2"
                />
            </div>
        </div>

        <!-- Custom Progress Bar -->
        <div class="progress-track">
            <!-- Center Line -->
            <div class="center-line" />

            <!-- Active Bar -->
            <div class="progress-fill" :style="fillStyle" />
        </div>

        <!-- Percentage Label (Optional, centered below) -->
        <div class="d-flex justify-center mt-1">
            <span class="text-caption text-disabled font-mono">
                {{ (Math.abs(stats.percent - 50) * 2).toFixed(0) }}% ({{
                    stats.sign
                }})
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { AxisStat } from "~/types/quiz";
import axisdescrraw from "@/assets/data/axis.json";
import type { AxisDescription } from "~/types/axis";

const axisDescr: Record<string, AxisDescription> = axisdescrraw;
const props = defineProps<{
    stats: AxisStat;
}>();

const currentAxisDescr = computed(() => axisDescr[props.stats.id]);

// Determine direction
const isLeft = computed(() => props.stats.sign == "-");
const isRight = computed(() => props.stats.sign == "+");

// Determine active color
const activeColor = computed(() => {
    if (isLeft.value) return currentAxisDescr.value?.leftcolor || "#fff";
    if (isRight.value) return currentAxisDescr.value?.rightcolor || "#fff";
    return "#999";
});

// Calculate bar styles
const fillStyle = computed(() => {
    const p = props.stats.percent;
    let left = "50%";
    let width = "0%";

    if (p < 50) {
        // Left side: starts at p%, width is distance to 50%
        left = `${p}%`;
        width = `${50 - p}%`;
    } else {
        // Right side: starts at 50%, width is distance from 50%
        left = "50%";
        width = `${p - 50}%`;
    }

    return {
        left,
        width,
        backgroundColor: activeColor.value,
        boxShadow: `0 0 10px ${activeColor.value}40`, // Add subtle glow
    };
});
</script>

<style scoped>
.progress-track {
    position: relative;
    width: 100%;
    height: 8px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    overflow: hidden;
}

.center-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateX(-50%);
    z-index: 1;
}

.progress-fill {
    position: absolute;
    top: 0;
    bottom: 0;
    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 2px;
}

.font-mono {
    font-family: monospace;
}
</style>
