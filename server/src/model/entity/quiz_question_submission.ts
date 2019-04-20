import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { QuizSubmission } from "./quiz_submission";


@Entity()
export class QuizQuestionSubmission {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ nullable: false })
  public content: string;

  @Column()
  public submissionId: string;

  @JoinColumn()
  @ManyToOne(type => QuizSubmission, { nullable: false })
  public submission: QuizSubmission;

}