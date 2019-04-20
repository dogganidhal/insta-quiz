import * as UserEntity from "./user";
import * as QuestionEntity from "./question";
import * as QuizEntity from "./quiz";
import * as QuizQuestionSubmissionEntity from "./quiz_question_submission";
import * as QuizQuestionSuggestionEntity from "./quiz_question_suggestion";
import * as QuizSubmissionEntity from "./quiz_submission";
import * as SuggestionEntity from "./suggestion";
import * as AnswerEntity from "./answer";


export module Entity {

  export import User = UserEntity.User;
  export import Question = QuestionEntity.Question;
  export import QuestionType = QuestionEntity.QuestionType;
  export import Quiz = QuizEntity.Quiz;
  export import QuizQuestionSuggestion = QuizQuestionSuggestionEntity.QuizQuestionSuggestion;
  export import QuizQuestionSubmission = QuizQuestionSubmissionEntity.QuizQuestionSubmission;
  export import QuizSubmission = QuizSubmissionEntity.QuizSubmission;
  export import Suggestion = SuggestionEntity.Suggestion;
  export import Answer = AnswerEntity.Answer;

}