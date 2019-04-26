import React, { ReactNode } from 'react';
import { withStyles, Theme, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { QuizTemplate } from '../../model/quiz-template';

let styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    background: "#F2F2F2",
    paddingTop: 36,
    paddingBottom: 36
  },
  paper: {
    height: 194,
    width: 284,
    alignItems: 'center',
    display: "flex",
    justifyContent: "center",
    boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.25)"
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  sectionTitle: {
    marginBottom: 16,
    marginLeft: 148,
  }
});

interface ICreateQuizTemplatesProps {
  classes: any;
}

class CreateQuizTemplatesComponent extends React.Component<ICreateQuizTemplatesProps> {

  private onPaperClick(templateId: string) {
    window.location.href = `/quiz/new?template=${templateId}`;
  }

  private get papers(): ReactNode {
    let { classes } = this.props;
    return QuizTemplate.templates.map(template => (
      <Grid key={template.id} item>
        <Paper className={classes.paper} elevation={0} onClick={this.onPaperClick.bind(this, template.id)}>
          <img src={template.image} />
          <div style={{width: 16}} />
          <Typography variant="title" color="textPrimary">{template.name}</Typography>
        </Paper>
      </Grid>
    ));
  }

  public render() {
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.sectionTitle}>
          <Typography variant="title" color="textPrimary">Créer un Quiz</Typography>
        </div>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Grid container className={classes.demo} justify="center" spacing={40}>
              {this.papers}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

let CreateQuizTemplates = withStyles(styles)(CreateQuizTemplatesComponent);
export default CreateQuizTemplates;