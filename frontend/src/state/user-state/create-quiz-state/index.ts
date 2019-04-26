import { Question } from "../../../model/question";
import { CreateQuestionState } from "./create-question-state";


export interface CreateQuizState {
  title?: string;
  description?: string;
  deadline?: string;
  questions: Question[];
  createQuestion?: CreateQuestionState;
}