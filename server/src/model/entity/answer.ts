import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Question } from "./question";
import { Suggestion } from "./suggestion";


@Entity()
export class Answer {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @ManyToOne(type => Question, { nullable: false })
  public question: Question;

  @ManyToOne(type => Suggestion, { nullable: false })
  public suggestion: Suggestion;

}