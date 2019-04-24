import { QuizPreviewModel } from "./quiz-preview";


export interface SubmissionPreviewModel extends QuizPreviewModel {
  readonly scoreString?: string;
}