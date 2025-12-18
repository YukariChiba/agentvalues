<template>
    <v-container class="py-12" :class="mobile ? 'px-4' : ''" max-width="1200">
        <div class="text-center mb-12">
            <div class="text-overline text-primary mb-2 letter-spacing-2">
                AgentValues
            </div>
            <h1
                class="font-weight-black text-white mb-2"
                :class="mobile ? 'text-h4' : 'text-h3'"
            >
                参考数据
            </h1>
            <p class="text-body-1 text-medium-emphasis">
                AgentValues 所有的阵营立场、行为特征与 Machina 等级说明
            </p>
        </div>

        <div class="d-flex align-center mb-6">
            <v-icon icon="mdi-axis-arrow" class="mr-3" color="primary" />
            <h2 class="font-weight-bold">主要坐标轴</h2>
        </div>
        <v-card class="mb-12 border-opacity-25" rounded="xl">
            <v-table class="bg-transparent">
                <thead>
                    <tr>
                        <th class="text-left">标识</th>
                        <th class="text-left">维度名称</th>
                        <th class="text-left">低数值 (-)</th>
                        <th class="text-left">高数值 (+)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(descr, id) in axisdescr" :key="id">
                        <td class="font-mono font-weight-bold">
                            {{ id }}
                        </td>
                        <td>{{ descr.title }}</td>
                        <td>
                            <v-chip
                                size="small"
                                :color="descr.leftcolor"
                                variant="tonal"
                                >{{ descr.left }}</v-chip
                            >
                        </td>
                        <td>
                            <v-chip
                                size="small"
                                :color="descr.rightcolor"
                                variant="tonal"
                                >{{ descr.right }}</v-chip
                            >
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>

        <section class="mb-12">
            <div class="d-flex align-center mb-6">
                <v-icon
                    icon="mdi-account-group"
                    class="mr-3"
                    color="secondary"
                />
                <h2 class="font-weight-bold">阵营倾向</h2>
            </div>
            <v-row>
                <v-col
                    v-for="(data, key) in alignmentResults"
                    :key="key"
                    cols="12"
                    md="4"
                >
                    <v-card
                        height="100%"
                        variant="elevated"
                        rounded="xl"
                        class="pa-4"
                    >
                        <div class="text-overline mb-2">
                            {{ key.toUpperCase() }}
                        </div>
                        <h3 class="text-h6 font-weight-bold mb-4">
                            {{ data.title }}
                        </h3>
                        <p class="text-body-2 text-medium-emphasis mb-6">
                            {{ data.description }}
                        </p>
                        <v-spacer />
                        <div class="d-flex justify-center border-top pt-4">
                            <GlyphChar
                                v-for="g in data.glyph"
                                :key="g"
                                :glyph="g"
                                style="width: 90px; height: 90px"
                            />
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </section>

        <section class="mb-12">
            <div class="d-flex align-center mb-6">
                <v-icon icon="mdi-virus" class="mr-3" color="red" />
                <h2 class="font-weight-bold">Machina 混乱指数</h2>
            </div>
            <v-row>
                <v-col
                    v-for="(data, key) in machinaResults"
                    :key="key"
                    cols="12"
                    md="4"
                >
                    <v-card
                        height="100%"
                        variant="elevated"
                        rounded="xl"
                        class="pa-4"
                    >
                        <div
                            class="text-overline mb-2"
                            :style="`color: ${data.color}`"
                        >
                            {{ key.toUpperCase() }}
                        </div>
                        <h3
                            class="text-h6 font-weight-bold mb-4"
                            :style="`color: ${data.color}`"
                        >
                            {{ data.title }}
                        </h3>
                        <p class="text-body-2 text-medium-emphasis mb-6">
                            {{ data.description }}
                        </p>
                    </v-card>
                </v-col>
            </v-row>
        </section>

        <section class="mb-12">
            <div class="d-flex align-center mb-6">
                <v-icon icon="mdi-fingerprint" class="mr-3" color="secondary" />
                <h2 class="font-weight-bold">行为特征组合</h2>
            </div>
            <v-row>
                <v-col
                    v-for="(data, code) in axisResults"
                    :key="code"
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-card class="pa-4 h-100" rounded="lg">
                        <div class="font-mono text-caption text-secondary mb-1">
                            {{ code }}
                        </div>
                        <div class="text-h6 font-weight-bold mb-2">
                            {{ data.title }}
                        </div>
                        <div class="text-caption text-medium-emphasis">
                            {{ data.description }}
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </section>
    </v-container>
</template>

<script setup lang="ts">
import axisdescr from "@/assets/data/axis.json";
import alResRaw from "@/assets/data/result-alignment.json";
import axResRaw from "@/assets/data/result-axis.json";
import maResRaw from "@/assets/data/result-machina.json";
import type {
    AlignmentResults,
    AxisResult,
    MachinaResults,
} from "~/types/quiz";
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();

const alignmentResults = alResRaw as AlignmentResults;
const axisResults = axResRaw as Record<string, AxisResult>;
const machinaResults = maResRaw as MachinaResults;

useHead({
    title: "特性参考",
});
</script>
