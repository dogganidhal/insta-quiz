import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { Question } from "./question";


@Entity()
export class Suggestion {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ nullable: false, default: false })
  public isCorrect: boolean;

  @Column({ nullable: true })
  public content: string;

  @Column({ nullable: true })
  public imageUrl: string;

  @Column()
  public questionId: string;

  @JoinColumn()
  @ManyToOne(type => Question, { nullable: false, cascade: true })
  public question: Question;
  
  constructor()
  constructor(data: Partial<Suggestion>)
  constructor(data?: Partial<Suggestion>) {
    if (data) {
      Object.assign(this, data);
    }
  }

}