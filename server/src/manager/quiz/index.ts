import { Dto } from "../../model/dto";
import { Entity } from "../../model/entity";


export interface IQuizManager {
  createQuiz(quizData: Dto.Input.InsertQuizInput, author: Entity.User): Promise<Entity.Quiz>;
}