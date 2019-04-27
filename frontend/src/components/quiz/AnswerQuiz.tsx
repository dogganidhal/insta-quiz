import React from 'react';
import { AppState } from '../../state/app-state';
import { Container } from 'inversify';
import { ThunkDispatch } from 'redux-thunk';
import { AnswerQuizAction } from '../../actions/user/answer-quiz';
import { connect } from 'react-redux';
import { Question } from '../../model/question';

export interface IAnswerQuizProps {
  isLoading: boolean;
  questions: Question[];
}

class AnswerQuizComponent extends React.Component<IAnswerQuizProps> {

  public render() {
    return (
      <div></div>
    );
  }

}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, Container, AnswerQuizAction>, ownProps: IAnswerQuizProps): IAnswerQuizProps {
  return {
    ...ownProps,
  };
}

function mapStateToProps(state: AppState, ownProperties: IAnswerQuizProps): IAnswerQuizProps {
  return {
    ...ownProperties,
  };
}

let AnswerQuiz = AnswerQuizComponent;
export default connect(mapStateToProps, mapDispatchToProps)(AnswerQuiz);