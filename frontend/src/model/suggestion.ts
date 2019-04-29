import { Question } from "./question";


export interface Suggestion {
  readonly id: string;
  readonly questionId: string;
  readonly question: Question;
  readonly content?: string;
  readonly imageUrl?: string;
}

export type CheckableSuggestion = Suggestion & { isChecked: boolean };
export type SuggestionWithCorrection = Suggestion & { isCorrect: boolean };