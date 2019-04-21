import { ISubmissionManager } from ".";
import { Dto } from "../../model/dto";
import { Entity } from "../../model/entity";
import { injectable, inject } from "inversify";
import { Types } from "../../constants/types";
import { IQuizRepository } from "../../repository/quiz";
import { QuizAleadySubmittedException, QuizNotFoundException, UnansweredQuestionException, InvalidSingleChoiceAnswer, InconsistentAnswerException } from "../../exceptions";
import { ISubmissionRepository } from "../../repository/submission";
import { QuestionType } from "../../model/entity/question";


@injectable()
export class SubmissionManagerImpl implements ISubmissionManager {

  @inject(Types.IQuizRepository) private readonly quizRepository: IQuizRepository;
  @inject(Types.ISubmissionRepository) private readonly submissionRepository: ISubmissionRepository;

  public async submit(submissionData: Dto.Input.InsertSubmissionInput, user: Entity.User): Promise<Dto.Output.Submission> {

    let oldSubmission = await this.quizRepository.getSubmissionByUserIdAndQuizId(user.id, submissionData.quizId);
    if (oldSubmission)
      throw QuizAleadySubmittedException(submissionData.quizId);

    let quiz = await this.quizRepository.getQuizById(submissionData.quizId);
    if (!quiz)
      throw QuizNotFoundException(submissionData.quizId);

    let questions = await this.quizRepository.getQuestionsByQuizId(quiz.id);
    for (let question of questions) {
      if (!submissionData.answers.map(answer => answer.questionId).includes(question.id))
        throw UnansweredQuestionException(question.id);
    }
    
    let answers = await this. createAnswers(submissionData.answers);
    let submission = await this.submissionRepository.createSubmission(new Entity.Submission({
      userId: user.id,
      user: user,
      quizId: quiz.id,
      quiz: quiz
    }))

    answers.forEach(answer => {
      answer.submissionId = submission.id;
      answer.submission = submission;
    });

    await this.submissionRepository.saveAnswers(answers);

    let dto = new Dto.Output.Submission(submission);
    dto.score = await this.calculateScore(questions, answers);

    return dto;
  
  }

  private async createAnswers(answers: Dto.Input.InsertAnswerInput[]): Promise<Entity.Answer[]> {

    let answerEntities: Entity.Answer[] = [];
    
    await Promise.all(
      answers.map(async answer => {

        let question = await this.quizRepository.getQuestionById(answer.questionId);
        let suggestion = await this.quizRepository.getSuggestionsById(answer.suggestionId);
        if (suggestion.questionId !== answer.questionId)
          throw InconsistentAnswerException(answer.questionId);

        answerEntities.push(new Entity.Answer({
          question: question,
          questionId: question.id,
          suggestion: suggestion,
          suggestionId: suggestion.id,
          content: answer.content
        }))
        
      })
    );

    return answerEntities;

  }

  private async calculateScore(questions: Entity.Question[], answers: Entity.Answer[]): Promise<Dto.Output.Score> {

    let points = 0, totalPoints = 0;

    let questionAnswersPeers: Map<Entity.Question, Entity.Answer[]> = new Map();

    for (let question of questions) {
      if (question.type == QuestionType.INPUT) continue;
      questionAnswersPeers.set(question, answers.filter(answer => answer.questionId === question.id));
    }

    for (let [question, answers] of questionAnswersPeers) {
      let suggestions = await this.quizRepository.getSuggestionsByQuestionId(question.id);
      let correctSuggestionIds = suggestions
        .filter(suggestion => suggestion.isCorrect)
        .map(suggestion => suggestion.id);
      let answerSuggestionIds = answers.map(answer => answer.suggestionId);
      let correctAnswer = correctSuggestionIds
        .map(suggestionId => answerSuggestionIds.includes(suggestionId))
        .reduce((previous, current) => previous && current, true);
      totalPoints += 1;
      points += correctAnswer ? 1 : 0; // TODO: Change this to the correct points
    }

    return new Dto.Output.Score({
      points: points,
      totalPoints: totalPoints
    });
  }

}