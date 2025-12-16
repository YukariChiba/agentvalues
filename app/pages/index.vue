<template>
    <div class="h-100 d-flex flex-column">
        <transition name="fade" mode="out-in">
            <InitialView
                v-if="currentStage == Stage.INITIAL"
                key="initial"
                @start="currentStage = Stage.TERMS"
            />
            <TermsView
                v-else-if="currentStage == Stage.TERMS"
                key="terms"
                @continue="currentStage = Stage.QUIZ"
                @back="currentStage = Stage.INITIAL"
            />
            <QuizCard v-else-if="currentStage == Stage.QUIZ" key="quiz" />
        </transition>
    </div>
</template>

<script setup lang="ts">
enum Stage {
    INITIAL,
    TERMS,
    QUIZ,
}

const currentStage: Ref<Stage> = ref(Stage.INITIAL);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
