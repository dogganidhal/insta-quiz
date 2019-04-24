import React, { ReactNode } from 'react';
import { withStyles, Theme, Typography, CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { ThunkDispatch } from 'redux-thunk';
import { UserSubmissionsState } from '../../state/user-state';
import { Container } from 'inversify';
import { AppState } from '../../state/app-state';
import { connect } from 'react-redux';
import { formatDeadline } from '../../utils/date-utils';
import { UserSubmissionsAction, loadUserSubmissions } from '../../actions/user/user-submissions';
import { SubmissionPreviewModel } from '../../model/submission-preview';
import SubmissionPreview from '../submission-preview/SubmissionPreview';

let styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    background: "#F2F2F2",
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

interface IUserSubmissionsProps {
  classes: any;
  // Props
  submissions: SubmissionPreviewModel[];
  isLoading: boolean;
  // Actions
  loadUserSubmissions(): void;
}

class UserSubmissionsComponent extends React.Component<IUserSubmissionsProps> {

  public componentWillMount() {
    this.props.loadUserSubmissions();
  }

  private submissions(): ReactNode {
    return this.props.submissions.map(submission => {
      return <Grid key={submission.id} item>
        <SubmissionPreview
          title={submission.title}
          deadlineText={submission.deadlineText}
          numberOfParticipants={submission.numberOfParticipants}
          onSeeDetailsClicked={() => this.onSeeQuizCorrectionClicked(submission.id)}
          scoreString={submission.scoreString}
        />
      </Grid>;
    });
  }

  private onSeeQuizCorrectionClicked(quizId: string) {
    window.location.href = `/quiz/correction?id=${quizId}`;
  }

  public render() {
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.sectionTitle}>
          <Typography variant="title" color="textPrimary">Des Quiz aux quels je participe</Typography>
        </div>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Grid container className={classes.demo} justify="center" spacing={40}>
              {
                this.props.isLoading ?
                  <CircularProgress /> :
                  this.submissions()
              }
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: ThunkDispatch<UserSubmissionsState, Container, UserSubmissionsAction>, ownProps: IUserSubmissionsProps): IUserSubmissionsProps {
  return {
    ...ownProps,
    loadUserSubmissions: () => dispatch(loadUserSubmissions())
  };
}

function mapStateToProps(state: AppState, ownProperties: IUserSubmissionsProps): IUserSubmissionsProps {
  return {
    ...ownProperties,
    isLoading: state.user.userQuizzes.isLoading,
    submissions: state.user.userSubmissions.submissions.map(submission => {
      return {
        id: submission.id,
        title: submission.quiz.title,
        numberOfParticipants: submission.quiz.submissions.length,
        deadlineText: submission.quiz.deadline ? formatDeadline(submission.quiz.deadline) : undefined,
        scoreString: submission.score ? `${submission.score.points}/${submission.score.totalPoints}` : undefined
      };
    })
  };
}

let UserSubmissions = withStyles(styles)(UserSubmissionsComponent);
export default connect(mapStateToProps, mapDispatchToProps)(UserSubmissions) as any;