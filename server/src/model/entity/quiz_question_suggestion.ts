import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { QuizQuestionSubmission } from "./quiz_question_submission";
import { Suggestion } from "./suggestion";


@Entity()
export class QuizQuestionSuggestion {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public questionSubmissionId: string;

  @JoinColumn()
  @ManyToOne(type => QuizQuestionSubmission, { nullable: false })
  public questionSubmission: QuizQuestionSubmission;

  @Column()
  public suggestionId: string;

  @JoinColumn()
  @ManyToOne(type => Suggestion, { nullable: false })
  public suggestion: Suggestion;

}