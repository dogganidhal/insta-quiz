import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./user";


@Entity()
export class Quiz {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ nullable: false })
  public title: string;

  @Column({ nullable: true })
  public description: string;

  @Column({nullable: true})
  public deadline?: Date;

  @ManyToOne(type => User, { nullable: false })
  public author: User;

}