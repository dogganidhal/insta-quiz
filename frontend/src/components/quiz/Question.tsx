import * as React from 'react';
import { Question as QuestionModel, QuestionType } from '../../model/question';
import { Typography, Radio, MuiThemeProvider, createMuiTheme, List, ListItem, Divider, Checkbox, createStyles, withStyles } from '@material-ui/core';
import { DeepPartial } from 'redux';

let styles = createStyles({
  imageSuggestion: {
    height: 128,
    objectFit: "contain",
  },
  imageSuggestionContainer: {
    borderRadius: 8,
    overflow: "hidden"
  },
});

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#434343"
    }
  }
});

export interface QuestionProps {
  classes: any;
  question: DeepPartial<QuestionModel>;
  onEditButtonClicked(): void;
}

class QuestionComponent extends React.Component<QuestionProps> {

  public render() {
    let { question, classes } = this.props;
    return (
      <div>
        <Typography style={{marginTop: 16, marginRight: 16, fontSize: 16}}>{question.content}</Typography>
        {
          question.type !== QuestionType.INPUT && <List>
            {
              question.suggestions!
                .filter(suggestion => suggestion !== undefined)
                .map((suggestion) => {
                  return <ListItem dense alignItems="flex-start" >
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <MuiThemeProvider theme={theme}>
                        {
                          this.props.question.type === QuestionType.SINGLE_CHOICE && <Radio checked color="primary" />                        
                        }
                        {
                          this.props.question.type === QuestionType.MULTI_CHOICE && <Checkbox checked color="primary" />
                        }
                      </MuiThemeProvider>
                      {
                        suggestion!.imageUrl ?
                          <div className={classes.imageSuggestionContainer}>
                            <img
                              className={classes.imageSuggestion}
                              src={suggestion!.imageUrl} />
                          </div> :
                          <Typography>{suggestion!.content}</Typography> 
                      }
                    </div>
                  </ListItem>;
                })
            }
          </List>
        }
      </div>
    );
  }

}

let Question = withStyles(styles)(QuestionComponent);
export default Question;