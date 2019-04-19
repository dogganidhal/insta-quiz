import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, Repository, Equal } from "typeorm";
import { Quiz } from "./quiz";

export enum QuestionType {
  MULTI_CHOICE = "multi_choice",
  SINGLE_CHOICE = "signle_choice",
  INPUT = "input"
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

  @ManyToOne(type => Quiz, { nullable: false })
  public quiz: Quiz;

}