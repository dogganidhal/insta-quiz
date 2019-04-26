import { IUserAction } from ".";
import { Question, QuestionType } from "../../model/question";
import { ThunkAction } from "redux-thunk";
import { CreateQuizState } from "../../state/user-state/create-quiz-state";
import { Container } from "inversify";
import { parse } from "querystring";
import { QuizTemplateId } from "../../model/quiz-template";
import { Location } from "history";
import { CreateQuestionAction } from "./create-question";
import { CreateQuestionState } from "../../state/user-state/create-quiz-state/create-question-state";


export type CreateQuizAction = CreateQuizSubmitQuestionAction
  | CreateQuizSetTitleAction
  | CreateQuizSetDescriptionAction
  | CreateQuizSetDeadlineAction
  | CreateQuizSubmitAction
  | CreateQuizAddQuestionAction
  | CreateQuestionAction;

interface CreateQuizSubmitQuestionAction extends IUserAction {
  type: "CREATE_QUIZ_SUBMIT_QUESTION";
  question: Question;
}

interface CreateQuizAddQuestionAction extends IUserAction {
  type: "CREATE_QUIZ_ADD_QUESTION";
  createQuestion?: CreateQuestionState;
}

interface CreateQuizSetTitleAction extends IUserAction {
  type: "CREATE_QUIZ_SET_TITLE";
  title: string;
}

interface CreateQuizSetDescriptionAction extends IUserAction {
  type: "CREATE_QUIZ_SET_DESCRIPTION";
  description: string;
}

interface CreateQuizSetDeadlineAction extends IUserAction {
  type: "CREATE_QUIZ_SET_DEADLINE";
  deadline: Date;
}

interface CreateQuizSubmitAction extends IUserAction {
  type: "CREATE_QUIZ_SUBMIT";
}

export function addQuestion(): ThunkAction<void, CreateQuizState, Container, CreateQuizAction> {
  return dispatch => {
    dispatch({ 
      type: "CREATE_QUIZ_ADD_QUESTION",
      createQuestion: {
        type: QuestionType.SINGLE_CHOICE,
        createSuggestion: { }
      } 
    });
  };
}

export function abortQuestion(): ThunkAction<void, CreateQuizState, Container, CreateQuizAction> {
  return dispatch => {
    dispatch({ 
      type: "CREATE_QUIZ_ADD_QUESTION",  
      createQuestion: undefined
    });
  };
}

export function setTempalteUriLocation(location: Location): ThunkAction<void, CreateQuizState, Container, CreateQuizAction> {
  return dispatch => {
    let queryString = location.search.replace("?", "");
    let templateId: QuizTemplateId = parse(queryString).templateId as QuizTemplateId;
    if (templateId !== QuizTemplateId.EMPTY && templateId !== QuizTemplateId.MCQ && templateId !== QuizTemplateId.FORM) 
      templateId = QuizTemplateId.EMPTY;
    
  };
}