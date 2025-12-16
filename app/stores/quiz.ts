import { defineStore } from "pinia";

export const useQuizStore = defineStore("quiz", () => {
  const dataStore = useDataStore();

  const currentGroupIndex = ref(0);
  const currentQuestionIndex = ref(0);
  const answers = ref<Record<string, number>>({}); // questionId -> multiplier (-2 to 2)

  const currentGroup = computed(
    () => dataStore.questions[currentGroupIndex.value],
  );
  const currentQuestion = computed(
    () => currentGroup.value?.data[currentQuestionIndex.value],
  );

  const answeredCount = computed(() => Object.keys(answers.value).length);
  const progress = computed(
    () => (answeredCount.value / dataStore.totalQuestions) * 100,
  );

  const isFinished = ref(false);

  function answerQuestion(weight: number) {
    if (!currentQuestion.value) return;

    answers.value[currentQuestion.value.id] = weight;
    next();
  }

  function next() {
    if (currentQuestionIndex.value < currentGroup.value.data.length - 1) {
      currentQuestionIndex.value++;
    } else if (currentGroupIndex.value < dataStore.questions.length - 1) {
      currentGroupIndex.value++;
      currentQuestionIndex.value = 0;
    } else {
      isFinished.value = true;
    }
  }

  function prev() {
    isFinished.value = false;
    if (currentQuestionIndex.value > 0) {
      currentQuestionIndex.value--;
    } else if (currentGroupIndex.value > 0) {
      currentGroupIndex.value--;
      currentQuestionIndex.value = currentGroup.value.data.length - 1;
    }
  }

  function reset() {
    currentGroupIndex.value = 0;
    currentQuestionIndex.value = 0;
    answers.value = {};
    isFinished.value = false;
  }

  const scores = computed(() => {
    const scores: Record<string, number> = {};

    // Calculate raw scores
    dataStore.questions.forEach((g) => {
      g.data.forEach((q) => {
        const ans = answers.value[q.id] || 0;
        Object.entries(q.weights).forEach(([axis, weight]) => {
          scores[axis] = (scores[axis] || 0) + weight * ans;
        });
      });
    });

    return scores;
  });

  return {
    currentGroup,
    currentQuestion,
    currentGroupIndex,
    currentQuestionIndex,
    progress,
    answers,
    isFinished,
    scores,
    answerQuestion,
    prev,
    reset,
  };
});
