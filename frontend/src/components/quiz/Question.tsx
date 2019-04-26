import * as React from 'react';
import { Question as QuestionModel, QuestionType } from '../../model/question';
import { Typography, Radio, MuiThemeProvider, createMuiTheme, List, ListItem, Divider } from '@material-ui/core';
import { DeepPartial } from 'redux';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#434343"
    }
  }
});

export interface QuestionProps {
  question: DeepPartial<QuestionModel>;
  onEditButtonClicked(): void;
}

class QuestionComponent extends React.Component<QuestionProps> {

  public render() {
    let { question } = this.props;
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
                        <Radio checked color="primary" />
                      </MuiThemeProvider>
                      <Typography>{suggestion!.content}</Typography>
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

let Question = QuestionComponent;
export default Question;