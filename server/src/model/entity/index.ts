import * as UserEntity from "./user";
import * as QuestionEntity from "./question";
import * as QuizEntity from "./quiz";
import * as SubmissionEntity from "./submission";
import * as SuggestionEntity from "./suggestion";
import * as AnswerEntity from "./answer";


export module Entity {

  export import User = UserEntity.User;
  export import Question = QuestionEntity.Question;
  export import QuestionType = QuestionEntity.QuestionType;
  export import Quiz = QuizEntity.Quiz;
  export import Submission = SubmissionEntity.Submission;
  export import Suggestion = SuggestionEntity.Suggestion;
  export import Answer = AnswerEntity.Answer;

}