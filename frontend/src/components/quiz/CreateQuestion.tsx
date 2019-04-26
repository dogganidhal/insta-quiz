import React, { Component } from 'react';
import { withStyles, createStyles, FormControl, InputLabel, Input, TextField, createMuiTheme, MuiThemeProvider, InputAdornment, IconButton, List, ListItem, Typography, Theme } from '@material-ui/core';
import { Send, Close, Check, Cancel, Remove } from '@material-ui/icons';
import { ThunkDispatch } from 'redux-thunk';
import { Container } from 'inversify';
import { CreateQuestionAction, addSuggestion, onQuestionContentInputChanged, toggleSuggestionCorrect, deleteSuggestion, setQuestionType } from '../../actions/user/create-question';
import { AppState } from '../../state/app-state';
import { connect } from 'react-redux';
import { InsertSuggestionInput } from '../../model/insert-suggestion-input';
import { onSuggestionContentInputChanged } from '../../actions/user/create-suggestion';
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"
import { fade } from '@material-ui/core/styles/colorManipulator';
import UserQuizzesSection from '../dashboard/UserQuizzesSection';
import { QuestionType, questionTypeToString, questionTypeFromrString as questionTypeFromString } from '../../model/question';


let styles = (theme: Theme) => createStyles({
  container: {
    marginLeft: "auto", 
    marginRight: "auto",
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    flex: 1,
    margin: 16
  },
  suggestion: {
    marginBottom: 16,
    height: 56,
    background: "#F2F2F2",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  suggestionCorrect: {
    height: 56,
    background: "rgba(0, 210, 147, 0.76)",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  suggestionBody: {
    paddingLeft: 16,
    paddingRight: 16, 
    display: "flex",
    justifyContent: "space-between"
  },
  suggestionContent: {
    marginTop: "auto",
    marginBottom: "auto"
  },
  questionTypeToggleGroup: {
    borderRadius: 8,
    height: 84,
    background: theme.palette.primary.main,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    color: "#FFFFFF",
    paddingLeft: 96, paddingRight: 96,
  },
  questionTypeToggle: {
    width: 150,
    height: 54,
    borderRadius: 8,
    '&:not(:first-child)': {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    '&:not(:last-child)': {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
    '&$selected': {
      color: "#FFFFFF",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      '&:hover': {
        backgroundColor: "rgba(255, 255, 255, 0.25)",
      },
    }
  },
  questionTypeLabel: {
    color: "#FFFFFF",
  },
  questionTypeToggleSelected: {
    color: theme.palette.action.active,
    backgroundColor: fade(theme.palette.action.active, 0.2),
    '&:hover': {
      backgroundColor: fade(theme.palette.action.active, 0.25),
    },
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

interface ICreateQuestionProps {
  classes: any;
  suggestionContent?: string;
  suggestions: InsertSuggestionInput[];
  questionType: QuestionType;
  // Actions
  addSuggestion(): void;
  onQuestionContentInputChanged(questionContent: string): void;
  onSuggestionContentInputChanged(suggestionContent: string): void;
  toggleSuggestionCorrect(index: number): void;
  deleteSuggestionCorrect(index: number): void;
  setQuestionType(questionType: QuestionType): void;
}

class CreateQuestionComponent extends Component<ICreateQuestionProps> {

  public render() {
    let { classes } = this.props;
    return (
      <div className={classes.container}>
        <ToggleButtonGroup
          exclusive
          onChange={(event, value: string) => this.props.setQuestionType(questionTypeFromString(value))}
          classes={{
            root: classes.questionTypeToggleGroup 
          }} 
          value={this.props.questionType}>
          {
            [QuestionType.SINGLE_CHOICE, QuestionType.MULTI_CHOICE, QuestionType.INPUT].map(type => {
              return <ToggleButton
                value={type.toString()}
                selected={type == this.props.questionType}
                classes={{
                  root: classes.questionTypeToggle,
                  label: classes.questionTypeLabel,
                  selected: classes.questionTypeToggleSelected
                }}>
                {questionTypeToString(type)}
              </ToggleButton>;  
            })
          }
        </ToggleButtonGroup>
        <MuiThemeProvider theme={textFieldTheme}>
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="question-input">Intitulé de la question</InputLabel>
            <Input
              required
              multiline
              id="question-input"
              onChange={(event) => this.props.onQuestionContentInputChanged(event.target.value)}/>
          </FormControl>
          {
            this.props.questionType !== QuestionType.INPUT &&
            <FormControl className={classes.textField}>
              <InputLabel htmlFor="suggestion-input">Intitulé de la suggestion</InputLabel>
              <Input
                multiline
                id="suggestion-input"
                onChange={(event) => this.props.onSuggestionContentInputChanged(event.target.value)}
                value={this.props.suggestionContent}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Ajouter une suggestion"
                      onClick={this.props.addSuggestion}>
                      <Send color="primary" />
                    </IconButton>
                  </InputAdornment>
                } />
            </FormControl>
          }
        </MuiThemeProvider>
        {
          // TODO: Handle image suggestions
          this.props.questionType !== QuestionType.INPUT &&
          this.props.suggestions
            .map((suggestion, index) => {
              return <div key={index} className={suggestion.isCorrect ? classes.suggestionCorrect : classes.suggestion}>
                <div className={classes.suggestionBody}>
                  <Typography inline className={classes.suggestionContent}>{suggestion.content}</Typography>
                  <div>
                    <IconButton
                      onClick={() => this.props.toggleSuggestionCorrect(index)}
                      className={classes.isCorrectIconButton}>
                      <Check color={!suggestion.isCorrect ? "secondary" : "default"} />
                    </IconButton>
                    <IconButton
                      onClick={() => this.props.deleteSuggestionCorrect(index)}
                      className={classes.isCorrectIconButton}>
                      <Close />
                    </IconButton>
                  </div>
                </div>
              </div>
            })
        }
        
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, Container, CreateQuestionAction>, ownProps: ICreateQuestionProps): ICreateQuestionProps {
  return {
    ...ownProps,
    addSuggestion: () => dispatch(addSuggestion()),
    onQuestionContentInputChanged: (input) => dispatch(onQuestionContentInputChanged(input)),
    onSuggestionContentInputChanged: (input) => dispatch(onSuggestionContentInputChanged(input)),
    toggleSuggestionCorrect: (index) => dispatch(toggleSuggestionCorrect(index)),
    deleteSuggestionCorrect: (index) => dispatch(deleteSuggestion(index)),
    setQuestionType: (type) => dispatch(setQuestionType(type))
  };
}

function mapStateToProps(state: AppState, ownProperties: ICreateQuestionProps): ICreateQuestionProps {
  let { createQuestion } = state.user.createQuiz;
  if (createQuestion) {
    return {
      ...ownProperties,
      questionType: createQuestion.type,
      suggestions: createQuestion.suggestions || [],
      suggestionContent: createQuestion.createSuggestion.content
    };
  }
  return ownProperties;
}

let CreateQuestion = withStyles(styles)(CreateQuestionComponent);
export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion) as any;