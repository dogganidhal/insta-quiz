import { QuestionType } from "../../entity/question";
import { InsertSuggestionObject as InsertSuggestionInput } from "./insert-suggestion";


export interface InsertQuestionInput {
  content?: string;
  type?: QuestionType;
  suggestions: [InsertSuggestionInput];
}