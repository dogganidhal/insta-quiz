import React from 'react';
import { RouteProps } from 'react-router';
import NavigationBar from '../navigation/NavigationBar';
import { createStyles, Typography, withStyles, ButtonBase, MuiThemeProvider, TextField, createMuiTheme, List, ListItem, Dialog, DialogTitle, DialogContentText, DialogContent } from '@material-ui/core';
import { Add, Send } from "@material-ui/icons";
import { Question as QuestionModel } from '../../model/question';
import Question from './Question';
import { Location } from "history";
import { Container } from 'inversify';
import { CreateQuizAction, setTempalteUriLocation, addQuestion, abortQuestion } from '../../actions/user/create-quiz';
import { CreateQuizState } from '../../state/user-state/create-quiz-state';
import { AppState } from '../../state/app-state';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { InsertQuestionInput } from '../../model/insert-question-input';
import CreateQuestion from './CreateQuestion';

let styles = createStyles({
  container: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "#F2F2F2"
  },
  body: {
    marginTop: 64,
    paddingTop: 36
  },
  bottomToolbar: {
    position: "fixed",
    right: 0,
    left: 0,
    bottom: 0,
    height: 72,
    background: "#FFFFFF",
    alignItems: 'center',
    display: "flex",
    flexDirection: "row-reverse"
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

export interface ICreateQuizProps extends RouteProps {
  classes: any;
  questions: InsertQuestionInput[];
  isCreateQuestionDialogOpen: boolean;
  // Actions
  setTempalteUriLocation(location?: Location): void;
  closeCreateQuestionDialog(): void;
  addQuestion(): void;
  submit(): void;
}

class CreateQuizComponent extends React.Component<ICreateQuizProps, any> {
  
  private templateId?: string;

  private onEditQuestionButtonClicked(question: InsertQuestionInput) {

  }

  public componentWillMount() {
    this.props.setTempalteUriLocation(this.props.location);
  }

  public render() {
    
    let { classes } = this.props;
    return (
      <div className={classes.container}>
        <NavigationBar />
        <div className={classes.body}>
          <div className={classes.quizInfoContainer}>
            <MuiThemeProvider theme={textFieldTheme}>
              <TextField multiline label="Titre du quiz" className={classes.textField} />
              <TextField multiline label="Description du quiz" className={classes.textField} />
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
              fullWidth={true}>
              <DialogTitle id="create-question-dialog-title">Ajouter une question</DialogTitle>
              <DialogContent>
                <CreateQuestion />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className={classes.bottomToolbar}>
          <ButtonBase 
            className={classes.shareButton}
            onClick={this.props.submit}>
            <Send style={{ color: "#FFFFFF" }}/>
            <Typography style={{ color: "#FFFFFF" }}>&ensp;&ensp;PARTAGER</Typography>
          </ButtonBase>
          <ButtonBase 
            className={classes.addQuestionButton}
            onClick={this.props.addQuestion}>
            <Add style={{ color: "#FFFFFF" }} />
            <Typography style={{ color: "#FFFFFF" }}>&ensp;&ensp;NOUVELLE QUESTION</Typography>
          </ButtonBase>
        </div>
      </div>
    );

  }
}

function mapDispatchToProps(dispatch: ThunkDispatch<CreateQuizState, Container, CreateQuizAction>, ownProps: ICreateQuizProps): ICreateQuizProps {
  return {
    ...ownProps,
    setTempalteUriLocation: (location: Location) => dispatch(setTempalteUriLocation(location)),
    addQuestion: () => dispatch(addQuestion()),
    closeCreateQuestionDialog: () => dispatch(abortQuestion())
  };
}

function mapStateToProps(state: AppState, ownProperties: ICreateQuizProps): ICreateQuizProps {
  return {
    ...ownProperties,
    isCreateQuestionDialogOpen: state.user.createQuiz.createQuestion !== undefined
  };
}

let CreateQuiz = withStyles(styles)(CreateQuizComponent);
export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz) as any;