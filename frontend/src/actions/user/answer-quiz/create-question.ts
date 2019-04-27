import { IUserAction } from "..";
import { InsertSuggestionInput } from "../../../model/insert-suggestion-input";
import { QuestionType } from "../../../model/question";
import { ThunkAction } from "redux-thunk";
import { CreateQuestionState } from "../../../state/user-state/create-quiz-state/create-question-state";
import { Container } from "inversify";
import { CreateSuggestionAction } from "./create-suggestion";
import { AppState } from "../../../state/app-state";
import firebase from "firebase";

export type CreateQuestionAction = CreateQuestionAddSuggestionAction 
  | CreateQuestionSetContentAction
  | CreateQuestionSetTypeAction
  | CreateQuestionSetPointsAction
  | CreateSetSuggestionsAction
  | CreateSuggestionAction;

export interface CreateQuestionAddSuggestionAction extends IUserAction {
  type: "CREATE_QUESTION_ADD_SUGGESTION";
  suggestion: InsertSuggestionInput;
}

export interface CreateQuestionSetContentAction extends IUserAction {
  type: "CREATE_QUESTION_SET_CONTENT";
  content: string;
}

export interface CreateQuestionSetTypeAction extends IUserAction {
  type: "CREATE_QUESTION_SET_TYPE";
  questionType: QuestionType;
}

export interface CreateQuestionSetPointsAction extends IUserAction {
  type: "CREATE_QUESTION_SET_POINTS";
  points: number;
}

export interface CreateSetSuggestionsAction extends IUserAction {
  type: "CREATE_QUESTION_SET_SUGGESTIONS";
  suggestions: InsertSuggestionInput[];
}

export function addSuggestion(): ThunkAction<void, AppState, Container, CreateQuestionAction> {
  return (dispatch, getState) => {
    let { createQuestion } = getState().user.createQuiz;
    if (createQuestion && (createQuestion.createSuggestion.content || createQuestion.createSuggestion.imageUrl)) {
      dispatch({
        type: "CREATE_QUESTION_ADD_SUGGESTION",
        suggestion: {
          content: createQuestion.createSuggestion.content,
          imageUrl: createQuestion.createSuggestion.imageUrl,
          isCorrect: createQuestion.createSuggestion.isCorrect
        }
      });
      dispatch({
        type: "CREATE_SUGGESTION_SET_CONTENT",
        content: undefined
      });
    }
  };
}

export function toggleSuggestionCorrect(index: number): ThunkAction<void, AppState, Container, CreateQuestionAction> {
  return (dispatch, getState) => {
    let createQuestion = getState().user.createQuiz.createQuestion;
    if (createQuestion) {
      let { suggestions } = createQuestion;
      if (suggestions) {
        let modifiedSuggestions: InsertSuggestionInput[] = createQuestion.type === QuestionType.SINGLE_CHOICE ? suggestions.map(suggestion => {
          return {
            ...suggestion,
            isCorrect: false
          };
        }) : suggestions;
        let modifiedSuggestion = suggestions[index];
        modifiedSuggestions = [
          ...(modifiedSuggestions.slice(0, index)),
          {
            ...modifiedSuggestion,
            isCorrect: !modifiedSuggestion.isCorrect
          },
          ...(modifiedSuggestions.slice(index + 1))
        ];
        dispatch({
          type: "CREATE_QUESTION_SET_SUGGESTIONS",
          suggestions: modifiedSuggestions
        });
      }
    }
  }
}

export function deleteSuggestion(index: number): ThunkAction<void, AppState, Container, CreateQuestionAction> {
  return (dispatch, getState) => {
    let createQuestion = getState().user.createQuiz.createQuestion;
    if (createQuestion) {
      let { suggestions } = createQuestion;
      if (suggestions) {
        let modifiedSuggestions: InsertSuggestionInput[] = [
          ...(suggestions.slice(0, index)),
          ...(suggestions.slice(index + 1))
        ];
        dispatch({
          type: "CREATE_QUESTION_SET_SUGGESTIONS",
          suggestions: modifiedSuggestions
        });
      }
    }
  }
}

export function onQuestionContentInputChanged(input: string): ThunkAction<void, AppState, Container, CreateQuestionAction> {
  return dispatch => {
    dispatch({ type: "CREATE_QUESTION_SET_CONTENT", content: input });
  };
}

export function setQuestionType(type: QuestionType): ThunkAction<void, AppState, Container, CreateQuestionAction> {
  return (dispatch, getState) => {
    dispatch({ type: "CREATE_QUESTION_SET_TYPE", questionType: type });
    let { createQuestion } = getState().user.createQuiz;
    if (createQuestion) {
      let { suggestions } = createQuestion;
      if (suggestions) {
        let modifiedSuggestions = suggestions.map(suggestion => {
          return {
            ...suggestion,
            isCorrect: false
          };
        });
        dispatch({ type: "CREATE_QUESTION_SET_SUGGESTIONS", suggestions: modifiedSuggestions });
      }
    }
  };
}

export function setQuestionPoints(points: number): ThunkAction<void, AppState, Container, CreateQuestionAction> {
  return (dispatch) => {
    dispatch({ type: "CREATE_QUESTION_SET_POINTS", points: points });
  };
}

export function uploadImageSuggestion(image: File): ThunkAction<void, AppState, Container, CreateQuestionAction> {
  return async (dispatch, getState) => {
    // Upload the image
    let storageReference = await firebase.storage().ref().child(`/images/${image.name}`).put(image);
    let url = await storageReference.ref.getDownloadURL();
    dispatch({ 
      type: "CREATE_SUGGESTION_SET_IMAGE_URL",
      imageUrl: url
    });
    // Create the new suggestion
    let { createQuestion } = getState().user.createQuiz;
    if (createQuestion && (createQuestion.createSuggestion.content || createQuestion.createSuggestion.imageUrl)) {
      dispatch({
        type: "CREATE_QUESTION_ADD_SUGGESTION",
        suggestion: {
          content: createQuestion.createSuggestion.content,
          imageUrl: createQuestion.createSuggestion.imageUrl,
          isCorrect: createQuestion.createSuggestion.isCorrect
        }
      });
      dispatch({
        type: "CREATE_SUGGESTION_SET_CONTENT",
        content: undefined
      });
    }
  };
}