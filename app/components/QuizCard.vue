<template>
    <v-container class="fill-height justify-center pa-0">
        <v-card
            v-if="currentQuestion"
            :elevation="mobile ? 0 : 4"
            :rounded="mobile ? 0 : 'xl'"
            class="mx-auto d-flex flex-column"
            :class="mobile ? 'h-100 w-100' : 'w-100'"
            :max-width="mobile ? '100%' : 600"
        >
            <v-progress-linear
                :model-value="progress"
                color="secondary"
                height="6"
                striped
            />

            <v-card-item class="pt-2 pb-2" :class="mobile ? 'px-6' : ''">
                <div class="text-overline text-medium-emphasis mb-4">
                    {{ currentGroup?.title || "" }} •
                    {{ currentQuestionIndex + 1 }} /
                    {{ currentGroup?.data.length || 0 }} • 共
                    {{ totalQuestions }} 题
                </div>
                <div
                    :class="mobile ? 'text-h6' : 'text-h5'"
                    class="font-weight-bold ml-2"
                    style="line-height: 1.4; min-height: 80px"
                >
                    {{ currentQuestion.text }}
                </div>
            </v-card-item>

            <v-divider class="my-2" />

            <v-card-text
                class="d-flex flex-column justify-center"
                :class="mobile ? 'flex-grow-1 px-6' : ''"
            >
                <v-btn
                    v-for="opt in options"
                    :key="opt.value"
                    :color="opt.color"
                    :variant="selected === opt.value ? 'flat' : 'tonal'"
                    :height="mobile ? 64 : 54"
                    class="justify-start text-body-1 my-1"
                    @click="answerQuestion(opt.value)"
                >
                    <v-icon :icon="opt.icon" start />
                    {{ opt.label }}
                </v-btn>
            </v-card-text>

            <v-card-actions class="justify-space-between pa-4">
                <v-btn
                    variant="text"
                    prepend-icon="mdi-arrow-left"
                    :disabled="
                        currentGroupIndex === 0 && currentQuestionIndex === 0
                    "
                    @click="prev"
                >
                    返回上一题
                </v-btn>
                <v-btn
                    v-if="isFinished"
                    text="计算结果"
                    color="success"
                    append-icon="mdi-arrow-right"
                    @click="calcResult"
                />
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
const dataStore = useDataStore();
const { totalQuestions } = dataStore;

const quizStore = useQuizStore();
const {
    currentQuestion,
    currentGroup,
    currentGroupIndex,
    currentQuestionIndex,
    progress,
    answers,
    isFinished,
    scores,
} = storeToRefs(quizStore);
const { answerQuestion, prev } = quizStore;

const calcResult = () => {
    if (isFinished) {
        useRouter().push({ path: "/result/", query: scores.value });
    }
};
const selected = computed(() => answers.value[currentQuestion.value.id]);

const options = [
    { label: "强烈赞同", value: 2, color: "success", icon: "mdi-check-circle" },
    { label: "赞同", value: 1, color: "success", icon: "mdi-check" },
    { label: "中立 / 不确定", value: 0, color: "grey", icon: "mdi-minus" },
    { label: "反对", value: -1, color: "error", icon: "mdi-close" },
    { label: "强烈反对", value: -2, color: "error", icon: "mdi-close-octagon" },
];
</script>
