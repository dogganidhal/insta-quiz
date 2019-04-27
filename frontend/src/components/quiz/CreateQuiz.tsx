import React from 'react';
import { RouteProps } from 'react-router';
import NavigationBar from '../navigation/NavigationBar';
import { createStyles, Typography, withStyles, ButtonBase, MuiThemeProvider, TextField, createMuiTheme, List, ListItem, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button, FormControl, InputLabel, Input } from '@material-ui/core';
import { Add, Send } from "@material-ui/icons";
import { Question as QuestionModel } from '../../model/question';
import Question from './Question';
import { Location } from "history";
import { Container } from 'inversify';
import { CreateQuizAction, setTemplateUriLocation, openQuestionDialog, abortQuestion, addQuestion, submit, onQuizDescriptionInputChanged, onQuizTitleInputChanged, setDeadlineText } from '../../actions/user/create-quiz';
import { AppState } from '../../state/app-state';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { InsertQuestionInput } from '../../model/insert-question-input';
import CreateQuestion from './CreateQuestion';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { Moment } from 'moment';


let styles = createStyles({
  container: {
    positions: "relative",
    width: "100%", height: "100%",
  },
  body: {
    position: "absolute", top: 64, bottom: 80,
    paddingTop: 36, paddingBottom: 36,
    overflowY: "auto", width: "100%",
    backgroundColor: "#F2F2F2"
  },
  bottomToolbar: {
    position: "absolute", bottom: 0,
    width: "100%",
    background: "#FFFFFF",
    alignItems: 'center',
    display: "flex",
    flexDirection: "row-reverse",
    boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.25)"
  },
  shareButton: {
    width: 279,
    height: 48,
    background: "#F44A4A",
    borderRadius: 8,
    alignSelf: "right",
    margin: 16,
  },
  addQuestionButton: {
    width: 279,
    height: 48,
    background: "#F44A4A",
    borderRadius: 8,
    alignSelf: "right",
    marginTop: 16, marginBottom: 16
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
  textField: {
    flex: 1,
    margin: 16
  }
});

let textFieldTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#F44A4A",
      dark: "#F44A4A",
      light: "#F44A4A"
    }
  },
  typography: { useNextVariants: true },
});

let buttonsTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#F44A4A",
      dark: "#F44A4A",
      light: "#F44A4A"
    }
  },
  typography: { useNextVariants: true },
});

export interface ICreateQuizProps extends RouteProps {
  classes: any;
  questions: InsertQuestionInput[];
  isCreateQuestionDialogOpen: boolean;
  success: boolean;
  title?: string;
  description?: string;
  deadline?: string;
  // Actions
  onQuizTitleInputChanged(input: string): void;
  onQuizDescriptionInputChanged(input: string): void;
  setTempalteUriLocation(location?: Location): void;
  closeCreateQuestionDialog(): void;
  openQuestionDialog(): void;
  addQuestion(): void;
  setDeadlineText(moment: Moment): void;
  submit(): void;
}

class CreateQuizComponent extends React.Component<ICreateQuizProps, any> {

  private onEditQuestionButtonClicked(question: InsertQuestionInput) {

  }

  public componentWillMount() {
    this.props.setTempalteUriLocation(this.props.location);
  }

  public render() {

    if (this.props.success) {
      window.location.href = "/";
    }
    
    let { classes } = this.props;
    return (
      <div className={classes.container}>
        <NavigationBar />
        <div className={classes.body}>
          <div className={classes.quizInfoContainer}>
            <MuiThemeProvider theme={textFieldTheme}>
              <FormControl className={classes.textField}>
                <InputLabel htmlFor="title-input">Titre du quiz</InputLabel>
                <Input
                  multiline
                  id="title-input"
                  onChange={(event) => this.props.onQuizTitleInputChanged(event.target.value)}
                  value={this.props.title} />
              </FormControl>
              <FormControl className={classes.textField}>
                <InputLabel htmlFor="description-input">Description du quiz</InputLabel>
                <Input
                  multiline
                  id="description-input"
                  onChange={(event) => this.props.onQuizDescriptionInputChanged(event.target.value)}
                  value={this.props.description} />
              </FormControl>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  clearable
                  clearLabel="RÉINITIALISER"
                  margin="normal"
                  label="Date limite"
                  value={this.props.deadline || null}
                  format="DD/MM/YYYY"
                  className={classes.textField}
                  onChange={this.props.setDeadlineText}
                />
              </MuiPickersUtilsProvider>
            </MuiThemeProvider>
            {
              this.props.questions && this.props.questions.length > 0 &&
              <List>
                {
                  this.props.questions.map((question, index) => {
                    return <ListItem divider={index < this.props.questions.length - 1} dense>
                      <Question
                        onEditButtonClicked={() => this.onEditQuestionButtonClicked(question)}
                        question={question} />
                    </ListItem>
                  })
                }
              </List>
            }
            <Dialog
              open={this.props.isCreateQuestionDialogOpen}
              onClose={this.props.closeCreateQuestionDialog}
              aria-labelledby="create-question-dialog-title"
              maxWidth="md"
              scroll="paper"
              fullWidth={true}>
              <DialogContent>
                <CreateQuestion />
              </DialogContent>
              <DialogActions>
                  <Button size="large"
                    color="primary"
                    onClick={this.props.addQuestion}>
                    AJOUTER UNE QUESTION
                  </Button>
                </DialogActions>
            </Dialog>
          </div>
        </div>
        <div className={classes.bottomToolbar}>
          <MuiThemeProvider theme={buttonsTheme}>
            <Button variant="contained" size="large" color="primary"
              className={classes.shareButton}
              onClick={this.props.submit}>
              <Send />
              <Typography variant="button">&ensp;&ensp;PARTAGER</Typography>
            </Button>
            <Button variant="contained" size="large" color="primary"
              className={classes.addQuestionButton}
              onClick={this.props.openQuestionDialog}>
              <Add/>
              <Typography variant="button">&ensp;&ensp;NOUVELLE QUESTION</Typography>
            </Button>
          </MuiThemeProvider>
        </div>
      </div>
    );

  }
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, Container, CreateQuizAction>, ownProps: ICreateQuizProps): ICreateQuizProps {
  return {
    ...ownProps,
    setTempalteUriLocation: (location: Location) => dispatch(setTemplateUriLocation(location)),
    openQuestionDialog: () => dispatch(openQuestionDialog()),
    closeCreateQuestionDialog: () => dispatch(abortQuestion()),
    addQuestion: () => dispatch(addQuestion()),
    submit: () => dispatch(submit()),
    onQuizDescriptionInputChanged: input => dispatch(onQuizDescriptionInputChanged(input)),
    onQuizTitleInputChanged: input => dispatch(onQuizTitleInputChanged(input)),
    setDeadlineText: moment => dispatch(setDeadlineText(moment))
  };
}

function mapStateToProps(state: AppState, ownProperties: ICreateQuizProps): ICreateQuizProps {
  let { createQuestion, questions, success, title, description, deadline } = state.user.createQuiz;
  return {
    ...ownProperties,
    isCreateQuestionDialogOpen: createQuestion !== undefined,
    questions: questions,
    success: success,
    title: title,
    description: description,
    deadline: deadline
  };
}

let CreateQuiz = withStyles(styles)(CreateQuizComponent);
export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz) as any;