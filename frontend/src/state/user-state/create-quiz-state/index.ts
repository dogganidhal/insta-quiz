import { CreateQuestionState } from "./create-question-state";
import { InsertQuestionInput } from "../../../model/insert-question-input";


export interface CreateQuizState {
  title?: string;
  description?: string;
  deadline?: string;
  questions: InsertQuestionInput[];
  createQuestion?: CreateQuestionState;
}