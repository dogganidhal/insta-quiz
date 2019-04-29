import { InsertSubmissionInput } from "./../../../../../server/src/model/dto/input/insert-submission";
import { IUserAction } from "..";
import { AnswerQuestionState } from "../../../state/user-state/answer-quiz/answer-question-state";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../../../state/app-state";
import { Container } from "inversify";
import { NormalizedCacheObject, ApolloClient, gql } from "apollo-boost";
import { Types } from "../../../constants/types";
import { Quiz } from "../../../model/quiz";
import { parse } from "querystring";
import { Location } from "history";
import { QuestionType } from "../../../model/question";
import { InsertQuestionSubmissionInput } from "../../../../../server/src/model/dto/input/insert-question-submission";
import { Submission } from "../../../model/submission";
import { IUserSession } from "../../../session/user";

export type AnswerQuizAction = AnswerQuizSetLoadingAction
  | AnswerQuizSetQuestionsAction
  | AnswerQuizSetQuizAction;

interface AnswerQuizSetLoadingAction extends IUserAction {
  type: "ANSWER_QUIZ_SET_IS_LOADING";
  isLoading: boolean;
}

interface AnswerQuizSetQuestionsAction extends IUserAction {
  type: "ANSWER_QUIZ_SET_QUESTIONS";
  questions: AnswerQuestionState[];
}

interface AnswerQuizSetQuizAction extends IUserAction {
  type: "ANSWER_QUIZ_SET_QUIZ";
  quiz: Quiz;
}

type AnswerQuestionAsyncAction = ThunkAction<void, AppState, Container, AnswerQuizAction>;

export function submit(): AnswerQuestionAsyncAction {
  return async (dispatch, getState, container) => {
    let { answerQuiz } = getState().user;
    let quiz = answerQuiz.quiz;
    if (quiz) {
      let submissionData: InsertSubmissionInput = {
        quizId: quiz.id,
        questions: answerQuiz.questions.map(question => {
          return <InsertQuestionSubmissionInput>{
            questionId: question.question.id,
            answers: question.question.type === QuestionType.INPUT ? 
            [
              {
                content: question.content 
            
              }
            ] :
            question.suggestions
              .filter(suggestion => suggestion.isChecked)
              .map(suggestion => {
                return {
                  suggestionId: suggestion.id
                }
              })
          };
        })
      };
      console.log(JSON.stringify(submissionData, null, 2));
      let submission = await submitAnswer(submissionData, container);
      window.location.href = "/";
      console.log(JSON.stringify(submission, null, 2));
    }
    
  }
}

export function onInputChanged(questionIndex: number, input: string): AnswerQuestionAsyncAction {
  return async (dispatch, getState) => {
    let { questions } = getState().user.answerQuiz;
    let question = questions[questionIndex];
    if (question.question.type !== QuestionType.INPUT) return;
    let modifiedQuestions: AnswerQuestionState[] = [
      ...questions.slice(0, questionIndex),
      {
        ...question,
        content: input
      },
      ...questions.slice(questionIndex + 1)
    ];
    dispatch({ type: "ANSWER_QUIZ_SET_QUESTIONS", questions: modifiedQuestions });
  }
}

export function checkSuggestion(questionIndex: number, suggestionIndex: number, isChecked: boolean): AnswerQuestionAsyncAction {
  return (dispatch, getState) => {
    let { questions } = getState().user.answerQuiz;
    let question = questions[questionIndex];
    if (question.question.type === QuestionType.INPUT) return;
    let suggestions = question.question.type == QuestionType.MULTI_CHOICE ? 
      question.suggestions : 
      question.suggestions.map(suggestion => {
        return {
          ...suggestion,
          isChecked: false
        };
      });
    let suggestion = suggestions[suggestionIndex];
    let modifiedQuestions: AnswerQuestionState[] = [
      ...(questions.slice(0, questionIndex)),
      {
        ...question,
        suggestions: [
          ...(suggestions.slice(0, suggestionIndex)),
          {
            ...suggestion,
            isChecked
          },
          ...(suggestions.slice(suggestionIndex + 1))
        ]
      },
      ...(questions.slice(questionIndex + 1))
    ];
    dispatch({ type: "ANSWER_QUIZ_SET_QUESTIONS", questions: modifiedQuestions });
  }
}

export function loadQuiz(location: Location): AnswerQuestionAsyncAction {
  return async (dispatch, getState, container) => {
    dispatch({ type: "ANSWER_QUIZ_SET_IS_LOADING", isLoading: true });
    let queryString = location.search.replace("?", "");
    let id = <string>parse(queryString).id;
    let quiz: Quiz;
    let didSubmitQuiz: boolean; 
    await Promise.all([ // Run the two queries in parallel
      quiz = await getQuizById(id, container),
      didSubmitQuiz = await checkIfAlreadySubmittedQuiz(id, container)
    ]);
    if (didSubmitQuiz) {
      dispatch({ type: "ANSWER_QUIZ_SET_IS_LOADING", isLoading: false });
      // TODO: Give some feedback to the user
      window.location.href = "/";
      return;
    }
    let userSession = container.get<IUserSession>(Types.IUserSession);
    if (!userSession.user || userSession.user.id === quiz.authorId) {
      dispatch({ type: "ANSWER_QUIZ_SET_IS_LOADING", isLoading: false });
      // TODO: Give some feedback to the user
      window.location.href = `/quiz/results?id=${quiz.id}`;
      return;
    }
    let questions = quiz.questions.map(question => {
      return <AnswerQuestionState>{
        question: question,
        suggestions: question.suggestions.map(suggestion => {
          return { 
            ...suggestion, 
            isChecked: false 
          };
        })
      };
    });
    dispatch({ type: "ANSWER_QUIZ_SET_IS_LOADING", isLoading: false });
    dispatch({ type: "ANSWER_QUIZ_SET_QUIZ", quiz: quiz });
    dispatch({ type: "ANSWER_QUIZ_SET_QUESTIONS", questions: questions });
  };
}

async function submitAnswer(submissionData: InsertSubmissionInput, container: Container): Promise<Submission> {
  let client = container.get<ApolloClient<NormalizedCacheObject>>(Types.ApolloClient);
  let response = await client.mutate<{ submit: Submission }>({
    mutation: gql`
      mutation submitQuizAnswer($submissionData: InsertSubmissionInput!) {
        submit(submissionData: $submissionData) {
          id
          userId
          quizId
          score {
            points
            totalPoints
          }
        }
      }
    `,
    variables: { submissionData: submissionData }
  });
  if (response.errors) {
    // TODO: Handle errors
  }
  return response.data!.submit;
}

async function checkIfAlreadySubmittedQuiz(quizId: string, container: Container): Promise<boolean> {
  let client = container.get<ApolloClient<NormalizedCacheObject>>(Types.ApolloClient);
  let response = await client.query<{ submission: { quizId: string }[] }>({
    query: gql`
        {
          submission {
            quizId
          }
        }
      `
  });
  if (response.errors) {
    // TODO: Handle errors
  }
  return response.data.submission.map(submission => submission.quizId).includes(quizId);
}


async function getQuizById(id: string, container: Container): Promise<Quiz> {
  let client = container.get<ApolloClient<NormalizedCacheObject>>(Types.ApolloClient);
  let response = await client.query<{ quiz: Quiz[] }>({
    query: gql`
        query getQuizById($id: ID!) {
          quiz(id: $id) {
            id
            title
            description
            deadline
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
    variables: { id: id }
  });
  if (response.errors || response.data.quiz.length == 0) {
    // TODO: Handle errors
  }
  return response.data.quiz[0];
}