<template>
    <ResultView v-if="isResultQuery(route.query)" />
    <NullResultView v-else />
</template>

<script setup lang="ts">
import type { LocationQuery } from "vue-router";

const route = useRoute();

const isResultQuery = (q: LocationQuery) => {
    return !!q.S && !!q.C && !!q.A && !!q.F;
};
</script>
