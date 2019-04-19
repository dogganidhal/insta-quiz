import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user";
import { Quiz } from "./quiz";


@Entity()
export class QuizSubmission {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @ManyToOne(type => User, { nullable: false })
  public user: User;

  @ManyToOne(type => Quiz, { nullable: false })
  public quiz: Quiz;

}