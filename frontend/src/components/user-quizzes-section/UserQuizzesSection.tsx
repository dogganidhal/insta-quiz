import React, { ReactNode } from 'react';
import { withStyles, Theme, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { QuizPreviewModel } from '../../model/quiz-preview';
import QuizPreview from '../quiz-preview/QuizPreview';
import { ThunkDispatch } from 'redux-thunk';
import { UserQuizzesState } from '../../state/user-state';
import { Container } from 'inversify';
import { AppState } from '../../state/app-state';
import { UserQuizzesAction, loadUserQuizzes } from '../../actions/user/user-quizzes';
import { connect } from 'react-redux';
import { formatDeadline } from '../../utils/date-utils';

let styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    background: "#FFFFFF",
    paddingTop: 36,
    paddingBottom: 36
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  sectionTitle: {
    marginBottom: 16,
    marginLeft: 148,
  }
});

interface IUserQuizzesProps {
  classes: any;
  // Props
  quizzes: QuizPreviewModel[];
  isLoading: boolean;
  // Actions
  loadUserQuizzes(): void;
}

class UserQuizzesComponent extends React.Component<IUserQuizzesProps> {

  private get quizzes(): ReactNode {
    return this.props.quizzes.map(quiz => {
      <QuizPreview 
        title={quiz.title} 
        deadlineText={quiz.deadlineText} 
        numberOfParticipants={quiz.numberOfParticipants}
        onSeeDetailsClicked={() => this.onSeeQuizDetailsClicked(quiz.id)}
      />
    });
  }

  private onSeeQuizDetailsClicked(quizId: string) {
    // TODO: Navigate to the quiz details view
  }

  public render() {
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.sectionTitle}>
          <Typography variant="title" color="textPrimary">Mes Quiz</Typography>
        </div>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Grid container className={classes.demo} justify="center" spacing={40}>
              {this.quizzes}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: ThunkDispatch<UserQuizzesState, Container, UserQuizzesAction>, ownProps: IUserQuizzesProps): IUserQuizzesProps {
  return {
    ...ownProps,
    loadUserQuizzes: () => dispatch(loadUserQuizzes())
  };
}

function mapStateToProps(state: AppState, ownProperties: IUserQuizzesProps): IUserQuizzesProps {
  return {
    ...ownProperties,
    isLoading: state.user.userQuizzes.isLoading,
    quizzes: state.user.userQuizzes.quizzes.map(quiz => {
      return {
        id: quiz.id,
        title: quiz.title,
        numberOfParticipants: quiz.submissions.length,
        deadlineText: quiz.deadline ? formatDeadline(quiz.deadline) : undefined
      };
    })
  };
}

let UserQuizzes = withStyles(styles)(UserQuizzesComponent);
export default connect(mapStateToProps, mapDispatchToProps)(UserQuizzes) as any;