import React, { Component } from 'react';
import { withStyles, createStyles, FormControl, InputLabel, Input, createMuiTheme, MuiThemeProvider, InputAdornment, IconButton, Typography, Theme, Button } from '@material-ui/core';
import { Send, AddPhotoAlternate } from '@material-ui/icons';
import { ThunkDispatch } from 'redux-thunk';
import { Container } from 'inversify';
import { CreateQuestionAction, addSuggestion, onQuestionContentInputChanged, toggleSuggestionCorrect, deleteSuggestion, setQuestionType, setQuestionPoints, uploadImageSuggestion } from '../../actions/user/answer-quiz/create-question';
import { AppState } from '../../state/app-state';
import { connect } from 'react-redux';
import { InsertSuggestionInput } from '../../model/insert-suggestion-input';
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"
import { fade } from '@material-ui/core/styles/colorManipulator';
import { QuestionType, questionTypeToString, questionTypeFromrString as questionTypeFromString } from '../../model/question';
import Suggestion from './Suggestion';
import { onSuggestionContentInputChanged } from '../../actions/user/create-quiz/create-suggestion';
let { FilePicker } = require("react-file-picker");


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
  pointsTextField: {
    margin: 16,
    flexWrap: "wrap"
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

interface ICreateQuestionProps {
  classes: any;
  suggestionContent?: string;
  suggestions: InsertSuggestionInput[];
  questionType: QuestionType;
  points: number;
  // Actions
  addSuggestion(): void;
  onQuestionContentInputChanged(questionContent: string): void;
  onSuggestionContentInputChanged(suggestionContent: string): void;
  toggleSuggestionCorrect(index: number): void;
  deleteSuggestionCorrect(index: number): void;
  setQuestionType(questionType: QuestionType): void;
  setQuestionPoints(points: number): void;
  addImageSuggestion(image: File): void;
}

class CreateQuestionComponent extends Component<ICreateQuestionProps> {

  private handleImagePicker(event: React.MouseEvent) {
    event.preventDefault();
    let imagePicker = document.createElement('input');
    imagePicker.setAttribute('type', 'image/*');
    imagePicker.click();
  }

  public render() {
    let { classes } = this.props;
    return (
      <div className={classes.container}>
        <MuiThemeProvider theme={buttonsTheme}>
          <ToggleButtonGroup
            exclusive
            onChange={(_, value: string) => this.props.setQuestionType(questionTypeFromString(value))}
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
        </MuiThemeProvider>
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
                id="suggestion-input"
                onChange={(event) => this.props.onSuggestionContentInputChanged(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter")
                    this.props.addSuggestion();
                }}
                value={this.props.suggestionContent}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Ajouter une suggestion"
                      onClick={this.props.addSuggestion}>
                      <Send color="primary" />
                    </IconButton>
                    <FilePicker
                      extensions={['jpg', 'jpeg', 'png', 'svg']}
                      dims={{ minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500 }}
                      onChange={this.props.addImageSuggestion}>
                      <IconButton
                        aria-label="Ajouter une photo">
                        <AddPhotoAlternate color="primary" />
                      </IconButton>
                    </FilePicker>
                  </InputAdornment>
                } />
            </FormControl>
          }
          {
            this.props.questionType !== QuestionType.INPUT && this.props.suggestions &&
            this.props.suggestions
              .map((suggestion, index) => {
                return <Suggestion
                  key={index} 
                  suggestion={suggestion}
                  toggleIsCorrect={() => this.props.toggleSuggestionCorrect(index)}
                  delete={() => this.props.deleteSuggestionCorrect(index)}/>;
              })
          }
          {
            this.props.questionType !== QuestionType.INPUT &&
            <FormControl className={classes.pointsTextField}>
              <InputLabel htmlFor="points-input">Points</InputLabel>
              <Input
                id="points-input"
                type="number"
                onChange={(event) => this.props.setQuestionPoints(event.target.value as unknown as number)}
                value={this.props.points} />
            </FormControl>
          }
        </MuiThemeProvider>
        
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, Container, CreateQuestionAction>, ownProps: ICreateQuestionProps): ICreateQuestionProps {
  return {
    ...ownProps,
    addSuggestion: () => dispatch(addSuggestion()),
    onQuestionContentInputChanged: input => dispatch(onQuestionContentInputChanged(input)),
    onSuggestionContentInputChanged: input => dispatch(onSuggestionContentInputChanged(input)),
    toggleSuggestionCorrect: index => dispatch(toggleSuggestionCorrect(index)),
    deleteSuggestionCorrect: index => dispatch(deleteSuggestion(index)),
    setQuestionType: type => dispatch(setQuestionType(type)),
    setQuestionPoints: points => dispatch(setQuestionPoints(points)),
    addImageSuggestion: image => dispatch(uploadImageSuggestion(image))
  };
}

function mapStateToProps(state: AppState, ownProperties: ICreateQuestionProps): ICreateQuestionProps {
  let { createQuestion } = state.user.createQuiz;
  if (createQuestion) {
    return {
      ...ownProperties,
      questionType: createQuestion.type,
      suggestions: createQuestion.suggestions || [],
      suggestionContent: createQuestion.createSuggestion.content,
      points: createQuestion.points || 1
    };
  }
  return ownProperties;
}

let CreateQuestion = withStyles(styles)(CreateQuestionComponent);
export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion) as any;