import { IQuizRepository } from ".";
import { injectable, inject } from "inversify";
import { Types } from "../../constants/types";
import { Connection } from "typeorm";
import { Entity } from "../../model/entity";


@injectable()
export class QuizRepositoryImpl implements IQuizRepository {

  @inject(Types.DatabaseConnection) private readonly connection: Connection;
  
  public async getQuizzesOfUser(userId: string): Promise<Entity.Quiz[]> {
    let repository = this.connection.getRepository(Entity.Quiz);
    return await repository.find({ authorId: userId });
  }

  public async getSubmissionsForUser(userId: string): Promise<Entity.Submission[]> {
    let repository = this.connection.getRepository(Entity.Submission);
    return await repository.find({ userId: userId });
  }

  public async getQuizById(quizId: string): Promise<Entity.Quiz> {
    let repository = this.connection.getRepository(Entity.Quiz);
    return await repository.findOne({ id: quizId });
  }

  public async createQuiz(quiz: Entity.Quiz): Promise<Entity.Quiz> {
    let repository = this.connection.getRepository(Entity.Quiz);
    return await repository.save(quiz);
  }

  public async createSuggestion(suggestion: Entity.Suggestion): Promise<Entity.Suggestion> {
    let repository = this.connection.getRepository(Entity.Suggestion);
    return await repository.save(suggestion);
  }

  public async createQuestion(question: Entity.Question): Promise<Entity.Question> {
    let repository = this.connection.getRepository(Entity.Question);
    return await repository.save(question);
  }

  public async getQuestionsByQuizId(quizId: string): Promise<Entity.Question[]> {
    let repository = this.connection.getRepository(Entity.Question);
    return await repository.find({ quizId: quizId });
  }

  public async getSubmissionsByQuizId(quizId: string): Promise<Entity.Submission[]> {
    let repository = this.connection.getRepository(Entity.Submission);
    return await repository.find({ quizId: quizId });
  }

  public async getAnswersByQuestionId(questionId: string): Promise<Entity.Answer[]> {
    let repository = this.connection.getRepository(Entity.Answer);
    return await repository.find({ questionId: questionId });
  }

  public async getSuggestionsByQuestionId(questionId: string): Promise<Entity.Suggestion[]> {
    let repository = this.connection.getRepository(Entity.Suggestion);
    return await repository.find({ questionId: questionId });
  }

  public async getSubmissionByUserIdAndQuizId(userId: string, quizId: string): Promise<Entity.Submission> {
    let repository = this.connection.getRepository(Entity.Submission);
    return await repository.findOne({ quizId, userId });
  }

  public async getSuggestionsById(suggestionId: string, relations?: string[]): Promise<Entity.Suggestion> {
    let repository = this.connection.getRepository(Entity.Suggestion);
    return await repository.findOne({ id: suggestionId }, { relations: relations });
  }

  public async getQuestionById(questionId: string): Promise<Entity.Question> {
    let repository = this.connection.getRepository(Entity.Question);
    return await repository.findOne({ id: questionId });
  }

  public async getSubmissionsById(id: string, relations?: string[]): Promise<Entity.Submission> {
    let repository = this.connection.getRepository(Entity.Submission);
    return await repository.findOne({ id }, { relations });
  }

}