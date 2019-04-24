import { Question } from "./question";
import { Submission } from "./submission";
import { Suggestion } from "./suggestion";
import { User } from "./user";


export interface Answer {
  readonly id: string;
  readonly questionId: string;
  readonly question: Question;
  readonly submissionId: string;
  readonly submission: Submission;
  readonly suggestionId?: string;
  readonly suggestion?: Suggestion;
  readonly userId: string;
  readonly user: User;
}