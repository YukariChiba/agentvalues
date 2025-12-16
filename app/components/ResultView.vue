<template>
    <v-container class="py-12" :class="mobile ? 'px-4' : ''" max-width="900">
        <div class="text-center mb-12">
            <div class="text-overline text-primary mb-2 letter-spacing-2">
                AgentValues
            </div>
            <h1
                class="font-weight-black text-white mb-2"
                :class="mobile ? 'text-h4' : 'text-h3'"
            >
                查看你的测试结果
            </h1>
            <p class="text-body-1 text-medium-emphasis">
                以下数据基于您的 {{ totalQuestions }} 项选择分析
            </p>
        </div>

        <v-row>
            <v-col cols="12" md="6">
                <v-card
                    :rounded="mobile ? 'lg' : 'xl'"
                    :elevation="mobile ? 0 : 4"
                    variant="elevated"
                    class="h-100 pa-6 result-card d-flex flex-column"
                >
                    <div class="flex-grow-1">
                        <div class="d-flex align-center mb-6">
                            <v-icon
                                icon="mdi-account-group"
                                color="primary"
                                class="mr-3"
                            />
                            <span class="text-h6 font-weight-bold"
                                >阵营倾向</span
                            >
                        </div>

                        <div class="text-center my-8">
                            <div
                                class="text-h5 font-weight-bold mb-2"
                                :class="`text-${alignmentColor}`"
                            >
                                {{ alignmentData.title }}
                            </div>
                            <div
                                class="text-caption text-medium-emphasis text-uppercase"
                            >
                                您的阵营倾向：{{ alignmentCode }}
                            </div>
                        </div>

                        <v-alert
                            class="mb-6 text-body-2 font-italic"
                            border="start"
                            :border-color="alignmentColor"
                            variant="tonal"
                            density="compact"
                        >
                            "{{ alignmentData.quote }}"
                        </v-alert>

                        <ResultBar :stats="results.find((i) => i.id == 'F')" />

                        <v-card-text
                            class="text-medium-emphasis"
                            style="line-height: 1.6"
                        >
                            {{ alignmentData.description }}
                        </v-card-text>
                    </div>
                    <v-divider />
                    <div class="d-flex flex-column align-center">
                        <GlyphDisplay :glyphs="alignmentData.glyph" />
                    </div>
                </v-card>
            </v-col>

            <v-col cols="12" md="6">
                <v-card
                    :rounded="mobile ? 'lg' : 'xl'"
                    :elevation="mobile ? 0 : 4"
                    variant="elevated"
                    class="h-100 pa-6 result-card d-flex flex-column"
                >
                    <div class="flex-grow-1">
                        <div class="d-flex align-center mb-6">
                            <v-icon
                                icon="mdi-fingerprint"
                                color="secondary"
                                class="mr-3"
                            />
                            <span class="text-h6 font-weight-bold"
                                >行为特征</span
                            >
                        </div>

                        <div class="text-center my-8">
                            <div
                                class="text-h5 font-weight-bold mb-2 text-white"
                            >
                                {{ axisData.title }}
                            </div>
                            <div
                                class="text-caption text-medium-emphasis text-uppercase"
                            >
                                您的行为特征：{{ axisCode }}
                            </div>
                        </div>

                        <v-alert
                            variant="tonal"
                            class="mb-6 text-body-2 font-italic"
                            density="compact"
                        >
                            "{{ axisData.quote }}"
                        </v-alert>

                        <div class="d-flex flex-column">
                            <ResultBar
                                v-for="(stat, key) in results.filter(
                                    (x) => x.id !== 'F',
                                )"
                                :key="key"
                                :stats="stat"
                            />
                        </div>

                        <v-card-text
                            class="text-medium-emphasis"
                            style="line-height: 1.6"
                        >
                            {{ axisData.description }}
                        </v-card-text>
                    </div>
                    <v-divider />
                    <div class="d-flex flex-column align-center">
                        <GlyphDisplay :glyphs="axisData.glyph" />
                    </div>
                </v-card>
            </v-col>
        </v-row>

        <v-alert
            density="compact"
            :rounded="mobile ? 'lg' : 'xl'"
            :elevation="mobile ? 0 : 4"
            variant="elevated"
            class="my-4 pa-4"
        >
            <v-list-item
                subtitle="欢迎向 GitHub 仓库提交 Pull Request！"
                title="结果不准确？/ 想要追加或更正？"
            >
                <template #append>
                    <v-btn
                        variant="outlined"
                        prepend-icon="mdi-github"
                        text="GitHub"
                        href="https://github.com/YukariChiba/AgentValues"
                    />
                </template>
            </v-list-item>
        </v-alert>
        <div class="d-flex justify-center mt-6 gap-4">
            <v-btn
                class="mx-2"
                rounded="pill"
                size="large"
                color="secondary"
                prepend-icon="mdi-share-variant"
                @click="share"
            >
                分享结果
            </v-btn>
            <v-btn
                class="mx-2"
                size="large"
                color="primary"
                rounded="pill"
                prepend-icon="mdi-refresh"
                @click="redo"
            >
                重启测试
            </v-btn>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";
import { useQuizStore } from "~/stores/quiz";
import { useDataStore } from "~/stores/data";
import type {
    AlignmentResult,
    AlignmentResults,
    AxisResult,
    AlignmentKey,
} from "~/types/quiz";
import alResRaw from "~/assets/data/result-alignment.json";
import axResRaw from "~/assets/data/result-axis.json";

const { mobile } = useDisplay();
const dataStore = useDataStore();
const quizStore = useQuizStore();
const route = useRoute();

const results = dataStore.scoresToAxisStats(route.query);

const { totalQuestions } = dataStore;

const alignmentCode = computed(() => {
    const f = results.find((x) => x.id === "F")?.sign;
    switch (f) {
        case "+":
            return "right";
        case "-":
            return "left";
        default:
            return "center";
    }
});

const alignmentColor = computed(() => {
    if (alignmentCode.value === "left") return "blue";
    if (alignmentCode.value === "right") return "green";
    return "";
});

const alignmentData = computed<AlignmentResult>(() => {
    const map: Record<AlignmentKey, string> = {
        left: "left",
        right: "right",
        center: "center",
    };
    return (alResRaw as AlignmentResults)[map[alignmentCode.value]];
});

const axisCode = computed(() => {
    const s = results.find((x) => x.id === "S")?.sign;
    const c = results.find((x) => x.id === "C")?.sign;
    const a = results.find((x) => x.id === "A")?.sign;
    return `S${s} C${c} A${a}`;
});

const axisData = computed<AxisResult>(() => {
    const raw = axResRaw as Record<string, AxisResult>;
    return raw[axisCode.value] || raw["S= C= A="];
});

const share = async () => {
    const shareData = {
        title: `AgentValues 立场测试结果：${axisData.value.title}`,
        text: `我的 Ingress 阵营立场是：${alignmentData.value.title} \n 我的 Ingress 行为特点是：${axisData.value.title}。`,
        url: window.location.href,
    };

    try {
        await navigator.share(shareData);
    } catch (err) {
        console.error("Share failed:", err);
    }
};

const redo = () => {
    quizStore.reset();
    useRouter().push("/");
};
</script>
