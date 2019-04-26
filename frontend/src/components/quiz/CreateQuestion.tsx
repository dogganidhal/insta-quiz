import React, { Component } from 'react';
import { withStyles, createStyles, FormControl, InputLabel, Input, TextField, createMuiTheme, MuiThemeProvider, InputAdornment, IconButton } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { ThunkDispatch } from 'redux-thunk';
import { CreateQuestionState } from '../../state/user-state/create-quiz-state/create-question-state';
import { Container } from 'inversify';
import { CreateQuestionAction, addSuggestion, onQuestionContentInputChanged } from '../../actions/user/create-question';
import { AppState } from '../../state/app-state';
import { connect } from 'react-redux';
import { InsertSuggestionInput } from '../../model/insert-suggestion-input';
import { onSuggestionContentInputChanged } from '../../actions/user/create-suggestion';

let styles = createStyles({
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
    height: 56,
    background: "#F2F2F2",
    borderRadius: 8
  },
  suggestionCorrect: {
    background: "rgba(0, 210, 147, 0.76)",
    borderRadius: 8
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
  // Actions
  addSuggestion(): void;
  onQuestionContentInputChanged(questionContent: string): void;
  onSuggestionContentInputChanged(suggestionContent: string): void;
}

class CreateQuestionComponent extends Component<ICreateQuestionProps> {

  public render() {
    let { classes } = this.props;
    return (
      <div className={classes.container}>
        <MuiThemeProvider theme={textFieldTheme}>
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="question-input">Intitulé de la question</InputLabel>
            <Input
              multiline
              id="question-input"
              onChange={(event) => this.props.onQuestionContentInputChanged(event.target.value)}/>
          </FormControl>
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
                    <Send color="primary"/>
                  </IconButton>
                </InputAdornment>
              }/>
          </FormControl>
        </MuiThemeProvider>
        {
          // TODO: Handle image suggestions
          this.props.suggestions
          .map(suggestion => {
            return <div className={suggestion.isCorrect ? classes.suggestionCorrect : classes.suggestion}>
              {suggestion.content}
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
    onSuggestionContentInputChanged: (input) => dispatch(onSuggestionContentInputChanged(input))
  };
}

function mapStateToProps(state: AppState, ownProperties: ICreateQuestionProps): ICreateQuestionProps {
  return {
    ...ownProperties,
    suggestions: state.user.createQuiz.createQuestion ? state.user.createQuiz.createQuestion.suggestions || [] : [],
    suggestionContent: state.user.createQuiz.createQuestion ? state.user.createQuiz.createQuestion.createSuggestion.content : undefined
  };
}

let CreateQuestion = withStyles(styles)(CreateQuestionComponent);
export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion) as any;