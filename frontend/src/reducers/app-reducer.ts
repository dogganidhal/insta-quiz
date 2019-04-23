import { combineReducers } from "redux";
import { AppState } from "../state/app-state";
import { authReducer } from "./auth";
import { uiReducer } from "./ui";


export let appReducer = combineReducers<AppState>({
  auth: authReducer,
  ui: uiReducer
})