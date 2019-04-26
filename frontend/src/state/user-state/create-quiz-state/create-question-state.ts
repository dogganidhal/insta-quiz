import { QuestionType } from "../../../model/question";
import { InsertSuggestionInput } from "../../../model/insert-suggestion-input";
import { CreateSuggestionState } from "./create-suggestion-state";


export interface CreateQuestionState {
  type: QuestionType;
  content?: string;
  points?: number;
  createSuggestion: CreateSuggestionState;
  suggestions?: InsertSuggestionInput[];
}