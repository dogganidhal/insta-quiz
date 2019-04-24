import { Submission } from "./submission";


export interface User {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly submissions: Submission[];
}