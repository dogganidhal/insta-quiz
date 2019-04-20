import { Quiz } from "../../model/entity/quiz";
import { User } from "../../model/entity/user";



export interface IQuizRepository {
  getQuizzesOfUser(user: User): Promise<Quiz[]>;
  createQuiz(): Promise<Quiz>;
}