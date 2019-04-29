import { Question } from "../../../model/question";
import { Suggestion, CheckableSuggestion } from "../../../model/suggestion";



export interface AnswerQuestionState {
  readonly question: Question;
  readonly suggestions: CheckableSuggestion[];
  readonly content?: string;
}