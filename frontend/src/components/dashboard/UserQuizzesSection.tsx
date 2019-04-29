import React, { ReactNode } from 'react';
import { withStyles, Theme, Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, FormControl, Input, InputLabel, InputAdornment, IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { QuizPreviewModel } from '../../model/quiz-preview';
import QuizPreview from './QuizPreview';
import { ThunkDispatch } from 'redux-thunk';
import { UserQuizzesState } from '../../state/user-state/user-quizzes-state';
import { Container } from 'inversify';
import { AppState } from '../../state/app-state';
import { UserQuizzesAction, loadUserQuizzes, openShareDialog, closeShareDialog, copyLinkToClipboard } from '../../actions/user/user-quizzes';
import { connect } from 'react-redux';
import { formatDeadline } from '../../utils/date-utils';
import { FileCopy } from '@material-ui/icons';

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
  isShareDialogOpen: boolean;
  selectedQuizToShareUrl?: string;
  // Actions
  loadUserQuizzes(): void;
  openShareDialog(quizId: string): void;
  closeShareDialog(): void;
  copyQuizLinkToClipBoard(): void;
}

class UserQuizzesComponent extends React.Component<IUserQuizzesProps> {

  public componentWillMount() {
    this.props.loadUserQuizzes();
  }

  private quizzes(): ReactNode {
    return this.props.quizzes.map(quiz => {
      return <Grid key={quiz.id} item>
        <QuizPreview
          title={quiz.title}
          deadlineText={quiz.deadlineText}
          numberOfParticipants={quiz.numberOfParticipants}
          onSeeDetailsClicked={() => this.onSeeQuizDetailsClicked(quiz.id)}
          onShareClicked={() => this.props.openShareDialog(quiz.id)}/>
      </Grid>;
    });
  }

  private onSeeQuizDetailsClicked(quizId: string) {
    window.location.href = `/quiz/results?id=${quizId}`;
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
              {
                this.props.isLoading ?
                  <CircularProgress /> :
                  this.quizzes()
              }
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          open={this.props.isShareDialogOpen}
          onClose={this.props.closeShareDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Partager"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Vous pouvez utiliser le lien ci-dessous pour partager votre quiz.
            </DialogContentText>
            <br />
            <FormControl fullWidth>
              <InputLabel htmlFor="quiz-link">Lien du quiz</InputLabel>
              <Input
                id="quiz-link"
                type="url"
                value={this.props.selectedQuizToShareUrl}
                disabled
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.props.copyQuizLinkToClipBoard}>
                      <FileCopy />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeShareDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, Container, UserQuizzesAction>, ownProps: IUserQuizzesProps): IUserQuizzesProps {
  return {
    ...ownProps,
    loadUserQuizzes: () => dispatch(loadUserQuizzes()),
    openShareDialog: quizId => dispatch(openShareDialog(quizId)),
    closeShareDialog: () => dispatch(closeShareDialog()),
    copyQuizLinkToClipBoard: () => dispatch(copyLinkToClipboard())
  };
}

function mapStateToProps(state: AppState, ownProperties: IUserQuizzesProps): IUserQuizzesProps {
  let { isLoading, quizzes, selectedQuizToShareUrl, isShareDialogOpen } = state.user.userQuizzes;
  return {
    ...ownProperties,
    isLoading,
    selectedQuizToShareUrl,
    isShareDialogOpen,
    quizzes: quizzes.map(quiz => {
      return {
        id: quiz.id,
        title: quiz.title,
        numberOfParticipants: quiz.submissions.length,
        deadlineText: quiz.deadline ? formatDeadline(quiz.deadline) : undefined
      };
    })
  };
}

let UserQuizzesSection = withStyles(styles)(UserQuizzesComponent);
export default connect(mapStateToProps, mapDispatchToProps)(UserQuizzesSection) as any;