import React from 'react';
import { withStyles, Typography, List, ListItem, Radio, Checkbox, MuiThemeProvider, FormControl, InputLabel, Input, createMuiTheme, createStyles } from '@material-ui/core';
import { QuestionType, Question } from '../../model/question';
import { CheckableSuggestion } from '../../model/suggestion';

let styles = createStyles({
  imageSuggestion: {
    height: 128,
    objectFit: "contain",
  },
  imageSuggestionContainer: {
    borderRadius: 8,
    overflow: "hidden"
  },
  textField: {
    flex: 1,
    margin: 16
  },
})

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

interface IAnswerQuestionProps {
  classes: any;
  question: Question;
  suggestions: CheckableSuggestion[];
  checkSuggestion(index: number, checked: boolean): void;
  onInputChange(input: string): void;
}

class AnswerQuestionComponent extends React.Component<IAnswerQuestionProps, any> {

  public render() {
    let { classes, question, suggestions, checkSuggestion, onInputChange } = this.props;
    return (
      <div style={{ flex: 1, flexDirection: "column", display: "flex" }}>
        <Typography style={{ marginTop: 16, marginRight: 16, fontSize: 16 }}>{question.content}</Typography>
        {
          question.type !== QuestionType.INPUT && <List>
            {
              suggestions
                .map((suggestion, index) => {
                  return <ListItem dense alignItems="flex-start" >
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      {
                        question.type === QuestionType.SINGLE_CHOICE &&
                        <Radio
                          checked={suggestion.isChecked}
                          color="primary"
                          onChange={(_, checked) => checkSuggestion(index, checked)} />
                      }
                      {
                        question.type === QuestionType.MULTI_CHOICE &&
                        <Checkbox
                          checked={suggestion.isChecked}
                          color="primary"
                          onChange={(_, checked) => checkSuggestion(index, checked)} />
                      }
                      {
                        suggestion.imageUrl ?
                          <div className={classes.imageSuggestionContainer}>
                            <img
                              className={classes.imageSuggestion}
                              src={suggestion.imageUrl} />
                          </div> :
                          <Typography>{suggestion.content}</Typography>
                      }
                    </div>
                  </ListItem>;
                })
            }
          </List>
        }
        {
          question.type === QuestionType.INPUT &&
          <MuiThemeProvider theme={textFieldTheme}>
            <FormControl className={classes.textField}>
              <InputLabel htmlFor="answer-input">Votre réponse</InputLabel>
              <Input
                fullWidth
                required
                multiline
                id="answer-input" 
                onChange={(event) => onInputChange(event.target.value)}/>
            </FormControl>
          </MuiThemeProvider>
        }
      </div>
    );
  }
}


let AnswerQuestion = withStyles(styles)(AnswerQuestionComponent);
export default AnswerQuestion;
