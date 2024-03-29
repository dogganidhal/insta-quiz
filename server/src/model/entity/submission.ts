import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { User } from "./user";
import { Quiz } from "./quiz";


@Entity()
export class Submission {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public userId: string;

  @JoinColumn()
  @ManyToOne(type => User, { nullable: false })
  public user: User;

  @Column()
  public quizId: string;

  @JoinColumn()
  @ManyToOne(type => Quiz, { nullable: false })
  public quiz: Quiz;

  constructor()
  constructor(data: Partial<Submission>)
  constructor(data?: Partial<Submission>) {
    if (data) {
      Object.assign(this, data);
    }
  }

}