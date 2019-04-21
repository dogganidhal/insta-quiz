import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { Submission } from "./submission";
import { Suggestion } from "./suggestion";
import { Question } from "./question";


@Entity()
export class Answer {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ nullable: true })
  public content: string;

  @Column()
  public submissionId: string;

  @JoinColumn()
  @ManyToOne(type => Submission, { nullable: false })
  public submission: Submission;

  @Column()
  public suggestionId: string;

  @JoinColumn()
  @ManyToOne(type => Suggestion, { nullable: false })
  public suggestion: Suggestion;

  @Column()
  public questionId: string;

  @JoinColumn()
  @ManyToOne(type => Question, { nullable: false })
  public question: Question;

  constructor()
  constructor(data: Partial<Answer>)
  constructor(data?: Partial<Answer>) {
    if (data) {
      Object.assign(this, data);
    }
  }

}