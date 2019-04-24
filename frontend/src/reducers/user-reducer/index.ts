import { UserState } from "../../state/user-state";
import { combineReducers } from "redux";
import { userQuizzesReducer } from "./user-quizzes-reducer";
import { quizResponseReducer } from "./quiz-response-reducer";
import { quizResultReducer } from "./quiz-result-reducer";


export let userReducer = combineReducers<UserState>({
  userQuizzes: userQuizzesReducer,
  quizResponse: quizResponseReducer,
  quizResult: quizResultReducer
});
