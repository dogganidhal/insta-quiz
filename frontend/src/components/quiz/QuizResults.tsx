import React from 'react';
import { AppState } from '../../state/app-state';
import { Container } from 'inversify';
import { ThunkDispatch } from 'redux-thunk';
import { AnswerQuizAction, loadQuiz, checkSuggestion, onInputChanged, submit } from '../../actions/user/answer-quiz';
import { connect } from 'react-redux';
import { Quiz } from '../../model/quiz';
import { Location } from 'history';
import { RouteProps } from 'react-router';
import { CircularProgress, Theme, withStyles, createStyles, Typography, List, ListItem, MuiThemeProvider, Radio, Checkbox, FormControl, InputLabel, Input, Divider, createMuiTheme, Button, Fab, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { AnswerQuestionState } from '../../state/user-state/answer-quiz/answer-question-state';
import NavigationBar from '../navigation/NavigationBar';
import AnswerQuestion from './AnswerQuestion';
import { Send } from '@material-ui/icons';
import { Submission } from '../../model/submission';
import { loadQuizResults } from '../../actions/user/quiz-results';

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
    paddingTop: 56,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 42,
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  fab: {
    position: "fixed",
    bottom: 16, right: 16,
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  quizTitleContainer: {
    position: "absolute",
    left: 77, right: 77,
    top: -42, height: 84,
    backgroundColor: theme.palette.primary.main,
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

interface IQuizResultsProps extends RouteProps {
  classes: any;
  isLoading: boolean;
  quiz?: Quiz;
  // Actions
  loadQuizResults(location: Location): void;
}

class QuizResultsComponent extends React.Component<IQuizResultsProps> {

  public componentWillMount() {
    if (this.props.location) {
      this.props.loadQuizResults(this.props.location);
    }
  }

  public render() {
    let { classes, isLoading, quiz } = this.props;
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
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">NOM ET PRÉNOM</TableCell>
                    <TableCell align="right">SCORE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quiz.submissions.map(submission =>
                    <TableRow key={submission.id}>
                      <TableCell align="left">{submission.user.fullName}</TableCell>
                      <TableCell align="right">
                        {`${submission.score.points}/${submission.score.totalPoints}`}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        }
      </div>
    );
  }

}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, Container, AnswerQuizAction>, ownProps: IQuizResultsProps): IQuizResultsProps {
  return {
    ...ownProps,
    loadQuizResults: location => dispatch(loadQuizResults(location))
  };
}

function mapStateToProps(state: AppState, ownProperties: IQuizResultsProps): IQuizResultsProps {
  let { isLoading, quiz } = state.user.quizResult;
  return {
    ...ownProperties,
    isLoading,
    quiz
  };
}

let AnswerQuiz = withStyles(styles as any)(QuizResultsComponent);
export default connect(mapStateToProps, mapDispatchToProps)(AnswerQuiz) as any;