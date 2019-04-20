import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from "typeorm";
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

  @Column()
  public questionId: string;

  @JoinColumn()
  @ManyToOne(type => Question, { nullable: false })
  public question: Question;

}