<template>
    <v-container
        class="fill-height justify-center text-center flex-column"
        :class="mobile ? 'pa-4 pt-16' : 'pa-0'"
    >
        <v-card
            :rounded="mobile ? '0' : 'xl'"
            :elevation="mobile ? 0 : 8"
            :color="mobile ? 'transparent' : undefined"
            class="pa-8"
            :max-width="mobile ? '100%' : 600"
        >
            <div class="mb-6">
                <v-icon
                    icon="mdi-hexagon-multiple-outline"
                    size="80"
                    color="primary"
                />
            </div>
            <h1
                class="font-weight-bold mb-4"
                :class="mobile ? 'text-h4' : 'text-h3'"
            >
                AgentValues
            </h1>
            <p class="text-body-1 text-medium-emphasis mb-8">
                AgentValues 是基于当下 Ingress
                玩家群体状况设计的娱乐性立场测试。旨在通过
                {{ totalQuestions }}
                道问题，解析你的阵营倾向与游戏风格。
            </p>
            <v-btn
                size="x-large"
                color="primary"
                rounded="pill"
                prepend-icon="mdi-play"
                @click="emit('start')"
            >
                点击开始
            </v-btn>
        </v-card>
        <v-card class="pa-8" max-width="600" variant="plain">
            Made by @YukariChiba / v0.1.1 Beta
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
const dataStore = useDataStore();
const { totalQuestions } = storeToRefs(dataStore);
const emit = defineEmits<{
    (e: "start"): void;
}>();
</script>
