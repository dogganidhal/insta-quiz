import { QuestionType } from "./question";
import { InsertSuggestionInput } from "./insert-suggestion-input";



export interface InsertQuestionInput {
  content: string;
  type: QuestionType;
  points?: number;
  suggestions?: InsertSuggestionInput[];
}