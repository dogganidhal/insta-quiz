import { UiState, initialUiState } from "../state/ui-state";
import { IAction } from "../actions/base";


export function uiReducer(state: UiState = initialUiState, action: IAction): UiState {
  return state;
}