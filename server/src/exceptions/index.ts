import { ApolloError, AuthenticationError } from "apollo-server-errors";

export function QuizNotFoundException(todoId: string): ApolloError {
  return new ApolloError(`No quiz with id '${todoId}' was found`, "QUIZ_NOT_FOUND");
}

export function QuizAleadySubmittedException(quizId: string): ApolloError {
  return new ApolloError(`Quiz with id '${quizId}' has been already submitted`, "QUIZ_ALREADY_SUBMITTED");
}

export function SubmissionNotFoundException(id: string): ApolloError {
  return new ApolloError(`No submission with id '${id}' was found`, "SUBMISSION_NOT_FOUND");
}

export function UnansweredQuestionException(questionId: string): ApolloError {
  return new ApolloError(`Question with id '${questionId}' has not been answered`, "UNANSWERED_QUESTION");
}

export function InvalidSingleChoiceAnswer(questionId: string): ApolloError {
  return new ApolloError(`Question with id '${questionId}' is a single choice question`, "INVALID_SIGNLE_CHOICE_ANSWER");
}

export function InconsistentAnswerException(questionId: string): ApolloError {
  return new ApolloError(`Answer to the question with id '${questionId}' is inconsistent, check the suggestions you picked or the question type`, "INCONSISTENT_ANSWER");
}

export function QuizDeadlineReached(quizId: string): ApolloError {
  return new ApolloError(`Quiz with id '${quizId}' has reached it's deadline`, "QUIZ_DEADLINE_REACHED");
}

export let UnauthenticatedException: ApolloError = new AuthenticationError('Missing or invalid authorization header');

export let UnauthorizedException: ApolloError = new ApolloError("Access denied to resource", "FORBIDDEN");