import React from "react";
import { Typography, Button, Theme, withStyles } from "@material-ui/core";

let styles = (theme: Theme) => ({
  container: {
    height: 194,
    width: 284,
    padding: 16,
    border: "1px solid #DADADA",
    borderRadius: "8px",
  },
  button: {
    margin: theme.spacing.unit,
    right: 8,
    bottom: 8
  },
  title: {
    marginLeft: 16,
    marginBottom: 16,
    fontWeight: 500,
  },
  label: {
    fontSize: 14,
    color: "#696969",
    fontWeight: 500
  },
  value: {
    fontSize: 14,
    color: "#434343",
    fontWeight: 600
  }
});

export interface IQuizPreviewProps {
  classes: any;
  title: string;
  deadlineText?: string;
  numberOfParticipants: number;
  onSeeDetailsClicked(): void;
}

class QuizPreviewComponent extends React.Component<IQuizPreviewProps> {
  
  public render() {
    let { classes } = this.props;
    return (
      <div className={classes.container} style={{
        boxSizing: "border-box",
        position: "relative"
      }}>
        <Typography variant="h5" className={classes.title}>
          {this.props.title}
        </Typography>
        {
          this.props.deadlineText && <div>
            <div style={{ height: 8 }} />
            <div>
              <Typography className={classes.label} inline>
                Date limite&ensp;
              </Typography>
              <Typography className={classes.value} inline>{this.props.deadlineText}</Typography>
            </div>
          </div>
        }
        <div style={{height: 8}} />
        <div>
          <Typography className={classes.label} inline>
            Nombre de participants&ensp;
          </Typography>
          <Typography className={classes.value} inline>
            {this.props.numberOfParticipants} participants
          </Typography>
        </div>
        <Button 
          color="primary" 
          className={classes.button} 
          style={{
            position: "absolute",
            bottom: 0, right: 0
          }}
          onClick={this.props.onSeeDetailsClicked}>
          Voir les résultats
        </Button>
      </div>
    );
  }
}

let QuizPreview = withStyles(styles)(QuizPreviewComponent);
export default QuizPreview;