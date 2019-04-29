import React from 'react';
import { RouteProps } from 'react-router';
import { Location } from 'history';
import NavigationBar from '../navigation/NavigationBar';
import { CircularProgress, Theme, withStyles, Typography, Divider, createStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { Quiz } from '../../model/quiz';
import QuestionCorrection from './QuestionCorrection';
import { SuggestionWithCorrection } from '../../model/suggestion';
import { QuizCorrectionAction, loadQuiz as loadQuizCorrection } from '../../actions/user/quiz-correction';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../state/app-state';
import { Container } from 'inversify';
import { connect } from 'react-redux';

let styles = createStyles({
  progress: {
    margin: 48
  },
  progressContainer: {
    display: "grid",
    placeItems: "center",
    height: "100vh"
  },
  body: {
    position: "absolute", top: 64, bottom: 0,
    paddingTop: 36,
    paddingBottom: 36,
    overflowY: "auto",
    width: "100%",
    backgroundColor: "#F2F2F2"
  },
  quizInfoContainer: {
    backgroundColor: "#FFFFFF",
    width: 870,
    boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.25)",
    borderRadius: 8,
    padding: 36,
    paddingTop: 56,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 42,
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  quizTitleContainer: {
    position: "absolute",
    left: 77, right: 77,
    top: -42, height: 84,
    backgroundColor: "#F44A4A",
    display: "grid",
    placeItems: "center",
    borderRadius: 8,
  }
});

let titleTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#FFFFFF"
    }
  }
});

export interface IQuizCorrectionProps extends RouteProps {
  classes: any;
  isLoading: boolean;
  quiz?: Quiz;
  // Actions
  setQuizLocation(location: Location): void;
}

class QuizCorrectionComponent extends React.Component<IQuizCorrectionProps> {

  componentWillMount() {
    if (this.props.location) {
      this.props.setQuizLocation(this.props.location);
    }
  }

  public render() {
    let { isLoading, classes, quiz } = this.props;
    return (
      <div>
        <NavigationBar />
        {
          isLoading &&
          <div className={classes.progressContainer}>
            <CircularProgress className={classes.progress} />
          </div>
        }
        {
          quiz &&
          <div className={classes.body}>
            <div className={classes.quizInfoContainer}>
              <div className={classes.quizTitleContainer}>
                <MuiThemeProvider theme={titleTheme}>
                  <Typography variant="h6" color="primary">{quiz.title}</Typography>
                </MuiThemeProvider>
              </div>
              {quiz.description && <Typography>{quiz.description}</Typography>}
              {quiz.questions.map((question, index) =>
                <div>
                  <QuestionCorrection
                    question={question}
                    suggestions={question.suggestions as SuggestionWithCorrection[]}/>
                  {index < quiz!.questions.length - 1 && <Divider />}
                </div>
              )}
            </div>
          </div>
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, Container, QuizCorrectionAction>, ownProps: IQuizCorrectionProps): IQuizCorrectionProps {
  return {
    ...ownProps,
    setQuizLocation: location => dispatch(loadQuizCorrection(location))
  };
}

function mapStateToProps(state: AppState, ownProperties: IQuizCorrectionProps): IQuizCorrectionProps {
  let { isLoading, quiz } = state.user.quizCorrection;
  return {
    ...ownProperties,
    isLoading,
    quiz
  };
}

let QuizCorrection = withStyles(styles)(QuizCorrectionComponent);
export default connect(mapStateToProps, mapDispatchToProps)(QuizCorrection) as any;