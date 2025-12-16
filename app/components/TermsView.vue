<template>
    <v-container class="fill-height justify-center pa-0">
        <v-card
            class="d-flex flex-column"
            :class="mobile ? 'h-100 w-100' : 'pa-8 rounded-xl'"
            :max-width="mobile ? '100%' : 600"
            :elevation="mobile ? 0 : 8"
            :rounded="mobile ? 0 : 'xl'"
        >
            <v-card-title :class="mobile ? 'pt-6 px-6' : ''">
                测试说明
            </v-card-title>
            <v-card-text :class="mobile ? 'px-6' : ''">
                你将会看到一系列观点，请点击按钮选择你对于每个观点的看法。
            </v-card-text>
            <v-card-text :class="mobile ? 'px-6 flex-grow-1' : ''">
                <v-alert
                    class="ma-1"
                    density="compact"
                    icon="mdi-information"
                    variant="tonal"
                    type="warning"
                >
                    <b>提示</b>：本测试的意图在于评估你的 Ingress
                    观念，若对题目摇摆不定，请跟着第一感觉走；若对某道题难以理解，可试着思考题目观点的对立面。
                </v-alert>
                <v-alert
                    class="ma-1"
                    density="compact"
                    icon="mdi-alert"
                    variant="tonal"
                    type="error"
                >
                    <b>声明</b
                    >：为了保证本测试的区分度，可能会出现高度偏激或有冒犯性的内容，题目观点并不代表制作者的观点。部分题目的行为违反了
                    Ingress TOS，请勿模仿。
                </v-alert>
                <v-alert
                    class="ma-1"
                    density="compact"
                    icon="mdi-eye-off"
                    variant="tonal"
                    type="info"
                >
                    <b>隐私声明</b
                    >：本测试完全由前端实现，代码全部开源，我们不会收集你的任何个人信息。
                </v-alert>
                <v-alert
                    class="ma-1"
                    density="compact"
                    icon="mdi-information"
                    variant="tonal"
                    type="warning"
                >
                    <b>有效性声明</b>：本测试部分内容来自
                    <a href="https://arxiv.org/pdf/2103.00037">参考文献</a
                    >，内容仅供娱乐，仅代表您回答的问题反映出的特点，不一定与实际情况相符。
                </v-alert>
            </v-card-text>
            <v-card-actions class="justify-space-between pa-4">
                <v-btn
                    variant="text"
                    prepend-icon="mdi-arrow-left"
                    @click="$emit('back')"
                >
                    返回
                </v-btn>
                <v-btn
                    text="接受并开始"
                    color="success"
                    append-icon="mdi-arrow-right"
                    @click="emit('continue')"
                />
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
const emit = defineEmits<{
    (e: "continue" | "back"): void;
}>();
</script>
