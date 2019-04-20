import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { QuizQuestionSubmission } from "./quiz_question_submission";
import { Suggestion } from "./suggestion";


@Entity()
export class QuizQuestionSuggestion {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @ManyToOne(type => QuizQuestionSubmission, { nullable: false })
  public questionSubmission: QuizQuestionSubmission;

  @ManyToOne(type => Suggestion, { nullable: false })
  public suggestion: Suggestion;

}