import { ISubmissionManager } from ".";
import { Dto } from "../../model/dto";
import { Entity } from "../../model/entity";
import { injectable, inject } from "inversify";
import { Types } from "../../constants/types";
import { IQuizRepository } from "../../repository/quiz";
import { QuizAleadySubmittedException, QuizNotFoundException, UnansweredQuestionException, InvalidSingleChoiceAnswer } from "../../exceptions";
import { ISubmissionRepository } from "../../repository/submission";
import { QuestionType } from "../../model/entity/question";


@injectable()
export class SubmissionManagerImpl implements ISubmissionManager {

  @inject(Types.IQuizRepository) private readonly quizRepository: IQuizRepository;
  @inject(Types.ISubmissionRepository) private readonly submissionRepository: ISubmissionRepository;

  public async submit(submissionData: Dto.Input.InsertSubmissionInput, user: Entity.User): Promise<Entity.Submission> {

    let oldSubmission = await this.quizRepository.getSubmissionByUserIdAndQuizId(user.id, submissionData.quizId);
    if (oldSubmission)
      throw QuizAleadySubmittedException(submissionData.quizId);

    let quiz = await this.quizRepository.getQuizById(submissionData.quizId);
    if (!quiz)
      throw QuizNotFoundException(submissionData.quizId);

    let questions = await this.quizRepository.getQuestionsByQuizId(quiz.id);
    let answers = await this. buildQuestionAnswerPeers(questions, submissionData.answers);

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

    return submission;
  
  }

  private async buildQuestionAnswerPeers(questions: Entity.Question[], answers: Dto.Input.InsertAnswerInput[]): Promise<Entity.Answer[]> {

    let answerEntities: Entity.Answer[] = [];

    await Promise.all(
      questions.map(async question => {

        let suggestions = await this.quizRepository.getSuggestionsByQuestionId(question.id);
        let userAnswers = answers.filter(answer => suggestions.map(s => s.id).includes(answer.suggestionId));
        
        let questionAnswered = userAnswers !== undefined;
        questionAnswered = questionAnswered && (question.type === QuestionType.INPUT && userAnswers.length === 0);
        questionAnswered = questionAnswered && (question.type !== QuestionType.INPUT && userAnswers.filter(a => a.content !== undefined).length > 0);

        if (!questionAnswered)
          throw UnansweredQuestionException(question.id);

        if (question.type === QuestionType.SINGLE_CHOICE && userAnswers.length > 1)
          throw InvalidSingleChoiceAnswer(question.id);

        for (let answer of userAnswers) {

          let suggestion = suggestions.find(suggestion => answer.suggestionId === suggestion.id);
          if (!suggestion)
            throw UnansweredQuestionException(question.id);

          let entity = new Entity.Answer({
            content: answer.content,
            suggestionId: answer.suggestionId,
            suggestion: suggestion
          });
          answerEntities.push(entity);

        }

      })
    );

    return answerEntities;

  }

}