import { UserState } from "../../state/user-state";
import { combineReducers } from "redux";
import { userQuizzesReducer } from "./user-quizzes-reducer";
import { quizResponseReducer } from "./quiz-response-reducer";
import { quizResultReducer } from "./quiz-result-reducer";
import { userSubmissionsReducer } from "./user-submissions-reducer";
import { createQuizReducer } from "./create-quiz-reducer";
import { answerQuizReducer } from "./answer-quiz-reducer";
import { quizCorrectionReducer } from "./quiz-correction-reducer";


export let userReducer = combineReducers<UserState>({
  userQuizzes: userQuizzesReducer,
  userSubmissions: userSubmissionsReducer,
  answerQuiz: answerQuizReducer,
  quizCorrection: quizCorrectionReducer,
  createQuiz: createQuizReducer,
  quizResponse: quizResponseReducer,
  quizResult: quizResultReducer
});
