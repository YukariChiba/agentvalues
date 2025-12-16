<template>
    <v-card max-width="400px" class="gap-2 my-4" variant="text">
        <v-card-title class="text-center text-medium-emphasis">
            属于你的 Glyph 序列
        </v-card-title>
        <div class="d-flex justify-center gap-2 my-4">
            <GlyphChar v-for="g in glyphs" :key="g" :glyph="g" />
        </div>
    </v-card>
</template>

<script setup lang="ts">
defineProps<{ glyphs: string[] }>();
</script>
