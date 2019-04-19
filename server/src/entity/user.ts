import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity()
export class User {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({nullable: false})
  public fullName: string;

  @Column({nullable: false, unique: true})
  public email: string;

  @Column({nullable: false})
  public googleAccessToken: string;

}
