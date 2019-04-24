import mcq from "../assets/mcq.svg";
import form from "../assets/form.svg";
import empty from "../assets/empty.svg";


export enum QuizTemplateId {
  MCQ = "mcq",
  FORM = "form",
  EMPTY = "empty"
}

export class QuizTemplate {

  constructor(
    public id: string,
    public name: string,
    public image: string
  ) { }

  static get mcq(): QuizTemplate {
    return new QuizTemplate(QuizTemplateId.MCQ, "QCM", mcq);
  }

  static get form(): QuizTemplate {
    return new QuizTemplate(QuizTemplateId.FORM, "Formulaire", form);
  }

  static get empty(): QuizTemplate {
    return new QuizTemplate(QuizTemplateId.EMPTY, "Vide", empty);
  }

  static get templates(): QuizTemplate[] {
    return [this.mcq, this.form, this.empty];
  }

}