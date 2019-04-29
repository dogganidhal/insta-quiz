import { Question, QuestionType } from "../../../model/question";
import { ThunkAction } from "redux-thunk";
import { CreateQuizState } from "../../../state/user-state/create-quiz-state";
import { Container } from "inversify";
import { parse } from "querystring";
import { QuizTemplateId } from "../../../model/quiz-template";
import { Location } from "history";
import { CreateQuestionAction } from "./create-question";
import { CreateQuestionState } from "../../../state/user-state/create-quiz-state/create-question-state";
import { InsertQuestionInput } from "../../../model/insert-question-input";
import { AppState } from "../../../state/app-state";
import { ApolloClient, NormalizedCacheObject, gql } from "apollo-boost";
import { Types } from "../../../constants/types";
import { Quiz } from "../../../model/quiz";
import { InsertQuizInput } from "../../../model/insert-quiz-input";
import { Moment } from "moment";
import { IUserAction } from "..";


export type CreateQuizAction = CreateQuizSubmitQuestionAction
  | CreateQuizSetTitleAction
  | CreateQuizSetDescriptionAction
  | CreateQuizSetDeadlineAction
  | CreateQuizSubmitAction
  | CreateQuizOpenQuestionDialogAction
  | CreateQuizSetQuestionsAction
  | CreateQuizSuccessAction
  | CreateQuestionAction;

interface CreateQuizSuccessAction extends IUserAction {
  type: "CREATE_QUIZ_SUCCESS"
}

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
  deadline: string;
}

interface CreateQuizSubmitAction extends IUserAction {
  type: "CREATE_QUIZ_SUBMIT";
}

type CreateQuizAsyncAction = ThunkAction<void, AppState, Container, CreateQuizAction>;

export function onQuizTitleInputChanged(input: string): CreateQuizAsyncAction {
  return dispatch => {
    dispatch({
      type: "CREATE_QUIZ_SET_TITLE",
      title: input
    });
  }
}

export function onQuizDescriptionInputChanged(input: string): CreateQuizAsyncAction {
  return dispatch => {
    dispatch({
      type: "CREATE_QUIZ_SET_DESCRIPTION",
      description: input
    });
  }
}

export function openQuestionDialog(): CreateQuizAsyncAction {
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

export function addQuestion(): CreateQuizAsyncAction {
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

export function abortQuestion(): CreateQuizAsyncAction {
  return dispatch => {
    dispatch({ 
      type: "CREATE_QUIZ_ADD_QUESTION",  
      createQuestion: undefined
    });
  };
}

export function setTemplateUriLocation(location: Location): CreateQuizAsyncAction {
  return dispatch => {
    let queryString = location.search.replace("?", "");
    let templateId: QuizTemplateId = parse(queryString).template as QuizTemplateId;
    if (templateId !== QuizTemplateId.EMPTY && templateId !== QuizTemplateId.MCQ && templateId !== QuizTemplateId.FORM) 
      templateId = QuizTemplateId.EMPTY;
    let questionType: QuestionType;
    switch (templateId) {
      case QuizTemplateId.FORM:
        questionType = QuestionType.INPUT;
        break;
      case QuizTemplateId.MCQ:
        questionType = QuestionType.SINGLE_CHOICE;
        break;
      default: 
        return;
    }
    dispatch({
      type: "CREATE_QUIZ_ADD_QUESTION",
      createQuestion: {
        type: questionType,
        createSuggestion: {}
      } 
    });
  };
}

export function setDeadlineText(deadline: Moment): CreateQuizAsyncAction {
  return dispatch => {
    if (deadline != null) {
      dispatch({ type: "CREATE_QUIZ_SET_DEADLINE", deadline: deadline.toISOString() });
    }
  }
}

export function submit(): CreateQuizAsyncAction {
  return async (dispatch, getState, container) => {
    let client = container.get<ApolloClient<NormalizedCacheObject>>(Types.ApolloClient);
    let { title, description, deadline, questions } = getState().user.createQuiz;
    console.log({ title, description, deadline, questions });
    if (title && questions.length > 0) { 
      let quizData: InsertQuizInput = {
        title: title,
        questions: questions,
        description: description,
        deadline: deadline ? new Date(deadline) : undefined
      };
      try {
        let response = await client.mutate<{ createQuiz: Quiz }, { quizData: InsertQuizInput }>({
          mutation: gql`
          mutation createQuiz($quizData: InsertQuizInput!) {
            createQuiz(quizData: $quizData) {
              id
              questions {
                id
                content
                type
                suggestions {
                  id
                  content
                  imageUrl
                }
              }
            }
          }
        `,
          variables: { quizData }
        });
        if (response.errors) {
          // TODO: Handle errors
        }
        dispatch({ type: "CREATE_QUIZ_SUCCESS" });
      } catch (exception) {
        console.log({exception});
      }
    }
  }
}