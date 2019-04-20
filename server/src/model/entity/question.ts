import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Quiz } from "./quiz";

export enum QuestionType {
  MULTI_CHOICE = "MULTI_CHOICE",
  SINGLE_CHOICE = "SINGLE_CHOICE",
  INPUT = "INPUT"
}

@Entity()
export class Question {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ nullable: false })
  public content: string;

  @Column("enum", { 
    enum: [QuestionType.MULTI_CHOICE, QuestionType.SINGLE_CHOICE, QuestionType.INPUT],
    nullable: false
  })
  public type: QuestionType;

  @Column()
  public quizId: string;

  @JoinColumn()
  @ManyToOne(type => Quiz, { nullable: false, cascade: true })
  public quiz: Quiz;

  constructor()
  constructor(data: Partial<Question>)
  constructor(data?: Partial<Question>) {
    if (data) {
      Object.assign(this, data);
    }
  }

}