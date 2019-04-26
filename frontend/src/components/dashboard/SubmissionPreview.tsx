import React from "react";
import { Typography, Button, Theme, withStyles, Paper } from "@material-ui/core";

let styles = (theme: Theme) => ({
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
  },
  paper: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 64,
    width: 284,
    padding: 16,
    border: "1px solid #DADADA",
    borderRadius: "8px",
    boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.25)"
  }
});

export interface ISubmissionPreviewProps {
  classes: any;
  title: string;
  deadlineText?: string;
  numberOfParticipants: number;
  scoreString?: string;
  onSeeDetailsClicked(): void;
}

class SubmissionPreviewComponent extends React.Component<ISubmissionPreviewProps> {

  public render() {
    let { classes } = this.props;
    return (
      <div className={classes.paper} style={{
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
        <div style={{ height: 8 }} />
        <div>
          <Typography className={classes.label} inline>
            Nombre de participants&ensp;
          </Typography>
          <Typography className={classes.value} inline>
            {this.props.numberOfParticipants} participants
          </Typography>
        </div>
        {
          this.props.scoreString && <div>
            <div style={{ height: 8 }} />
            <div>
              <Typography className={classes.label} inline>
                Score&ensp;
            </Typography>
              <Typography className={classes.value} inline>
                {this.props.scoreString}
            </Typography>
            </div>
          </div>
        }
        <Button
          color="primary"
          className={classes.button}
          style={{
            position: "absolute",
            bottom: 0, right: 0
          }}
          onClick={this.props.onSeeDetailsClicked}>
          Voir la correction
        </Button>
      </div>
    );
  }
}

let SubmissionPreview = withStyles(styles)(SubmissionPreviewComponent);
export default SubmissionPreview;