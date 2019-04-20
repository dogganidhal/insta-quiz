import * as UserDto from "./user";
import * as AnswerDto from "./answer";
import * as AuthCredentialsDto from "./auth-credentials";
import * as QuestionDto from "./question";
import * as QuizSubmissionDto from "./submission";
import * as QuizDto from "./quiz";
import * as SuggestionDto from './suggestion';

export module Output {

  export import User = UserDto.User;  
  export import Answer = AnswerDto.Answer;
  export import AuthCredentials = AuthCredentialsDto.AuthCredentials;
  export import Question = QuestionDto.Question;
  export import Submission = QuizSubmissionDto.Submission;
  export import Quiz = QuizDto.Quiz;
  export import Suggestion = SuggestionDto.Suggestion;

}