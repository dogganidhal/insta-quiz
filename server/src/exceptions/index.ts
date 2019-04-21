import { ApolloError, AuthenticationError } from "apollo-server-errors";

export function QuizNotFoundException(todoId: string): ApolloError {
  return new ApolloError(`No quiz with id '${todoId}' was found`, "QUIZ_NOT_FOUND");
}

export function UserAleadyExistsException(email: string): ApolloError {
  return new ApolloError(`User with email '${email}' already exists`, "USER_ALREADY_EXISTS");
}

export function SubmissionNotFoundException(id: string): ApolloError {
  return new ApolloError(`No submission with id '${id}' was found`, "SUBMISSION_NOT_FOUND");
}

export let WrongPasswordException: ApolloError = new ApolloError(`Password does not match our records`, "WRONG_PASSWORD");

export let UnauthenticatedException: ApolloError = new AuthenticationError('Missing or invalid authorization header');

export let UnauthorizedException: ApolloError = new ApolloError("Access denied to resource", "FORBIDDEN");