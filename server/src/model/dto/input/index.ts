import * as InsertQuestionDto from "./insert-question";
import * as InsertQuizDto from "./insert-quiz";
import * as InsertSuggestionDto from "./insert-suggestion";
import * as InsertSubmissionDto from "./insert-submission";
import * as InsertAnswerDto from "./insert-answer";
import * as InsertQuestionSubmissionDto from "./insert-question-submission";


export module Input {

  export import InsertQuestionInput = InsertQuestionDto.InsertQuestionInput;
  export import InsertQuizInput = InsertQuizDto.InsertQuizInput;
  export import InsertSuggestionInput = InsertSuggestionDto.InsertSuggestionInput;
  export import InsertSubmissionInput = InsertSubmissionDto.InsertSubmissionInput;
  export import InsertAnswerInput = InsertAnswerDto.InsertAnswerInput;
  export import InsertQuestionSubmissionInput = InsertQuestionSubmissionDto.InsertQuestionSubmissionInput;

}