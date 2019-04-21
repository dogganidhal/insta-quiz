


export class Score {

  public points: number;
  public totalPoints: number;

  constructor()
  constructor(data: Partial<Score>)
  constructor(data?: Partial<Score>) {
    if (data) {
      Object.assign(this, data);
    }
  }

}