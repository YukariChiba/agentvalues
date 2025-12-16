<template>
    <v-card class="mx-2" variant="outlined">
        <v-card-title class="justify-center pa-1">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 500 500"
                preserveAspectRatio="xMinYMin meet"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
            >
                <foreignObject width="100%" height="100%">
                    <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        style="text-align: center"
                    >
                        <ruby>
                            <i
                                v-if="glyph"
                                :class="'ig-' + glyph.toLowerCase()"
                                class="glyph-char"
                            />
                            <i v-else class="glyph-char">&#12288;</i>
                            <rt>{{ glyph }}</rt>
                        </ruby>
                    </div>
                </foreignObject>
            </svg>
        </v-card-title>
    </v-card>
</template>

<script setup lang="ts">
import "@/assets/glyph.scss";

defineProps<{
    glyph: string;
}>();
</script>

<style lang="scss" scoped>
ruby {
    ruby-position: under;
    i {
        font-size: 400px;
    }
    rt {
        margin-top: 40px;
        font-size: 70px;
        font-weight: 300;
    }
}
</style>
