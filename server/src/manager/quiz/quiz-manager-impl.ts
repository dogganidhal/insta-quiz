import { injectable, inject } from "inversify";
import { IQuizManager } from ".";
import { Dto } from "../../model/dto";
import { Entity } from "../../model/entity";
import { Types } from "../../constants/types";
import { IQuizRepository } from "../../repository/quiz";


@injectable()
export class QuizManagerImpl implements IQuizManager {

  @inject(Types.IQuizRepository) private readonly quizRepository: IQuizRepository;

  public async createQuiz(quizData: Dto.Input.InsertQuizInput, author: Entity.User): Promise<Entity.Quiz> {

    let quiz = new Entity.Quiz({
      title: quizData.title,
      description: quizData.description,
      deadline: quizData.deadline,
      author: author,
      authorId: author.id
    });

    quiz = await this.quizRepository.createQuiz(quiz);

    await Promise.all(quizData.questions.map(
      async question => await this.createQuestionWithSuggestions(quiz, question)
    ));
    
    return quiz;

  }

  private async createQuestionWithSuggestions(quiz: Entity.Quiz, question: Dto.Input.InsertQuestionInput): Promise<void> {
    
    let questionEntity = await this.quizRepository.createQuestion(new Entity.Question({
      content: question.content,
      type: question.type,
      quiz: quiz,
      quizId: quiz.id,
      points: question.points
    }));

    await Promise.all(
      question.suggestions.map(async suggestion => {
        await this.quizRepository.createSuggestion(new Entity.Suggestion({
          content: suggestion.content,
          isCorrect: suggestion.isCorrect,
          imageUrl: suggestion.imageUrl,
          questionId: questionEntity.id,
          question: questionEntity
        }))
      })
    );

  }

}