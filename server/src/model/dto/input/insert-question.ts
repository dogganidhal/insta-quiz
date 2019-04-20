import { QuestionType } from "../../entity/question";
import { InsertSuggestionInput as InsertSuggestionInput } from "./insert-suggestion";


export interface InsertQuestionInput {
  content?: string;
  type?: QuestionType;
  suggestions: [InsertSuggestionInput];
}