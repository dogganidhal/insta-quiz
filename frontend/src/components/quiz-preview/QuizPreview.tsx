import React from "react";
import { Typography, Button, Theme, withStyles } from "@material-ui/core";

let styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

export interface QuizPreviewProps {
  classes: any;
  title: string;
  deadlineText?: string;
  numberOfParticipants: number;
  onSeeDetailsClicked(): void;
}

class QuizPreviewComponent extends React.Component<QuizPreviewProps> {
  
  public render() {
    let { classes } = this.props;
    return (
      <div
        style={{
          height: 194,
          width: 284,
          alignItems: 'center',
          display: "flex",
          justifyContent: "center",
          border: "1px solid #DADADA",
          boxSizing: "border-box",
          borderRadius: "8px"
        }}
      >
        <Typography variant="title">{this.props.title}</Typography>
        <div>
          <Typography inline>Date limite:</Typography>
          <Typography inline>{this.props.deadlineText}</Typography>
        </div>
        <div>
          <Typography inline>Nombre de participants:</Typography>
          <Typography inline>{this.props.deadlineText}</Typography>
        </div>
        <Button color="primary" className={classes.button} onClick={this.props.onSeeDetailsClicked}>
          Primary
        </Button>
      </div>
    );
  }
}

let QuizPreview = withStyles(styles)(QuizPreviewComponent);
export default QuizPreview;