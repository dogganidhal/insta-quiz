import { Entity } from "../../model/entity";


export interface IQuizRepository {
  getQuizById(quizId: string): Promise<Entity.Quiz>;
  getQuizSubmissionForUser(userId: string): Promise<Entity.QuizSubmission[]>;
  getQuizzesOfUser(userId: string): Promise<Entity.Quiz[]>;
  createQuiz(): Promise<Entity.Quiz>;
}