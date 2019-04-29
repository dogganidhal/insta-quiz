import { Quiz } from "../../model/quiz";


export interface QuizResultState {
  isLoading: boolean;
  quiz?: Quiz;
}