export interface Question {
  id: string;
  text: string;
  weights: Record<string, number>;
}

export interface QuestionGroup {
  title: string;
  data: Question[];
}
