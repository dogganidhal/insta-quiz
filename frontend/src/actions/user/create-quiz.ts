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
import { InsertQuestionInput } from "../../model/insert-question-input";
import { AppState } from "../../state/app-state";


export type CreateQuizAction = CreateQuizSubmitQuestionAction
  | CreateQuizSetTitleAction
  | CreateQuizSetDescriptionAction
  | CreateQuizSetDeadlineAction
  | CreateQuizSubmitAction
  | CreateQuizOpenQuestionDialogAction
  | CreateQuizSetQuestionsAction
  | CreateQuestionAction;

interface CreateQuizSubmitQuestionAction extends IUserAction {
  type: "CREATE_QUIZ_SUBMIT_QUESTION";
  question: Question;
}

interface CreateQuizOpenQuestionDialogAction extends IUserAction {
  type: "CREATE_QUIZ_ADD_QUESTION";
  createQuestion?: CreateQuestionState;
}

interface CreateQuizSetQuestionsAction extends IUserAction {
  type: "CREATE_QUIZ_SET_QUESTIONS";
  questions: InsertQuestionInput[];
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

export function openQuestionDialog(): ThunkAction<void, AppState, Container, CreateQuizAction> {
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

export function addQuestion(): ThunkAction<void, AppState, Container, CreateQuizAction> {
  return (dispatch, getState) => {
    let { questions, createQuestion } = getState().user.createQuiz;
    if (createQuestion && createQuestion.content) {
      dispatch({
        type: "CREATE_QUIZ_SET_QUESTIONS",
        questions: [
          ...questions,
          <InsertQuestionInput>{
            content: createQuestion.content!,
            type: createQuestion.type,
            suggestions: createQuestion.suggestions,
            points: createQuestion.points
          }
        ]
      }),
      dispatch({
        type: "CREATE_QUIZ_ADD_QUESTION",
        createQuestion: undefined
      });
    }
  };
}

export function abortQuestion(): ThunkAction<void, AppState, Container, CreateQuizAction> {
  return dispatch => {
    dispatch({ 
      type: "CREATE_QUIZ_ADD_QUESTION",  
      createQuestion: undefined
    });
  };
}

export function setTempalteUriLocation(location: Location): ThunkAction<void, AppState, Container, CreateQuizAction> {
  return dispatch => {
    let queryString = location.search.replace("?", "");
    let templateId: QuizTemplateId = parse(queryString).templateId as QuizTemplateId;
    if (templateId !== QuizTemplateId.EMPTY && templateId !== QuizTemplateId.MCQ && templateId !== QuizTemplateId.FORM) 
      templateId = QuizTemplateId.EMPTY;
    
  };
}