import { Quiz } from "../../model/quiz";


export interface QuizCorrectionState {
  isLoading: boolean;
  quiz?: Quiz;
}