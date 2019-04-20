import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Question } from "./question";
import { Suggestion } from "./suggestion";


@Entity()
export class Answer {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public questionId: string;

  @JoinColumn()
  @ManyToOne(type => Question, { nullable: false })
  public question: Question;

  @Column()
  public suggestionId: string;

  @JoinColumn()
  @ManyToOne(type => Suggestion, { nullable: false })
  public suggestion: Suggestion;

}