import { combineReducers } from "redux";
import { AppState } from "../state/app-state";
import { authReducer } from "./auth-reducer";
import { userReducer } from "./user-reducer";


export let appReducer = combineReducers<AppState>({
  auth: authReducer,
  user: userReducer
})