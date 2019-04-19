import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { Question } from "./question";
import { QuizQuestionSuggestion } from "./quiz_question_suggestion";


@Entity()
export class Suggestion {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ nullable: true })
  public content: string;

  @Column({ nullable: true })
  public imageUrl: string;

  @ManyToOne(type => Question, { nullable: false })
  public question: Question;

}