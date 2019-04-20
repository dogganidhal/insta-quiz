import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { Submission } from "./submission";
import { Suggestion } from "./suggestion";


@Entity()
export class Answer {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ nullable: false })
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

  constructor()
  constructor(data: Answer)
  constructor(data?: Answer) {
    if (data) {
      Object.assign(this, data);
    }
  }

}