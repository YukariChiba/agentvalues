import { defineStore } from "pinia";
import type { QuestionGroup } from "~/types/questions";
import rawQuestions from "~/assets/generated/questions.json";
import rawBounds from "~/assets/generated/bounds.json";
import rawAxisDescriptions from "~/assets/data/axis.json";
import type { AxisBounds } from "~/types/bound";
import type { AxisDescription } from "~/types/axis";
import type { AxisStat } from "~/types/quiz";

// Fisher-Yates Shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const useDataStore = defineStore("data", () => {
  const shuffledQuestions = rawQuestions.map((group) => ({
    ...group,
    data: shuffleArray(group.data),
  }));

  const questions = ref<QuestionGroup[]>(shuffledQuestions);
  const bounds = ref<Record<string, AxisBounds>>(rawBounds);
  const axisdescriptions =
    ref<Record<string, AxisDescription>>(rawAxisDescriptions);
  const totalQuestions = ref<number>(
    questions.value.reduce((acc, g) => acc + g.data.length, 0),
  );
  const getSign = (val: number, max: number) => {
    const ratio = val / (max || 1); // Avoid div 0
    if (ratio > 0.3) return "+"; // Using 25% threshold for better separation
    if (ratio < -0.3) return "-";
    return "=";
  };

  const scoresToAxisStats = (rec: Record<string, number>): AxisStat[] => {
    return Object.keys(rec).map((k) => {
      const score = rec[k] || 0;
      const b = bounds.value[k] || { max: 1, min: -1 };
      let percent = 50;

      if (score > 0) percent = 50 + (score / b.max) * 50;
      else percent = 50 - (Math.abs(score) / Math.abs(b.min)) * 50;

      const sign = getSign(score, b.max);
      return { id: k, sign, percent };
    });
  };
  return {
    questions,
    bounds,
    axisdescriptions,
    totalQuestions,
    scoresToAxisStats,
  };
});
