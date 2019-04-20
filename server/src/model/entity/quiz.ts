import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
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

  @Column()
  public authorId: string;

  @JoinColumn()
  @ManyToOne(type => User, { nullable: false, cascade: true })
  public author: User;

  constructor()
  constructor(data: Partial<Quiz>)
  constructor(data?: Partial<Quiz>) {
    if (data) {
      Object.assign(this, data);
    }
  }

}