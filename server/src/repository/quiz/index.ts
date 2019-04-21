import { Entity } from "../../model/entity";


export interface IQuizRepository {
  getQuestionById(questionId: string): Promise<Entity.Question>;
  getSuggestionsById(suggestionId: string): Promise<Entity.Suggestion>;
  getSubmissionByUserIdAndQuizId(id: string, quizId: string): Promise<Entity.Submission>;
  getAnswersByQuestionId(questionId: string): Promise<Entity.Answer[]>;
  getSuggestionsByQuestionId(questionId: string): Promise<Entity.Suggestion[]>;
  getSubmissionsByQuizId(quizId: string): Promise<Entity.Submission[]>;
  getQuestionsByQuizId(quizId: string): Promise<Entity.Question[]>;
  createSuggestion(suggestion: Entity.Suggestion): Promise<Entity.Suggestion>;
  createQuestion(question: Entity.Question): Promise<Entity.Question>;
  getQuizById(quizId: string): Promise<Entity.Quiz>;
  getSubmissionsForUser(userId: string): Promise<Entity.Submission[]>;
  getQuizzesOfUser(userId: string): Promise<Entity.Quiz[]>;
  createQuiz(quiz: Entity.Quiz): Promise<Entity.Quiz>;
}