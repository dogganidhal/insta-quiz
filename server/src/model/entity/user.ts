import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity()
export class User {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({nullable: false})
  public fullName: string;

  @Column({nullable: false, unique: true})
  public email: string;

  constructor()
  constructor(data: Partial<User>)
  constructor(data?: Partial<User>) {
    if (data) {
      Object.assign(this, data);
    }
  }

}
