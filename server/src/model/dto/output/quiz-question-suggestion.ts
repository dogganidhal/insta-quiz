import { QuizQuestionSubmission } from "./quiz-question-submission";
import { Suggestion } from "./suggestion";


/*
type QuizQuestionSuggestion {
  id: ID!
  questionSubmissionId: ID!
  questionSubmission: QuizQuestionSubmission!
  sugesstionId: ID!
  suggestion: Suggestion!
}
*/

export class QuizQuestionSuggestion {

  public id: string;
  public questionSubmissionId: string;
  public questionSubmission: QuizQuestionSubmission;
  public suggestionId: string;
  public suggestion: Suggestion;
  
}