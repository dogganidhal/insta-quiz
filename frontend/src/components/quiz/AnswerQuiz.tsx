import React from 'react';
import { AppState } from '../../state/app-state';
import { Container } from 'inversify';
import { ThunkDispatch } from 'redux-thunk';
import { AnswerQuizAction, loadQuiz, checkSuggestion, onInputChanged, submit } from '../../actions/user/answer-quiz';
import { connect } from 'react-redux';
import { Question, QuestionType } from '../../model/question';
import { Quiz } from '../../model/quiz';
import { Location } from 'history';
import { RouteProps } from 'react-router';
import { CircularProgress, Theme, withStyles, createStyles, Typography, List, ListItem, MuiThemeProvider, Radio, Checkbox, FormControl, InputLabel, Input, Divider, createMuiTheme, Button, Fab } from '@material-ui/core';
import { AnswerQuestionState } from '../../state/user-state/answer-quiz/answer-question-state';
import NavigationBar from '../navigation/NavigationBar';
import AnswerQuestion from './AnswerQuestion';
import { Send } from '@material-ui/icons';

let styles = (theme: Theme) => ({
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
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "column"
  },
  fab: {
    position: "fixed",
    bottom: 16, right: 16,
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

let buttonsTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#F44A4A",
      dark: "#F44A4A",
      light: "#F44A4A"
    }
  },
  typography: { useNextVariants: true },
});

interface IAnswerQuizProps extends RouteProps {
  classes: any;
  isLoading: boolean;
  quiz?: Quiz;
  questions: AnswerQuestionState[];
  // Actions
  setQuizIdUriLocation(location: Location): void;
  checkSuggestion(questionIndex: number, suggestionIndex: number, isChecked: boolean): void;
  onInputChange(index: number, input: string): void;
  submit(): void;
}

class AnswerQuizComponent extends React.Component<IAnswerQuizProps> {

  public componentWillMount() {
    if (this.props.location) {
      this.props.setQuizIdUriLocation(this.props.location);
    }
  }

  public render() {
    let { classes, isLoading, quiz, questions, checkSuggestion, submit, onInputChange } = this.props;
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
              <Typography variant="title">{quiz.title}</Typography>
              { quiz.description && <Typography>{quiz.description}</Typography> }
              { questions.map(({ question, suggestions }, questionIndex) => 
                  <div>
                    <AnswerQuestion 
                      question={question}
                      suggestions={suggestions}
                      checkSuggestion={(suggestionIndex, checked) => checkSuggestion(questionIndex, suggestionIndex, checked)}
                      onInputChange={input => onInputChange(questionIndex, input)}/>
                    { questionIndex < questions.length - 1 && <Divider /> }
                  </div>
                )
              }
            </div>
          </div>
        }
        <MuiThemeProvider theme={buttonsTheme}>
          <Fab 
            color="primary" 
            variant="extended" 
            aria-label="Soumettre" 
            className={classes.fab}
            onClick={submit}>
            <Send className={classes.extendedIcon} />
            SOUMETTRE
          </Fab>
        </MuiThemeProvider>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, Container, AnswerQuizAction>, ownProps: IAnswerQuizProps): IAnswerQuizProps {
  return {
    ...ownProps,
    setQuizIdUriLocation: location => dispatch(loadQuiz(location)),
    checkSuggestion: (questionIndex, suggestionIndex, isChecked) => dispatch(checkSuggestion(questionIndex, suggestionIndex, isChecked)),
    onInputChange: (questionIndex, input) => dispatch(onInputChanged(questionIndex, input)),
    submit: () => dispatch(submit())
  };
}

function mapStateToProps(state: AppState, ownProperties: IAnswerQuizProps): IAnswerQuizProps {
  let { answerQuiz } = state.user;
  return {
    ...ownProperties,
    isLoading: answerQuiz.isLoading,
    questions: answerQuiz.questions,
    quiz: answerQuiz.quiz
  };
}

let AnswerQuiz = withStyles(styles as any)(AnswerQuizComponent);
export default connect(mapStateToProps, mapDispatchToProps)(AnswerQuiz) as any;