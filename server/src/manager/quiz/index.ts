import { Dto } from "../../model/dto";
import { Entity } from "../../model/entity";
import { User } from "../../model/entity/user";


export interface IQuizManager {
  createQuiz(quizData: Dto.Input.InsertQuizInput, author: Entity.User): Promise<Entity.Quiz>;
  getSuggestionIsCorrect(user: User, suggestionId: string): Promise<boolean>;
}