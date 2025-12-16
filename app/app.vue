<template>
    <v-app>
        <v-main>
            <NuxtPage />
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk
            ? `AgentValues - ${titleChunk}`
            : "AgentValues - Ingress 立场测试";
    },
});

useSeoMeta({
    title: "Ingress 立场测试",
    description:
        "基于 Ingress 玩家群体状况设计的立场测试，解析你的阵营倾向与游戏风格。",
    ogTitle: "AgentValues - Ingress 立场测试",
    ogDescription:
        "基于 Ingress 玩家群体状况设计的立场测试，解析你的阵营倾向与游戏风格。",
    ogImage: "https://agentvalues.0x7f.cc/og_image.png",
    twitterCard: "summary_large_image",
    themeColor: "#000000",
});
</script>
