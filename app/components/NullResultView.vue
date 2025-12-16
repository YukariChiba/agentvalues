<template>
    <v-container class="fill-height justify-center pa-0">
        <v-card rounded="xl" class="pa-8" max-width="500" elevation="8">
            <v-empty-state
                headline="404 Not Found"
                title="找不到您想访问的数据"
                text="是否来错了地方？如果您需要进行测试，可以点击下面的按钮。"
                icon="mdi-alert"
                action-text="开始测试"
                to="/"
            />
        </v-card>
    </v-container>
</template>
