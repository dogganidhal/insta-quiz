import * as React from 'react';
import { InsertSuggestionInput } from '../../model/insert-suggestion-input';
import { withStyles, createStyles, Typography, IconButton } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';


let styles = createStyles({
  suggestion: {
    marginBottom: 16,
    background: "#F2F2F2",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  suggestionCorrect: {
    background: "rgba(0, 210, 147, 0.76)",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  suggestionBody: {
    paddingLeft: 16,
    paddingRight: 16,
    display: "flex",
    width: "100%",
    justifyContent: "space-between"
  },
  suggestionContent: {
    marginTop: "auto",
    marginBottom: "auto"
  },
  imageSuggestion: {
    height: 128,
    objectFit: "contain",
  },
  imageSuggestionContainer: {
    borderRadius: 8,
    overflow: "hidden"
  },
  actions: {
    marginTop: "auto",
    marginBottom: "auto"
  },
  suggestionTitleAndImage: {
    display: "flex",
    flex: 1,
    alignContent: "starts"
  }
});

export interface ISuggestionProps {
  classes: any;
  suggestion: InsertSuggestionInput;
  toggleIsCorrect(): void;
  delete(): void;
}

class SuggestionComponent extends React.Component<ISuggestionProps> {

  public render() {
    let { classes } = this.props;
    return (
      <div className={this.props.suggestion.isCorrect ? classes.suggestionCorrect : classes.suggestion} >
        <div className={classes.suggestionBody}>
          <div className={classes.suggestionTitleAndImage}>
            {
              this.props.suggestion.imageUrl ?
              <div className={classes.imageSuggestionContainer}>
                <img
                  className={classes.imageSuggestion}
                  src={this.props.suggestion.imageUrl} />
              </div> :
              <Typography inline className={classes.suggestionContent}>{this.props.suggestion.content}</Typography>
            }
          </div>
          <div className={classes.actions}>
            <IconButton
              onClick={this.props.toggleIsCorrect}
              className={classes.isCorrectIconButton}>
              <Check color={!this.props.suggestion.isCorrect ? "secondary" : "default"} />
            </IconButton>
            <IconButton
              onClick={this.props.delete}
              className={classes.isCorrectIconButton}>
              <Close />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

let Suggestion = withStyles(styles)(SuggestionComponent);
export default Suggestion;